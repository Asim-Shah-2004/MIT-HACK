import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Linkedin } from "lucide-react";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

const feedbackSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(64, { message: 'Name must not exceed 64 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  message: z.string()
    .min(1, { message: 'Message must be at least 1 characters long' })
    .max(2048, { message: 'Message must not exceed 2048 characters' }),
});

const backendurl = import.meta.env.VITE_SERVER_URL;

const Footer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
      try {
        await axios.post(`${backendurl}/feedback`, data);
        toast.success('Feedback sent successfully!');
    } catch (e) {
        toast.error('error while sending feedback')
    }
  };

  return (
    <>
      <section id="feedback" className="py-3 sm:py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-orange-500">Get In Touch</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                required
                type="text"
                id="name"
                {...register('name')}
                className="mt-1"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
              required
                type="text"
                id="email"
                {...register('email')}
                className="mt-1"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
              required
                id="message"
                {...register('message')}
                rows={4}
                className="mt-1"
              />
              {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">Send Message</Button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-950 text-primary-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-md mb-2">© 2024 Elev8. All Rights Reserved.</p>
          <nav className="flex justify-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
