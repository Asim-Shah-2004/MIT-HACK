import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpSquare, Search, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import useTheme from "@/hooks/useTheme";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendURL = import.meta.env.VITE_SERVER_URL;

const WarehousePage = () => {
    const { isDarkMode } = useTheme();
    const [warehouses, setWarehouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [interestedWarehouses, setInterestedWarehouses] = useState([]);
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

    useEffect(() => {
        const getWarehouses = async () => {
            try {
                const response = await axios.get(`${backendURL}/warehouse/allWarehouse`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data.inventories); 

                setWarehouses(response.data.inventories); 
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };
        getWarehouses();
    }, []);

    const handleInterestClick = async (warehouseId, creatorEmail) => {
        console.log(warehouseId, creatorEmail); 
        await axios.post(`${backendURL}/warehouse/intrested`, {
            customerEmail: creatorEmail
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setInterestedWarehouses((prev) => {
            const isInterested = prev.includes(warehouseId);
            if (isInterested) {
                return prev.filter(id => id !== warehouseId);
            } else {
                return [...prev, warehouseId];
            }
        });
    };

    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSettingsRedirect = () => {
        navigate('/warehouse-settings');
    };

    return (
        <>
            <Navbar />
            <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>

                {/* Centered Warehouse Settings Button */}
                <div className="flex justify-center mb-6">
                    <Button
                        className="bg-orange-600 hover:bg-orange-500 text-white flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg"
                        onClick={handleSettingsRedirect}
                    >
                        <Settings className="h-5 w-5" />
                        <span className="font-semibold">Warehouse Settings</span>
                    </Button>
                </div>

                {/* Search Bar */}
                <Card className="mb-6 shadow-lg border-orange-500 border-dashed border-[2px]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center">
                            <Search className="mr-2" />
                            Find a Warehouse
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex flex-1 space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Search warehouses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 rounded-lg shadow-sm"
                                />
                                <Button size="icon" className="bg-orange-600 hover:bg-orange-500">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWarehouses.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground">
                            <p>No warehouses found</p>
                        </div>
                    ) : (
                        filteredWarehouses.map((warehouse) => (
                            <Card key={warehouse._id} className="shadow-lg hover:shadow-xl border-orange-500 border-dashed border-[2px]">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">{warehouse.propertyName}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    {/* Warehouse Details */}
                                    <p className="text-sm text-muted-foreground mb-4">{warehouse.details}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {`${warehouse.location.city}, ${warehouse.location.state}, ${warehouse.location.country}`}
                                    </p>

                                    {/* Additional Info */}
                                    <div className="mt-2 text-sm">
                                        <p><strong>Rented Space:</strong> {warehouse.rentedSpace} sq ft</p>
                                        <p><strong>Rental Price:</strong> ${warehouse.rentalPrice} / month</p>
                                    </div>

                                    <div className="mt-4">
                                        <Button
                                            className="w-full bg-orange-600 hover:bg-orange-500"
                                            onClick={() => handleInterestClick(warehouse._id,warehouse.creatorEmail)}
                                        >
                                            {interestedWarehouses.includes(warehouse._id) ? 'Interested' : 'Express Interest'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default WarehousePage;
