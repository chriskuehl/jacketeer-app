var exampleHails = [
	"the class of 2013 for a great year.",
	"Mrs. Basanta for being the best teacher ever.",
	"Mr. Ruff, I guess...",
	"the endless nights, longest days, and the best friends a person could ever have.",
	"chicken patties.",
	"my band family!",
	"Mr. Noble and his dedication to the seniors.",
	"the step team.",
	"Mrs. Hamilton who lovingly destroyed my writing for the better.",
	"the Mastindon for saving me in AP Calc.",
	"the class of 2013! It's our time to shine!",
	"swimming winning regionals 10 years in a row!",
	"being a freak.",
	"Fannin. Best academic team coach ever!",
	"eating way too much junk in yearbook class.",
	"the rest of our lives.",
	"Gangnam Style.",
	"being obsessed.",
	"no-lecture Fridays for being totally useless."
];

var exampleHailIndex = 0;
var hailCounterGlobal = 0;

var screenHailWoodford = {
	id: "hail-woodford",
	title: "Hail Woodford",
	parent: "voice",

	titleButton: {
		text: "My Voice",
		event: function () {
			setScreen(screenVoice);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)"
		});

		var introText2 = $("<h2 />");
		introText2.appendTo(container);
		introText2.css({
			textAlign: "center",
			fontSize: "96px",
			lineHeight: "1.6em",
			margin: "30px",
			marginTop: "100px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText2.html("What do you hail?");
		
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "30px",
			marginLeft: "100px",
			marginRight: "100px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Hail Woodford! There's a lot to hail at this school. Help us pick the best things to nominate by filling in the form below. Don't worry&ndash;you can submit as many as you want. If we like your suggestion (or just need to fill space), we'll include it in the book!");
		
		// name holder
		var nameHolder = $("<div />");
		nameHolder.appendTo(container);
		nameHolder.css({
			marginLeft: "auto",
			marginRight: "auto",
			width: "1800px"
		});
		
		var nameLabel = $("<p />");
		nameLabel.css({
			fontSize: "58px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			color: "rgba(0, 0, 0, 0.5)"
		});
		nameLabel.appendTo(nameHolder);
		nameLabel.html("Hail to: ");

		// name
		var inputName = $("<input type=\"text\" />");
		inputName.appendTo(nameLabel);
		inputName.attr({
			name: "inputName",
			placeHolder: randomPlaceholderHail(),
			autoCorrect: "on",
			autoCapitalize: "off"
		});
		inputName.css({
			width: "1150px",
			marginLeft: "30px",
			marginRight: "10px",
			padding: "20px",
			fontSize: "48px"
		});
		inputName.val(name);

		// submit
		var submit = $("<input type=\"button\" />");
		submit.appendTo(nameLabel);
		submit.css({
			fontSize: "48px",
			marginLeft: "20px",
			padding: "20px 60px"
		});
		submit.val("Submit");

		submit.click(function () {
			// validate the name they've entered
			var valid = true;
			var invalidReason;

			var text = inputName.val().trim();

			if (text.length < 1) {
				valid = false;
				invalidReason = "Please enter something to hail.";
			}

			if (!valid) {
				return navigator.notification.alert(invalidReason, null, "Invalid Message", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "hail.php",
				data: {
					user: getLoginDetails().user,
					token: localStorage.loginToken,
					text: text
				}
			});
		});

		// submit by enter on input field
		inputName.keypress(function (e) {
			if (e.which == 13) {
				submit.click();
				$(this).blur(); // hide the iPad keyboard

				e.preventDefault();
				return false;
			}
		});

		
		var div = $("<div />");
		div.appendTo(container);
		div.css({
			marginTop: "100px",
			padding: "40px",
			height: "250px",
			width: "1800px",
			marginLeft: "auto",
			marginRight: "auto",
			backgroundColor: "rgba(253, 249, 207, 1)",
			// borderRadius: "15px",
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

function randomPlaceholderHail() {
	var randomHails = [
		"all the yerds I used to know",
		"bonfires of proof pages",
		"Adobe InDesign and Photoshop",
		"missing deadlines & missing links",
		"9.1 TB of available storage space",
		"the on-the-fly T3i",
		"an infinite supply of SD cards (hah)"
	];
	
	return randomHails[Math.floor(Math.random() * randomHails.length)];
}
