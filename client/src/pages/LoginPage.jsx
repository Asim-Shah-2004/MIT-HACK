import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Moon, Sun } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful", { description: `Welcome back!` });
      reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error("Login failed check", { description: errorMsg });
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col bg-gradient-to-br ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-indigo-100 to-purple-100'} flex items-center justify-center p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full border-2 border-gray-400 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} hover:bg-gray-500`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <Card className={`w-full max-w-md border-dashed border-orange-500 rounded-xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={`border rounded-lg p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
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
                className={`border rounded-lg p-2 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className={`text-sm text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className={`text-indigo-500 hover:underline ${isDarkMode ? 'hover:text-indigo-300' : ''}`}
          onClick={() => navigate('/register')}
        >
          Sign up
        </button>
      </p>
    </motion.div>
  );
};

export default LoginPage;
