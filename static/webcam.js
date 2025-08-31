// webcam.js
// Utility for capturing images from webcam

function startWebcam(videoId) {
  const video = document.getElementById(videoId);
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      alert("Camera error: " + err);
    });
}

function captureImage(videoId, callback) {
  const video = document.getElementById(videoId);
  // Resize to 320x240 for smaller payload
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/jpeg", 0.7); // 0.7 quality
  callback(dataURL);
}
