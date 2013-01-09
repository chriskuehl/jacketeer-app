var exampleHails = [
	"Mrs. Marks for helping me grow as an artist :).",
	"Mr. Ruff and the yearbook staff for creating a wonderful way to remember my high-school years.",
	"Daniels, Cunliffe, and Pollock. Stealing shopping carts, running shirtless, and mumble.",
	"Mrs. Porter, the best teacher I ever had.",
	"the last day of school!",
	"Ralph.",
	"all the people in my class!",
	"Mrs. Swinford, for all the help she gave me.",
	"Coach Parrett...for making my four years as a baseball player here memorable.",
	"Coach Carr Sr.",
	"Mrs. Hamilton for helping me improve my writing.",
	"the chaos crew.",
	"the class of 2012, the greatest class anyone could have asked for.",
	"the rides down country roads.",
	"Mr. Mastin, Mrs. Turner, and Mrs. Hamilton; their combined efforts and time have made an enormous impact on my success.",
	"Mrs. Taylor.",
	"everything and all things, especially the Shady Crew +1!",
	"the haters.",
	"the K-Mart parking lot!",
	"all the hail I raised.",
	"Mr. Mastin.",
	"nacho day.",
	"my parents for everything they've done for me.",
	"those who never stopped believing in me.",
	"Mrs. Thacker; we miss you...",
	"tech school, for making the rest of the day tolerable.",
	"the band for being my family!"
];

var exampleHailIndex = 0;
var hailCounterGlobal = 0;

var screenHailWoodford = {
	id: "hail-woodford",
	title: "Hail Woodford",
	parent: "voice",

	titleButton: {
		text: "Back to My Voice",
		event: function () {
			setScreen(screenVoice);
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
		introText.html("Hail Woodford! There's a lot to hail at this school. Help us pick the best things to nominate by filling in the form below. Don't worry&ndash;you can submit as many as you want. If we like your suggestion (or just need to fill space), we'll include it in the book!");
		
		var div = $("<div />");
		div.appendTo(container);
		div.css({
			marginTop: "40px",
			padding: "40px",
			height: "250px",
			width: "1800px",
			marginLeft: "auto",
			marginRight: "auto",
			backgroundColor: "rgba(253, 249, 207, 1)",
			// borderRadius: "15px",
			border: "solid 2px rgba(150, 150, 150, 1)",
			boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
			boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
			fontSize: "72px",
			lineHeight: "1em",
			color: "rgba(0, 0, 0, 0.65)",
			position: "relative"
		});
		
		var hailMessage = $("<p />");
		hailMessage.attr("id", "hailMessageWrapper");
		hailMessage.css({
			fontSize: "48px"
		});
		hailMessage.appendTo(div);
		hailMessage.html("<span style=\"font-family: HelveticaNeue-Bold; color: rgba(0, 0, 0, 0.3)\">Hail to</span> <span id=\"hailMessage\">" + exampleHails[0] + "</span>");
		
		var hailTip = $("<p />");
		hailTip.appendTo(div);
		hailTip.css({
			position: "absolute",
			bottom: "0px",
			left: "30px",
			color: "rgba(0, 0, 0, 0.4)",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "24px"
		});
		hailTip.text("example from last year's yearbook");
		
		hailCounterGlobal ++;
		startExampleHailTimer(hailCounterGlobal, exampleHails[0].length);
	}
};

function startExampleHailTimer(hailCounter, messageLength) {
	if (hailCounter != hailCounterGlobal) {
		return; // another timeout must have started
	}
	
	setTimeout(function() {
		exampleHail(hailCounter);
	}, 1500 + (messageLength * 20));
}

function exampleHail(hailCounter) {
	exampleHailIndex ++;
	var text = exampleHails[exampleHailIndex % exampleHails.length];
	
	$("#hailMessageWrapper").fadeOut(200, function() {
		$("#hailMessage").text(text);
		$("#hailMessageWrapper").fadeIn(200, function() {
			startExampleHailTimer(hailCounter, text.length);
		});
	});
}
