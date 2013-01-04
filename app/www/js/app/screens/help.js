var screenHelp = {
	id: "help",
	title: "My Yearbook: Ordering and Support",
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
		introText.html("Having trouble with your yearbook order? Got a question for the yearbook advisor? Have you decided it's time to order your book? You're in the right place!");
	}
};
