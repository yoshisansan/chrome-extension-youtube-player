"use strict";

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

const readYoutube = (youtubeId, list) => {
  player = new YT.Player("inputYoutube", {
    height: 247,
    width: 400,
    videoId: youtubeId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
    playerVars: {
      listType: "playlist",
      list: list,
      autoplay: 1,
      rel: 0,
      loop: 1,
    },
  });

  function onPlayerReady(event) {
    console.log(event.data);
    const errorMsg = document.getElementById("playMsg");
    errorMsg.style.visibility = "hidden";
  }
  function onPlayerError(event) {
    console.log(event.data);
    const errorMsg = document.getElementById("playMsg");
    errorMsg.style.visibility = "hidden";
    if (event.data === 150 || event.data === 100) {
      if (list) {
        errorMsg.innerText =
          "after 5 seconds it switches to the next song. This video is not playable.";
        errorMsg.style.visibility = "visible";
        return setTimeout(function () {
          player.nextVideo();
          errorMsg.style.visibility = "hidden";
        }, 5000);
      } else {
        errorMsg.innerText =
          "Try it in another Youtube video. This video may not have the embedding option enabled or enabled for other reasons.";
        errorMsg.style.visibility = "visible";
      }
    }
  }
  function onPlayerStateChange(event) {
    console.log(event.data);
  }
};
