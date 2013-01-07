var superlativeCategories = [
	"Best Smile",
	"Most Original",
	"Most School Spirit",
	"Class Clown",
	"Most Friendly",
	"Most Artistic",
	"Best Ride",
	"Worst Case of Senioritis",
	"Teacher's Pet",
	"Most Athletic",
	"Most Sarcastic",
	"Worst Driver",
	"Most Flirtatious",
	"Most Likely to Be Famous",
	"Most Likely to Travel the world",
	"Most likely to live with Their Parents in 20 Years",
	"Best Dance Moves",
	"Most Likely to Get a Useless Degree",
	"Most Likely to Succeed",
	"Most Likely to Make a Time Machine",
	"Most Likely to Steal a Time Machine",
	"Most Likely to Go on Jersey Shore",
	"Most Likely to Trip UP the Stairs",
	"Best Should-Have-Been Couple",
	"Best Body",
	"Best Dressed",
	"Best All-Around",
	"Most Twitter-Active",
	"Most Changed",
	"Most Likely to Rule the World",
	"Most Likely to Get a Ticket",
	"Most Likely to Be a Reality TV Star",
	"Best Person with Which to Share a Desert Island",
	"Best Hair",
	"Most Tardies",
	"Most Likely to Dissapear after High School",
	"Most Hours Spent at School"
];

var screenSuperlatives = {
	id: "superlatives",
	title: "Senior Superlatives",
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
		introText.html("SENIOR SUPERLATIVES");

	}
};
