import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  return (
    <div className="card">
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-44 object-cover rounded-lg" />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h3>
        <p className="text-brand font-bold">${car.price.toLocaleString()}</p>
        <p className="text-sm text-slate-400">{car.mileage.toLocaleString()} km</p>
        <Link to={`/cars/${car._id}`} className="btn mt-3">View Details</Link>
      </div>
    </div>
  );
}
