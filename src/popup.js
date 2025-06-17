document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ type: "get-manga-history" }, (response) => {
    const tbody = document.getElementById("manga-table-body");
    tbody.innerHTML = "";

    if (!response || !response.success) {
      tbody.innerHTML = "<tr><td colspan='4'>Error loading history</td></tr>";
      return;
    }

    for (const item of response.history) {
      const row = document.createElement("tr");

      // Title
      const titleCell = document.createElement("td");
      titleCell.textContent = item.title;
      row.appendChild(titleCell);

      // Chapter
      const chapterCell = document.createElement("td");
      chapterCell.textContent = item.chapter;
      row.appendChild(chapterCell);

      // Updated At
      const updatedCell = document.createElement("td");
      const date = new Date(item.updatedAt);
      updatedCell.textContent = date.toLocaleDateString("he-IL", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      row.appendChild(updatedCell);

      // URL link
      const linkCell = document.createElement("td");
      const link = document.createElement("a");
      link.href = item.url || "#";
      link.textContent = "Go";
      link.target = "_blank";
      link.style.color = "#007bff";
      link.style.textDecoration = "none";
      linkCell.appendChild(link);
      row.appendChild(linkCell);

      tbody.appendChild(row);
    }
  });
});
