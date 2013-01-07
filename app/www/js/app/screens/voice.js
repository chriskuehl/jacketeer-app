var screenVoice = {
	id: "voice",
	title: "My Voice in Jacketeer",
	parent: "portal",

	titleButton: {
		text: "Back to Portal",
		event: function () {
			setScreen(screenPortal);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
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
		introText.html("It's your yearbook, and you deserve a voice! Complete the optional sections below to share your thoughts, opinions, and deepest secrets.");

		var superlativesBox = $("<div />");
		superlativesBox.appendTo(container);
		superlativesBox.css({
			width: "1800px",
			border: "solid 2px rgba(0, 0, 0, 0.3)",
			padding: "40px",
			borderRadius: "15px",
			backgroundColor: "rgba(253, 249, 207, 1)",
            boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
            boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
			marginLeft: "auto",
			marginRight: "auto",
			overflow: "hidden"
		});
		superlativesBox.click(function() {
			setScreen(screenSuperlatives);
		});
		
		var header = $("<h2 />");
		header.appendTo(superlativesBox);
		header.css({
			textAlign: "center",
			fontSize: "44px",
			marginBottom: "20px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
		});
		header.text("Senior Superlatives");
		
		superlativesList = $("<div />");
		superlativesList.appendTo(superlativesBox);
		superlativesList.css({ 
			// backgroundColor: "rgba(255, 255, 255, 1)",
			height: "400px",
			position: "relative"
		});
		
		for (var j = 0; j < 7; j ++) {
			stepSuperlativeList(true);
		}
		
		stepSuperlativeList();
		
		var superlativesTip = $("<p />");
		superlativesTip.appendTo(superlativesBox);
		superlativesTip.css({
			textAlign: "center",
			fontSize: "30px"
		});
		superlativesTip.text("Tap here to submit your picks for senior superlatives.");
		
		var boxes = [
			{
				title: "Yearbook Coverage",
				description: "Are we missing something? We're only human, so we need your help! Let us know about any events or activities that you think we should include in the yearbook (note: all recommendations must be received prior to the book's release).",
				screen: screenSuggestCoverage
			},
			
			{
				title: "Hail Woodford",
				description: "Is there something about Woodford County that makes you bubble up with pride? Do you feel like shouting praise from the highest mountain in Versailles? Tell us what you hail about Woodford County and we'll include it (anonymously) in the book!",
				screen: screenHailWoodford
			}
		];
		
		for (var i = 0; i < boxes.length; i ++) {
			var box = boxes[i];
			var div = $("<div />");
			div.appendTo(container);
			div.css({
				"float": "left",
				marginTop: "40px",
				marginLeft: "80px",
				marginRight: "-40px",
				padding: "40px",
                backgroundColor: "rgba(253, 249, 207, 1)",
				borderRadius: "15px",
                border: "solid 2px rgba(150, 150, 150, 1)",
                boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
                boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
				width: "838px"
			});
			div.data("screen", box.screen);
			div.click(function() {
				setScreen($(this).data("screen"));
			});
			
			var h2 = $("<h2 />");
			h2.text(box.title);
			h2.appendTo(div);
			h2.css({
				textAlign: "center",
				fontSize: "44px",
				marginBottom: "20px",
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\""
			});
			
			var description = $("<p />");
			description.text(box.description);
			description.appendTo(div);
			description.css({
				fontSize: "32px",
				color: "rgba(0, 0, 0, 0.7)",
				lineHeight: "1.5em",
				textAlign: "justify"
			});
		/*
			var superlativesTip = $("<p />");
			superlativesTip.appendTo(div);
			superlativesTip.css({
				textAlign: "center",
				fontSize: "30px",
				color: "rgba(0, 0, 0, 0.5)",
				marginTop: "30px"
			});
			superlativesTip.text("Tap here.");*/
		}
	}
};

function stepSuperlativeList(initial) {
	if (ui.screen && ui.screen.data("conf").id != "voice") {
	//	return;
	}
	
	var newItem = $("<div />");
	newItem.css({
		fontSize: (Math.floor(Math.random() * 60) + 22) + "px",
		position: "absolute",
		top: (Math.floor(Math.random() * (superlativesList.height() - 80))) + "px",
		left: (initial ? (((Math.random() * 4000) - 2000)) : 2000) + "px",
		width: "2000px",
		opacity: (Math.random()),
		textAlign: "right"
	});
	newItem.text(superlativeCategories[Math.floor(Math.random() * superlativeCategories.length)]);
	newItem.appendTo(superlativesList);
	newItem.animate({
		left: (-2000) + "px"
	}, initial ? (((Math.random() * 4000) + 3000) * ((newItem.position().left + 2000) / 4000)) : ((Math.random() * 4000) + 3000), "linear", function() {
		$(this).remove();
	});
	
	if (! initial) {
		setTimeout(stepSuperlativeList, Math.random() * 1000);
	}
}
