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
	// Check to see if pix2 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix2') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix2');
		
		// Push the creep object onto the array.
		Game.creeps.pix2.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix2);
	}
	
	// Check to see if pix15 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix15') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix15');
		
		// Push the creep object onto the array.
		Game.creeps.pix15.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix15);
	}
	
	// Check to see if pix16 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix16') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix16');
		
		// Push the creep object onto the array.
		Game.creeps.pix16.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix16);
	}
	
	// Check to see if pix2 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix5') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'pix5');
		
		// Push the creep object onto the array.
		Game.creeps.pix5.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix5);
	}
}
 
 function setRoles(){
	// Push the creep object onto the array.
	if(Game.creeps.pix2){
		Game.creeps.pix2.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix2);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix5){
		Game.creeps.pix5.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix5);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix15){
		Game.creeps.pix15.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix15);
	}
	// Push the creep object onto the array.
	if(Game.creeps.pix16){
		Game.creeps.pix16.memory.role = 'transporter';
		unitArray.push(Game.creeps.pix16);
	}
}

module.exports = {

	init(){
		spawnCreeps();
		setRoles();
		return unitArray;
	}
};