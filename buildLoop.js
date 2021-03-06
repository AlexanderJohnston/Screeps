/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder');
 * mod.thing == 'a thing'; // true
 */
 
 var room1 = Game.rooms['W2N5'];
 var spawn = Game.spawns.Pixelation;
 
function refillEnergy(creep, energyStore){
        // Check to see if builder is within range for withdrawal.
        if(creep.withdraw(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(energyStore);
		}
		else{
			creep.withdraw(energyStore, RESOURCE_ENERGY);
			console.log("Builder: " + creep.name + " WITHDRAWING from highest container " + energyStore + " for REPAIR.");
			}
    }

function construction(creep, constructSite){
    if(creep.build(constructSite)==ERR_NOT_IN_RANGE){
	    creep.moveTo(constructSite);
	}
	creep.build(constructSite);
	console.log("Builder: " + creep.name + " CONSTRUCTING " + constructSite + " in progress.");
}

function findRepairs(creep){
	var repairs = room1.find(FIND_STRUCTURES, { filter: function(object){
	if(object.hits < (object.hitsMax*.5) && object.structureType != STRUCTURE_WALL){
		return true; }}})
	var located = creep.pos.findClosestByPath(repairs);
	return located;
	}

function repairing(creep, repairSite){
	if(repairSite!=null){ // Ensure that the site exists.
		if(creep.repair(repairSite)==ERR_NOT_ENOUGH_RESOURCES){ // Ensure that he has enough energy.
			// Check to see if builder is within range for withdrawal.
			if(creep.withdraw(dropOffBuilder, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(dropOffBuilder);
			}
			else{
				creep.withdraw(dropOffBuilder, RESOURCE_ENERGY)
				console.log("Builder: " + creep.name + " WITHDRAWING from highest container " + selectedContainer + " for REPAIR.")
			}
		}
		else{
			if(creep.repair(repairSite)==ERR_NOT_IN_RANGE){
				creep.moveTo(repairSite)
			}
			creep.repair(repairSite)
			console.log("Builder: " + creep.name + " REPAIR " + repairSite + " in progress.")
		}
		creep.repair(repairSite)
	}
	else{
	    restB(creep);
	}
}

function restB(builder){
             var creep = builder;
             
             var distance = 1;
             var restTarget = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var myFlags = Game.flags;
            for(var i in myFlags){
                 var flag = myFlags[i];
                 if(creep.pos.inRangeTo(flag, distance) || creep.pos.findPathTo(flag).length > 0){
                     restTarget = flag;
                     break;
                 }
             }
             
             if(creep.pos.findPathTo(restTarget).length > distance){
                 creep.moveTo(restTarget);
             }
         }
 

module.exports = {
    
    init(creep, energyStore, constructSite){
		if(creep.build(constructSite)==ERR_NOT_ENOUGH_RESOURCES){ // Ensure that he has enough energy.
			refillEnergy(creep, energyStore);
		}
		else if(constructSite != null){
			construction(creep,constructSite);
		}
		else{
			var repairSite = findRepairs(creep);
			repairing(creep, repairSite);
		}
	}
    
};