global.room1 = Game.rooms['W2N5'];
global.control = room1.controller;
global.spawn = Game.spawns.Pixelation;
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
var storages = room1.find(FIND_STRUCTURES, {
	filter: function(object){
        if(object.structureType == STRUCTURE_STORAGE){
	        return true;
	    }
	}
}); 

// Load the creep modules.
var energizer = require('energizer');
var fighter = require('fighter');
var transporter = require ('transporter');
var harvester = require ('harvester');
var builder = require ('builder');
var upgrader = require('upgrader');
	
// Spawn the creeps, set their roles, and return an array of all available creeps in that role.
var harvesters = harvester.init();
var builders = builder.init();
var transporters = transporter.init();
var energizers = energizer.init();
var fighters = fighter.init();
var upgraders = upgrader.init();

// WHY THE FUCK AM I UNDER ATTACK
var towers = room1.find(FIND_STRUCTURES,
    // FIND MY TOWERS RIGHT NOW
 { filter: function(object){
  if(object.structureType == STRUCTURE_TOWER){
   return true; }
  }
 })
// FIGURE OUT WHO THE FUCK IS ATTACKING ME
var enemies = room1.find(FIND_HOSTILE_CREEPS)
for(var tower in towers){
    // FIRE THE MISSLES!!!! FIRE THEM DO NOT STOP!!!
    towers[tower].attack(enemies[0]);
}

// # Fighter # Harvests energy as fast as possible without moving.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a harvester.
	if(containsObject(creep,fighters)){
		var fightLoop = require('fightLoop');
		fightLoop.init(creep);
	}
}
// # HARVESTER # Harvests energy as fast as possible without moving.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a harvester.
	if(containsObject(creep,harvesters)){
		// Define sources and find the best node.
		var sources = room1.find(FIND_SOURCES_ACTIVE)
		var bestNode = bestContainer(sources);
		 //If the creep isn't next to the node, then move it.
		 if(bestNode != null && creep.pos.getRangeTo(bestNode.pos)>1){
			creep.moveTo(bestNode);
		}
		else{
			creep.harvest(bestNode);
		}
	}
}
// # TRANSPORTER # Fills containers and then upgrades the controller.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a transporter.
	if(containsObject(creep,transporters)){
		// Pull in the transport module.
		var transportLoop = require('transportLoop');
		// Send the creep into the transportation loop.
		transportLoop.init(creep);
	}
}
// # UPGRADER # Upgrades the controller.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a transporter.
	if(containsObject(creep,upgraders)){
		// Pull in the transport module.
		var upgradeLoop = require('upgraderLoop');
		// Send the creep into the transportation loop.
		upgradeLoop.init(creep);
	}
}
// # ENERGIZER # Refills the spawn point and extensions.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is an energizer.
	if(containsObject(creep,energizers)){
		// Pull in the energizer module.
		var energizerLoop = require('energizerLoop');
		// Send the creep into the energizer loop.
		energizerLoop.init(creep);
	}
}
// # BUILDER # Builds construction sites and repairs structures.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var creep = Game.creeps[selectedCreep];
	// Load our module.
	var buildLoop = require('buildLoop');
	// Check to ensure that the creep is a builder.
	if(containsObject(creep,builders)){
		// Save the dropoff point for energy so the builder can retrieve it.
		var dropOffBuilder = storages[0];
		// Get the closest construction site.
		var constructSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		// Initialize builder functions.
		buildLoop.init(creep,dropOffBuilder,constructSite);
	}
}

// Function to search arrays.
function containsObject(obj, list){
	var i;
	for (i = 0; i < list.length; i++){
		if(list[i] === obj){
			return true;
		}
	}
	
	return false;
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
