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
	// Check to see if pix is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'builder1') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'builder1');
	}
	// Check to see if pix0 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'builder2') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'builder2');
	}
	// Check to see if pix00 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix00') == 0){
		spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix00');
	}
	// Check to see if pix000 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix000') == 0){
		//spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'pix000');
	}
}
 
 function setRoles(unitArray){
    		// Push the creep object onto the array.
	if(Game.creeps.builder1){
		Game.creeps.builder1.memory.role = 'builder';
		unitArray.push(Game.creeps.builder1);
	}
	// Push the creep object onto the array.
	if(Game.creeps.builder2){
		Game.creeps.builder2.memory.role = 'builder';
		unitArray.push(Game.creeps.builder2);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix00){
		Game.creeps.pix00.memory.role = 'builder';
		unitArray.push(Game.creeps.pix00);
	}
	/*// Push the creep object onto the array.
	if(Game.creeps.pix000){
		Game.creeps.pix000.memory.role = 'builder';
		unitArray.push(Game.creeps.pix000);
	}*/
	
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