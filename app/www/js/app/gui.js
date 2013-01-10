var ui = [];
var container;

function initInterface() {
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	// create the general interface elements
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

var blocker;

function blockTouchInput() {
	unblockTouchInput();
	
	blocker = $("<div />");
	blocker.appendTo($("body"));
	blocker.css({
		position: "fixed",
		top: "0px",
		left: "0px",
		bottom: "0px",
		right: "0px",
		zIndex: "99999",
		backgroundColor: "rgba(255, 0, 0, 0.4)"
	});
}

function unblockTouchInput() {
	if (blocker) {
		blocker.remove();
	}
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
		ui.titleButton.click(function () {
			screen.titleButton.event();
		});
	} else {
		ui.titleButton.fadeOut(500);
	}

	// render the screen
	screen.setup(container);

	// is a screen already being displayed?
	if (ui.screen != null) {
		blockTouchInput();
		
		// attempt to intelligently switch screens
		if (ui.screen.data("conf") && ui.screen.data("conf").parent == screen.id || screen.id == "intro") { // go "back"
			// the old (current) screen is a child of the new screen, so the old screen should
			// slide out right while the new one (the parent) slides in from the left
			container.css("left", "-" + (ui.screenContainer.width()) + "px");

			container.animate({
				left: "0px"
			}, 500, "swing", null);

			ui.screen.animate({
				left: (ui.screenContainer.width() * 2) + "px"
			}, 500, "swing", function () {
				$(this).remove();
				unblockTouchInput();
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
			}, 500, "swing", function () {
				$(this).remove();
				unblockTouchInput();
			});
		}
	}

	// update current screen 
	ui.screen = container;
}
