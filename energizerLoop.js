/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('energizerLoop');
 * mod.thing == 'a thing'; // true
 */

var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
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

function findEmptyExtension(creep){
// Save an extension which needs energy.
    if(extensions != null && extensions != undefined){
        for(var extension in extensions){
		// Find an extension with capacity.
		    if(extensions[extension].energy < extensions[extension].energyCapacity){
			    var dropOffEnergizer = extensions[extension];
			    var selectedExtension = extensions[extension];
			    creep.memory.eFlag = 0;
			    return dropOffEnergizer;
		    }
	    }
    }
// Save a turret which needs energy.
    for(var turret in turrets){
		// Find an extension with capacity.
		if(turrets[turret].energy < turrets[turret].energyCapacity){
			var emptyTurret = turrets[turret];
		}
	}
	// Fill up spawn if no extensions are available.
	if(spawn.energy < spawn.energyCapacity && selectedExtension == null){ 
		var dropOffEnergizer = spawn;
		creep.memory.eFlag = 0;
		return dropOffEnergizer;
	}
	else if(emptyTurret != null && emptyTurret.energy < emptyTurret.energyCapacity && selectedExtension == null && spawn.energy == spawn.energyCapacity){
		var dropOffEnergizer = emptyTurret;
		creep.memory.eFlag = 0;
		return dropOffEnergizer;
	}
	else if(emptyTurret == undefined && selectedExtension == null && spawn.energy == spawn.energyCapacity){ 
		var dropOffEnergizer = room1.storage // Fill up storage if spawn is full.
		creep.memory.eFlag = 1;
		return dropOffEnergizer;
	}
}

function energyFull(creep){
	// Check to see if the worker is full of energy.
	if(_.sum(creep.carry)==creep.carryCapacity){
		// Return home to deliver.
		creep.memory.deliver = true;
	}
}

function energyDeliver(creep){
	// Find an empty extension.
	var dropOffEnergizer = findEmptyExtension(creep);
	if (dropOffEnergizer != null && creep.memory.deliver == true){
	    // Check to see if creep is within range of control.
	    if(creep.transfer(dropOffEnergizer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	    	creep.moveTo(dropOffEnergizer);
	    }
	    else{ // Creep is within range and can transfer energy.
    		creep.transfer(dropOffEnergizer, RESOURCE_ENERGY);
	    	console.log("Energizer: " + creep.name + " POWERING " + dropOffEnergizer + " in progress.")
	    }
	    // Once the creep has emptied out their energy, disable delivery.
	    if(_.sum(creep.carry)==0){
	    	creep.memory.deliver = false;
	   	}
	}
}

function energyAcquire(creep){
	var selectedContainer = bestContainer(storages); // Selects the highest energy container.
	if(creep.withdraw(selectedContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		creep.moveTo(selectedContainer);
	}
	else{
		creep.withdraw(selectedContainer, RESOURCE_ENERGY);
		console.log("Energizer: " + creep.name + " restocking from highest container " + selectedContainer + ".")
	}
 }
 
 function energyAcquireContainerOnly(creep){
	var selectedContainer = bestContainer(containers); // Selects the highest energy container.
	console.log("Energizer: " + creep.name + " restocking from highest container " + selectedContainer + ".")
	if(creep.withdraw(selectedContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		creep.moveTo(selectedContainer);
	}
	else{
		creep.withdraw(selectedContainer, RESOURCE_ENERGY);
	}
 }
 
 // Function to determine highest quantity container.
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
 
module.exports = {
init(creep){
	// Check to see if energy is full.
	energyFull(creep);
	// While delivery is enabled, go home to turn it in.
	energyDeliver(creep);
	if(creep.memory.deliver != true){
    	if(creep.memory.eFlag == 0 || creep.memory.eFlag == undefined){
		       energyAcquire(creep);
        }
	    else{
	        energyAcquireContainerOnly(creep);
	    }
	}
}
};