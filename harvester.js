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
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'harvest1') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'harvest1');
	}
	
	// Check to see if pix13 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'harvest2') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],'harvest2');
	}
}
 
 function setRoles(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.harvest1){
		Game.creeps.harvest1.memory.role = 'harvester';
		unitArray.push(Game.creeps.harvest1);
	}
	// Push the creep object onto the array.
	if(Game.creeps.harvest2){
		Game.creeps.harvest2.memory.role = 'harvester';
		unitArray.push(Game.creeps.harvest2);
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