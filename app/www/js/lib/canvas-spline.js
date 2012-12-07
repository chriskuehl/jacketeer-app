function getControlPoints(x0,y0,x1,y1,x2,y2,t){
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
    
    return [[p1x, p1y], [p2x, p2y]]
}


function drawSpline(ctx, points, tension, closed){
	// preparations/initializations
    ctx.save();
    
    var controlPoints = []; // array of control points, as x0,y0,x1,y1,...

    // draw an open curve, not connected at the ends
    for (var i = 0; i < points.length - 2; i ++){
    	// var pointA = points[i - 1]; // previous point
    	var pointB = points[i]; // current point
    	var pointC = points[i + 1]; // next point
    	var pointD = points[i + 2]; // next-next point
    	
        controlPoints = controlPoints.concat(getControlPoints(pointB[0], pointB[1], pointC[0], pointC[1], pointD[0], pointD[1], tension));
    }
    
    for (var i = 1; i < points.length - 2; i ++) {
    	var pointB = points[i]; // current point
    	var pointC = points[i + 1]; // next point
    	
    	var controlPointA = controlPoints[i * 2 - 1]; // previous control point
    	var controlPointB = controlPoints[i * 2]; // current control point
    	var controlPointC = controlPoints[i * 2 + 1]; // next control point
    
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(pointB[0], pointB[1]);
        ctx.bezierCurveTo(controlPointA[0], controlPointA[1], controlPointB[0], controlPointB[1], pointC[0], pointC[1]);
        ctx.stroke();
        ctx.closePath();
    }
    
    //  use a simple quadratic (as opposed to a bezier curve) for the first and last curves
    /* ctx.strokeStyle= "black";
    ctx.beginPath();
    ctx.moveTo(pts[0],pts[1]);
    ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);
    ctx.stroke();
    ctx.closePath();
    
    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.moveTo(pts[n-2],pts[n-1]);
    ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);
    ctx.stroke();
    ctx.closePath(); */
    
    // cleanup
    ctx.restore();
}
