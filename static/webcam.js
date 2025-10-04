// webcam.js
// Utility for capturing images from webcam

function startWebcam(videoId, width = 640, height = 480) {
  const video = document.getElementById(videoId);
  
  // Request higher resolution camera stream
  const constraints = {
    video: {
      width: { ideal: width },
      height: { ideal: height },
      facingMode: 'user' // Use front camera if available
    },
    audio: false
  };
  
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.play();
      console.log('Camera started successfully with resolution:', width + 'x' + height);
    })
    .catch(err => {
      console.error('Camera error:', err);
      // Fallback to basic constraints if high resolution fails
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          video.srcObject = stream;
          video.play();
          console.log('Camera started with fallback resolution');
        })
        .catch(fallbackErr => {
          alert("Camera error: " + fallbackErr.message);
        });
    });
}

function captureImage(videoId, callback, captureWidth = 640, captureHeight = 480) {
  const video = document.getElementById(videoId);
  
  if (!video.videoWidth || !video.videoHeight) {
    alert("Camera not ready. Please wait for camera to initialize.");
    return;
  }
  
  // Use higher resolution for better face recognition
  const canvas = document.createElement("canvas");
  canvas.width = captureWidth;
  canvas.height = captureHeight;
  const ctx = canvas.getContext("2d");
  
  // Draw the video frame to canvas with proper scaling
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Use higher quality for better face recognition (0.8 instead of 0.7)
  const dataURL = canvas.toDataURL("image/jpeg", 0.8);
  callback(dataURL);
}

// Helper function to stop webcam
function stopWebcam(videoId) {
  const video = document.getElementById(videoId);
  if (video.srcObject) {
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }
}
