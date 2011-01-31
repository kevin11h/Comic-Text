// namespace util
var util = util || {};

util.getWhitelistRegexs = function(whitelist) {
	// parse out the domains and turn them to regexs
	var regexs = [];
	var parts = whitelist.split(/\s+/);
	for (var i = 0; i < parts.length; i++) {
		// allow the user to simply enter "*" for all sites
		var pattern = parts[i] == "*" ? ".*" : parts[i]; 
		regexs.push(new RegExp(pattern));
	}	
	return regexs;
}

util.updateCssVersion = function() {
	var userVersion = options.loadUserCssVersion();
	console.log("User has CSS version " + userVersion);
	console.log("Current CSS version is " + config.currentCssVersion);
	if (isNaN(userVersion) || userVersion != config.currentCssVersion) {
		console.log("Upgrading CSS version");
		
		// Don't overwrite CSS if we've previsouly saved a 
		// CSS version #, and they've customized their CSS.
		if (!isNaN(userVersion) && util.userHasModifiedCss()) {
			// Instead, just update the version number.
			console.log("User has modified CSS that won't be touched, updating version number to " + config.currentCssVersion);
			options.saveUserCssVersion(config.currentCssVersion);
			return;
		}
		
		// otherwise, update the css the to latest version
		options.resetCss();
		options.saveUserCssVersion(config.currentCssVersion);
		console.log("CSS has been updated to current version " + config.currentCssVersion);
	}
}
	
util.userHasModifiedCss = function() {
	// search the old versions for a match
	var userCss = options.loadCss();
	for (var i = 0; i <= config.currentCssVersion; i++) {
		if (userCss == config.cssVersions[i]) {
			return false;
		}
	}
	return true;
}