// cleanDuplicates.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Asegúrate de tener el archivo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanDuplicates() {
  const snapshot = await db.collection('products').get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const seenNames = new Map();
  const toDelete = [];

  for (const p of products) {
    if (seenNames.has(p.name)) {
      toDelete.push(p.id);
    } else {
      seenNames.set(p.name, p.id);
    }
  }

  console.log(`📦 Total productos: ${products.length}`);
  console.log(`🧹 Duplicados a eliminar: ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log('✅ No hay duplicados. Todo correcto.');
    process.exit(0);
  }

  const batch = db.batch();
  toDelete.forEach(id => {
    const ref = db.collection('products').doc(id);
    batch.delete(ref);
  });
  await batch.commit();

  console.log(`🗑️ Eliminados ${toDelete.length} documentos duplicados.`);
  console.log(`✨ Quedan ${seenNames.size} productos únicos.`);
  process.exit(0);
}

cleanDuplicates().catch(console.error);