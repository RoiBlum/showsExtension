document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ type: "get-manga-history" }, (response) => {
    const tbody = document.getElementById("manga-table-body");
    tbody.innerHTML = "";

    if (!response || !response.success) {
      tbody.innerHTML = "<tr><td colspan='2'>Error loading history</td></tr>";
      return;
    }

    for (const item of response.history) {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = item.title;
      row.appendChild(titleCell);

      const chapterCell = document.createElement("td");
      chapterCell.textContent = item.chapter;
      row.appendChild(chapterCell);

      tbody.appendChild(row);
    }
  });
});
