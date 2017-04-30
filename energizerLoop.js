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
var containers = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_CONTAINER){
			return true; }
		}
	})
var extensions = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_EXTENSION){
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
	for(var extension in extensions){
		// Find an extension with capacity.
		if(extensions[extension].energy < extensions[extension].energyCapacity){
			var dropOffEnergizer = extensions[extension];
			return dropOffEnergizer;
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
	if(spawn.energy < spawn.energyCapacity && dropOffEnergizer == null){ 
		var dropOffEnergizer = spawn; 
		return dropOffEnergizer;
	}
	else if(emptyTurret != null && emptyTurret.energy < emptyTurret.energyCapacity){
		var dropOffEnergizer = emptyTurret;
		return dropOffEnergizer;
	}
	else{ 
		var dropOffEnergizer = control; // Fill up control if spawn is not available.
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

function energyAcquire(creep){
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
	if(creep.memory.deliver == true){ 
		energyDeliver(creep); 
	}
	else{ // Otherwise, go pick up more energy. 
		energyAcquire(creep); 
	}
}
};