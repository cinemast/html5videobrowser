videotag = null;
timeline = null;
ctx_timeline = null;
container_timeline = null;
videoduration = null;
secondvideo = null;
counti = 0;
isVideoPlayPushed = false;
seekingDeepness = 0;
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
	
	canvasPicture1.onclick = function(){ currentStart = currentStart + Math.round(segmentDuration / amountOfThumbs * 1); seekingDeepness = seekingDeepness + 1; drawThumbs(); videoplayer.currentTime = currentStart; }
	canvasPicture2.onclick = function(){ currentStart = currentStart + Math.round(segmentDuration / amountOfThumbs * 2); seekingDeepness = seekingDeepness + 1; drawThumbs(); videoplayer.currentTime = currentStart; }
	canvasPicture3.onclick = function(){ currentStart = currentStart + Math.round(segmentDuration / amountOfThumbs * 3); seekingDeepness = seekingDeepness + 1; drawThumbs(); videoplayer.currentTime = currentStart; }
	canvasPicture4.onclick = function(){ currentStart = currentStart + Math.round(segmentDuration / amountOfThumbs * 4); seekingDeepness = seekingDeepness + 1; drawThumbs(); videoplayer.currentTime = currentStart; }
	canvasPicture5.onclick = function(){ currentStart = currentStart + Math.round(segmentDuration / amountOfThumbs * 5); seekingDeepness = seekingDeepness + 1; drawThumbs(); videoplayer.currentTime = currentStart; }

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
	drawThumbs();
}

function drawThumbs()
{

	segmentDuration = videoduration;
	for (var i = 0; i < seekingDeepness; i++)
	{
		segmentDuration = Math.round(segmentDuration / amountOfThumbs);
	}
	
	alert(currentStart);
	alert(segmentDuration);
	
	drawTimeline(currentStart, segmentDuration, amountOfThumbs);
	
	var callback = function() 
	{
		if (counti == 0) {	contextPicture1.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 1) {	contextPicture2.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 2) {	contextPicture3.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 3) {	contextPicture4.drawImage(secondvideo,0,0,videowidth,videoheight); }
		if (counti == 4) {	contextPicture5.drawImage(secondvideo,0,0,videowidth,videoheight); }
		
		if (counti == 4)
		{
			$(secondvideo).unbind('seeked');   
		} else 
		{
			counti = counti + 1;
			secondvideo.currentTime = Math.round(secondvideo.currentTime + (segmentDuration / amountOfThumbs));
		}
	}
	
	counti = 0;
	secondvideo.currentTime = Math.round(currentStart + (segmentDuration / amountOfThumbs));
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
	
	videoplayer.addEventListener('play', function(){
		if (isVideoPlayPushed == false)
		{
			initThings();
		}
		isVideoPlayPushed = true;
				

	},false);
	
});

//length in seconds, interval in divions units
function drawTimeline(start, length, interval) {
	ctx_timeline.clearRect(0, 0, ctx_timeline.canvas.width, ctx_timeline.canvas.height);
	interval = interval + 1;
    var increment = (timeline.width() / interval);

    for (i=1;i<interval; i++){
       //ctx_timeline.lineWidth = 1;
       //alert(i + "/" + timeline.height());
       ctx_timeline.beginPath();
       ctx_timeline.moveTo(i*increment,timeline.height()-50);
       ctx_timeline.lineTo(i*increment,timeline.height()-10);

       ctx_timeline.lineWidth = 1;

      // set line color
       ctx_timeline.strokeStyle = '#00086E';

       ctx_timeline.stroke();

       ctx_timeline.font="10px Arial";
       ctx_timeline.textAlign = 'center';
       var timestring = "" + (length/interval*i + start);
       ctx_timeline.fillText(timestring.toHHMMSS(),i*increment,timeline.height());
    }

}
