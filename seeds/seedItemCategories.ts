// seedItemCategories.ts
import { db } from '../firebaseConfig.ts';
import { collection, setDoc, doc } from 'firebase/firestore';

const itemCategories = [
  { id: 'tops', name: 'Tops', description: 'Shirts, blouses, tank tops, and other upper body garments.' },
  { id: 'bottoms', name: 'Bottoms', description: 'Pants, jeans, skirts, shorts, and similar lower body wear.' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets, coats, parkas, and any layering items for warmth.' },
  { id: 'footwear', name: 'Footwear', description: 'Shoes, boots, sandals, and other types of footwear.' },
  { id: 'accessories', name: 'Accessories', description: 'Hats, scarves, belts, watches, and jewelry.' },
  { id: 'dresses', name: 'Dresses', description: 'One-piece garments like dresses or jumpsuits.' },
  { id: 'activewear', name: 'Activewear', description: 'Gym wear, workout clothes, leggings, and sports bras.' },
  { id: 'undergarments', name: 'Undergarments', description: 'Underwear, bras, boxers, and other intimate apparel.' },
  { id: 'sleepwear', name: 'Sleepwear', description: 'Pajamas, nightgowns, loungewear for sleeping.' },
  { id: 'swimwear', name: 'Swimwear', description: 'Swimsuits, bikinis, trunks, and beachwear.' }
];

async function seedCategories() {
  const colRef = collection(db, 'item-category');
  for (const cat of itemCategories) {
    await setDoc(doc(colRef, cat.id), {
      name: cat.name,
      description: cat.description,
    });
  }
  console.log('Categories seeded.');
}

seedCategories();
