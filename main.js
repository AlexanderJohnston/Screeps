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

// Prepare the creeps.
var energizer = require('energizer');
var fighter = require('fighter');
var transporter = require ('transporter');
var harvester = require ('harvester');
var builder = require ('builder');
	
// Prepare the creep arrays.
var harvesters = harvester.init();
var builders = builder.init();
var transporters = transporter.init();
var energizers = energizer.init();
var fighters = fighter.init();
var transporters = transporter.init();


// # HARVESTER # Harvests energy as fast as possible without moving.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var currentCreep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a harvester.
	if(containsObject(currentCreep,harvesters)){
		// Define sources and find the best node.
		var sources = room1.find(FIND_SOURCES_ACTIVE)
		var bestNode = bestContainer(sources);
		 //If the creep isn't next to the node, then move it.
		 if(currentCreep.pos.getRangeTo(bestNode.pos)>1){
			currentCreep.moveTo(bestNode);
		}
		else{
			currentCreep.harvest(bestNode);
		}
	}
}
// # TRANSPORTER # Upgrades the controller and fills containers.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var currentCreep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is a transporter.
	if(containsObject(currentCreep,transporters)){
		// Save the closest container.
		for(var container in containers){
		    // Find an container with capacity.
			if(_.sum(containers[container].store) < containers[container].storeCapacity){
				var dropOff = containers[container];
				break;
			}
			else{
				var dropOff = control; 
			}
		}
		// Check to see if the worker is full of energy.
		if(_.sum(currentCreep.carry)==currentCreep.carryCapacity){
			// Return home to deliver.
			currentCreep.memory.deliver = true;
		}
		// While delivery is enabled, go home to turn it in.
		if(currentCreep.memory.deliver == true){
			// Check to see if creep is within range of control.
			if(currentCreep.transfer(dropOff, RESOURCE_ENERGY, _.sum(currentCreep.carry)) == ERR_NOT_IN_RANGE){
				currentCreep.moveTo(dropOff);
			}
			else if(currentCreep.transfer(dropOff, RESOURCE_ENERGY, _.sum(currentCreep.carry)) == ERR_FULL){
				currentCreep.transfer(dropOff, RESOURCE_ENERGY, 1);
			}
			else{ // Creep is within range and can transfer energy.
				currentCreep.transfer(dropOff, RESOURCE_ENERGY, _.sum(currentCreep.carry));
				console.log("Transporter: " + currentCreep.name + " POWERING " + dropOff + " in progress.")
			}
			// Once the creep has emptied out their energy, disable delivery.
			if(_.sum(currentCreep.carry)==0){
					currentCreep.memory.deliver = false;
				}
				continue; // Keep on delivering until empty.
		}
		// This creep wasn't full, so it's going to find more energy.
		else{
			var droppedEnergy = currentCreep.pos.findClosestByPath(FIND_DROPPED_ENERGY)
			if(currentCreep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE){
				currentCreep.moveTo(droppedEnergy);
			}
			else{
				currentCreep.pickup(droppedEnergy);
				console.log("Transporter: " + currentCreep.name + " PICKING UP " + droppedEnergy + ".")
			}
		}
	}
}
// # ENERGIZER # Refills the spawn point and extensions.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var currentCreep = Game.creeps[selectedCreep];
	// Check to ensure that the creep is an energizer.
	if(containsObject(currentCreep,energizers)){
		// Save an extension which needs energy.
		for(var extension in extensions){
		    // Find an extension with capacity.
			if(extensions[extension].energy < extensions[extension].energyCapacity){
				var dropOffEnergizer = extensions[extension];
				break;
			}
			else{
			    // Fill up spawn if no extensions are available.
				if(spawn.energy < spawn.energyCapacity){ var dropOffEnergizer = spawn; }
				else{ var dropOffEnergizer = control; } // Fill up control if spawn is not available.
			}
		}
		// Check to see if the worker is full of energy.
		if(_.sum(currentCreep.carry)==currentCreep.carryCapacity){
			// Return home to deliver.
			currentCreep.memory.deliver = true;
		}
		// While delivery is enabled, go home to turn it in.
		if(currentCreep.memory.deliver == true){
			// Check to see if creep is within range of control.
			if(currentCreep.transfer(dropOffEnergizer, RESOURCE_ENERGY, _.sum(currentCreep.carry)) == ERR_NOT_IN_RANGE){
				currentCreep.moveTo(dropOffEnergizer);
			}
			else{ // Creep is within range and can transfer energy.
				currentCreep.transfer(dropOffEnergizer, RESOURCE_ENERGY, dropOffEnergizer.carryCapacity);
				console.log("Energizer: " + currentCreep.name + " POWERING " + dropOffEnergizer + " in progress.")
			}
			// Once the creep has emptied out their energy, disable delivery.
			if(_.sum(currentCreep.carry)==0){
					currentCreep.memory.deliver = false;
				}
				continue; // Keep on delivering until empty.
		}
		// This creep wasn't full, so it's going to find more energy.
		else{
		    var selectedContainer = bestContainer(containers); // Selects the highest energy container.
		    console.log("Energizer: " + currentCreep.name + " restocking from highest container " + selectedContainer + ".")
			if(currentCreep.withdraw(selectedContainer, RESOURCE_ENERGY, (currentCreep.carryCapacity - _.sum(currentCreep.carry))) == ERR_NOT_IN_RANGE){
				currentCreep.moveTo(selectedContainer);
			}
			else{
				currentCreep.withdraw(selectedContainer, RESOURCE_ENERGY, currentCreep.carryCapacity - _.sum(currentCreep.carry));
			}
		}
	}
}
// # BUILDER # Builds construction sites and repairs structures.
// Get a list of all creeps available.
for(var selectedCreep in Game.creeps){
	// Save the definition to our selected creep.
	var currentCreep = Game.creeps[selectedCreep];
	// Load our module.
	var buildLoop = require('buildLoop');
	// Check to ensure that the creep is a builder.
	if(containsObject(currentCreep,builders)){
		// Save the dropoff point for energy so the builder can retrieve it.
		var dropOffBuilder = bestContainer(containers); // Selects the highest energy container.
		// Get the closest construction site.
		var constructSite = currentCreep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		// Initialize builder functions.
		buildLoop.init(currentCreep,dropOffBuilder,constructSite);
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
