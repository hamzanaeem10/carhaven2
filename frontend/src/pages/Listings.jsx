import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import CarCard from '../components/CarCard.jsx';
import Pagination from '../components/Pagination.jsx';

export default function Listings() {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: '', make: '', model: '', year: '', minPrice: '', maxPrice: '' });
  const limit = 9;

  const fetchCars = async (p = 1) => {
    const { data } = await api.get('/api/cars', { params: { ...filters, page: p, limit } });
    setCars(data.cars);
    setTotal(data.total);
    setPage(data.page);
  };

  useEffect(() => { fetchCars(page); /* eslint-disable-next-line */ }, []);

  return (
    <div>
      <div className="card mb-4 grid md:grid-cols-6 gap-3">
        <input className="input md:col-span-2" placeholder="Search…" value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <input className="input" placeholder="Make" value={filters.make}
          onChange={(e) => setFilters({ ...filters, make: e.target.value })} />
        <input className="input" placeholder="Model" value={filters.model}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })} />
        <input className="input" placeholder="Year" value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })} />
        <input className="input" placeholder="Min Price" value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
        <input className="input" placeholder="Max Price" value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
        <button className="btn md:col-span-6" onClick={() => fetchCars(1)}>Apply Filters</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {cars.map((c) => <CarCard key={c._id} car={c} />)}
      </div>

      <Pagination page={page} total={total} limit={limit} onChange={(p) => fetchCars(p)} />
    </div>
  );
}
