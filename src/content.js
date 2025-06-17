(function () {
  const url = window.location.href;

  const patterns = [
    { type: "manga", regex: /manga\/([^\/]+)\/chapter-(\d+)/ },
    { type: "anime", regex: /anime\/([^\/]+)\/episode-(\d+)/ },
    { type: "movie", regex: /movie\/([^\/]+)\/watch/ },
    { type: "manhua", regex: /manhua\/([^\/]+)\/chapter-(\d+)/ },
    { type: "manhwa", regex: /manhwa\/([^\/]+)\/chapter-(\d+)/ },
  ];

  // ✅ Handle normal patterns first
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
          mediaType: pattern.type,
          url,
        },
      });

      return; // done
    }
  }

  // ✅ Handle AsuraScans separately
  const asuraRegex = /asuracomic\.net\/series\/([^\/]+)\/chapter\/(\d+)/;
  const match = url.match(asuraRegex);

  if (match) {
    let slug = match[1]; // e.g., "level-999-goblin-fd4a8c3e"
    const chapter = match[2]; // e.g., "9"

    // Remove trailing hash
    slug = slug.replace(/-[a-f0-9]{6,8}$/, '');

    // Format to title case (optional but nice for display)
    const title = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    chrome.runtime.sendMessage({
      type: "save-manga",
      payload: {
        title,
        chapter,
        mediaType: "manhwa", // or "manhua" if you want to differentiate
        url,
      },
    });
  }
})();
