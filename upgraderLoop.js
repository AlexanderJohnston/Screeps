/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvestLoop');
 * mod.thing == 'a thing'; // true
 */

var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
var containers = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_STORAGE){
			return true; }
		}
	})
 
function findEmptyContainer(creep){
	var dropOff = control; 
	return dropOff;
}

function energyFull(creep){
	// Check to see if the worker is full of energy.
	if(_.sum(creep.carry)==creep.carryCapacity){
		// Return home to deliver.
		creep.memory.deliver = true;
	}
}
function energyDeliver(creep){
	// Find an empty container.
	var dropOff = findEmptyContainer(creep);
	// Check to see if creep is within range of control.
	if(creep.transfer(dropOff, RESOURCE_ENERGY, _.sum(creep.carry)) == ERR_NOT_IN_RANGE){
		creep.moveTo(dropOff);
	}
	else if(creep.transfer(dropOff, RESOURCE_ENERGY, _.sum(creep.carry)) == ERR_FULL){
		creep.transfer(dropOff, RESOURCE_ENERGY, 1);
	}
	else{ // Creep is within range and can transfer energy.
		creep.transfer(dropOff, RESOURCE_ENERGY, _.sum(creep.carry));
		console.log("Upgrader: " + creep.name + " POWERING " + dropOff + " in progress.")
	}
	// Once the creep has emptied out their energy, disable delivery.
	if(_.sum(creep.carry)==0){
		creep.memory.deliver = false;
	}
}

function energyAcquire(creep){// This creep wasn't full, so it's going to find more energy.
	var selectedContainer = containers[0]; // Selects the highest energy container.
	console.log("Energizer: " + creep.name + " restocking from highest container " + selectedContainer + ".")
	if(creep.withdraw(selectedContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		creep.moveTo(selectedContainer);
	}
	else{
		creep.withdraw(selectedContainer, RESOURCE_ENERGY);
	}
 }
 
module.exports = {

init(creep){
    if(_.sum(containers[0].store)>=50000){
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
}

};