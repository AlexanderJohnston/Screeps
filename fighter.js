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
	// Check to see if fight is alive or not, then create him. 
	if(spawn.canCreateCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'fight') == 0){
		spawn.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'fight');
	}
}
 
 function setRoles(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.fight){
		Game.creeps.fight.memory.role = 'fighter';
		unitArray.push(Game.creeps.fight);
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