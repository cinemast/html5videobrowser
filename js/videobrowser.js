videotag = null;
timeline = null;
ctx_timeline = null;
container_timeline = null;

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

$(document).ready(function () {

    //jquery init function

    container_timline = $("#timeline_container");


    //set appropiate size
    timeline = $("#timeline");
    ctx_timeline = timeline[0].getContext("2d");
    ctx_timeline.canvas.width = container_timline.width();
    ctx_timeline.canvas.height = 200;
	videoplayer = document.getElementById("videoplayer");
	var vid_duration = Math.round(videoplayer.duration);
    drawTimeline(vid_duration, 5);
	videoplayer.addEventListener('play', function(){
	  	canvasPicture1     = document.getElementById('picture1');
		canvasPicture2     = document.getElementById('picture2');
		canvasPicture3     = document.getElementById('picture3');
		canvasPicture4     = document.getElementById('picture4');
		canvasPicture5     = document.getElementById('picture5');

		contextPicture1    = canvasPicture1.getContext('2d');
		contextPicture2    = canvasPicture2.getContext('2d');
		contextPicture3    = canvasPicture3.getContext('2d');
		contextPicture4    = canvasPicture4.getContext('2d');
		contextPicture5    = canvasPicture5.getContext('2d');

		var w = timeline.width();
		var h = videoplayer.videoHeight * timeline.width() / videoplayer.videoWidth; 

		contextPicture1.drawImage(videoplayer,0,0,w,h);
		contextPicture2.drawImage(videoplayer,0,0,w,h);
		contextPicture3.drawImage(videoplayer,0,0,w,h);
		contextPicture4.drawImage(videoplayer,0,0,w,h);
		contextPicture5.drawImage(videoplayer,0,0,w,h);

	},false);
	
});

//length in seconds, interval in divions units
function drawTimeline(length, interval) {

    var increment = (timeline.width() / interval);

    //alert(increment);

    for (i=0;i<=interval; i++){
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
       var timestring = "" + length/interval*i;
       ctx_timeline.fillText(timestring.toHHMMSS(),i*increment,timeline.height());
    }

}