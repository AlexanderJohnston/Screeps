/**
 * These are simple creatures, they just find an active source and harvest it
 * @param creep
 */
var harvester = {
	parts: [
		[MOVE,WORK,WORK,WORK,WORK,WORK,WORK]
	],

	action: function () {
		var creep = this.creep;
		var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
		creep.moveTo(sources);
		creep.harvest(sources);
	}
};

module.exports = harvester;