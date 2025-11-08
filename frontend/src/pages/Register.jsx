import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await api.post('/api/auth/register', values);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <label className="label">Email</label>
      <input className="input" {...register('email')} />
      {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

      <label className="label mt-3">Password</label>
      <input type="password" className="input" {...register('password')} />
      {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

      <button className="btn mt-4" type="submit">Create Account</button>
    </form>
  );
}
