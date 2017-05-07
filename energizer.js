/**
 * These creatures will prioritize Extensions, Spawns, Towers, and then Storage to deliver energy.
 * @param creep
 */
var energizer = {
	parts: [
		[MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY]
	],

	action: function (){
		var creep = this.creep;
		
		// Look for open tasks in no particular order yet. Building as array to be concatenated.
		var extensionList = room1.find(FIND_STRUCTURES, 
			{ filter: function(object){
				if(object.structureType == STRUCTURE_EXTENSION && object.energy < 50){
					return true; }
				}
			});
		
		var spawnList = room1.find(FIND_MY_SPAWNS);
		
		var turretList = room1.find(FIND_STRUCTURES, 
			{ filter: function(object){
				if(object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity){
					return true; }
				}
			});
			
		// I'm hoping it acts like a reverse stack to pop off individual task object references in priority L->R.
		var deliveryTasks = {extensions: extensionList, spawns: spawnList, turrets: turretList};
		
		// Get rid of undefined tasks thanks to object.delete which appears to be garbage collected??
		for(var i in deliveryTasks){
		    for(var j in deliveryTasks[i])
			if(deliveryTasks[i][j] === null || deliveryTasks[i][j] === undefined){
				delete deliveryTasks[i][j]
			}
		}
		
		if(creep.memory.deliver == undefined || creep.memory.deliver == null){
		    for(var i in deliveryTasks){
		        for(var j in deliveryTasks[i]){
		            if(deliveryTasks[i][j].memory == undefined || deliveryTasks[i][j].memory == null){
		                for(var k in Game.creeps){
		                    if(Game.getObjectById(Game.creeps[k].memory.deliver) === deliveryTasks[i][j]){
		                        deliveryTasks[i][j].memory = creep.id;
		                    }
		                }
		            }
		        }
		    }
		    for(var i in deliveryTasks){
		        for(var j in deliveryTasks[i]){
		            if(deliveryTasks[i][j].memory == undefined || deliveryTasks[i][j].memory == null){
		                console.log("Available source found for energizer: "+ creep + " " + deliveryTasks[i][j]);
		                creep.memory.deliver = deliveryTasks[i][j].id;
		                deliveryTasks[i][j].memory = creep.id;
		            }
		        }
	        }
		}
		
		// Needs energy to deliver.
		if(_.sum(creep.carry) == 0){
			var storages = room1.find(FIND_STRUCTURES, 
				{ filter: function(object){
					if(object.structureType == STRUCTURE_CONTAINER || STRUCTURE_STORAGE){
						return true; }
					}
				});
			var refill = bestContainer(storages);
			if(creep.withdraw(refill, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
				creep.moveTo(refill);
			}
			else{
				creep.withdraw(refill, RESOURCE_ENERGY);
				console.log("Energizer: " + creep.name + " restocking from highest container " + refill + ".")
			}
		}
		
		creep.moveTo(Game.getObjectById(creep.memory.deliver));
		var success = creep.transfer(Game.getObjectById(creep.memory.deliver),RESOURCE_ENERGY));
		if(success === 0){
		    creep.memory.deliver = null;
		}
		else{
		    console.log('test');
		}
	},
	
	beforeAge : function(){ 
	    var creep = this.creep;
	    
		var extensionList = room1.find(FIND_STRUCTURES, 
			{ filter: function(object){
				if(object.structureType == STRUCTURE_EXTENSION){
					return true; }
				}
			});
		
		var spawnList = room1.find(FIND_MY_SPAWNS);
		
		var turretList = room1.find(FIND_STRUCTURES, 
			{ filter: function(object){
				if(object.structureType == STRUCTURE_TOWER){
					return true; }
				}
			});
		
		// An object of arrays will need two for() loops.
		var possibleDeliveries = {extensions: extensionList, spawns: spawnList, turrets: turretList};
		
	    for(var i in possibleDeliveries){
	        for(var j in possibleDelivers[i]){
				if(possibleDeliveries[i][j].memory != undefined && possibleDeliveries[i][j].memory == creep.id){
					creep.memory.deliver = null;
					possibleDeliveries[i][j].memory = null;
				}
			}
	    }
	},
	
	cleanObject : function(object){
		for(var i in object){
			if(object[i] === null || object[i] === undefined){
				delete object[i]
			}
		}
	},
	
	bestContainer : function(list){
		var i;
		// Max store.
		var a = 0;
    
		for (i = 0; i < list.length; i++){
			// Get store count.
			var b = _.sum(list[i].store)
			if(a > b){
				// keep a
			}
			else{
				// keep b and list item
				a = b
				var fullestContainer = list[i]
			}
		}
		// Return highest store.
		return fullestContainer;
	}
};

module.exports = energizer;