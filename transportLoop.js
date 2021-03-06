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
		if(object.structureType == STRUCTURE_CONTAINER){
			return true; }
		}
	})
 
 function findEmptyContainer(creep){
	// Save the closest container.
	var dropOff = null
	for(var container in containers){
		// Find an container with capacity.
		if(_.sum(containers[container].store) < containers[container].storeCapacity){
			dropOff = containers[container];
			return dropOff;
		}
	}
	if(dropOff == null || dropOff == undefined){ // No containers available, so upgrade control.
	    var dropOff = room1.find(FIND_STRUCTURES, { 
	        filter : function(object){
	            if(object.structureType == STRUCTURE_STORAGE){
	                return true; 
	                
	            }
	        }
	    }); 
	    return dropOff[0];
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
	// Find an empty container.
	var dropOff = findEmptyContainer(creep);
	// Check to see if creep is within range of control.
	if(creep.transfer(dropOff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		creep.moveTo(dropOff);
	}
	else{ // Creep is within range and can transfer energy.
		creep.transfer(dropOff, RESOURCE_ENERGY);
		console.log("Transporter: " + creep.name + " POWERING " + dropOff + " in progress.")
	}
	// Once the creep has emptied out their energy, disable delivery.
	if(_.sum(creep.carry)==0){
		creep.memory.deliver = false;
	}
}

function energyAcquire(creep){// This creep wasn't full, so it's going to find more energy.
	var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY)
	if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE){
		creep.moveTo(droppedEnergy);
	}
	else{
		creep.pickup(droppedEnergy);
		console.log("Transporter: " + creep.name + " PICKING UP " + droppedEnergy + ".");
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