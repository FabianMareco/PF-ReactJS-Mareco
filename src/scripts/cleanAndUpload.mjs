import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const sa = JSON.parse(readFileSync("serviceAccountKey.json", "utf8"));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

async function clearCollection(name) {
  let total = 0;
  while (true) {
    const snap = await db.collection(name).limit(400).get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    total += snap.docs.length;
    console.log(`  borrados ${total}...`);
  }
  console.log(`✅ '${name}' limpia — ${total} docs eliminados`);
}

async function uploadCollection(name, items, keyFn) {
  let batch = db.batch();
  let count = 0;
  for (const item of items) {
    const ref = keyFn ? db.collection(name).doc(String(keyFn(item))) : db.collection(name).doc();
    batch.set(ref, item);
    count++;
    if (count % 400 === 0) { await batch.commit(); batch = db.batch(); }
  }
  if (count % 400 !== 0) await batch.commit();
  console.log(`✅ '${name}': ${items.length} docs subidos`);
}

const productos = JSON.parse(readFileSync("productos.json", "utf8"));
const packs     = JSON.parse(readFileSync("src/data/packs.json", "utf8"));

console.log("\n🧹 Limpiando colecciones...");
await clearCollection("products");
await clearCollection("packs");

console.log("\n📦 Subiendo datos frescos...");
await uploadCollection("products", productos);
await uploadCollection("packs", packs, p => p.id);

// Verificar
const snap = await db.collection("products").get();
console.log(`\n✅ Verificación: ${snap.size} productos en Firestore (esperados: ${productos.length})`);
process.exit(0);
