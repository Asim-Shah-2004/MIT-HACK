import { useEffect, useState } from 'react';
import { X, Check, Search, Box } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import axios from 'axios';
import useTheme from "@/hooks/useTheme";
import Navbar from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Inventory = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load all warehouses on mount
  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/warehouse/getAllWarehouses`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setWarehouses(response.data);
        } else {
          toast.error("Failed to fetch warehouses.");
        }
      } catch (error) {
        toast.error("Error fetching warehouses.");
      }
    };

    loadWarehouses();
  }, []);

  const handleWarehouseClick = async (warehouseId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/warehouse/${warehouseId}/inventories`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setSelectedWarehouse({
          ...warehouses.find(w => w._id === warehouseId),
          inventories: response.data,
        });
      } else {
        toast.error("Failed to fetch inventories.");
      }
    } catch (error) {
      toast.error("Error fetching inventories.");
    }
  };

  const filteredWarehouses = warehouses.filter(w =>
    w.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const truncateText = (text, maxLength = 18) => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <>
      <Navbar />
      <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>
        {/* Search for warehouses */}
        <Card className={`mb-6 shadow-lg border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} hover:shadow-xl transition-shadow duration-300`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <Search className={`mr-2 ${isDarkMode ? "text-white" : ""}`} />
              Search Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2`}>
              <Input
                type="text"
                placeholder="Search warehouses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary`}
              />
              <Button size="icon" className={`${isDarkMode ? "bg-orange-600" : "bg-orange-600"}`}>
                <Search className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Display Warehouses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWarehouses.map(warehouse => (
            <Card
              key={warehouse._id}
              className={`hover:shadow-xl border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} transition-shadow duration-300`}
              onClick={() => handleWarehouseClick(warehouse._id)}
            >
              <CardHeader>
                <CardTitle className={`text-2xl font-bold flex items-center ${isDarkMode ? "text-white" : ""}`}>
                  <Box className={`mr-2 ${isDarkMode ? "text-white" : ""}`} />
                  {truncateText(warehouse.propertyName)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${isDarkMode ? "text-white" : "text-dark1"}`}>
                  {warehouse.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inventory Dialog */}
        <Dialog open={!!selectedWarehouse} onOpenChange={() => setSelectedWarehouse(null)}>
          <DialogContent className={`${isDarkMode ? 'bg-gray-800 text-light2' : 'bg-white text-dark1'} max-w-sm sm:max-w-lg`}>
            <DialogHeader>
              <DialogTitle className={`${isDarkMode ? 'text-white' : 'text-dark1'}`}>
                {selectedWarehouse?.propertyName} - Inventories
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedWarehouse?.inventories.length > 0 ? (
                <ul>
                  {selectedWarehouse.inventories.map(inventory => (
                    <li key={inventory.rentalID} className="flex justify-between">
                      <div>
                        <p><strong>Space:</strong> {inventory.rentedSpace} sq ft</p>
                        <p><strong>Price:</strong> {inventory.rentalPrice} per sq ft</p>
                      </div>
                      <div>
                        {inventory.paymentStatusCustomer ? (
                          <Check className="text-green-500" />
                        ) : (
                          <X className="text-destructive" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No inventories found for this warehouse.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Inventory;
