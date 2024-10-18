import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Plus, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import useTheme from "@/hooks/useTheme";
import useAuth from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const recommendedInvestments = [
  { id: 1, name: 'Tech Startup A', description: 'Innovative AI solutions', amount: '$500,000' },
  { id: 2, name: 'Green Energy B', description: 'Sustainable power generation', amount: '$750,000' },
  { id: 3, name: 'FinTech C', description: 'Blockchain-based payments', amount: '$600,000' },
  { id: 4, name: 'BioTech D', description: 'Advanced medical research', amount: '$1,000,000' },
  { id: 5, name: 'E-commerce E', description: 'Next-gen online retail', amount: '$400,000' },
];

const analyticsData1 = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const analyticsData2 = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 4000 },
  { name: 'Mar', value: 3500 },
  { name: 'Apr', value: 5000 },
  { name: 'May', value: 4500 },
  { name: 'Jun', value: 6000 },
];

const pieChartData = [
  { name: 'Tech', value: 400 },
  { name: 'Energy', value: 300 },
  { name: 'FinTech', value: 300 },
  { name: 'BioTech', value: 200 },
];

export default function InvestorDashboard() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [visibleInvestments, setVisibleInvestments] = useState(3);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const showMoreInvestments = () => {
    setVisibleInvestments(prev => Math.min(prev + 3, recommendedInvestments.length));
  };



  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>
      <Navbar />

      {/* <main className={`container mx-auto p-4 space-y-6`}>
    <Card className="border-orange-500 border-dashed border-2">


        </Card>

        <Card className="border-orange-500 border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recommended Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedInvestments.slice(0, visibleInvestments).map((investment) => (
                <Card key={investment.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>{investment.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{investment.description}</p>
                    <p className="font-bold mt-2">{investment.amount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {visibleInvestments < recommendedInvestments.length && (
              <Button onClick={showMoreInvestments} className="mt-4">
                Show More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>


        <Card className="border-orange-500 border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Investment Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData1}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#00Cd9F" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>


              <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Return on Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData2}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#00Cd9F" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>


              <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Investment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={120} fill="#00Cd9F">
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>


        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add an Investment
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <DialogHeader>
              <DialogTitle>Add New Investment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="business-name" className="text-right">
                  Business Name
                </Label>
                <Input id="business-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input id="amount" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interest-rate" className="text-right">
                  Interest Rate
                </Label>
                <Input id="interest-rate" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="investment-date" className="text-right">
                  Investment Date
                </Label>
                <Input id="investment-date" type="date" className="col-span-3" />
              </div>
            </div>
            <Button className="w-full mt-4">Add Investment</Button>
          </DialogContent>
        </Dialog>
      </main> */}

      <div className="welcome-container text-center p-10">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Welcome Back!</h1>

        <Card className="mx-auto border-orange-500 w-[300px] h-[300px] border-dashed border-2 shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">You’re all caught up!</h2>
            <p className="mt-3 text-lg">
              In the meantime, check out the latest{' '}
              <Link to="/events" className="text-orange-500 font-bold underline">
                events
              </Link>
              :
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
