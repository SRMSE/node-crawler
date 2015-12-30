var log=require(__dirname+"/lib/logger.js");
var config=require(__dirname+"/lib/config-reloader.js");
var cluster_info;
var request=require("request");
var url=require('url');
var sf = require('slice-file');
var pool;
var port_occupied=false;
var loopback_token;
var server = require('http').createServer(function (request, response) {
	var urlparts=url.parse(request.url.toString(),true);
	var js=JSON.parse(urlparts.query.msg);
	switch(Object.keys(js)[0]){

		case "readLog":
				if(js["readLog"]["type"]==="head"){
					var words=sf(__dirname+"/log/test.log");
					words.slice(0,js["readLog"]["n"]).pipe(response);
				}
				else if(js['readLog']['type']==="tail"){
					var words=sf(__dirname+"/log/test.log");
					words.slice(js["readLog"]["n"]*(-1)).pipe(response);
				}
			break;
		case "command":
			if(js["command"]==="exit"){
				console.log(js);
				var dic={"output":"ack"};
				if(loopback_token===js["loopback_token"]){
					//calling same bot
					dic["loopback"]=true;
				}
				
				response.write(JSON.stringify(dic));
				response.end();
				if(loopback_token!==js["loopback_token"]){
					process.nextTick(function(){
						process.emit('grace_exit');
					});	
				}
				
				
			}
			else if(js["command"]==="isActive"){
				var dic={"output":true};
				response.write(JSON.stringify(dic));
				response.end();
			}
			break;
	};


});
var app={
	"send":function(to,msg,fn){
		if(cluster_info[to]){
			//bot exists
			var host_name="http://"+cluster_info[to]["config"]["network_host"]+":"+cluster_info[to]["config"]["cluster_port"]+"/?msg="+JSON.stringify(msg);
			console.log(host_name);
			request(host_name,function(err,response,html){
				
				if(!err){
					var js=html;
					fn(true,js);
				}
				else{
					fn(false,null);
				}
			});
		}
		else{
			fn(false,null);
		}
	},
	"removeBot":function(bot_name){
		app.closeBot(bot_name,function(closed){
		
		});
	},
	"sendTo":function(host,port,msg,fn){
		var host_name="http://"+host+":"+port+"/?msg="+JSON.stringify(msg);
			request(host_name,function(err,response,html){
				if(!err){
					var js=response.body;
					fn(true,js);
				}
				else{
					fn(false,null);
				}
			});
	},
	"getBotConfig":function(bot_name,fn){
		pool.bot_collection.findOne({"_id":bot_name},function(err,results){
			
			if(!err){
				fn(results.config);
			}
			else{
				fn(null);
			}
		});
	},
	"closeBot":function(bot_name,fn){
		app.getBotConfig(bot_name,function(c){
			//get the config for the same bot
			loopback_token=parseInt(Math.random()*100000)+""+new Date().getTime();
			app.sendTo(c.network_host,c.cluster_port,{"command":"exit","loopback_token":loopback_token},function(status,results){
						var js=JSON.parse(results);
						console.log(js);
						if(js["output"]==="ack" && js["loopback"]){
							//the other bot was on the same system and was not shut gracefully
							console.log("tilakksks");
							process.bot.stopBot(function(st){
									if(st){
										log.put('The bot with same bot_name was killed gracefully','success');
						
										fn(true);
										return;
									}
									else{
										log.put("Unable to kill the other bot same bot_name. Kill manually",'error');
										fn(false);
										return;
									}
							});
						}
						else if(js["output"]==="ack" && !js["loopback"]){
							//this case is for bots running on other systems
							//or if on same systems both are alive

							//ack means the other bot has got your command
							setTimeout(function(){
								//waiting enough time for the other bot to get killed
									app.sendTo(c.network_host,c.cluster_port,{"command":"isActive"},function(status1,results1){
											console.log("status   ! "+status);
											if(!status || port_occupied){
												//no response from other bot this means it is closed
												process.bot.stopBot(function(st){
													if(st){
														log.put('The bot with same bot_name was killed gracefully','success');
														if(port_occupied){
															 server.listen(config.getConfig("cluster_port"));
															  server.on("listening",function(){
															    log.put("Server is listening Joining the cluster","success");
															    fn(true);
															  });
															    server.on("error",function(e){
															    	port_occupied=true;
																  if(e.code==="EADDRINUSE"){
																    log.put("cluster client occupied maybe an instance is already running ","error");
																  }
																  fn(false);

																});
														}
														fn(true);
													}
													else{
														log.put("Unable to kill the other bot same bot_name. Kill manually",'error');
														fn(false);
													}
												});
											}
											else{
												log.put("Unable to kill the other bot same bot_name. Kill manually",'error');
												fn(false);
											}
										});
							},10000);
							
						}
						else{
							log.put("Unable to kill the other bot same bot_name. Kill manually",'error');
							fn(false);
						}

					});


		});
	}

};

exports.init=function(p,fn){
	//start the http server
	pool=p;
	var stats=new require(__dirname+'/stats.js')(pool);
	stats.activeBots(function(results){
		log.put("Obtained cluster info ","success");
		cluster_info={};
		for (var i = 0; i < results[0].length; i++) {
			cluster_info[results[0][i]["_id"]]=results[0][i];
		};
		log.put("Joining the cluster ","info");
		  server.listen(config.getConfig('cluster_port'));
		  server.on("listening",function(){
		    log.put("Server is listening Joining the cluster","success");
		    fn(app);
		  });
		    server.on("error",function(e){
		    	port_occupied=true;
			  if(e.code==="EADDRINUSE"){
			    log.put("cluster client occupied maybe an instance is already running ","error");
			  }
			  fn(app);

			});
	});
	
};