"use strict";

const inplementUrl = () => {
  console.log(location.href);
  const urlOption = location.href.split("&"),
    youtubeId = urlOption[1],
    isIndexOrList = /^(index=|list=)([a-zA-Z0-9_-]+)/;
  let listData = null;

  //Listの有無
  urlOption.map((option) => {
    const indexOrList = option.match(isIndexOrList);
    if (!indexOrList) return;
    if (indexOrList[1] === "list=") {
      listData = indexOrList[2];
    }
  });
  const thumbYoutube = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  const newElm = document.createElement("img");
  newElm.src = thumbYoutube;
  newElm.id = "readAction";
  newElm.className = "contents__player-thumb";
  const insertPosition = document.getElementById("inputYoutube");
  insertPosition.appendChild(newElm);

  const readAction = document.getElementById("readAction");

  readAction.addEventListener("click", function () {
    readYoutube(youtubeId, listData);
  });
};
inplementUrl();
