import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "save-manga") {
    const { title, chapter, mediaType } = message.payload;

    const docRef = doc(db, "mangaHistory", title);

    setDoc(docRef, {
      title,
      chapter,
      type: mediaType,
      updatedAt: new Date().toISOString(),
    })
    .then(() => {
      console.log(`Saved: ${title} – ${chapter}`);
    })
    .catch((error) => {
      console.error("Error saving to Firestore:", error);
    });
  }
});
