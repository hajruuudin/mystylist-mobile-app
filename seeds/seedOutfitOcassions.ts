import { db } from '../firebaseConfig.ts';
import { collection, setDoc, doc } from 'firebase/firestore';

const outfitOccasions = [
  { id: 'casual', name: 'Casual', description: 'Relaxed, everyday outfits for errands, hangouts, or informal settings.' },
  { id: 'work', name: 'Work', description: 'Office-appropriate attire, including business casual and formal wear.' },
  { id: 'formal', name: 'Formal', description: 'Elegant outfits for weddings, galas, or black-tie events.' },
  { id: 'party', name: 'Party', description: 'Trendy, eye-catching clothing for nightlife, birthdays, or celebrations.' },
  { id: 'date', name: 'Date', description: 'Stylish and flattering outfits for romantic settings.' },
  { id: 'beach', name: 'Beach', description: 'Comfortable, breathable outfits suited for the beach or poolside.' },
  { id: 'travel', name: 'Travel', description: 'Functional, layered clothing ideal for airports, road trips, or long days out.' },
  { id: 'workout', name: 'Workout', description: 'Athletic wear suited for gym, yoga, or outdoor physical activities.' },
  { id: 'loungewear', name: 'Loungewear', description: 'Cozy clothing for relaxing at home — includes pajamas and sweatpants.' },
  { id: 'interview', name: 'Interview', description: 'Polished, professional clothing for job interviews or career events.' }
];

async function seedOutfitOccasions() {
  const colRef = collection(db, 'outfit-occasion');
  for (const occasion of outfitOccasions) {
    await setDoc(doc(colRef, occasion.id), {
      name: occasion.name,
      description: occasion.description,
    });
  }
  console.log('Outfit occasions seeded.');
}

seedOutfitOccasions();
