/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('energizer');
 * mod.thing == 'a thing'; // true
 */
 
var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
 
function spawnCreeps(){
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer1') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer1');
	}
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer11') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer11');
	}
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer2') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer2');
	}
	// Check to see if pix7 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer3') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer3');
	}
	// Check to see if pix8 is alive or not, then create him.
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer4') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer4');
	}
}
 

module.exports = {

	init(){
	    var unitArray = []; // Store units for return.
		spawnCreeps();
		unitArray = setRoles(unitArray);
		return unitArray;
	}
};



var storages = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_CONTAINER || STRUCTURE_STORAGE){
			return true; }
		}
	})
var containers = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_CONTAINER){
			return true; }
		}
	})
var extensions = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_EXTENSION && object.energy < 50){
			return true; }
		}
	})
var turrets = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_TOWER){
			return true; }
		}
	})

/**
 * These creatures will prioritize Extensions, Spawns, Towers, and then Storage to deliver energy.
 * @param creep
 */
var energizer = {
	parts: [
		[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]
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
			if(deliveryTasks[i] === null || deliveryTasks[i] === undefined){
				delete deliveryTasks[i]
			}
		}
		
		if(creep.memory.deliver == undefined || creep.memory.deliver == null){
		    for(var i in delieveryTasks){
		        if(deliveryTasks[i].memory == undefined || deliveryTasks[i].memory == null){
		            console.log("Available source found for energizer: "+ creep + " " + deliveryTasks[i]);
		            creep.memory.deliver = deliveryTasks[i].id;
		            deliveryTasks[i].memory = creep.id;
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
		creep.transfer(Game.getObjectById(creep.memory.deliver));
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
	
	function bestContainer(list){
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

module.exports = harvester;