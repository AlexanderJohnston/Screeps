/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('controller');
 * mod.thing == 'a thing'; // true
 */
var countType = require('countType');
module.exports = {
smartControl : function(){
    var requiredUnits = ['harvester','harvester','energizer','energizer','energizer','energizer'];
    
    var gatheredUnits = { };
    for(var i in requiredUnits){
        var type = requiredUnits[i];
        if(gatheredUnits[type] == undefined){
            gatheredUnits[type] = 0;
        }
        
        var skipUnit = gatheredUnits[type] + 1;
        
        var found = countType(type, true);
        if(skipUnit > countType(type, true)){
            Memory.sQueue.push(type);
        }
        
        gatheredUnits[type]++;
    }
}
};