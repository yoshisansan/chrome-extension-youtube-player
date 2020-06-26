chrome.runtime.onMessage.addListener(function (payload) {
  const { action } = payload;
  ref(action, payload);
});

const ref = (action, payload) => {
  switch (action) {
    case "newWindow":
      openWindow(payload);
      break;
    default:
      break;
  }
};

const openWindow = (payload) => {
  const { url: youtubeURL } = payload,
    w = 400,
    h = 287,
    topPosition = screen.height - (h + 40),
    leftPostion = screen.width - (w + 40);

  chrome.windows.create({
    url: "src/window/index.html#&" + youtubeURL,
    type: "popup",
    height: h,
    width: w,
    top: topPosition,
    left: leftPostion,
  });
};
