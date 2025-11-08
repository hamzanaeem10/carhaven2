import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    api.get(`/api/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-80 object-cover rounded-xl" />
      <div className="card">
        <h1 className="text-2xl font-bold">{car.year} {car.make} {car.model}</h1>
        <p className="text-3xl text-brand font-bold mt-2">${car.price.toLocaleString()}</p>
        <p className="mt-2 text-slate-300">{car.description}</p>
        <p className="mt-2 text-sm text-slate-400">Mileage: {car.mileage.toLocaleString()} km</p>
        <a href="mailto:sales@carhaven.local" className="btn mt-4">Contact Dealer</a>
      </div>
    </div>
  );
}
