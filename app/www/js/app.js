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
	setScreen(screenIntro);
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
	container.appendTo(ui.screenContainer);
	container.addClass("screen");
	container.attr({
		id: targetID
	});
	
	// general changes
	updateTitle(screen.title);
	
	// render the screen
	screen.setup(container);
}

var screenIntro = {
	id: "intro",
	title: "Jacketeer 2013",
	
	setup: function(container) {
		container.css({
			backgroundColor: "rgba(0, 0, 0, 0.3)"
		});
		
		var page = $("<div />");
		page.appendTo(container);
		page.css({
			backgroundColor: "rgba(255, 255, 255, 0.7)",
			
			borderRadius: "15px",
			padding: "80px",
			
			position: "absolute",
			top: "50%",
			left: "50%",
			
			width: "1200px",
			height: "800px",
			
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
		introText.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat lorem eget diam accumsan malesuada. Praesent convallis urna tincidunt nunc auctor in interdum est aliquam. Sed euismod turpis non dolor egestas pellentesque. Duis hendrerit nibh metus, a ornare quam. Etiam volutpat lacus in arcu iaculis fermentum. Proin gravida pellentesque velit vel consectetur.");
		introText.css({
			fontSize: "28px",
			marginTop: "30px",
			lineHeight: "1.8em",
			textAlign: "justify"
		});
	}
};