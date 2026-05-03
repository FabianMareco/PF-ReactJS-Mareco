import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir   = join(__dirname, "../../");

const keyPath = join(rootDir, "serviceAccountKey.json");
const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function uploadCollection(collectionName, items, keyFn) {
  const colRef = db.collection(collectionName);
  let batch = db.batch();
  let count = 0;
  for (const item of items) {
    const docRef = keyFn ? colRef.doc(String(keyFn(item))) : colRef.doc();
    batch.set(docRef, item);
    count++;
    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  if (count % 400 !== 0) await batch.commit();
  console.log(`✅ '${collectionName}': ${items.length} documentos subidos`);
}

const productos = JSON.parse(readFileSync(join(rootDir, "productos.json"), "utf8"));
const packs     = JSON.parse(readFileSync(join(rootDir, "src/data/packs.json"), "utf8"));

(async () => {
  console.log("\n🚀 Iniciando upload a Firestore...\n");
  await uploadCollection("products", productos);
  await uploadCollection("packs", packs, p => p.id);
  console.log("\n🎉 Upload completo!\n");
  process.exit(0);
})().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
