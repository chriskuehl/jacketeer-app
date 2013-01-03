var screenPortal = {
	id: "portal",
	title: "Jacketeer 2013",
	parent: "into",

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var loginDetails = getLoginDetails();
		
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Welcome to the Jacketeer 2013 student app. This app is a virtual artery from your mind directly to yearbook HQ. From here, you can share information, vote on superlatives, order a yearbook, and get assistance. It's like having your own personal Ruff in your pocket. Remember, though: with great power comes great responsibility.");
		
		var boxContainer = $("<div />");
		boxContainer.appendTo(container);
		boxContainer.css({
			border: "solid 2px red",
			margin: "60px",
			marginRight: "0px"
		});
		
		var boxes = [
			{
				title: "My Portrait",
				items: [
					"Submit your name as you want it to appear",
					"Sign your signature next to your portrait",
					"Share your favorite quote with us and your classmates"
				],
				complete: false,
				completable: true
			},
			
			{
				title: "My Voice",
				items: [
					"Hail that which you appreciate at WCHS",
					"Vote for your classmates for senior superlatives",
					"Nominate events or activities that deserve a page"
				],
				complete: false,
				completable: false
			},
			
			{
				title: "My Yearbook",
				items: [
					"Order your yearbook over the phone or on your iPad",
					"Contact a staff members with questions or concerns",
					"Sign for and pick up your yearbook upon release"
				],
				complete: false,
				completable: false
			}
		];
		
		for (var boxIndex = 0; boxIndex < boxes.length; boxIndex ++) {
			var boxData = boxes[boxIndex];
			var box = $("<a />");
			box.appendTo(boxContainer);
			box.css({
				display: "block",
				width: "500px",
				padding: "40px",
				backgroundColor: "rgba(255, 0, 0, 0.2)",
				marginRight: "30px",
				borderRadius: "50px",
				"float": "left"
			});
			
			var header = $("<h1 />");
			header.appendTo(box);
			header.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "48px",
				color: "rgba(0, 0, 0, 0.7)",
				textAlign: "center",
				marginTop: "30px",
				marginBottom: "60px"
			});
			header.text(boxData.title);
			
			var list = $("<ul />");
			list.css({
				listStyleType: "disc",
				marginLeft: "30px"
			});
			list.appendTo(box);
			
			for (var itemIndex = 0; itemIndex < boxData.items.length; itemIndex ++) {
				var item = boxData.items[itemIndex];
				var li = $("<li />");
				li.css({
					fontSize: "32px",
					marginBottom: "15px",
					lineHeight: "1.8em"
				});
				li.appendTo(list);
				li.html(item);
			}
			
			var incomplete = $("<p />");
			incomplete.appendTo(box);
			incomplete.css({
				marginTop: "30px",
				marginBottom: "30px",
				fontSize: "40px",
				color: "rgba(0, 0, 0, .6)",
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				textAlign: "center"
			});
			incomplete.html(boxData.completable ? (boxData.complete ? "COMPLETE" : "INCOMPLETE") : "&nbsp;");
		}
		
		var clear = $("<div />");
		clear.appendTo(boxContainer);
		clear.css("clear", "both");
	}
};
