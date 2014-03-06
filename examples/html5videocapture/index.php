<!DOCTYPE HTML>
<html lang="en">
 <head>
   <meta content="" charset="utf-8" />
   <title>Video to Canvas</title>

<script src="canvas2image.js"></script>

 </head>
 <body>


 <script type="text/javascript">

</script>



           <video id="video" width="300px" height="200px" controls="true">
                <source src="Big_Buck_Bunny_Trailer.m4v">
                <source src="gizmo.ogv">
               <source src="gizmo.webm">
            </video><br/>
            <button onClick="capture()" style="width: 64px;border: solid
2px #ccc;">Capture</button><br/>




       

   <?php /*?><button onClick="getURIformcanvas()" style="width: 64px;border: solid
2px #ccc;">View URI</button><?php */?></p>
   <div id="container" style="border:none">

     <canvas id="imageView" style="display:none; left: 0; top: 0; z-index: 0;border:none" width="300" height="200">
      
     </canvas>

       </div>
       

         
           
           <div id="imgs">
        
           </div>
           



   <script>


       function getURIformcanvas() {
           var ImageURItoShow = "";
           var canvasFromVideo = document.getElementById("imageView");
           if (canvasFromVideo.getContext) {
               var ctx = canvasFromVideo.getContext("2d"); // Get the context for the canvas.canvasFromVideo.
               var ImageURItoShow = canvasFromVideo.toDataURL("image/png");

           }
           
			   
		   var imgs = document.getElementById("imgs");
		   
		   imgs.appendChild(Canvas2Image.convertToImage(canvasFromVideo, 300, 200, 'png'));


       }

       var videoId = 'video';


       function capture() {
           var video = document.getElementById("video");


           var canvasDraw = document.getElementById('imageView');
           var w = canvasDraw.width;
           var h = canvasDraw.height;
           var ctxDraw = canvasDraw.getContext('2d');

           ctxDraw.clearRect(0, 0, w, h);

           ctxDraw.drawImage(video, 0, 0, w, h);
           ctxDraw.save();

             
		   getURIformcanvas();	 
			 

       }




   </script>

 </body>
</html>