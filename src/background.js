import { db } from "./firebase.js";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    if (message.type === "get-manga-history") {
      try {
        const snapshot = await getDocs(collection(db, "mangaHistory"));
        const history = snapshot.docs.map((doc) => doc.data());
        sendResponse({ success: true, history });
      } catch (err) {
        console.error("Failed to read from DB:", err);
        sendResponse({ success: false, error: err.message });
      }
      return;
    }

    if (message.type === "save-manga") {
      try {
        const { title, chapter, mediaType } = message.payload;
        const docRef = doc(db, "mangaHistory", title);
        await setDoc(docRef, {
          title,
          chapter,
          type: mediaType,
          updatedAt: new Date().toISOString(),
        });
        console.log(`Saved: ${title} – ${chapter}`);
      } catch (err) {
        console.error("Failed to save to DB:", err);
      }
    }
  })();

  // ✅ MUST be returned outside the async function
  return true;
});
