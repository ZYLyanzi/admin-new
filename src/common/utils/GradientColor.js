function GradientColor(){
    var map, canvas, canvasfg, setTimeBox=[], lineArr=[], polylineArr=[], pointList = [],lineCenter = [113.815355, 22.685378], imgStart, imgEnd, imgRun ;
	imgStart = new Image()
    imgStart.src = './images/start.png'
    imgStart.width = 19
    imgStart.height = 23
    imgEnd = new Image()
    imgEnd.src = './images/end.png'
    imgEnd.width = 19
    imgEnd.height = 23   
	imgRun = new Image()
    imgRun.src = './images/dot.png'
    imgRun.width = 21
    imgRun.height = 22  
	function onRender() {
	    draw();
	}
	var polylineContext ;
	var polylineContextFG;
	function draw_trail() {
	  map = new AMap.Map("container", {//创建地图
	      resizeEnable: false,
	      dragEnable: false,
	      keyboardEnable: false,
	      doubleClickZoom: false,
	      zoomEnable:false,
	      center: lineCenter,
	      zoom: 13
	  });
	
	  // 绘制轨迹
	  var polyline = new AMap.Polyline({
	      map: map,
	      path: polylineArr,
	      strokeColor: "rgba(0,0,0,0)",  //线颜色
	      strokeOpacity: 0,     //线透明度
	      strokeWeight: 3,      //线宽
	      // strokeStyle: "solid"  //线样式
	  });
	  map.setFitView();
	
	  canvas = document.createElement('canvas');
	  canvas.width = map.getSize().width;
	  canvas.height = map.getSize().height;	 
	  canvas.style.backgroundColor='';
	  canvas.style.zIndex=0;
	  
	  canvasfg = document.createElement('canvas');
	  canvasfg.width = map.getSize().width;
	  canvasfg.height = map.getSize().height;	 
	  canvasfg.style.backgroundColor='';
	  canvasfg.style.zIndex=1;
	  
	  
	  map.plugin(['AMap.CustomLayer'], function() {
	    var customLayer = new AMap.CustomLayer(canvas, {
	        zooms: [3, 18],
	        zIndex: 101,
	    });
		
		var customLayerFG = new AMap.CustomLayer(canvasfg, {
	        zooms: [3, 18],
	        zIndex: 102,
	    });
		
		customLayerFG.setMap(map);
		
	    customLayer.render = onRender;
	    customLayer.setMap(map);
	    // draw();
	  })
	
	}	

	var linei = 0
	var runPosI=0;
	var hasDrawPerson=0;
	var stepnum=20;
	
	function draw() {	  
	  stepnum = Math.floor(lineArr.length/200);
	  stepnum = (stepnum / 2) * 2;
	  if (lineArr.length < 2000){
	  	 stepnum = 4;
	  }else if (lineArr.length >= 2000 && lineArr.length < 4000){
	  	stepnum = 6;
	  }else{
	  	 stepnum = 8;
	  }	  	   
	  for (var i = 0; i < lineArr.length; i += 1) {
	      lineArr[i].containerPos = map.lngLatToContainer(lineArr[i].center);
	  }
	
	  polylineContext = canvas.getContext("2d")
	  polylineContext.clearRect(0,0,canvas.width,canvas.height);
	  polylineContext.lineCap = 'round';
	  polylineContext.lineWidth = 3;	  
	  
	  polylineContextFG = canvasfg.getContext("2d")
	  polylineContextFG.clearRect(0,0,canvas.width,canvas.height);
 
	  
	  window.requestAnimationFrame(drawLine);
	}

	function drawLine() {
	  var line_length = lineArr.length
	  // 添加起终点
	  var imgStartWidth = imgStart.width, imgStartHeight = imgStart.height, imgEndWidth = imgEnd.width, imgEndHeight = imgEnd.height
		  
	  if (hasDrawPerson == 1) {
		  //清除上一次画人的区域
		  polylineContextFG.clearRect(lineArr[runPosI].containerPos.x-(imgRun.width/2), lineArr[runPosI].containerPos.y-(imgRun.height/2), imgRun.width,imgRun.height);		  
	  }
	  
	  //画开始图标
	  polylineContext.drawImage(imgStart,lineArr[0].containerPos.x-(imgStartWidth/2),lineArr[0].containerPos.y-imgStartHeight,imgStartWidth,imgStartHeight);	  	  
	  var drawCount = (((linei+stepnum) < (line_length-1)) ? (linei+stepnum):(line_length-1));
	  for(var i = linei; i < drawCount; i++) {	
		var grd = polylineContext.createLinearGradient(lineArr[i].containerPos.x,lineArr[i].containerPos.y,lineArr[i+1].containerPos.x,lineArr[i+1].containerPos.y);
		if (lineArr[i].isPause == true || lineArr[i+1].isPause == true)	{
		    continue;
		}else {
		    grd.addColorStop(0,pointList[i]);
		    grd.addColorStop(1,pointList[i+1]);
		}	
 			
		polylineContext.beginPath();
		    
	    polylineContext.strokeStyle = grd;
	    polylineContext.moveTo(lineArr[i].containerPos.x, lineArr[i].containerPos.y);

	    polylineContext.quadraticCurveTo(lineArr[i].containerPos.x, lineArr[i].containerPos.y, lineArr[i+1].containerPos.x, lineArr[i+1].containerPos.y);
		polylineContext.stroke();	
		polylineContext.closePath();
	  }  
	  
	  linei += stepnum;
	  	  
	  if (linei <= line_length)
	  {
		  //画跑步中的人
		  runPosI=(linei-stepnum-1);
		  if (runPosI >= 0 && runPosI < line_length) {
			polylineContextFG.drawImage(imgRun,lineArr[runPosI].containerPos.x-(imgRun.width/2), lineArr[runPosI].containerPos.y-(imgRun.height/2),imgRun.width,imgRun.height);
			hasDrawPerson = 1;			
		  }				
			
		  window.requestAnimationFrame(drawLine);
	  }else {
		  //画结束图标
		  polylineContext.drawImage(imgEnd,lineArr[line_length-1].containerPos.x-(imgEndWidth/2),lineArr[line_length-1].containerPos.y-imgEndHeight,imgEndWidth,imgEndHeight);	
	  }
	}
	
}
export default GradientColor
