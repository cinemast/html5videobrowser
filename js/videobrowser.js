videotag = null;
timeline = null;
ctx_timeline = null;
container_timeline = null;

$(document).ready(function () {

    //jquery init function

    container_timline = $("#timeline_container");


    //set appropiate size
    timeline = $("#timeline");
    ctx_timeline = timeline[0].getContext("2d");
    ctx_timeline.canvas.width = container_timline.width();
    ctx_timeline.canvas.height = 100;

    drawTimeline(5);
});

function drawTimeline(interval) {

    var increment = (timeline.width() / interval);

    //alert(increment);

    for (i=0;i<timeline.width(); i+=increment){
       //ctx_timeline.lineWidth = 1;
       //alert(i + "/" + timeline.height());
       ctx_timeline.beginPath();
       ctx_timeline.moveTo(i,50);
       ctx_timeline.lineTo(i,timeline.height());

       ctx_timeline.lineWidth = 1;

      // set line color
       ctx_timeline.strokeStyle = '#00086E';

       ctx_timeline.stroke();
    }

}
