var screenOrder = {
	id: "order",
	title: "Order Your Yearbook",
	parent: "help",

	titleButton: {
		text: "Back to My Yearbook",
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
		introText.html("To order your yearbook, click the button below and use the school code \"14548\".");
		
		// submit button
		var p = $("<p />");
		p.appendTo(container);
		p.css("textAlign", "center");
		
		var submit = $("<input type=\"button\" />");
		submit.appendTo(p);
		submit.css({
			fontSize: "48px",
			backgroundColor: "rgba(100, 100, 0, 0.1)",
			textAlign: "center",
			marginTop: "60px"
		});
		submit.val("Place an Order");

		submit.click(function () {
			window.location.href = "https://www.yearbookordercenter.com/index.cfm/jobSearch/displayLanding?searchNbr=jobNbr&txtSearchNbr=14548";
		});
		
		/*
		var iframeHolder = $("<div />");
		iframeHolder.css({
			border: "solid 4px rgba(0, 0, 0, 0.5)",
			width: "1800px",
			height: "1200px",
			marginLeft: "auto",
			marginRight: "auto"
		});
		iframeHolder.appendTo(container);
		
		$.post("https://www.yearbookordercenter.com/index.cfm/jobSearch/displayLanding", {searchNbr: "jobNbr", txtSearchNbr: "14548"}, function() {
			var iframe = $("<iframe />");
			iframe.appendTo(iframeHolder);
			iframe.attr({
				src: "https://www.yearbookordercenter.com/index.cfm/Product/index",
				width: iframeHolder.innerWidth(),
				height: iframeHolder.innerHeight(),
				seamless: "seamless"
			});
			
			iframe.load(function() {
				var contents = $(this).contents();
				contents.find('head').append('<meta id="viewport" name="viewport" content="width=device-width; initial-scale=2.0; maximum-scale=3.0; user-scalable=1; minimum-scale=2.0;">');
			});
		});*/

	}
};
