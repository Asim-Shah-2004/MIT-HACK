
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, Toaster } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  verificationCode: z.string().optional(),
})

export default function RegisterPage() {
  const [userType, setUserType] = useState('SME')
  const [registrationMethod, setRegistrationMethod] = useState('email')
  const [isPhoneVerificationSent, setIsPhoneVerificationSent] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userType,
          registrationMethod,
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      toast.success("Registration successful", {
        description: `Welcome, ${data.name}!`,
      })
      reset()
    } catch (error) {
      toast.error("Registration failed", {
        description: error.message,
      })
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      const { email, name } = decoded

      setValue('email', email)
      setValue('name', name)
      
      const apiResponse = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          userType,
          registrationMethod: 'google',
          idToken: credentialResponse.credential,
        }),
      })

      if (!apiResponse.ok) {
        throw new Error('Google registration failed')
      }

      toast.success("Google registration successful", {
        description: `Welcome, ${name}!`,
      })
    } catch (error) {
      toast.error("Google registration failed", {
        description: error.message,
      })
    }
  }

  const sendPhoneVerification = async () => {
    try {
      const response = await fetch('http://localhost:3000/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: document.getElementById('phone').value,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send verification code')
      }

      setIsPhoneVerificationSent(true)
      toast.success("Verification code sent", {
        description: "Please check your phone for the code.",
      })
    } catch (error) {
      toast.error("Failed to send verification code", {
        description: error.message,
      })
    }
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-2 mb-4">
                      <Button onClick={() => setRegistrationMethod('email')} variant={registrationMethod === 'email' ? 'default' : 'outline'}>Email</Button>
                      <Button onClick={() => setRegistrationMethod('phone')} variant={registrationMethod === 'phone' ? 'default' : 'outline'}>Phone</Button>
                    </div>

                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        toast.error("Google login failed", {
                          description: "Please try again or use another method.",
                        })
                      }}
                      useOneTap
                      theme="outline"
                      size="large"
                      width="100%"
                    />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name"  placeholder="John Doe" {...register("name")} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                      </div>

                      {registrationMethod === 'email' && (
                        <>
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
                        </>
                      )}

                      {registrationMethod === 'phone' && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="1234567890" {...register("phone")} />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                          </div>
                          {!isPhoneVerificationSent ? (
                            <Button type="button" onClick={sendPhoneVerification} className="w-full">Send Verification Code</Button>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor="verificationCode">Verification Code</Label>
                              <Input id="verificationCode" placeholder="Enter code" {...register("verificationCode")} />
                              {errors.verificationCode && <p className="text-sm text-red-500">{errors.verificationCode.message}</p>}
                            </div>
                          )}
                        </>
                      )}

                      <Button type="submit" className="w-full">Sign Up as {type}</Button>
                    </form>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}