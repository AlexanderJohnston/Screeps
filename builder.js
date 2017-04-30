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
var unitArray = []; // Store units for return.
 
 function spawnCreeps(){
	// Check to see if pix is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix');
		
		// Push the creep object onto the array.
		Game.creeps.pix.memory.role = 'builder';
		unitArray.push(Game.creeps.pix);
	}
	// Check to see if pix is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix0') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix0');
		
		// Push the creep object onto the array.
		Game.creeps.pix0.memory.role = 'builder';
		unitArray.push(Game.creeps.pix0);
	}
}
 
 function setRoles(){
	// Push the creep object onto the array.
	if(Game.creeps.pix){
		Game.creeps.pix.memory.role = 'builder';
		unitArray.push(Game.creeps.pix);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix0){
		Game.creeps.pix0.memory.role = 'builder';
		unitArray.push(Game.creeps.pix0);
	}
}

module.exports = {

	init(){
		spawnCreeps();
		setRoles();
		return unitArray;
	}
};