import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Car from '../models/Car.js';
import User from '../models/User.js';

dotenv.config();

const sampleCars = [
  { make: 'Toyota', model: 'Corolla', year: 2019, price: 15000, mileage: 30000, imageUrl: 'https://images.unsplash.com/photo-1549921296-3ccb3c6c3e5c?auto=format&fit=crop&w=1000&q=60', description: 'Reliable sedan with great mileage.' },
  { make: 'Honda', model: 'Civic', year: 2020, price: 18000, mileage: 25000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=60', description: 'Sporty and efficient.' },
  { make: 'Ford', model: 'Mustang', year: 2018, price: 26000, mileage: 22000, imageUrl: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=60', description: 'Classic muscle car vibes.' },
  { make: 'Tesla', model: 'Model 3', year: 2021, price: 35000, mileage: 12000, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=60', description: 'Electric performance and tech.' },
  { make: 'BMW', model: '3 Series', year: 2017, price: 22000, mileage: 40000, imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=60', description: 'Luxury sport sedan.' },
  { make: 'Audi', model: 'A4', year: 2019, price: 24000, mileage: 35000, imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1000&q=60', description: 'Refined interior, smooth ride.' },
  { make: 'Mercedes', model: 'C-Class', year: 2018, price: 23000, mileage: 38000, imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=60', description: 'Premium comfort and features.' },
  { make: 'Hyundai', model: 'Elantra', year: 2020, price: 16000, mileage: 20000, imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4b2a444ef1?auto=format&fit=crop&w=1000&q=60', description: 'Great value compact.' },
  { make: 'Kia', model: 'Optima', year: 2019, price: 15500, mileage: 28000, imageUrl: 'https://images.unsplash.com/photo-1541447271487-096b3cc060ff?auto=format&fit=crop&w=1000&q=60', description: 'Comfortable and efficient.' },
  { make: 'Nissan', model: 'Altima', year: 2018, price: 14000, mileage: 42000, imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=60', description: 'Spacious midsize sedan.' }
];

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/carhaven';
  await mongoose.connect(uri);
  console.log('Seeding database...');

  await Car.deleteMany({});
  await Car.insertMany(sampleCars);
  console.log('Inserted sample cars');

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({ email: process.env.ADMIN_EMAIL, password: hashed });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
