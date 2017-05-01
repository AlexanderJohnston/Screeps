/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('fighter');
 * mod.thing == 'a thing'; // true
 */
 
var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
 
 function spawnCreeps(){
	// Check to see if pix2 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'upgrade') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'upgrade');
	}
}
 
 function setRoles(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.upgrade){
		Game.creeps.upgrade.memory.role = 'upgrade';
		unitArray.push(Game.creeps.upgrade);
	}
	return unitArray;
}

module.exports = {

	init(){
	    var unitArray = []; // Store units for return.
		spawnCreeps();
		unitArray = setRoles(unitArray);
		return unitArray;
	}
};