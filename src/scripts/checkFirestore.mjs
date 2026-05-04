import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const sa = JSON.parse(readFileSync("serviceAccountKey.json", "utf8"));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const snap = await db.collection("products").get();
console.log("Total docs:", snap.size);

const targets = ['TAZA 2','REMERA 7','REMERA 9','ZAPATILLA BALLET','ZAPATILLA JAZZ BADANA','ZAPATILLA TAP','BOTELLA 2'];
snap.docs.forEach(d => {
  const data = d.data();
  if (targets.includes(data.name)) {
    console.log(data.name, "->", data.pictureUrl);
  }
});
process.exit(0);
