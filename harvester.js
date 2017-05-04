/**
 * These are simple creatures, they just find an active source and harvest it
 * @param creep
 */
var harvester = {
	parts: [
		[MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK]
	],

	action: function (){
		var creep = this.creep;
		var sources = room1.find(FIND_SOURCES);
		//creep.memory.sources = null;
		if(creep.memory.sources == undefined || creep.memory.sources == null){
		    for(var i in sources){
		        //sources[i].memory = null;
		        if(sources[i].memory == undefined || sources[i].memory == null){
		            for(var k in Game.creeps){
		                if(Game.getObjectById(Game.creeps[k].memory.sources) === sources[i]){
		                    sources[i].memory = creep.id;
		                }
		            }
		        }
		    }
		    for(var i in sources){
		        if(sources[i].memory == undefined || sources[i].memory == null){
		            console.log("Available source found for harvester: "+ creep + " " + sources[i]);
		            creep.memory.sources = sources[i].id;
		            sources[i].memory = creep.id;
		        }
		    }
		}
		for(var i in sources){
		        //sources[i].memory = null;
		        if(sources[i].memory == undefined || sources[i].memory == null){
		            if(Game.getObjectById(creep.memory.sources) === sources[i]){
		                sources[i].memory = creep.id;
		            }
		            
		        }
		    }
		creep.moveTo(Game.getObjectById(creep.memory.sources));
		creep.harvest(Game.getObjectById(creep.memory.sources));
	},
	
	beforeAge : function(){ 
	    var creep = this.creep;
	    var sources = room1.find(FIND_SOURCES);
	    for(var i in sources){
	        if(sources[i].memory != undefined && sources[i].memory == creep.id){
	            creep.memory.sources = null;
	            sources[i].memory = null;
	        }
	    }
	}
};

module.exports = harvester;