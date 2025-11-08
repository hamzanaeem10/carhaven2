import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import CarCard from '../components/CarCard.jsx';

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get('/api/cars', { params: { limit: 6 } }).then((res) => setCars(res.data.cars));
  }, []);

  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">Find your next ride</h1>
        <p className="text-slate-400 mt-2">Browse quality pre-owned cars with confidence.</p>
        <Link to="/listings" className="btn mt-6">Browse Listings</Link>
      </section>
      <section className="container">
        <h2 className="text-2xl font-semibold mb-4">Featured Cars</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {cars.map((c) => <CarCard key={c._id} car={c} />)}
        </div>
      </section>
    </div>
  );
}
