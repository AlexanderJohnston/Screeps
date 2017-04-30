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
	// Check to see if pix3 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'pix3') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'pix3');
	}
	
	// Check to see if pix13 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'pix13') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'pix13');
	}
}
 
 function setRoles(unitArray){
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