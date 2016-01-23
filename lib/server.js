var parent_dir=process.getAbsolutePath(__dirname);
var log=require(parent_dir+"/lib/logger.js");
var qs = require('querystring');
var d = new Date();
var n = d.getTime();
var url=require('url');
function init(pool,cluster){
  var static = require('node-static');
 
  var fileServer = new static.Server(parent_dir+'/server');
  var stats=require(parent_dir+'/lib/stats.js')(pool,cluster);
  var server = require('http').createServer(function (request, response) {
  var urlparts=url.parse(request.url.toString(),true);
  if (urlparts.path.indexOf("/ask")>=0) {
    if(request.method==="POST"){
      var body = "";
      request.on('data', function (chunk) {
        body += chunk;
      });
      request.on('end', function () {
        var j=qs.parse(body);
        var js=JSON.parse(j["data"]);
        var bot_name=j["bot_name"];
        
        if(urlparts.query["q"]==="put-config"){
            stats.setConfig(bot_name,js,function(err,results){
                        response.write(JSON.stringify(results));
                        response.end();
            });          
        }
        else if(urlparts.query["q"]==="put-seed"){
          stats.setSeed(js,function(err,results){
                response.write(JSON.stringify(results));
                response.end();
          });
        }

      });      
    }

      switch(urlparts.query["q"]){
        case "main-stats":
                 stats.crawlStats(function(dic){
                    response.write(JSON.stringify(dic));
                    response.end();
                });
          break;
        case "active-bots":
                stats.activeBots(function(dic){
                  response.write(JSON.stringify(dic));
                  response.end(); 
                });
                break;
        case "read-log":
            var type=urlparts["query"]["type"];
            var n=urlparts['query']['n'];
            var bot_name=urlparts['query']['bot_name'];
              stats.readLog(bot_name,type,parseInt(n),function(st,data){
              response.write(data);
              response.end();
            });
            break;
        case "readTerminal":
            var bot_name=urlparts['query']['bot_name'];
              stats.readTerminal(bot_name,function(st,data){
              response.write(data);
              response.end();
            });
            break;
        case "cluster-info":
            stats.clusterInfo(function(err,results){
                response.write(JSON.stringify(results));
                response.end();
            });
            break;
        case "get-config":
        var bot_name=urlparts['query']['bot_name'];
            stats.getConfig(bot_name,function(err,results){
                response.write(JSON.stringify(results));
                response.end();
            });
            break;
         case "get-seed":
            stats.getSeed(function(err,results){
                response.write(JSON.stringify(results));
                response.end();
            });
            break;
        case "get-failed-pages":
            stats.getFailedPages(urlparts['query']['bot_name'],parseInt(urlparts['query']['i']),parseInt(urlparts['query']['n']),urlparts['query']['sort'],parseInt(urlparts['query']['sort_type']),function(err,results,count){
                res={results:results,page_count:count};
                response.write(JSON.stringify(res));
                response.end();
            });
            break;
        case "get-crawled-pages":
            stats.getCrawledPages(urlparts['query']['bot_name'],parseInt(urlparts['query']['i']),parseInt(urlparts['query']['n']),urlparts['query']['sort'],parseInt(urlparts['query']['sort_type']),function(err,results,count){
                res={results:results,page_count:count};
                //console.log(count)
                response.write(JSON.stringify(res));
                response.end();
            });
            break;
        case "get-total-buckets":
            stats.getTotalBuckets(urlparts['query']['bot_name'],parseInt(urlparts['query']['i']),parseInt(urlparts['query']['n']),urlparts['query']['sort'],parseInt(urlparts['query']['sort_type']),function(err,results,count){
                res={results:results,page_count:count};
                response.write(JSON.stringify(res));
                response.end();
            });
            break;
        case "get-processed-buckets":
            stats.getProcessedBuckets(urlparts['query']['bot_name'],parseInt(urlparts['query']['i']),parseInt(urlparts['query']['n']),urlparts['query']['sort'],parseInt(urlparts['query']['sort_type']),function(err,results,count){
                res={results:results,page_count:count};
                response.write(JSON.stringify(res));
                response.end();
            });
            break;
        case "get-page":
            stats.getPage(urlparts['query']['url'],function(err,results){
                response.write(JSON.stringify(results));
                response.end();
            });
            break;
        case "search":
        //console.log(stats);
            stats.search(urlparts['query']['text'],urlparts["query"]["i"],function(err,results){
                response.write(JSON.stringify(results));
                response.end();
            });
        break;
      };

       


  }
  else{
    //important method do not remove
    request.addListener('end', function () {
          fileServer.serve(request, response);
      }).resume();
   }
});

  server.listen(2020);
  server.on("listening",function(){
    log.put("Server is listening","success");
  });
  server.on("error",function(e){
  if(e.code==="EADDRINUSE"){
    log.put("Web app occupied maybe an instance is already running ","error");
  }

});
  
}

exports.init=init;