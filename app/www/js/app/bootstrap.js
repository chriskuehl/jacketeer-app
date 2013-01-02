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