import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

const nameRegex = /^[a-zA-Z\s]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-_=+]+$/;
const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(128, { message: "Name must be at most 128 characters." })
    .refine(value => nameRegex.test(value), {
      message: "Name must contain only letters and spaces.",
    }),
  email: z.string()
    .email({ message: "Invalid email address." })
    .max(64, { message: "Email must be at most 64 characters." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password must be at most 32 characters." })
    .refine(value => passwordRegex.test(value), {
      message: "Password can contain only letters, numbers, and symbols (! @ # $ % ^ & * ( ) - _ = +).",
    }),
});

const RegisterForm = () => {
  const [userType, setUserType] = useState('SME');
  const navigate = useNavigate();
  const { register: authRegister, loading } = useAuth();
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authRegister({ ...data, userType });
      toast.success("Registration successful", { description: `Welcome, ${data.name}!` });
      reset();
      navigate('/network');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error("Registration failed", { description: errorMsg });
    }
  };

  return (
    <div>
      <h2 className={`text-3xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
        Join Our Investment Network
      </h2>

      <Tabs value={userType} onValueChange={setUserType} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="SME">SME</TabsTrigger>
          <TabsTrigger value="Investor">Investor</TabsTrigger>
          <TabsTrigger value="Mentor">Mentor</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} className={isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" {...register("password")} className={isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing Up...' : `Sign Up as ${userType}`}
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
