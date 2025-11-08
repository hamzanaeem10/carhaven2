import { Router } from 'express';
import Car from '../models/Car.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// List with filters + pagination
router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      make,
      model,
      minPrice,
      maxPrice,
      year,
      page = 1,
      limit = 10
    } = req.query;

    const q = {};
    if (search) {
      q.$or = [
        { make: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    if (make) q.make = new RegExp(`^${make}$`, 'i');
    if (model) q.model = new RegExp(`^${model}$`, 'i');
    if (year) q.year = Number(year);
    if (minPrice || maxPrice) {
      q.price = {};
      if (minPrice) q.price.$gte = Number(minPrice);
      if (maxPrice) q.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [total, cars] = await Promise.all([
      Car.countDocuments(q),
      Car.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
    ]);
    res.json({ total, page: Number(page), limit: Number(limit), cars });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Not found' });
    res.json(car);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (e) {
    res.status(400).json({ message: 'Invalid payload' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Not found' });
    res.json(car);
  } catch (e) {
    res.status(400).json({ message: 'Invalid payload' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Not found' });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
