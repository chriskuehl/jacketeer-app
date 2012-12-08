// global variable definitions
var ui = [];
var container;

// bootstrap the app
$(document).ready(function() {
	initialize();
});

// set up the app to a working state
function initialize() {
	initInterface();
	
	// load the first screen
	if (getLoginDetails()) {
		setScreen(screenSignature);
	} else {
		setScreen(screenIntro);
	}
}

// create the general interface elements
function initInterface() {
	container = $("#container");
	
	// title bar
	ui.titleBar = $("<div />");
	ui.titleBar.appendTo(container);
	ui.titleBar.attr({
		id: "titleBar"
	});
	
	// title bar text
	ui.titleBarText = $("<p />");
	ui.titleBarText.appendTo(ui.titleBar);
	ui.titleBarText.attr({
		id: "titleBarText"
	});
	updateTitle();
	
	// title bar button
	ui.titleButton = $("<a />");
	ui.titleButton.appendTo(ui.titleBar);
	ui.titleButton.attr({
		id: "titleBarButton"
	});
	
	ui.titleButtonLeft = $("<div />");
	ui.titleButtonLeft.addClass("titleBarLeft");
	ui.titleButtonLeft.appendTo(ui.titleButton);
	
	ui.titleButtonText = $("<div />");
	ui.titleButtonText.attr({
		id: "titleBarButtonText"
	});
	ui.titleButtonText.addClass("titleBarMiddle");
	ui.titleButtonText.appendTo(ui.titleButton);
	ui.titleButtonText.text("Cancel");
	
	ui.titleButtonRight = $("<div />");
	ui.titleButtonRight.addClass("titleBarRight");
	ui.titleButtonRight.appendTo(ui.titleButton);
	
	// create screen container
	ui.screenContainerParent = $("<div />");
	ui.screenContainerParent.appendTo(container);
	ui.screenContainerParent.attr({
		id: "screenContainerParent"
	});
	
	ui.screenContainer = $("<div />");
	ui.screenContainer.appendTo(ui.screenContainerParent);
	ui.screenContainer.attr({
		id: "screenContainer"
	});
}

function updateTitle(newTitle) {
	if (newTitle != null) {
		$("title").text(newTitle);
	}
	
	ui.titleBarText.text($("title").text());
}


function setScreen(screen) {
	var targetID = "screen-" + screen.id;
	
	// does it already exist?
	if ($("#" + targetID).length > 0) {
		$("#" + targetID).remove();
	}
	
	// create a container div for the new screen
	var container = $("<div />");
	container.data("conf", screen);
	container.appendTo(ui.screenContainer);
	container.addClass("screen");
	container.attr({
		id: targetID
	});
	
	// general changes
	updateTitle(screen.title);
	
	if (screen.titleButton) {
		ui.titleButton.fadeIn(500);
		ui.titleButtonText.text(screen.titleButton.text);
		ui.titleButton.unbind("click");
		ui.titleButton.click(function() {
			screen.titleButton.event();
		});
	} else {
		ui.titleButton.fadeOut(500);
	}
	
	// render the screen
	screen.setup(container);
	
	// is a screen already being displayed?
	if (ui.screen != null) {
		// attempt to intelligently switch screens
		if (ui.screen.data("conf") && ui.screen.data("conf").parent == screen.id) { // go "back"
			// the old (current) screen is a child of the new screen, so the old screen should
			// slide out right while the new one (the parent) slides in from the left
			container.css("left", "-" + (ui.screenContainer.width()) + "px");
			
			container.animate({
				left: "0px"
			}, 500, "swing", null);
			
			ui.screen.animate({
				left: (ui.screenContainer.width() * 2) + "px"
			}, 500, "swing", function() {
				$(this).remove();
			});
		} else { // go forward to a new screen
			// the new screen is probably a child of the current one (even if not explicitly defined)
			// so the old (current) screen should slide out left, while the new one slides in from the right
			container.css("left", (ui.screenContainer.width()) + "px");
			
			container.animate({
				left: "0px"
			}, 500, "swing", null);
			
			ui.screen.animate({
				left: "-" + (ui.screenContainer.width()) + "px"
			}, 500, "swing", function() {
				$(this).remove();
			});
		} 
	}
	
	// update current screen
	ui.screen = container;
}

var globalTension = 0.35;
var globalInterval = 25;

var screenSignature = {
	id: "signature",
	title: "Senior Signature",
	parent: "portal",
	
	setup: function(container) {
		container.css({
			backgroundColor: "rgba(255, 210, 0, 0.1)"
		});
		
		sigPaths = [];
		
		var intro = $("<p />");
		intro.appendTo(container);
		intro.css({
			margin: "100px",
			fontSize: "44px",
			textAlign: "center"
		});
		intro.text("Lorem ipsum dolor sit amet blah blah blah");
		
		var artHolder = $("<div />");
		artHolder.appendTo(container);
		artHolder.css({
			width: "1800px",
			height: "800px",
			marginLeft: "auto",
			marginRight: "auto"
		});
		
		var canvasHolder = $("<div />");
		canvasHolder.appendTo(artHolder);
		canvasHolder.css({
			width: "1500px",
			height: "800px",
			border: "solid 10px gray",
			float: "left"
		});
		
		var buttonHolder = $("<div />");
		buttonHolder.appendTo(artHolder);
		buttonHolder.css({
			float: "right",
			width: "240px",
			height: "820px"
		});
		
		var undoButton = $("<a />");
		undoButton.appendTo(buttonHolder);
		undoButton.text("Undo");
		undoButton.addClass("signatureButton");
		undoButton.addClass("disabled");
		undoButton.attr({
			id: "signatureUndoButton"
		});
		
		undoButton.click(function() {
			if ($(this).hasClass("disabled")) {
				return;
			}
			
			sigPaths.remove(sigPaths.length - 1);
			redrawCanvas(canvas, ctx);
			
			if (sigPaths.length <= 0) {
				undoButton.addClass("disabled");
				clearButton.addClass("disabled");
			}
		});
		
		var clearButton = $("<a />");
		clearButton.appendTo(buttonHolder);
		clearButton.text("Clear");
		clearButton.addClass("signatureButton");
		clearButton.addClass("disabled");
		clearButton.attr({
			id: "signatureClearButton"
		});
		
		clearButton.click(function() {
			if ($(this).hasClass("disabled")) {
				return;
			}
			
			penData = null;
			sigPaths = [];
			redrawCanvas(canvas, ctx);
			
			undoButton.addClass("disabled");
			clearButton.addClass("disabled");
		});
				
		var doneButton = $("<a />");
		doneButton.appendTo(buttonHolder);
		doneButton.text("Done");
		doneButton.addClass("signatureButton");
		doneButton.attr({
			id: "signatureDoneButton"
		});
		
		doneButton.click(function() {
			if ($(this).hasClass("disabled")) {
				return;
			}
			
			setScreen(screenPortal);
		});
		
		var canvas = $("<canvas />");
		canvas.appendTo(canvasHolder);
		canvas.attr({
			width: canvasHolder.innerWidth(),
			height: canvasHolder.innerHeight(),
			id: "handwritingCanvas"
		});
		canvas.css({
			backgroundColor: "solid rgba(255, 255, 255, 1)"
		});
		canvas.data("paths", []);
		
		var ctx = canvas[0].getContext("2d");
		
		var tensionRange = $("<input type=\"range\" />");
		tensionRange.appendTo(container);
		tensionRange.css({
			width: "500px",
			height: "100px",
			marginTop: "50px"
		});
		tensionRange.attr({
			min: 0,
			max: 1,
			step: 0.01
		});
		tensionRange.val(globalTension);
		tensionRange.change(function() {
			globalTension = $(this).val();
			intro.text("tension=" + globalTension + "; interval=" + globalInterval);
			
			redrawCanvas(canvas, ctx);
		});
		
		var intervalRange = $("<input type=\"range\" />");
		intervalRange.appendTo(container);
		intervalRange.css({
			width: "500px",
			height: "100px",
			marginTop: "50px"
		});
		intervalRange.attr({
			min: 0,
			max: 1000,
			step: 1
		});
		intervalRange.val(globalInterval);
		intervalRange.change(function() {
			globalInterval = $(this).val();
			intro.text("tension=" + globalTension + "; interval=" + globalInterval);
			redrawCanvas(canvas, ctx);
		});
		
		// iPad touch events
		canvas[0].addEventListener("touchstart", function(e) {
			penData = {
				points: [],
				lastEvent: 0
			};
			
			// draw the first point
			addPenPosition(ctx, canvas, e);
		}, false);
		
		canvas[0].addEventListener("touchmove", function(e) {
			// are we drawing?
			if (penData == null) {
				return;
			}
			
			// test if it's time for another point
			var cur = currentTime();
			var ignore = cur - penData.lastEvent < globalInterval;
			
			// draw the point
			addPenPosition(ctx, canvas, e, ignore);
		}, false);
		
		canvas[0].addEventListener("touchend", function(e) {
			// are we drawing?
			if (penData == null) {
				return;
			}
			
			// draw the last point
			try {
				addPenPosition(ctx, canvas, e);
			} catch (err) {}
			
			// remove any points to ignore
			for (var i = penData.points.length - 1; i >= 0; i --) {
				if (penData.points[i][3]) {
					penData.points.remove(i);
				}
			}
			
			// end the drawing
			sigPaths.push(penData.points);
			penData = null;
			
			redrawCanvas(canvas, ctx);
			
			// change button statuses
			clearButton.removeClass("disabled");
			undoButton.removeClass("disabled");
		}, false);
	}
};

var sigPaths = null;
var penData = null;

function currentTime() {
	return (new Date()).getTime();
}

function addPenPosition(ctx, canvas, e, ignore) {
	if (ignore === undefined) {
		ignore = false;
	}
	
	var pos = getPenPosition(canvas, e);
	var velocity = 0;
	
	if (penData.points.length > 0) {
		var lastPoint = penData.points[penData.points.length - 1];
		velocity = dist(pos, lastPoint);
	}
	
	pos.push(velocity);
	pos.push(ignore);
	penData.points.push(pos);
	
	if (! ignore) {
		penData.lastEvent = currentTime();
	}
	
	redrawCanvas(canvas, ctx);
}

function dist(p1, p2) {
	return ((p1[0] - p1[0]) ^ 2 + (p1[1] - p2[1]) ^ 2) ^ 0.5;
}

function redrawCanvas(canvas, ctx) {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width(), canvas.height());
	
	// draw the current path	
	if (penData) {
		drawSpline(ctx, penData.points, globalTension, false);
	}
	
	// draw the rest of the paths
	if (sigPaths.length > 0) {
		for (var i = 0; i < sigPaths.length; i ++) {
			drawSpline(ctx, sigPaths[i], globalTension, false);
		}
	}
}

function getPenPosition(canvas, e) {
	var ep = canvas.offset();
	return [e.targetTouches[0].pageX - ep.left, e.targetTouches[0].pageY - ep.top];
}

var screenPortal = {
	id: "portal",
	title: "Jacketeer 2013",
	parent: "intro",
	
	titleButton: {
		text: "Sign Out",
		event: function() {
			navigator.notification.alert("Are you sure you want to sign out?", function(response) {
				if (response == 2) {
					localStorage.removeItem("loginDetails");
					setScreen(screenIntro);
				}
			}, "Sign Out", "Cancel,Sign Out");
		}
	},
	
	setup: function(container) {
		var loginDetails = getLoginDetails();
		updateTitle(loginDetails ? loginDetails.firstName + " " + loginDetails.lastName : "UNKNOWN");
		
		container.css({
			backgroundColor: "rgba(255, 210, 0, 0.1)"
		});
		
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel ante id libero pretium scelerisque at id sem. Mauris sodales viverra lacus. Ut euismod augue nec magna ullamcorper tincidunt. Fusce fringilla pellentesque nunc quis vulputate.");
		
		// sections to complete
		var sections = [
			{
				id: "name",
				title: "Preferred Name",
				description: "The name you want to be used next to identify you in the yearbook.",
				complete: false
			},
			
			{
				id: "signature",
				title: "Personal Signature",
				description: "Your personal, hand-written signature, done from your iPad.",
				complete: false
			},
			
			{
				id: "quote",
				title: "Featured Quote",
				description: "An inspiring, witty, or memorable quote of your choice.",
				complete: false
			}
		];
		var total = 0;
		
		for (var i = 0; i < sections.length; i ++) {
			var section = sections[i];
			
			if (section.complete) {
				total ++;
			}
			
			var sectionButton = $("<a />");
			sectionButton.appendTo(container);
			sectionButton.css({
				display: "block",
				margin: "60px",
				padding: "70px",
				paddingLeft: "225px",
				backgroundColor: "rgba(100, 100, 0, 0.1)",
				backgroundImage: "url('css/assets/" + (section.complete ? "accept" : "alert") + ".png')",
				backgroundPosition: "50px 50%",
				backgroundRepeat: "no-repeat",
				borderRadius: "15px",
				marginBottom: "30px !important",
				position: "relative"
			});
			
			sectionButton.data("section", section);
			sectionButton.click(function() {
				var selectedSection = $(this).data("section");
				
				if (selectedSection.id == "signature") {
					setScreen(screenSignature);
				}
			});
			
			var header = $("<h1 />");
			header.appendTo(sectionButton);
			header.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "48px",
				color: "rgba(0, 0, 0, 0.7)"
			});
			header.text(section.title);
			
			var description = $("<h2 />");
			description.appendTo(sectionButton);
			description.css({
				fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\"",
				fontSize: "36px",
				color: "rgba(0, 0, 0, 0.7)",
				marginTop: "15px"
			});
			description.text(section.description);
			
			var status = $("<h3 />");
			status.appendTo(sectionButton);
			status.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "36px",
				color: "rgba(0, 0, 0, 0.7)",
				position: "absolute",
				right: "150px",
				top: "50%",
				marginTop: "-14px"
			});
			status.text(section.complete ? "COMPLETE" : "INCOMPLETE");
			
			var arrow = $("<h4 />");
			arrow.appendTo(sectionButton);
			arrow.css({
				fontFamily: "\"Helvetica Neue Light\", \"HelveticaNeue-Light\"",
				fontSize: "70px",
				color: "rgba(0, 0, 0, 0.4)",
				position: "absolute",
				right: "50px",
				top: "50%",
				marginTop: "-40px"
			});
			arrow.text(">");
		}
		
		var calculatedPercent = Math.floor((total / sections.length) * 100);
		
		var progressText = $("<p />");
		progressText.appendTo(container);
		progressText.css({
			textAlign: "center",
			fontSize: "48px",
			lineHeight: "1.6em",
			margin: "80px",
			marginBottom: "0px",
			color: "rgba(0, 0, 0, 0.4)",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\""
		});
		progressText.html("Current Progress: <span style=\"color: rgba(0, 0, 0, 0.6);\">" + calculatedPercent + "%</span>");
		
		var helpText = $("<p />");
		helpText.appendTo(container);
		helpText.css({
			textAlign: "center",
			fontSize: "30px",
			lineHeight: "1.6em",
			color: "rgba(0, 0, 0, 0.6)",
			fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\""
		});
		helpText.html("<span style=\"color: rgba(0, 0, 0, 0.4);\">If you need help with this app, stop by the iPad Help Desk (room 117) or Mr. Ruff's room (room 138).</span>");
		
	}
};

var screenIntro = {
	id: "intro",
	title: "Jacketeer 2013",
	
	setup: function(container) {
		container.css({
            backgroundColor: "rgba(255, 210, 0, 0.1)",
		});
		
		var page = $("<div />");
		page.appendTo(container);
		page.css({
			backgroundColor: "rgba(255, 255, 255, 0.99)",
			
			borderRadius: "15px",
			padding: "80px",
			
			position: "absolute",
			top: "50%",
			left: "50%",
			
			width: "1200px",
			height: "725px",
			
			marginLeft: "-680px",
			marginTop: "-500px",
			
			boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)"
		});
		
		var title = $("<p />");
		title.appendTo(page);
		title.text("Jacketeer 2013 Student Portal");
		title.css({
			textAlign: "center",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "72px"
		});
		
		var introText = $("<p />");
		introText.appendTo(page);
		introText.html("As you probably know, the senior section of the WCHS <em>Jacketeer</em> contains not only your senior picture, but also a favorite quote, your future plans, and your signature. This app will help you submit all of this informaton to us. In order to get started, please log in like you do at a WCHS computer.");
		introText.css({
			fontSize: "28px",
			marginTop: "40px",
			lineHeight: "1.8em",
			textAlign: "justify"
		});
		
		var tableHolder = $("<div />");
		tableHolder.appendTo(page);
		tableHolder.css({
			padding: "50px",
			borderRadius: "20px",
			//backgroundColor: "rgba(255, 249, 90, 0.8)",
            backgroundColor: "rgba(240, 236, 207, 1)",
			marginTop: "30px",
			position: "relative"
		});
		
		var table = $("<table />");
		table.appendTo(tableHolder);
		
		// user row
		var rowUser = $("<tr />");
		rowUser.appendTo(table);
		
		var labelUser = $("<label />");
		labelUser.text("Username:");
		labelUser.attr({
			for: "inputUser"
		});
		labelUser.css({
			fontSize: "34px",
			paddingRight: "20px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			marginRight: "10px"
		});
		
		rowUser.append($("<th />").css("paddingBottom", "20px").append(labelUser));
		
		var inputUser = $("<input type=\"text\" />");
		inputUser.attr({
			name: "inputUser",
			placeholder: "13jpdoe",
			autoCorrect: "off",
			autoCapitalize: "off"
		});
		inputUser.css({
			fontSize: "38px",
			padding: "10px",
			width: "610px"
		});
		
		rowUser.append($("<td />").css("paddingBottom", "20px").append(inputUser));
		
		// password row
		var rowPassword = $("<tr />");
		rowPassword.appendTo(table);
		rowPassword.css({
			paddingBottom: "20px"
		});
		
		var labelPassword = $("<label />");
		labelPassword.text("Password:");
		labelPassword.attr({
			for: "inputPassword"
		});
		labelPassword.css({
			fontSize: "34px",
			paddingRight: "20px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			marginRight: "10px"
		});
		
		rowPassword.append($("<th />").append(labelPassword));
		
		var inputPassword = $("<input type=\"password\" />");
		inputPassword.attr({
			name: "inputPassword"
		});
		inputPassword.css({
			fontSize: "38px",
			padding: "10px",
			width: "610px"
		});
		
		rowPassword.append($("<td />").append(inputPassword));
		
		// login button
		var loginButton = $("<a />");
		loginButton.appendTo(tableHolder);
		loginButton.css({
			position: "absolute",
			top: "30px",
			right: "30px",
			bottom: "30px",
			width: "250px",
			borderRadius: "20px",
			backgroundColor: "rgba(255, 255, 255, 0)",
			fontSize: "96px",
			paddingTop: "50px",
			textAlign: "center",
			textDecoration: "none",
			color: "rgba(0, 0, 0, 0.5)"
		});
		loginButton.click(function() {
			var loadingCover = $("<div />");
			loadingCover.appendTo(container);
			loadingCover.css({
				position: "absolute",
				top: "0px",
				left: "0px",
				right: "0px",
				bottom: "0px",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				zIndex: "100",
				display: "none"
			});
			
			var loadingBox = $("<div />");
			loadingBox.appendTo(loadingCover);
			loadingBox.css({
				position: "absolute",
				top: "50%",
				left: "50%",
				
				width: "400px",
				height: "240px",
				
				marginLeft: "-230px",
				marginTop: "-150px",
				
				backgroundColor: "rgba(255, 255, 255, 1)",
				borderRadius: "20px",
				boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",
				
				padding: "30px"
			});
			
			var loadingImageContainer = $("<p />");
			loadingImageContainer.appendTo(loadingBox);
			loadingImageContainer.css({
				textAlign: "center"
			});
			
			var loadingImage = $("<img />");
			loadingImage.appendTo(loadingImageContainer);
			loadingImage.attr({
				src: "css/assets/loading.gif",
				width: 64,
				height: 64
			});
			
			var loadingText = $("<p />");
			loadingText.appendTo(loadingBox);
			loadingText.css({
				textAlign: "center",
				fontSize: "38px",
				marginTop: "10px"
			});
			loadingText.text("Logging in...");
			
			var cancelButton = $("<input type=\"button\" />");
			cancelButton.appendTo(loadingBox);
			cancelButton.css({
				width: "400px",
				height: "80px",
				fontSize: "24px",
				marginTop: "40px"
			});
			cancelButton.val("Cancel");
			
			loadingCover.fadeIn(500);
			
			// send the request
			var req = $.ajax("https://jacketeer.org/auth/?a=" + (Math.floor(Math.random() * 99999999) + 1), {
				type: "POST",
				data: {user: inputUser.val(), password: inputPassword.val()},
				cache: false
			});
			
			cancelButton.click(function() {
				loadingCover.fadeOut(200);
				req.aborted = true;
				req.abort();
			});
			
			req.done(function(content) {
				if (content.success) {
					var map = {
						user: inputUser.val(),
						firstName: content.firstName,
						lastName: content.lastName,
						email: content.email
					};

					localStorage.loginDetails = JSON.stringify(map);
					
					// load the portal
					setScreen(screenPortal);
				} else {
					navigator.notification.alert("Your username or password was incorrect. Please try again, or visit the iPad Help Desk (room 117) for assistance.", null, "Unsuccessful Login");
					loadingCover.stop(true).hide();
				}
			});
			
			req.fail(function() {
				if (req.aborted) {
					return;
				}
				
				navigator.notification.alert("Connection to the server failed. Please make sure you're connected to the internet or try again later.", function(response) {
					if (response == 1) {
						loginButton.click();
					}
				}, "Connection Problems", "Try Again,Cancel");
				loadingCover.stop(true).hide();
			});
		});
		loginButton.html("&raquo;");
		
		// login by enter on input fields
		$("input[name='inputPassword'], input[name='inputUser']").keypress(function(e) {
			if (e.which == 13) {
				loginButton.click();
				$(this).blur(); // hide the iPad keyboard
				
				e.preventDefault();
				return false;
			}
		});
		
		// username tip at bottom
		var tipText = $("<p />");
		tipText.appendTo(page);
		tipText.html("Your username is the last two digits of your graduation year, followed by your first initial, your middle initial, and your full last name. For example, \"13jpdoe\" for \"John Price Doe\" graduating in 2013. It's the same thing you use to login to computers at WCHS.");
		tipText.css({
			fontSize: "24px",
			marginTop: "40px",
			lineHeight: "1.4em",
			textAlign: "justify"
		});
	}
};

function getLoginDetails() {
	var loginDetails = localStorage["loginDetails"];
	
	if (! loginDetails) {
		return null;
	}
	
	return JSON.parse(loginDetails);
}
