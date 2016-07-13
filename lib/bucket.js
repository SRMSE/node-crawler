var ObjectId = require('mongodb').ObjectId;
var Immutable = require('immutable');
var parent_dir = process.getAbsolutePath(__dirname);
var Score = require(parent_dir + '/lib/score.js');
var proto = require(parent_dir + '/lib/proto.js');
var _ = require("underscore");
var check = require('check-types');
var URL = require(parent_dir + '/lib/url.js');
var proxy_cache_class = require(parent_dir + "/lib/bucket_proxy.js");


var Bucket = function(message_obj) {
    var message = message_obj;
    var config = message.get('config');
    var log = message.get('logger');
    var pool = message.get('pool');
    var that = this;

    /**
    	time after which bucket creator is called.
    	@private
    	@type {Number}
    */
    var bucket_time_interval = 10000;




    /**
    	Stores interval object for bucket creator.
    	@private
    	@type {boolean}
    */
    var bucket_timer;

    var domain_group = [];
    var bucket_priority = message.get('bucket_priority');
    var links_store = message.get('links_store');
    var score = new Score(message);
    var bot_obj = message.get('bot');


    this.dequeue = function bucketoperation_dequeue(domain, count, interval, fn) {

        var li = [];
        if (!check.assigned(message.get('proxy_cache'))) {

            //first initilaization
            message.set('proxy_cache', new proxy_cache_class(config.getConfig('inlink_cache_size')));

        }
        var cache_urls = message.get('proxy_cache').fetchURLs(domain, count);
        msg('Got ' + cache_urls.length + ' urls from links cache for ' + domain, "success");
        
        if (cache_urls.length < ((50 / 100) * count)) {
            //load some urls from the db
            pool.mongodb_collection.find({
                "domain": domain,
                "bucket_id": null,
                "bucketed": false,
                "fetch_interval": interval,
                "partitionedBy": config.getConfig("bot_name")
            }, {
                limit: count * 5,
                sort: {
                    level: 1
                }
            }).toArray(function loadFromCache(err, object) {
                if (!check.assigned(err)) {
                    msg("Loaded " + object.length + ' items for the cache of ' + domain, 'success');
                }

                for (var index in object) {
                    var doc = object[index];
                    message.get('proxy_cache').pushURL(doc);
                }

                var old_count = cache_urls.length;
                cache_urls = cache_urls.concat(message.get('proxy_cache').fetchURLs(domain, count - old_count));
                //console.log(cache_urls, "FROM CACHE");
                fn(cache_urls);


            });
        } else {
            //console.log(cache_urls, "FROM CACHE2");
            fn(cache_urls);
        }




    };




    this.getCurrentDomain = function bucketoperation_getCurrentDomain(interval) {


        //console.log(that.bucket_priority)
        var domain = that.bucket_priority[interval].splice(0, 1)[0];


        return domain;
    };


    this.creator = function bucketoperation_creator() {

        //console.log("pinging")
        //#debug#console.log(li);
        //#debug#console.log(that.cache)

        //just pinging so that we do not run short of buckets
        //while we have links in our mongodb cache
        //generating new buckets based on refresh interval and uniformity
        if (!check.assigned(links_store)) {
            message.get('bucket_creator_lock').release();
            return;
        }
        //console.log("INININININ");
        var hashes = {};
        var intervals = config.getConfig("recrawl_intervals");

        for (var k in message.get('distinct_fetch_intervals')) {
            //console.log(k);
            hashes[k] = {};
            hashes[k]["_id"] = ObjectId();
            hashes[k]["links"] = [];

        }

        var n_domains = _.size(links_store);

        var interval_size = _.size(message.get('distinct_fetch_intervals'));
        var completed = 0;
        var done = 0;
        //console.log(that.domain_group,"that.domain_group");
        var domains = [];
        var tmp = message.get('domain_group');

        var sub_group = tmp.splice(0, 1)[0]; //dequeue


        tmp.push(sub_group); //enqueue
        message.set('domain_group', tmp);

        domains = sub_group["domains"];
        for (var i = 0; i < domains.length; i++) {
            //#debug#console.log(i)
            (function(dd, limit) {

                var ratio = parseInt(config.getConfig("batch_size") / 100);
                var eachh = ratio * dd["priority"];
                var key = dd["_id"];
                var k = dd["fetch_interval"];
                //#debug#console.log("EACHH "+eachh);
                var pusher = that.pusher;
                //console.log(key,eachh,k);
                that.dequeue(key, eachh, k, function(l) {
                    hashes[k]["domain_group_id"] = sub_group["_id"];
                    hashes[k]["links"] = hashes[k]["links"].concat(l);
                    //console.log(hashes);
                    ++done;
                    if (done === limit) {
                        if (check.emptyObject(hashes)) {
                            message.get('bucket_creator_lock').release();
                            return;
                        }
                        pusher(hashes, function() {
                            message.get('bucket_creator_lock').release();
                        });


                    }
                });

            })(domains[i], domains.length);

        };







        return;
    };


    this.pusher = function bucketoperation_pusher(hashes, fn) {
        //console.log(JSON.stringify(hashes,null,2));
        //#debug#console.log(that)
        try {
            hashes = score.getScore(hashes);
        } catch (err) {
            console.log(err);
            fn(true);
            return;
        }
        //console.log(hashes)

        //console.log("herere 2");
        if (!check.assigned(hashes)) {
            fn(false);
            return;
        }
        var done = 0;
        var counter = _.size(hashes);
        //console.log("hashes",hashes);
        for (var key in hashes) {
            (function(key) {
                //first links are added to the db to avoid same links
                //console.log(hashes[key], "HASH KEYS");
                pool.addLinksToDB(hashes[key], key, function(numOfLinks) {
                    //uniform pool of urls are generated
                    //console.log("numOfLinks "+numOfLinks+" "+key);
                    if (!check.assigned(numOfLinks) || numOfLinks === 0) {
                        //fn(false);
                        ++done;
                        if (done === counter) {
                            fn(true);
                            return;
                        }
                        return;

                    }
                    var stamp1 = new Date().getTime();
                    var links_to_be_inserted = _.pluck(hashes[key]["links"], 'url');
                    var domain_id = hashes[key]["domain_group_id"];
                    pool.bucket_collection.insert({
                        "_id": hashes[key]["_id"],
                        "links": links_to_be_inserted,
                        "domains": domain_id,
                        "score": hashes[key]["score"],
                        "recrawlLabel": key,
                        "underProcess": false,
                        "insertedBy": config.getConfig("bot_name"),
                        "recrawlAt": stamp1,
                        "numOfLinks": numOfLinks
                    }, function bucketInsert(err, results) {
                        //console.log(arguments);
                        if (err) {
                            msg(("pool.addToPool" + err), "error");
                            //fn(false);
                            //return;
                        } else {
                            msg(("Updated bucket " + results["ops"][0]["_id"]), "success");
                            bot_obj.updateStats("createdBuckets", 1);
                            //fn(true);
                            //return;
                        }
                        ++done;
                        if (done === counter) {
                            fn(true);
                            return;
                        }


                    });
                });
            })(key);


        }


    };




    bucket_timer = setInterval(function() {
        if (!message.get('webappOnly') && message.get('bucket_creator_lock').enter()) {

            that.creator();
        }

    }, 10000);
    message.get('my_timers').push(bucket_timer);

    function msg() {
        if (!check.assigned(message.get('log'))) {
            console.log(arguments[0]);
            return;
        }
        message.get('log').put(arguments[0], arguments[1], __filename.split('/').pop(), arguments.callee.caller.name.toString());
    }


};


module.exports = Bucket;