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
	// Check to see if fight is alive or not, then create him. 
	if(spawn.canCreateCreep([TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE],'fight') == 0){
		spawn.createCreep([TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE],'fight');
		
		// Push the creep object onto the array.
		Game.creeps.pix.memory.role = 'fighter';
		fighters.push(Game.creeps.pix);
	}
}
 
 function setRoles(){
	// Push the creep object onto the array.
	if(Game.creeps.fighter){
		Game.creeps.fighter.memory.role = 'fighter';
		fighters.push(Game.creeps.fighter);
	}
}

module.exports = {

	init(){
		spawnCreeps();
		setRoles();
		return unitArray;
	}
};