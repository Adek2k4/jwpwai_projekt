import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Dodaj zmienną MONGODB_URI do pliku .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // W trybie deweloperskim używamy globalnej zmiennej, aby zachować połączenie
  // między hot-reloadami w Next.js
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // W produkcji najlepiej nie używać globalnej zmiennej
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Eksportuj promise klienta MongoDB
export default clientPromise;
