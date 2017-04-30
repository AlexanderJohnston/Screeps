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
	// Check to see if pix3 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,MOVE],'pix3') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE],'pix3');
		
		// Push the creep object onto the array.
		Game.creeps.pix3.memory.role = 'harvester';
		unitArray.push(Game.creeps.pix3);
	}
	
	// Check to see if pix13 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,MOVE],'pix13') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE],'pix13');
		
		// Push the creep object onto the array.
		Game.creeps.pix13.memory.role = 'harvester';
		unitArray.push(Game.creeps.pix13);
	}
}
 
 function setRoles(){
	// Push the creep object onto the array.
	if(Game.creeps.pix3){
		Game.creeps.pix3.memory.role = 'harvester';
		unitArray.push(Game.creeps.pix3);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix13){
		Game.creeps.pix13.memory.role = 'harvester';
		unitArray.push(Game.creeps.pix13);
	}
}

module.exports = {

	init(){
		spawnCreeps();
		setRoles();
		return unitArray;
	}
};