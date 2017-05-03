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
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter1') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter1');
	}
	
	// Check to see if pix15 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter2') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter2');
	}
	
	// Check to see if pix16 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter3') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter3');
	}
	
	// Check to see if pix2 is alive or not, then create him. 
	if(spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter4') == 0){
		spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'transporter4');
	}
}
 
 function setRoles(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.transporter1){
		Game.creeps.transporter1.memory.role = 'transporter';
		unitArray.push(Game.creeps.transporter1);
	}
	// Push the creep object onto the array.
	if(Game.creeps.transporter2){
		Game.creeps.transporter2.memory.role = 'transporter';
		unitArray.push(Game.creeps.transporter2);
	}
	// Push the creep object onto the array.
	if(Game.creeps.transporter3){
		Game.creeps.transporter3.memory.role = 'transporter';
		unitArray.push(Game.creeps.transporter3);
	}
	// Push the creep object onto the array.
	if(Game.creeps.transporter4){
		Game.creeps.transporter4.memory.role = 'transporter';
		unitArray.push(Game.creeps.transporter4);
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