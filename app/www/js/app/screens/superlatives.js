var superlativeChooseCover, superlativeTitleText, superlativeGenderText, superlativeStudentListScroll, studentListBlankElement, studentListContainer, superlativeIsMale, superlativeSelected;

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

		/*
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
		*/
		
		var headerTable = $("<table />");
		headerTable.appendTo(container);
		headerTable.css({
			margin: "32px",
			marginTop: "50px"
		});
		
		var headerRow = $("<th />");
		headerRow.appendTo(headerTable);
		
		var c1 = $("<td />");
		c1.appendTo(headerRow);
		c1.css({
			width: "580px"
		});
		c1.text("");
		
		var c2 = $("<td />");
		c2.appendTo(headerRow);
		c2.css({
			width: "700px",
			fontSize: "60px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			color: "rgba(0, 0, 0, 0.8)"
		});
		c2.text("MALE");
		
		var c3 = $("<td />");
		c3.appendTo(headerRow);
		c3.css({
			width: "700px",
			fontSize: "60px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			color: "rgba(0, 0, 0, 0.8)"
		});
		c3.text("FEMALE");
		
		var tableHolder = $("<div />");
		tableHolder.appendTo(container);
		tableHolder.attr("id", "superlativesHolder");
		tableHolder.css({
			overflow: "auto",
			width: "1980px",
			height: "1070px",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "0px",
            //border: "solid 2px rgba(150, 150, 150, 1)",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
		});
		
		var table = $("<table />");
		table.appendTo(tableHolder);
		
		var superlatives = superlativeCategories;
		
		for (var i = 0; i < superlatives.length; i ++) {
			var superlative = superlatives[i];
			var row = $("<tr />");
			if ((i % 2) == 0) {	 	
				row.css("backgroundColor", "rgba(255, 255, 0, 0.1)");
			}
			row.appendTo(table);
			
			var d1 = $("<td />");
			d1.appendTo(row);
			d1.text(superlative[0]);
			d1.css({
				width: "540px",
				fontSize: "42px",
				textAlign: "center",
				padding: "20px",
				fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
				verticalAlign: "middle",
				color: "rgba(0, 0, 0, 0.8)"
			});
			
			// male, female
			for (var j = 0; j < 2; j ++) {
				var selectedStudent = superlative[1 + j];
				
				var cell = $("<td />");
				cell.appendTo(row);
				cell.css({
					width: "660px",
					padding: "20px",
					verticalAlign: "middle"
				});
				
				var button = $("<a />");
				button.appendTo(cell);
				button.css({
					borderRadius: "15px",
					display: "block",
					padding: "40px",
					textAlign: "center",
					fontSize: "32px",
					border: "solid 2px rgba(150, 150, 150, 1)",
					boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
					boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
					backgroundColor: "rgba(253, 249, 207, 0.2)",
				});
				// button.addClass("buttonGrad");
				
				if (selectedStudent == null) {
					button.text("tap to select");
				} else {
					button.text(selectedStudent);
					button.css("fontFamily", "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"");
				}
				
				button.data("superlative", superlative[0]);
				button.data("isMale", (j == 0));
				
				button.click(function() {
					var superlative = $(this).data("superlative");
					var isMale = $(this).data("isMale");
					
					superlativeChooseStudent(superlative, isMale);
				});
			}
		}
		
		// let the list of superlatives scroll
		var superlativesScroll = new iScroll("superlativesHolder", {bounce: false});
		
		// http://stackoverflow.com/questions/9210178/why-cant-i-click-input
		superlativesScroll.options.onBeforeScrollStart = function(e) {                
			var target = e.target;

			while (target.nodeType != 1) target = target.parentNode;
			if (target.tagName != 'A') {
				e.preventDefault();
			}
		};
		
		// help text at bottom
		var helpText = $("<p />");
		helpText.appendTo(container);
		helpText.css({
			textAlign: "center",
			fontSize: "36px",
			lineHeight: "1.6em",
			color: "rgba(0, 0, 0, 0.6)",
			fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\"",
			marginLeft: "40px",
			marginRight: "40px",
			marginTop: "20px"
		});
		helpText.html("Scroll the area above to see all possible superlatives. Tap a button to nominate a student (or to change your current selection). All superlatives are optional. If you can't think of a good match, just leave it blank.");
		
		// "choose student" window
		superlativeChooseCover = $("<div />");
		superlativeChooseCover.appendTo(container);
		superlativeChooseCover.css({
			position: "absolute",
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			zIndex: "100",
			display: "none"
		});

		var superlativeChooseBox = $("<div />");
		superlativeChooseBox.appendTo(superlativeChooseCover);
		superlativeChooseBox.css({
			position: "absolute",
			top: "50%",
			left: "50%",

			width: "820px",

			marginLeft: "-440px",
			marginTop: "-350px",

			backgroundColor: "rgba(255, 255, 255, 1)",
			borderRadius: "20px",
			boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",

			padding: "30px"
		});

		superlativeTitleText = $("<h3 />");
		superlativeTitleText.appendTo(superlativeChooseBox);
		superlativeTitleText.css({
			textAlign: "center",
			fontSize: "46px",
			marginTop: "10px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			marginBottom: "30px"
		});

		superlativeGenderText = $("<h3 />");
		superlativeGenderText.appendTo(superlativeChooseBox);
		superlativeGenderText.css({
			textAlign: "center",
			fontSize: "32px",
			marginTop: "10px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			marginBottom: "30px",
			color: "rgba(0, 0, 0, 0.6)"
		});
		
		var searchBox = $("<input type=\"text\" />");
		searchBox.appendTo(superlativeChooseBox);
		searchBox.attr({
			placeholder: "Start typing a name...",
			autoCorrect: "off",
			autoCapitalize: "off"
		});
		searchBox.css({
			fontSize: "38px",
			padding: "10px",
			width: "800px"
		});
		
		searchBox.bind("keyup keydown", function() {
			updateStudentFilter($(this).val(), superlativeIsMale);
		});
		
		var studentListWrapper = $("<div />");
		studentListWrapper.attr("id", "studentListWrapper");
		studentListWrapper.appendTo(superlativeChooseBox);
		studentListWrapper.css({
			border: "solid 3px rgba(0, 0, 0, 0.3)",
			marginTop: "30px",
			overflow: "auto",
			width: "820px",
			height: "300px",
			marginBottom: "30px"
		});
		
		
		
		studentListContainer = $("<div />");
		studentListContainer.appendTo(studentListWrapper);

		var cancelButton = $("<input type=\"button\" />");
		cancelButton.appendTo(superlativeChooseBox);
		cancelButton.css({
			width: "820px",
			height: "80px",
			fontSize: "24px"
		});
		cancelButton.val("Cancel");
		cancelButton.click(function () {
			superlativeChooseCover.fadeOut(200);
		});
		
		superlativeChooseStudent("Most Likely to Rule the World", true);
	}
};

function superlativeChooseStudent(superlative, isMale) {
	superlativeSelected = superlative;
	superlativeIsMale = isMale;
	superlativeTitleText.text(superlative);
	superlativeGenderText.text(isMale ? "Male" : "Female");

	updateStudentFilter("", isMale);
	
	superlativeChooseCover.fadeIn(200);
}

function setupStudentListScroll() {
	if (superlativeStudentListScroll) {
		return; // has already been setup
	}
	
	// let the list of students scroll
	// TODO: reduce duplicate code
	superlativeStudentListScroll = new iScroll("studentListWrapper", {bounce: false});
	
	// http://stackoverflow.com/questions/9210178/why-cant-i-click-input
	superlativeStudentListScroll.options.onBeforeScrollStart = function(e) {                
		var target = e.target;

		while (target.nodeType != 1) target = target.parentNode;
		if (target.tagName != 'A') {
			e.preventDefault();
		}
	};
}

function studentMatchesQuery(query, student) {
	if (query == "" || query == null) {
		return true;
	}
	
	query = query.toLowerCase();
	
	var possibilities = [
		student.FirstName + " " + student.LastName,
		student.FirstName + student.LastName,
		student.LastName + ", " + student.FirstName,
		student.LastName + " " + student.FirstName,
		student.LastName + student.FirstName,
		student.FirstName + " " + student.MiddleName + " " + student.LastName
	];
	
	for (var i = 0; i < possibilities.length; i ++) {
		var possibility = possibilities[i].toLowerCase();
		
		if (possibility.startsWith(query)) {
			return true;
		}
	}
	
	return false;
}

function updateStudentFilter(query, isMale) {
	setupStudentListScroll();
	
	studentListContainer.empty();
	
	var j = 0;
	for (var studentIndex = 0; studentIndex < studentList.length; studentIndex ++) {
		var student = studentList[studentIndex];
		
		if (student.IsMale == isMale && student.FirstName != userInfo.FirstName && student.LastName != userInfo.LastName && studentMatchesQuery(query, student)) {
			var studentRow = $("<a />");
			studentRow.appendTo(studentListContainer);
			studentRow.css({
				display: "block",
				padding: "16px",
				fontSize: "48px"
			});
			
			if ((j % 2) == 0) {
				studentRow.css("backgroundColor", "rgba(255, 255, 0, 0.1)");
			}
			
			studentRow.data("student", student);
			studentRow.text(student.LastName + ", " + student.FirstName);
			
			studentRow.click(function() {
				var student = $(this).data("student");
				navigator.notification.alert("Are you sure you want to nominate " + student.FirstName + " " + student.LastName + " for " + superlativeSelected + " (" + (superlativeIsMale ? "male" : "female") + ")?", function (response) {
					if (response == 1) {
						superlativeChooseCover.fadeOut(200);
					}
				}, "Confirm Nomination", "Nominate,Cancel");
			});
			
			j ++;
		}
	}
	
	setTimeout(function() {
		superlativeStudentListScroll.refresh();
	}, 1000);
}
