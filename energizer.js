/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('energizer');
 * mod.thing == 'a thing'; // true
 */
 
var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
 
function spawnCreeps(){
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer1') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer1');
	}
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer11') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,MOVE,MOVE],'energizer11');
	}
	// Check to see if pix4 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer2') == 0){
		spawn.createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer2');
	}
	// Check to see if pix7 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer3') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer3');
	}
	// Check to see if pix8 is alive or not, then create him.
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer4') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'energizer4');
	}
}
 
function setRoles(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.energizer1){
		Game.creeps.energizer1.memory.role = 'energizer';
		unitArray.push(Game.creeps.energizer1);
	}
	// Push the creep object onto the array.
	if(Game.creeps.energizer11){
		Game.creeps.energizer11.memory.role = 'energizer';
		unitArray.push(Game.creeps.energizer11);
	}
	// Push the creep object onto the array.
	if(Game.creeps.energizer2){
		Game.creeps.energizer2.memory.role = 'energizer';
		unitArray.push(Game.creeps.energizer2);
	}
	// Push the creep object onto the array.
	if(Game.creeps.energizer3){
		Game.creeps.energizer3.memory.role = 'energizer';
		unitArray.push(Game.creeps.energizer3);
	}
	// Push the creep object onto the array.
	if(Game.creeps.energizer4){
		Game.creeps.energizer4.memory.role = 'energizer';
		unitArray.push(Game.creeps.energizer4);
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