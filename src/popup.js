import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("manga-table-body");
  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "mangaHistory"));
  snapshot.forEach((doc) => {
    const data = doc.data();

    const row = document.createElement("tr");
    row.innerHTML = `<td>${data.title}</td><td>${data.chapter}</td>`;
    tbody.appendChild(row);
  });
});
