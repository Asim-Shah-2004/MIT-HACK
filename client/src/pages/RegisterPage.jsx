// import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Moon, Sun } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

export default function RegistrationForm() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('entrepreneur');
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    entrepreneurType: '',
    interestedIndustries: '',
    investmentAmount: '',
    investmentType: '',
    ruralInterest: false,
    engagementType: '',
    role: '',
  });

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, ruralInterest: checked }));
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const validateStep1 = () => {
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'country', 'state', 'city', 'password', 'confirmPassword'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (step === 1 && !validateStep1()) return;

    if (step === 2) {
      if (userType === 'entrepreneur' && !formData.entrepreneurType) {
        toast.error("Please enter the type of company.");
        return;
      }
      if (userType === 'investor') {
        const requiredFields = ['interestedIndustries', 'investmentAmount', 'investmentType', 'engagementType'];
        for (const field of requiredFields) {
          if (!formData[field]) {
            toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return;
          }
        }
      }
    }

    const response = await register(formData, userType);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    console.log('Form submitted:', formData);
    toast.success("Your registration has been submitted successfully!");
    navigate('/dashboard');
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-800'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full border-2 ${isDarkMode ? 'border-gray-400 bg-gray-600 text-white' : 'border-gray-300 bg-white text-black'} hover:bg-gray-500`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <Card className={`w-full border-dashed border-orange-500 border-2 max-w-lg rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-3xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <div className="space-y-6">
                <RadioGroup defaultValue={userType} onValueChange={handleUserTypeChange} className="flex flex-wrap justify-center space-x-4 mb-6">
                  {['entrepreneur', 'investor', 'warehouse'].map((type) => (
                    <div key={type} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem
                        value={type}
                        id={type}
                        className={`h-5 w-5 border-2 rounded-full cursor-pointer ${userType === type ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}
                      />
                      <Label htmlFor={type} className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['fullName', 'email', 'phoneNumber', 'country', 'state', 'city', 'password', 'confirm password'].map((field, index) => (
                    <div key={index} className="space-y-1">
                      <Label htmlFor={field} className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{field.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase())}</Label>
                      <Input
                        id={field}
                        name={field}
                        type={field.includes('password') ? 'password' : 'text'}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} focus:ring focus:ring-orange-500 rounded-lg`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                {userType === 'entrepreneur' && (
                  <div className="space-y-2">
                    <Label htmlFor="entrepreneurType" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Type of Company</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange('entrepreneurType', value)}
                      className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring focus:ring-orange-500`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" className="text-gray-100" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800">
                        {["Startup Founder", "SME Owner", "Serial Entrepreneur"].map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/ /g, '_')} className="text-gray-100 hover:bg-gray-700">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {userType === 'investor' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="interestedIndustries" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Interested Industries</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange('interestedIndustries', value)}
                        className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring focus:ring-orange-500`}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" className="text-gray-100" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                          {[
                            "Technology",
                            "Education",
                            "Healthcare",
                            "Finance",
                            "Consumer and goods",
                            "Media and entertainment",
                            "Legal and compliance",
                            "Real estate",
                            "Travel and hospitality",
                            "Human resources",
                            "Logistics and supply chain",
                            "Fashion and lifestyle"
                          ].map((industry) => (
                            <SelectItem key={industry} value={industry.toLowerCase().replace(/ /g, '_')} className="text-gray-100 hover:bg-gray-700">
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="investmentAmount" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Amount Looking to Invest</Label>
                      <Input
                        id="investmentAmount"
                        name="investmentAmount"
                        value={formData.investmentAmount}
                        onChange={handleInputChange}
                        required
                        className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} focus:ring focus:ring-orange-500 hover:bg-gray-600 rounded-lg`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="investmentType" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Investment Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('investmentType', value)} className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring focus:ring-orange-500`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment type" className="text-gray-100" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                          <SelectItem value="Equity" className="text-gray-100 hover:bg-gray-700">Equity</SelectItem>
                          <SelectItem value="Debt" className="text-gray-100 hover:bg-gray-700">Debt</SelectItem>
                          <SelectItem value="Convertible Note" className="text-gray-100 hover:bg-gray-700">Convertible Note</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ruralInterest" className={`data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-gray-500 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} checked={formData.ruralInterest} onCheckedChange={handleSwitchChange} />
                      <Label htmlFor="ruralInterest" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Rural Interest</Label>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="engagementType" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Engagement Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('engagementType', value)} className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring focus:ring-orange-500`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select engagement type" className="text-gray-100" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                          <SelectItem value="mentorship" className="text-gray-100 hover:bg-gray-700">Mentorship</SelectItem>
                          <SelectItem value="partnership" className="text-gray-100 hover:bg-gray-700">Partnership</SelectItem>
                          <SelectItem value="funding" className="text-gray-100 hover:bg-gray-700">Funding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="role" className={`text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Investment Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('role', value)} className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring focus:ring-orange-500`}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" className="text-gray-100" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                          <SelectItem value="vc" className="text-gray-100 hover:bg-gray-700">Venture Capitalist</SelectItem>
                          <SelectItem value="angel" className="text-gray-100 hover:bg-gray-700">Angel Investor</SelectItem>
                          <SelectItem value="lender" className="text-gray-100 hover:bg-gray-700">Banks/Lender</SelectItem>
                          <SelectItem value="individual" className="text-gray-100 hover:bg-gray-700">Individual Investor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <Button onClick={handleNext} className={`w-full ${isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-black'}`}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className={`w-full ${isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-black'}`}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}