// responsible for handling network communication and user details
var studentList;
var superlativeCategories;

// used by #updateInformation to refresh all info we have on the user
function actuallyUpdateInformation() {
	// send the request
	globalLoadingText.text("Downloading data...");

	var loginDetails = getLoginDetails();
	var req = $.ajax("https://app.jacketeer.org/app/info.php?a=" + (Math.floor(Math.random() * 99999999) + 1), {
		type: "POST",
		data: {
			user: loginDetails.user,
			token: localStorage.loginToken,
			appVersion: APP_VERSION
		},
		cache: false
	});

	req.done(function (data) {
		if (data.success) {
			userInfo = data.info;
			studentList = data.students;
			superlativeCategories = data.superlatives;
			
			var callback = function() {
				startApp();
			};
			
			// has a JavaScript update been issued?
			if (data.jsFile) {
				loadJavaScriptFiles([data.jsFile], callback);
			} else {
				loadDefaultJavaScriptFiles(callback);
			}
		} else {
			if (data.updateRequired) {
				navigator.notification.alert("This version of the Jacketeer app is outdated. Please update to the latest version from the App Store.", null, "Update Required", "Will do!");
				globalLoadingCover.stop(true).hide();
				return;
			}
			
			navigator.notification.alert("Server error, please try again later or stop by the iPad Help Desk (room 117) for assistance.", null, "Server Error", "Uh oh!");
			globalLoadingCover.stop(true).hide();
		}
	});

	req.fail(function () {
		if (req.aborted) {
			return;
		}

		navigator.notification.confirm("Connection to the server failed. Please make sure you're connected to the internet or try again later. If you need help, you can stop by the iPad Help Desk (room 117) for assistance.", function (response) {
			if (response == 1) {
				updateInformation();
			}
		}, "Connection Problems", "Try Again,Cancel");

		loadingCover.stop(true).hide();
	});

	return req;
}

// called by pretty much everything that needs to submit new data OR update the existing data
// handles submitting requests and then updating OR just updating (based on if reqToHandle is passed a map or not)
function updateInformation(reqToHandle) {
	// handle UI stuff
	if (!ui.screen || ui.screen.data("conf").id != "intro") {
		setScreen(screenIntro);
	}

	// show the loading screen
	if (!globalLoadingCover.is(":visible")) {
		globalLoadingCover.stop(true).show().fadeTo(0, 1);
	}

	globalLoadingText.text("Preparing to update...");

	// schedule and handle relevent requests
	var req;
	var updateTimeout;
	var submittedRealRequest = false;
	var hasCancelled = false;

	if (reqToHandle) {
		// need to submit some update request before reloading information
		// (other things will call this and ask it to pretty-please handle
		//  their requests before actually updating with fresh info from server)
		// 
		// but first, wait a second to avoid GUI glitches
		updateTimeout = setTimeout(function () {
			req = $.ajax("https://app.jacketeer.org/app/" + reqToHandle.path + "?a=" + (Math.floor(Math.random() * 99999999) + 1), {
				type: "POST",
				data: reqToHandle.data,
				cache: false
			});

			req.done(function (data) {
				if (data.success) {
					req = actuallyUpdateInformation();
				} else {
					navigator.notification.alert("Server error, please try again later or stop by the iPad Help Desk (room 117) for assistance.", null, "Server Error", "Uh oh!");
					globalLoadingCover.stop(true).hide();
				}
			});

			req.fail(function () {
				if (req.aborted) {
					return;
				}

				navigator.notification.confirm("Connection to the server failed. Please make sure you're connected to the internet or try again later. If you need help, you can stop by the iPad Help Desk (room 117) for assistance.", function (response) {
					if (response == 1) {
						updateInformation(reqToHandle);
					}
				}, "Connection Problems", "Try Again,Cancel");
			});
		}, 1000);

		globalLoadingText.text("Saving changes...");
	} else {
		// there was no real function to submit, so wait a second before updating (to avoid GUI glitches)
		updateTimeout = setTimeout(function () {
			submittedRealRequest = true;
			req = actuallyUpdateInformation();
		}, 1000);
	}

	// handle what happens when we cancel
	globalLoadingCancelEvent = function () {
		if (hasCancelled) {
			return;
		}
		
		hasCancelled = true;
		
		// if we haven't submitted the actual request, just cancel the timeout it's waiting on
		if (updateTimeout && !submittedRealRequest) {
			window.clearTimeout(updateTimeout);
		} else {
			req.aborted = true;
			req.abort();
		}

		globalLoadingCover.stop(true).fadeOut(500);
	};
}

function getLoginDetails() {
	var loginDetails = localStorage["loginDetails"];

	if (!loginDetails) {
		return null;
	}

	return JSON.parse(loginDetails);
}
