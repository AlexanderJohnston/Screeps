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

function findEmptyExtension(creep){
// Save an extension which needs energy.
	for(var extension in extensions){
		// Find an extension with capacity.
		if(extensions[extension].energy < extensions[extension].energyCapacity){
			var dropOffEnergizer = extensions[extension];
			return dropOffEnergizer;
		}
		else{
			// Fill up spawn if no extensions are available.
			if(spawn.energy < spawn.energyCapacity){ 
				var dropOffEnergizer = spawn; 
				return dropOffEnergizer;
			}
			else{ 
				var dropOffEnergizer = control; // Fill up control if spawn is not available.
				return dropOffEnergizer 
			} 
		}
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
	if(creep.transfer(dropOffEnergizer, RESOURCE_ENERGY, _.sum(creep.carry)) == ERR_NOT_IN_RANGE){
		creep.moveTo(dropOffEnergizer);
	}
	else{ // Creep is within range and can transfer energy.
		creep.transfer(dropOffEnergizer, RESOURCE_ENERGY, dropOffEnergizer.carryCapacity);
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
	if(creep.withdraw(selectedContainer, RESOURCE_ENERGY, (creep.carryCapacity - _.sum(creep.carry))) == ERR_NOT_IN_RANGE){
		creep.moveTo(selectedContainer);
	}
	else{
		creep.withdraw(selectedContainer, RESOURCE_ENERGY, creep.carryCapacity - _.sum(creep.carry));
	}
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