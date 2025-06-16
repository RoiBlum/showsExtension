(function () {
  const url = window.location.href;

  const patterns = [
    { type: "manga", regex: /manga\/([^\/]+)\/chapter-(\d+)/ },
    { type: "anime", regex: /anime\/([^\/]+)\/episode-(\d+)/ },
    { type: "movie", regex: /movie\/([^\/]+)\/watch/ },
    { type: "manhua", regex: /manhua\/([^\/]+)\/chapter-(\d+)/ },
    { type: "manhwa", regex: /manhwa\/([^\/]+)\/chapter-(\d+)/ },
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern.regex);
    if (match) {
      const title = decodeURIComponent(match[1]);
      const number = match[2] ?? "watched";

      chrome.runtime.sendMessage({
        type: "save-manga",
        payload: {
          title,
          chapter: number,
          mediaType: pattern.type
        }
      });

      break;
    }
  }
})();
