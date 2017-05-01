/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creepSpawner');
 * mod.thing == 'a thing'; // true
 */
var room1 = Game.rooms['W2N5'];
var control = room1.controller;
var spawn = Game.spawns.Pixelation;

function levelCreep(cLevel){
    switch(cType){
        case 'builder':
            
            break;
        case 'energizer':
            
            break;
        case 'fighter':
            
            break;
        case 'harvester':
            
            break;
        case 'transporter':
            
            break;
        case 'builder':
            
            break;
    }
}

function spawnCreep(cType,cParts){
    switch(cType){
        case 'builder':
            
            break;
        case 'energizer':
            
            break;
        case 'fighter':
            
            break;
        case 'harvester':
            
            break;
        case 'transporter':
            
            break;
        case 'builder':
            
            break;
    }
    

}

function setRole(unitArray){
	// Push the creep object onto the array.
	if(Game.creeps.pix4){
		Game.creeps.pix4.memory.role = 'energizer';
		unitArray.push(Game.creeps.pix4);
	}
}

module.exports = {

    initSpawnQueue : function(){
        if(Memory.sQueue == undefined){
            Memory.sQueue = [];
        }
    }
    
    initPowerQueue : function(){
        if(Memory.pQueue == undefined){
            Memory.pQueue = [];
        }
    }
    
    addCreep : function(creep, cPower, unshift)
    {
        this.initSpawnQueue();
        this.initPowerQueue();
        
        if(unshift != undefined && unshift === true){
            Memory.sQueue.unshift(creep);
            Memory.pQueue.unshift(cPower);
        }
        else{
            Memory.sQueue.push(creep);
        }
    }
    
    spawnCreep : function(creepType,creepLevel){ // string, int
        var cType = creepType.toLowerCase());
    }
};