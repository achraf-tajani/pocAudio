waveRegion

"use strict";
var ctx = document.createElement('canvas').getContext('2d');
// Create an instance
var wavesurfer;

var wave_progress = ctx.createLinearGradient(0, 0, 200, 0); // 128 is default height
wave_progress.addColorStop(0.1, '#8C88FC'); 
wave_progress.addColorStop(1, '#8C88FC'); 

wavesurfer = WaveSurfer.create({
    container: document.querySelector("#waveRegion"),
    waveColor: "#B8B8B8",
    progressColor: wave_progress,
    backend: "MediaElement",
    cursorWidth: 1,
    audioRate: 1,
    pixelRatio:2,
    mediaControls: false,
    fillParent: true,
    minPxPerSec: 90,
  });

  wavesurfer.once("ready", function () {
    console.log("Using wavesurfer.js " + WaveSurfer.VERSION);
 });

 wavesurfer.on("error", function (e) {
    console.warn(e);
  });

  // Load audio from URL
wavesurfer.load("/assets/zik/nojoum 5 nayda mp3.mp3");

// ajout class au-wave1 au-wave2
$($($($("#waveRegion").get(0)).find("wave"))[0]).addClass("au-wave1");
$($($($("#waveRegion").get(0)).find("wave"))[1]).addClass("au-wave2");

document
  .querySelector("#playPause")
  .addEventListener("click", wavesurfer.playPause.bind(wavesurfer));



  
// listen to wav style

const waves = document.querySelector(".au-wave2");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes") {
      const value = mutation.target.getAttribute(mutation.attributeName);
      if (value.split(";").length) {
        value.split(";").forEach((el) => {
          if (el.indexOf("width") > -1) {
            $(".au-progres__bar").attr("style", el);
          }
        });
      }
    }
  });
});

observer.observe(waves, { attributes: true });
