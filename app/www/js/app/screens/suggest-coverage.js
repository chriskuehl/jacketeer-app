var screenSuggestCoverage = {
	id: "suggest-coverage",
	title: "Suggest Coverage",
	parent: "voice",

	titleButton: {
		text: "My Voice",
		event: function () {
			setScreen(screenVoice);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
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
		introText.html("What do you think the yearbook needs more of? For best results, give us a heads-up before the book is set in dead-tree form. You can fill out the form below to submit suggestions to us. Include details about the activity, including the time and date (if applicable). Thanks for your input in this year's Jacketeer!");
		
		// text field
		var textAreaHolder = $("<div />");
		textAreaHolder.appendTo(container);
		textAreaHolder.css({
			textAlign: "center"
		});

		var textArea = $("<textarea />");
		textArea.appendTo(textAreaHolder);
		textArea.css({
			width: "1600px",
			height: "500px",
			fontSize: "44px",
			padding: "20px",
			lineHeight: "1.6em"
		});
		textArea.attr({
			placeholder: "Fill in the details of your suggestion here..."
		});
		textArea.val("");

		// submit button
		var submit = $("<input type=\"button\" />");
		submit.appendTo(textAreaHolder);
		submit.css({
			fontSize: "44px",
			textAlign: "center",
			marginTop: "100px",
			padding: "20px 60px"
		});
		submit.val("Submit Suggestion");

		submit.click(function () {
			var suggestion = textArea.val();

			if (suggestion.length <= 0) {
				return navigator.notification.alert("Please fill in a suggestion! If you're not ready to submit your suggestion, hit cancel at the top-right of the screen.", null, "Empty Suggestion", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "suggest-coverage.php",
				data: {
					user: getLoginDetails().user,
					token: localStorage.loginToken,
					suggestion: suggestion
				}
			});
		});

	}
};
