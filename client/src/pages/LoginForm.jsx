import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from 'axios';

const loginSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address." })
    .max(64, { message: "Email must be at most 64 characters." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/login', data, { withCredentials: true });

      toast.success("Login successful", { description: `Welcome back!` });
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error("Login failed", { description: errorMsg });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}

export default LoginForm;