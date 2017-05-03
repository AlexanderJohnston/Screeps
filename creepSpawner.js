module.exports = {

    initSpawnQueue : function(){
        if(Memory.sQueue == undefined){
            Memory.sQueue = [];
        }
    },
    
    initPowerQueue : function(){
        if(Memory.pQueue == undefined){
            Memory.pQueue = [];
        }
    },
    
    addCreep : function(creep, unshift) // string, int, bool
    {
        this.initSpawnQueue();
        this.initPowerQueue();
        
        if(unshift != undefined && unshift === true){
            Memory.sQueue.unshift(creep);
            //Memory.pQueue.unshift(cPower);
        }
        else{
            Memory.sQueue.push(creep);
            //Memory.pQueue.push(cPower)
        }
    },
    
    spawnCreep : function(){
        this.initSpawnQueue()
        this.initPowerQueue()
        
        if(!Memory.sQueue.length){
            return;
        }
        
        var mySpawns = [];
        for(var r in Game.rooms){
            var selected = Game.rooms[r];
            var mySpawn = selected.find(FIND_MY_SPAWNS)[0];
            mySpawns.push(mySpawn);
        }
        
        if(!mySpawns.length){
            return; // No spawns available.
        }
        
        var role = Memory.sQueue[0];
        
        if(typeof role == "string"){
            role = { type: role, memory: { } };
        }
        
        var me = this;
        var toSpawnAt = mySpawns.filter(function(spawn){
            return me.canSpawn(spawn, role.type);
        });
        
        if(!toSpawnAt.length){
            return; // No spawn found with sufficient energy.
        }
        
        toSpawnAt = toSpawnAt[0]
        
        this.spawn(role.type, role.memory, toSpawnAt)
        
        Memory.sQueue.shift();
    },
    
    spawn : function(role,memory,spawnPoint){
        if(!spawnPoint){
            spawnPoint = Game.spawns.Pixelation;
        }
		
		var manager = require('roleManager');
		
		if(!manager.roleExists(role)){
			return;
		}
		
		if(!this.canSpawn(spawnPoint, role)){
			return;
		}
		
		if(memory == undefined){
			memory = { };
		}
		
		memory['role'] = role;
		
		var nameCount = 0;
		var name = null;
		while(name == null){
			nameCount++;
			var tryName = role + nameCount;
			if(Game.creeps[tryName] == undefined){
				name = tryName;
			}
		}
        
		console.log('Spawning ' + role);
		spawnPoint.createCreep(manager.getRoleBodyParts(role),name,memory);
    },
	
	canSpawn : function(spawnPoint, role){
		if(typeof spawnPoint == "string" && role == undefined){
			role = spawnPoint;
			spawnPoint = Game.spawns.Pixelation;
		}
		
		return spawnPoint.energy >= this.spawnCost(role)
			&&(spawnPoint.spawning == null
				|| spawnPoint.spawning == undefined);
	},
	
	spawnCost : function(role){
		var manager = require('roleManager');
		var parts = manager.getRoleBodyParts(role);
		
		var total = 0;
		for(var index in parts){
			var part = parts[index];
			switch(part){
				case Game.MOVE:
					total += 50
					break;

				case Game.WORK:
					total += 20
					break;

				case Game.CARRY:
					total += 50
					break;

				case Game.ATTACK:
					total += 100
					break;

				case Game.RANGED_ATTACK:
					total += 150
					break;

				case Game.HEAL:
					total += 200
					break;

				case Game.TOUGH:
					total += 5
					break;
			}
		}
		
		return total;
	},
	
	killAll : function(role){
		for(var i in Game.creeps){
			if(role == undefined || Game.creeps[i].memory.role == role){
				Game.creeps[i].suicide();
			}
		}
	}
};