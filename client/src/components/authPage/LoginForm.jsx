import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useAuth from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-_=+]+$/;
const loginSchema = z.object({
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

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { isDarkMode } = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful", { description: `Welcome back!` });
      reset();
      navigate('/network');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error("Login failed", { description: errorMsg });
    }
  };
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-6 rounded-lg text-dark2`}>
      <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`border rounded-lg p-2`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
            className={`border rounded-lg p-2`}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
