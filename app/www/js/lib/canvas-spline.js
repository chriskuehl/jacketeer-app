function getControlPoints(x0, y0, x1, y1, x2, y2, t, pointB) {
	//  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
	//  x2,y2 is the next knot -- not connected here but needed to calculate p2
	//  p1 is the control point calculated here, from x1 back toward x0.
	//  p2 is the next control point, calculated here and returned to become the 
	//  next segment's p1.
	//  t is the 'tension' which controls how far the control points spread.

	//  Scaling factors: distances from this knot to the previous and following knots.
	var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
	var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

	var fa = t * d01 / (d01 + d12);
	var fb = t - fa;

	var p1x = x1 + fa * (x0 - x2);
	var p1y = y1 + fa * (y0 - y2);

	var p2x = x1 - fb * (x0 - x2);
	var p2y = y1 - fb * (y0 - y2);

	return [[
		[p1x, p1y],
		[p2x, p2y], pointB[2]
	]];
}


function drawSpline(ctx, points, tension, closed) {
	// preparations/initializations
	ctx.save();
	
	// are there at least 3 points for a curve?
	if (points.length < 3) {
		if (points.length > 1) {
			// draw a simple quadratic if possible
			ctx.lineWidth = 15;
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(points[0][0], points[0][1]);
			ctx.quadraticCurveTo(points[0][0], points[0][1], points[1][0], points[1][1]);
			ctx.stroke();
			ctx.closePath();
		} else {
			// just plot a point
			ctx.beginPath();
			ctx.arc(points[0][0], points[0][1], 7, 0, 2 * Math.PI, true);
			ctx.fill();
		}
		
		ctx.restore();
		return;
	}
	
	// draw the curve
	var controlPoints = []; // array of control points, as x0,y0,x1,y1,...

	// calculate the control points necessary for the curve
	for (var i = 0; i < points.length - 2; i++) {
		// var pointA = points[i - 1]; // previous point
		var pointB = points[i]; // current point
		var pointC = points[i + 1]; // next point
		var pointD = points[i + 2]; // next-next point

		controlPoints = controlPoints.concat(getControlPoints(pointB[0], pointB[1], pointC[0], pointC[1], pointD[0], pointD[1], tension, pointB));
	}

	// draw the curve
	var oldPenSize = 15;

	for (var i = 1; i < points.length - 2; i++) {
		var vPoints = [];
		var vTotal = 0;

		if ((i - 1) > 0) {
			//	vPoints.push(points[i - 1]);
		}

		for (var j = (-10); j < 0; j++) {
			var idx = i + j;

			if (idx < 0 || idx >= points.length) {
				vPoints.push(null);
				vTotal += 15;
				continue;
			}

			vTotal += points[idx][2];
			vPoints.push(points[idx]);
		}

		var pointA = points[i - 1]; // prev point
		var pointB = points[i]; // current point
		var pointC = points[i + 1]; // next point
		var pointD = points[i + 2]; // next-next point

		var controlPointA = controlPoints[i - 1][1]; // previous control point
		var controlPointAA = controlPoints[i - i];
		var controlPointB = controlPoints[i][0]; // current control point
		var controlPointBB = controlPoints[i];

		var velocity = vTotal / vPoints.length; // Math.pow(pointB[2], 1);

		//var velocity = Math.max(pointB[2], pointC[2]);
		//velocity = Math.pow(velocity, 0.5); // // velocity ranges from like 0 to 400
		var penSize = 200 / velocity;

		penSize = Math.min(15, Math.max(penSize, 8));
		//penSize = (oldPenSize + penSize) / 2;
		//penSize = 15;
		
		var maxChange = 2;
		
		if ((oldPenSize - penSize) > maxChange) { // decreasing in size
			penSize = Math.max(penSize, oldPenSize - maxChange);
		} else if ((oldPenSize - penSize) < (- maxChange)) { // increasing in size
			penSize = Math.min(penSize, oldPenSize + maxChange);
		}

		oldPenSize = penSize;

		ctx.lineWidth = penSize;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(pointB[0], pointB[1]);
		ctx.bezierCurveTo(controlPointA[0], controlPointA[1], controlPointB[0], controlPointB[1], pointC[0], pointC[1]);
		ctx.stroke();
		ctx.closePath();
	}

	//  use a simple quadratic (as opposed to a bezier curve) for the first and last curves
	try {
		var startPoint = points[0];
		var secondPoint = points[1];
		var secondSecondEndPoint = points[points.length - 3];
		var secondEndPoint = points[points.length - 2];
		var endPoint = points[points.length - 1];

		// draw first point curve
		ctx.lineWidth = 15;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(startPoint[0], startPoint[1]);
		ctx.quadraticCurveTo(controlPoints[0][0][0], controlPoints[0][0][1], secondPoint[0], secondPoint[1]);
		ctx.stroke();
		ctx.closePath();

		// draw last point curve
		ctx.lineWidth = oldPenSize;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(secondEndPoint[0], secondEndPoint[1]);
		ctx.quadraticCurveTo(secondEndPoint[0], secondEndPoint[1], endPoint[0], endPoint[1]);
		ctx.stroke();
		ctx.closePath();
		
		// plot circles at the endpoints
		ctx.beginPath();
		ctx.arc(startPoint[0], startPoint[1], 7.5, 0, 2 * Math.PI, true);
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(endPoint[0], endPoint[1], oldPenSize / 2, 0, 2 * Math.PI, true);
		ctx.fill();
	} catch (ex) {

	}

	// cleanup
	ctx.restore();
}
