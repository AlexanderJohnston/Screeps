/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('fightLoop');
 * mod.thing == 'a thing'; // true
 */

var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;
var flag = room1.find(FIND_FLAGS)
 
function findClosestEnemy(creep){
	var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
	return enemy;
}
 
function attackEnemy(creep,enemy){
	if(creep.attack(enemy) == ERR_NOT_IN_RANGE){
		creep.moveTo(enemy);
	}
	else{
		creep.attack(enemy);
	}
}

function enterRampart(creep){
    var rest = creep.pos.findClosestByPath(flag);
    creep.moveTo(rest);
}
module.exports = {
	init(creep){
		var enemy = findClosestEnemy(creep);
		if(enemy==null){ enterRampart(creep); }
		attackEnemy(creep,enemy);
		
	}
};