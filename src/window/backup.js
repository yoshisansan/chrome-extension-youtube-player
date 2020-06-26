"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  const createYoutubeDom = (youtubeMovieId) => {
    const insertPosition = document.getElementById("inputYoutube");
    const newElement = document.createElement("div");
    newElement.classList.add = "contents__player-show";

    const youtubeDom = `
    <iframe
    id="youtubePlayer"
    src="https://www.youtube.com/embed/${youtubeMovieId}"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
`;
    newElement.innerHTML = youtubeDom;
    let iframeElm;
    async function insertIfram() {
      try {
        await insertPosition.appendChild(newElement);
      } catch (err) {
        console.log("error");
      }
    }
    insertIfram();

    function test() {
      iframeElm = document.querySelector("#youtubePlayer > html");

      // iframeElm = document.getElementById("youtubePlayer");
      // const target = document.querySelector("#inputYoutube > div > iframe");
      const observer = new MutationObserver(() => {
        console.log("loaded Youtube Movie");
      });
      observer.observe(iframeElm, {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
      });
    }
    // setTimeout(test, 1000);
  };
  const isPlay = () => {
    const playBtn = document.querySelector(
      "div.ytp-cued-thumbnail-overlay > button"
    );
    const waitDom = document.querySelector("div.ytp-cued-thumbnail-overlay");

    playBtn.addEventListener("click", () => {
      const observer = new MutationObserver(() => {
        console.log("This video does not have the embedding option enabled");
        const errorMsg = document.querySelector(
          "div.ytp-error > div.ytp-error-content > div.ytp-error-content-wrap > div.ytp-error-content-wrap-reason > span"
        );
        console.log(errorMsg);
      });
      observer.observe(waitDom, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  };
  const inplementUrl = () => {
    const urlOption = location.href.split("&"),
      youtubeId = urlOption[1],
      isIndexOrList = /^(index=|list=)([a-zA-Z0-9_-]+)/;
    let listBool = false,
      indexBool = false;

    //Listの有無
    urlOption.map((option) => {
      const indexOrList = option.match(isIndexOrList);
      if (!indexOrList) return;
      if (indexOrList[1] === "list=") {
        const listData = {
          //あとでリスト再生を指定する拡張ができるよう念のために残しておく
          type: "list",
          optionKey: indexOrList[2],
          listUrl: `videoseries?list=${indexOrList[2]}`,
        };
        listBool = listData;
      }
    });
    //indexの有無
    urlOption.map((option) => {
      const indexOrList = option.match(isIndexOrList);
      if (!indexOrList) return;
      if (indexOrList[1] === "index=") {
        console.log("index=");
        const indexNum = Number(indexOrList[2]) - 1;
        const youtubeMovieId = `${listBool.listUrl}&index=${indexNum}?enablejsapi=1&oirgin=${location.href}`;
        indexBool = youtubeMovieId;
      }
    });

    if (indexBool) {
      console.log("call list with index");
      return createYoutubeDom(indexBool);
    }
    if (listBool && !indexBool) {
      const youtubeMovieId = listBool.listUrl;
      console.log("call list");
      return createYoutubeDom(youtubeMovieId);
    }
    if (!listBool) {
      console.log("call without list");
      return createYoutubeDom(youtubeId);
    }
  };
  inplementUrl();
});
