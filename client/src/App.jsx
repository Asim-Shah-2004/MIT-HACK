import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, Toaster } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
})

export default function SignUpPage() {
  const [userType, setUserType] = useState('SME')

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data) => {

    console.log(data)
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
    reset()
  }

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Our Investment Network</h2>
            <Tabs value={userType} onValueChange={(value) => setUserType(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="SME">SME</TabsTrigger>
                <TabsTrigger value="Investor">Investor</TabsTrigger>
                <TabsTrigger value="Mentor">Mentor</TabsTrigger>
              </TabsList>
              {['SME', 'Investor', 'Mentor'].map((type) => (
                <TabsContent key={type} value={type}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" {...register("name")} />
                      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="1234567890" {...register("phone")} />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">Sign Up as {type}</Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
