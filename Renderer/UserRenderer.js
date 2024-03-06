document.addEventListener("DOMContentLoaded", () => {
  let isVideo = true;
  const video = document.getElementById("captureVideo");
  let mediaStream = null;
  const containerImg = document.getElementById("image-container");
  window.electronAPI.getScreenshot((event, img) => {
    const uint8Array = new Uint8Array(img);
    const blob = new Blob([uint8Array], { type: "image/png" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    console.log(imageUrl);
    const image = document.createElement("img");
    image.src = imageUrl;
    containerImg.appendChild(image);
  });

  function toggleCamera() {
    if (isVideo) {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
        mediaStream = null; // Reset the media stream variable
      }
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: true, // Turn on video
          audio: true,
        })
        .then((stream) => {
          mediaStream = stream; // Store the media stream
          video.srcObject = stream; // Start the video stream
        });
    }
    isVideo = !isVideo; // Toggle the flag
  }
  document
    .getElementById("turnoffCamera")
    .addEventListener("click", toggleCamera);

  setInterval(captureVideo, 0.0001);
  function captureVideo() {
    const canvas = document.createElement("canvas");
    (canvas.width = video.videoWidth), (canvas.height = video.videoHeight);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    window.electronAPI.sendVideo(dataUrl);
    new Notification("image capture", {
      body: "image is captured from live video",
    });
  }

  window.electronAPI.getTime((event, timeData) => {
    document.getElementById("hours").innerHTML = `${timeData[0]}:`;
    document.getElementById("minutes").innerHTML = `${timeData[1]}:`;
    document.getElementById("seconds").innerHTML = timeData[2];
  });

  window.electronAPI.getTimeout((event, msg) => {
    alert("you have been inactive ");
  });

  document.getElementById("pause").addEventListener("click", (event) => {
    window.electronAPI.pause();
  });

  document.getElementById("restart").addEventListener("click", (event) => {
    window.electronAPI.restart();
  });
  document.getElementById("logout").addEventListener("click", (event) => {
    window.electronAPI.logout();
  });
  
});
