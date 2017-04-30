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
var ramparts = room1.find(FIND_STRUCTURES, 
	{ filter: function(object){
		if(object.structureType == STRUCTURE_RAMPART){
			return true; }
		}
	})
 
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
    var rampart = creep.pos.findClosestByPath(ramparts);
    if(creep.pos.isEqualTo(rampart.pos)){ }
    else{ creep.moveTo(rampart); }
}
module.exports = {
	init(creep){
		var enemy = findClosestEnemy(creep);
		if(enemy==null){ enterRampart(creep); }
		attackEnemy(creep,enemy);
		
	}
};