const video = document.getElementById("video");
const snapBtn = document.getElementById("snap");
const resultDiv = document.getElementById("result");

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(stream => {
  video.srcObject = stream;
  video.play();
})
.catch(err => {
  resultDiv.innerText = "Camera error: " + err;
});

snapBtn.addEventListener("click", async () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/jpeg");
  resultDiv.innerText = "Verifying...";
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({image: dataURL})
    });
    const j = await res.json();
    if(j.name && j.name !== "unknown") {
      resultDiv.innerHTML = `Recognized: <b>${j.name}</b> (${(j.proba*100).toFixed(1)}%)<br>
        <a href="/dashboard/${j.name}" class="btn btn-success mt-2">Open Dashboard</a>`;
    } else if(j.error) {
      resultDiv.innerText = "Error: " + j.error;
    } else {
      resultDiv.innerText = "No match (unknown).";
    }
  } catch(err) {
    resultDiv.innerText = "Request error: " + err;
  }
});
