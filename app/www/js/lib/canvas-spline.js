function getControlPoints(x0,y0,x1,y1,x2,y2,t, pointB){
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the 
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.
    
    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
   
    var fa=t*d01/(d01+d12);
    var fb=t-fa;
  
    var p1x=x1+fa*(x0-x2);
    var p1y=y1+fa*(y0-y2);

    var p2x=x1-fb*(x0-x2);
    var p2y=y1-fb*(y0-y2);  
    
    return [[[p1x, p1y], [p2x, p2y], pointB[2]]];
}


function drawSpline(ctx, points, tension, closed){
	// preparations/initializations
    ctx.save();
    
    var controlPoints = []; // array of control points, as x0,y0,x1,y1,...

    // calculate the control points necessary for the curve
    for (var i = 0; i < points.length - 2; i ++){
    	// var pointA = points[i - 1]; // previous point
    	var pointB = points[i]; // current point
    	var pointC = points[i + 1]; // next point
    	var pointD = points[i + 2]; // next-next point
    	
        controlPoints = controlPoints.concat(getControlPoints(pointB[0], pointB[1], pointC[0], pointC[1], pointD[0], pointD[1], tension, pointB));
    }
    
    // draw the curve
    var oldPenSize = 15;
    
    for (var i = 1; i < points.length - 2; i ++) {
    	var pointB = points[i]; // current point
    	var pointC = points[i + 1]; // next point
    	
    	var controlPointA = controlPoints[i - 1][1]; // previous control point
    	var controlPointAA = controlPoints[i - i];
    	var controlPointB = controlPoints[i][0]; // current control point
    	var controlPointBB = controlPoints[i];
    	
    	var velocity = Math.max(controlPointAA[2], controlPointBB[2]);
    	var penSize = 1 / velocity;
    	
    	penSize = Math.min(10, Math.max(penSize, 5));
    	penSize = (oldPenSize + penSize) / 2;
    	
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
    // TODO: clean this up
    try {
	    var startPoint = points[0];
	    var secondPoint = points[1];
	    var secondSecondEndPoint = points[points.length - 3];
	    var secondEndPoint = points[points.length - 2];
	    var endPoint = points[points.length - 1];
	    
	    ctx.lineWidth = 15;
	    ctx.strokeStyle= "black";
	    ctx.beginPath();
	    ctx.moveTo(startPoint[0], startPoint[1]);
	    ctx.quadraticCurveTo(controlPoints[0][0][0], controlPoints[0][0][1], secondPoint[0], secondPoint[1]);
	    ctx.stroke();
	    ctx.closePath();
	    
	    var n = points.length;
	    /*
	    ctx.lineWidth = 10;
	    ctx.strokeStyle="black";
	    ctx.beginPath();
	    ctx.moveTo(endPoint[0], endPoint[1]); // second-second-last element x/y
	    ctx.quadraticCurveTo(secondSecondEndPoint[0], secondSecondEndPoint[1], secondEndPoint[0], secondEndPoint[1]); //pts[n-4],pts[n-3]);
	    ctx.stroke();
	    ctx.closePath();
	    */
    } catch (ex) {
	    
    }
    
    // cleanup
    ctx.restore();
}
