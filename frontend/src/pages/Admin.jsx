import { useEffect, useState } from 'react';
import api from '../api/axios.js';

const empty = { make: '', model: '', year: '', price: '', mileage: '', imageUrl: '', description: '' };

export default function Admin() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await api.get('/api/cars', { params: { limit: 100 } });
    setCars(data.cars);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    const payload = {
      ...form,
      year: Number(form.year), price: Number(form.price), mileage: Number(form.mileage)
    };
    if (editingId) await api.put(`/api/cars/${editingId}`, payload);
    else await api.post('/api/cars', payload);
    setForm(empty); setEditingId(null); load();
  };

  const edit = (c) => {
    setEditingId(c._id);
    setForm({
      make: c.make, model: c.model, year: c.year, price: c.price,
      mileage: c.mileage, imageUrl: c.imageUrl, description: c.description
    });
  };

  const remove = async (id) => {
    await api.delete(`/api/cars/${id}`);
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">{editingId ? 'Edit Car' : 'Add Car'}</h2>
        <div className="grid grid-cols-2 gap-3">
          {['make','model','year','price','mileage','imageUrl'].map((f) => (
            <input key={f} className="input" placeholder={f} value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
          ))}
          <textarea className="input col-span-2" placeholder="description" rows={3}
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn col-span-2" onClick={submit}>{editingId ? 'Update' : 'Create'}</button>
        </div>
      </div>

      <div className="space-y-3">
        {cars.map((c) => (
          <div key={c._id} className="card flex items-center gap-4">
            <img src={c.imageUrl} alt="" className="w-28 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{c.year} {c.make} {c.model}</div>
              <div className="text-brand">${c.price.toLocaleString()}</div>
            </div>
            <button className="btn" onClick={() => edit(c)}>Edit</button>
            <button className="ml-2 underline text-red-400" onClick={() => remove(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
