// seedWeatherCategories.ts
import { db } from '../firebaseConfig.ts'
import { collection, setDoc, doc } from 'firebase/firestore';

const weatherCategories = [
  { id: 'sunny', name: 'Sunny', description: 'Clear skies and warm weather — lightweight and breathable clothes are ideal.' },
  { id: 'cloudy', name: 'Cloudy', description: 'Overcast conditions — light layering recommended, but no rain expected.' },
  { id: 'rainy', name: 'Rainy', description: 'Wet weather — waterproof clothing, umbrellas, and boots are necessary.' },
  { id: 'snowy', name: 'Snowy', description: 'Cold and snowy — insulated, waterproof, and thermal clothing is required.' },
  { id: 'windy', name: 'Windy', description: 'Strong winds — windbreakers, jackets, and layered clothing are ideal.' },
  { id: 'hot', name: 'Hot', description: 'Very high temperatures — minimal, loose-fitting, and breathable fabrics are best.' },
  { id: 'cold', name: 'Cold', description: 'Low temperatures — layered and insulated clothing recommended.' },
  { id: 'humid', name: 'Humid', description: 'Sticky and moist air — light, breathable, and moisture-wicking clothes work well.' }
];

async function seedWeatherCategories() {
  const colRef = collection(db, 'weather-category');
  for (const weather of weatherCategories) {
    await setDoc(doc(colRef, weather.id), {
      name: weather.name,
      description: weather.description,
    });
  }
  console.log('Weather categories seeded.');
}

seedWeatherCategories();