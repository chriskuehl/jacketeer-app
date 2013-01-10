var APP_VERSION = "1.1";
var userInfo;

// bootstrap the app
$(document).ready(function () {
	initialize();
});

// set up the app to a working state
function initialize() {
	initInterface();

	// load the first screen
	if (getLoginDetails() && localStorage.loginToken) {
		updateInformation();
	} else {
		localStorage.removeItem("loginToken");
		setScreen(screenIntro);
	}
}

// handle JS loading
function loadDefaultJavaScriptFiles(callback) {
	var files = [
		"js/app/screens/portal.js",
		"js/app/screens/name.js",
		"js/app/screens/portrait.js",
		"js/app/screens/quote.js",
		"js/app/screens/signature.js",
		"js/app/screens/voice.js",
		"js/app/screens/superlatives.js",
		"js/app/screens/suggest-coverage.js",
		"js/app/screens/hail-woodford.js",
		"js/app/screens/help.js",
		"js/app/screens/contact.js",
		"js/app/screens/order.js",
		"js/app/start.js",
	];
	
	loadJavaScriptFiles(files, callback);
}

function loadJavaScriptFiles(files, callback) {
	Loader.script(files, {complete: callback});
}
