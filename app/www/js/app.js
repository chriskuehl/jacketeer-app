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
}

function updateTitle(newTitle) {
	if (newTitle != null) {
		$("title").text(newTitle);
	}
	
	ui.titleBarText.text($("title").text());
}
