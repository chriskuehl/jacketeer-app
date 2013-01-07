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
		introText.html("HAIL WOODFORD");

	}
};
