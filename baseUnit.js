var unit = {
        creep: null, // This unit.
        
        // Sets the creep.
        setCreep : function(creep){
            this.creep = creep;
            return this;
        },
        
        run : function(){
            if(this.creep.memory.onSpawned == undefined) {
                this.onSpawn();
                this.creep.memory.onSpawned = true;
            }
            
            this.action(this.creep); // Function pointer I fucking hope.
            
            if(this.creep.ticksToLive == 1){
                this.beforeAge(this.creep);
            }
        },
        
        handleEvents : function(){
            if(this.creep.memory.onSpawned == undefined){
                this.onSpawnStart();
                this.onSpawn();
                this.creep.memory.onSpawned = true;
            }
            
            if(this.creep.memory.onSpawnEnd == undefined && !this.creep.spawning){
                this.onSpawnEnd();
                this.creep.memory.onSpawnEnd = true;
            }
        },
        
        getParts : function(){
            var _ = require('lodash');
            
            var extensions = room1.find(FIND_MY_STRUCTURES, {
                filter : function(structure){
                    return (structure.structureType == STRUCTURE_EXTENSION && structure.energy >= 50);
                }
            }).length;
            
            var parts = _.cloneDeep(this.parts);
            if(typeof parts[0] != "object"){
                return this.parts;
            }
            
            parts.reverse();
            
            for(var i in parts){
                if((parts[i].length - 5) <= extensions){ // At most 5 more parts than there are extensions allowed.
                    return parts[i];
                }
            }
        },
        
        action : function() { },
        
        onSpawn : function() { },
        
        onSpawnStart : function() { },
        
        onSpawnEnd : function() { },
        
        beforeAge : function() { },
        
        /**
         * All credit goes to Djinni
         * @url https://bitbucket.org/Djinni/screeps/
         */
         rest : function(civilian){
             var creep = this.creep;
             
             var distance = 4;
             var restTarget = cree.pos.findNearest(FIND_MY_SPAWNS);
             
             if(!civilian){
                 var flags = Game.flags;
                 for(var i in flags){
                     var flag = flags[i];
                     if(creep.pos.inRangeTo(flag, distance) || creep.pos.findPathTo(flag).length > 0){
                         restTarget = flag;
                         break;
                     }
                 }
             }
             
             if(creep.pos.findPathTo(restTarget).length > distance){
                 creep.moveTo(restTarget);
             }
         },
         
        rangedAttack : function(target){
		var creep = this.creep;

		if(!target)
			target = creep.pos.findNearest(Game.HOSTILE_CREEPS);

		if(target) {
			if (target.pos.inRangeTo(creep.pos, 3) ) {
				creep.rangedAttack(target);
				return target;
			}
		}
		return null;
	},

	keepAwayFromEnemies: function()
	{
		var creep = this.creep;

		var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
		if(target !== null && target.pos.inRangeTo(creep.pos, 3))
			creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
	},

	/**
	 * All credit goes to Djinni
	 * @url https://bitbucket.org/Djinni/screeps/
	 */
	kite: function(target) {
		var creep = this.creep;

		if (target.pos.inRangeTo(creep.pos, 2)) {
			creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
			return true;
		} else if (target.pos.inRangeTo(creep.pos, 3)) {
			return true;
		}
		else {
			creep.moveTo(target);
			return true;
		}

		return false;
	},

	getRangedTarget: function()
	{
		var creep = this.creep;

		var closeArchers = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
			filter: function(enemy)
			{
				return enemy.getActiveBodyparts(Game.RANGED_ATTACK) > 0
					&& creep.pos.inRangeTo(enemy, 3);
			}
		});

		if(closeArchers != null)
			return closeArchers;

		var closeMobileMelee = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
			filter: function(enemy)
			{
				return enemy.getActiveBodyparts(Game.ATTACK) > 0
					&& enemy.getActiveBodyparts(Game.MOVE) > 0
					&& creep.pos.inRangeTo(enemy, 3);
			}
		});

		if(closeMobileMelee != null)
			return closeMobileMelee;

		var closeHealer = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
			filter: function(enemy)
			{
				return enemy.getActiveBodyparts(Game.HEAL) > 0
					&& enemy.getActiveBodyparts(Game.MOVE) > 0
					&& creep.pos.inRangeTo(enemy, 3);
			}
		});

		if(closeHealer != null)
			return closeHealer;

		return creep.pos.findNearest(Game.HOSTILE_CREEPS);
    }
}

module.exports = unit;