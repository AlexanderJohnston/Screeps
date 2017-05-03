module.exports = {
	roleExists: function(role){
		try
		{
			require(role);
			return true;
		}
		catch(e)
		{
			return false;
		}
	},

	getRole: function(role)
	{
		if(!this.roleExists(role))
			return false;

        var base = require('baseUnit'); // General functions for a unit.

		var roleObject = require(role);
        roleObject = require('extend')(roleObject, base); // Extend the selected role with general baseUnit functions.
		return roleObject;
	},

	getRoleBodyParts: function(role)
	{
		if(!this.roleExists(role))
			return false;

		var role = this.getRole(role);

		if(role.getParts !== undefined)
			return role.getParts.call(role);
		else
			return role.prototype.getParts.call(role);
	}
};