videotag = null;
timeline = null;
ctx_timeline = null;
container_timeline = null;
videoduration = null;
secondvideo = null;
counti = 0;
isVideoPlayPushed = false;
zoomlevel = 1;
amountOfThumbs = 5;
segmentDuration = 0;
currentStart = 0;
videowidth = 0;
videoheight = 0;
videoplayer = null;
contextPicture1    = null;
contextPicture2    = null;
contextPicture3    = null;
contextPicture4    = null;
contextPicture5    = null;
timer = null;
keyframes 		= [0,0,0,0,0];


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function getNearestOffset(offset, duration) {
	var i=0;
	while (i*duration <= offset) {
		i++;
	}
	if (i < 1)
		return 0;
	return (i-1)*duration;
}

function initThings()
{
	videoplayer = document.getElementById("videoplayer");
	timeline = $("#timeline");
	videoduration = Math.round(videoplayer.duration);
	
	videowidth = timeline.width() / amountOfThumbs;
	videoheight = videoplayer.videoHeight * videowidth / videoplayer.videoWidth; 
	
	canvasPicture1     = document.getElementById('picture1');
	canvasPicture2     = document.getElementById('picture2');
	canvasPicture3     = document.getElementById('picture3');
	canvasPicture4     = document.getElementById('picture4');
	canvasPicture5     = document.getElementById('picture5');
	
	
	
	canvasPicture1.onclick = function(){ zoomlevel = zoomlevel * 2; videoplayer.currentTime = keyframes[0]; drawThumbs();}
	canvasPicture2.onclick = function(){ zoomlevel = zoomlevel * 2; videoplayer.currentTime = keyframes[1]; drawThumbs();}
	canvasPicture3.onclick = function(){ zoomlevel = zoomlevel * 2; videoplayer.currentTime = keyframes[2]; drawThumbs();}
	canvasPicture4.onclick = function(){ zoomlevel = zoomlevel * 2; videoplayer.currentTime = keyframes[3]; drawThumbs();}
	canvasPicture5.onclick = function(){ zoomlevel = zoomlevel * 2; videoplayer.currentTime = keyframes[4]; drawThumbs();}

	canvasPicture1.width  = videowidth;
	canvasPicture1.height = videoheight;
	canvasPicture2.width  = videowidth;
	canvasPicture2.height = videoheight;
	canvasPicture3.width  = videowidth;
	canvasPicture3.height = videoheight;
	canvasPicture4.width  = videowidth;
	canvasPicture4.height = videoheight;
	canvasPicture5.width  = videowidth;
	canvasPicture5.height = videoheight;

	contextPicture1    = canvasPicture1.getContext('2d');
	contextPicture2    = canvasPicture2.getContext('2d');
	contextPicture3    = canvasPicture3.getContext('2d');
	contextPicture4    = canvasPicture4.getContext('2d');
	contextPicture5    = canvasPicture5.getContext('2d');
	
	//timeline click handler
	document.getElementById('timeline').onclick = function(event) { 
		var x = getMousePos(document.getElementById('timeline'), event).x;
		
		var segmentDuration = videoduration / amountOfThumbs / zoomlevel;
		var offset = getNearestOffset(keyframes[0], segmentDuration);
		videoplayer.currentTime = x / ctx_timeline.canvas.width*(segmentDuration*amountOfThumbs) + offset;
		
		//x_offset = ctx_timeline.canvas.width/(segmentDuration*amountOfThumbs)*(videoplayer.currentTime-offset);

	}
	
	drawThumbs();
}

function drawThumbs()
{
	segmentDuration = videoduration / amountOfThumbs / zoomlevel;
	var offset = videoplayer.currentTime;
		
	if (offset < 2) {
		keyframes[0] = Math.round((Math.random() * 1000 % segmentDuration));
	} else {
		keyframes[0] = offset;
	}
	for (i=1; i <= amountOfThumbs-1; i++) {
		keyframes[i] = Math.round(getNearestOffset(offset, segmentDuration) + segmentDuration * i + Math.round((Math.random() * 1000 % segmentDuration)));
	}

	
		

	$("#zoomlevel").text(zoomlevel);

	var callback = function() 
	{
		if (counti == 0) {	contextPicture1.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 1) {	contextPicture2.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 2) {	contextPicture3.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 3) {	contextPicture4.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 4) {	contextPicture5.drawImage(secondvideo,0,0,videowidth,videoheight); }
		
		if (counti == 4) {
			$(secondvideo).unbind('seeked');   
		} else {
			counti = counti + 1;
			secondvideo.currentTime = Math.round(keyframes[counti]);
			//secondvideo.currentTime = Math.round(secondvideo.currentTime + (segmentDuration / amountOfThumbs));
			
		}
	}
	
	counti = 0;
	secondvideo.currentTime = keyframes[0];//Math.round(currentStart + (segmentDuration / amountOfThumbs));
	$(secondvideo).bind('seeked', callback);   
}

$(document).ready(function () {

	videoplayer = document.getElementById("videoplayer");
	secondvideo = document.createElement("video");
	secondvideo.src = "media/BigBuckBunny_320x180.webm";
	secondvideo.type = "video/webm";
	secondvideo.preload = "auto";
    //jquery init function

    container_timline = $("#timeline_container");


    //set appropiate size
    timeline = $("#timeline");
    ctx_timeline = timeline[0].getContext("2d");
    ctx_timeline.canvas.width = container_timline.width();
    ctx_timeline.canvas.height = 50;
	
	$("#button_play").click(function() {
		if(!isVideoPlayPushed) {
			isVideoPlayPushed = true;
			videoplayer.play();
			initThings();
			timer = setInterval(renderFunction, 1000);
		} else {
			isVideoPlayPushed = false;
			videoplayer.pause();
			clearInterval(timer);
		}
	});
	
	$("#button_reload").click(function() {
		window.location.reload()
	});
	
	$("#button_zoomout").click(function() {
		if(zoomlevel > 1) {
			zoomlevel = zoomlevel /2;
			drawThumbs();
		}
	});
	
	//newTimeline();
});

function renderFunction() {
	$("#playbacktime").text((""+videoplayer.currentTime).toHHMMSS());
	newTimeline();
	return true;
}


function newTimeline() {
	ctx_timeline.clearRect(0, 0, ctx_timeline.canvas.width, ctx_timeline.canvas.height);
	ctx_timeline.stroke();
		
	var increment = (timeline.width() / amountOfThumbs);
	for (i=0; i < amountOfThumbs; i++) {
		ctx_timeline.beginPath();
        ctx_timeline.moveTo(i*increment+2,timeline.height()-50);
        ctx_timeline.lineTo(i*increment+2,timeline.height()-10);

        ctx_timeline.lineWidth = 1;

      // set line color
        ctx_timeline.strokeStyle = '#00086E';

        ctx_timeline.stroke();
        
        ctx_timeline.font="10px Arial";
		ctx_timeline.textAlign = 'center';
		var timestring = "" + (getNearestOffset(keyframes[0],videoduration/amountOfThumbs/zoomlevel) + videoduration/amountOfThumbs/zoomlevel*i);
		
		if (i==0) {
			ctx_timeline.fillText(timestring.toHHMMSS(),i*increment+25,timeline.height());
		} else {
			ctx_timeline.fillText(timestring.toHHMMSS(),i*increment,timeline.height());
		}
    
	}
	
	var segmentDuration = videoduration / amountOfThumbs / zoomlevel;
	var offset = getNearestOffset(keyframes[0], segmentDuration);

	
	//render current time:
	ctx_timeline.strokeStyle ='#FF0000';
	ctx_timeline.beginPath();
	ctx_timeline.lineWidth = 1;
	x_offset = ctx_timeline.canvas.width/(segmentDuration*amountOfThumbs)*(videoplayer.currentTime-offset);

	//x_offset = ctx_timeline.canvas.width/videoduration*Math.round(videoplayer.currentTime);
	ctx_timeline.moveTo(Math.round(x_offset), timeline.height()-50);
	ctx_timeline.lineTo(Math.round(x_offset), timeline.height()-10);
	ctx_timeline.stroke();	
	
	
	
	//render current keyframes
	for (i=0; i < amountOfThumbs; i++) {
		ctx_timeline.strokeStyle ='#00FF00';
		ctx_timeline.beginPath();
		ctx_timeline.lineWidth = 1;
		//x_offset = ctx_timeline.canvas.width/videoduration*keyframes[i];
		
		x_offset = ctx_timeline.canvas.width/(segmentDuration*amountOfThumbs)*(keyframes[i]-offset);
		
		ctx_timeline.moveTo(Math.round(x_offset), timeline.height()-50);
		ctx_timeline.lineTo(Math.round(x_offset), timeline.height()-10);
		ctx_timeline.stroke();	
	}
	
}
