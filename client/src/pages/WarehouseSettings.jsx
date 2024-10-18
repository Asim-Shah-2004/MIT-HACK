import React, { useEffect, useState } from 'react';
import { Lock, Unlock, DollarSign } from 'lucide-react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, title, children }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
      <DialogFooter>
        <Button onClick={onClose} variant="outline" className="mr-4">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Form = ({ fields, formData, handleInputChange, error, inventory, selectedInventory, setSelectedInventory }) => (
  <form>
    {fields.map(field => (
      <div key={field} className="mb-2">
        <Label htmlFor={field}>{field}</Label>
        <Input
          type="text"
          id={field}
          name={field}
          value={formData[field] || ""}
          onChange={handleInputChange}
          required={field !== 'Additional Details'}
          className="mt-1"
        />
      </div>
    ))}
    <div className="mb">
      <Label htmlFor="inventory">Select Inventory Item</Label>
      <Select onValueChange={setSelectedInventory} value={selectedInventory}>
        <SelectTrigger>
          <SelectValue placeholder="Select an Item" />
        </SelectTrigger>
        <SelectContent>
          {inventory.length > 0 ? (
            inventory.map(item => (
              <SelectItem key={item.rentalID} value={item.rentalID}>
                {item.propertyName}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>No items available</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </form>
);

const UserDashboard = ({ isOwner, isDarkMode, inventory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', fields: [] });
  const [selectedInventory, setSelectedInventory] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem('token');

  const openModal = (title, fields) => {
    setModalContent({ title, fields });
    setIsModalOpen(true);
    setError("");
    setFormData({});
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const missingField = Object.keys(formData).some(key => !formData[key] && key !== 'Additional Details');
    if (missingField) {
      setError("All fields except Additional Details are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (action) => {
    if (validateForm()) {
      console.log(`${action} form submitted:`, formData);
      try {
        let response;

        if (action === 'Freeze') {
          const response = await axios.post(`${backendUrl}/warehouse/freeze`, {
            customerEmail: formData["Customer Email"],
            agreedRentedSpace: formData["Agreed Rental Space"],
            agreedPricePerSqFt: formData["Agreed Price per sq ft"],
            additionalDetails: formData["Additional Details"],
            inventoryId: selectedInventory,
            bankName: formData["Bank Name"],
            branchName: formData["Bank Branch"],
            ifscCode: formData["IFSC Code"]
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log('Freeze response:', response.data);

        } else if (action === 'Unfreeze') {
          response = await axios.post(`${backendUrl}/warehouse/unfreeze`, {
            customerEmail: formData['Email of Customer to unfreeze'], inventoryId: selectedInventory
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log('Unfreeze response:', response.data);

        } else if (action === 'Confirm Owner Payment') {
          response = await axios.post(`${backendUrl}/warehouse/confirm-owner`, {
            customerEmail: formData['Customer Email'], inventoryId: selectedInventory
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log('Confirm Owner Payment response:', response.data);
        }
        closeModal();
      } catch (error) {
        console.error(`${action} request failed:`, error);
      }
    } else {
      console.log(`${action} form submitted:`, formData);
      closeModal();
    }
  };



  const actionButtons = [
    { label: 'Freeze', icon: Lock, fields: ['Customer Email', 'Agreed Rental Space', 'Agreed Price per sq ft', 'Bank Name', 'Bank Branch', 'IFSC Code', 'Additional Details'] },
    { label: 'Unfreeze', icon: Unlock, fields: ['Email of Customer to unfreeze'] },
    { label: 'Confirm Owner Payment', icon: DollarSign, fields: ['Customer Email'] },
  ];

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>
      <Card className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle>{isOwner ? 'Owner Dashboard' : 'User Dashboard'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isOwner ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {actionButtons.map(({ label, icon: Icon, fields }) => (
                  <Button key={label} onClick={() => openModal(label, fields)} className="flex items-center justify-center">
                    <Icon className="mr-2" /> {label}
                  </Button>
                ))}
              </div>
              <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
              <Card>
                <CardContent>
                  {inventory.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                      {inventory.map(item => (
                        <li key={item.rentalID} className="py-4 flex justify-between items-center">
                          <span className="text-lg">{item.propertyName}</span>
                          <span className="text-gray-600 dark:text-gray-300">Rental Price: ${item.rentalPrice}/sq ft</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No inventory items available.</p>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <Form
                  fields={['Amount', 'Payment Method', 'Additional Details']}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  error={error}
                  inventory={inventory}
                  selectedInventory={selectedInventory}
                  setSelectedInventory={setSelectedInventory}
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent.title}>
        <Form
          fields={modalContent.fields}
          formData={formData}
          handleInputChange={handleInputChange}
          error={error}
          inventory={inventory}
          selectedInventory={selectedInventory}
          setSelectedInventory={setSelectedInventory}
        />
        <Button onClick={() => handleSubmit(modalContent.title)} className="w-full">Submit</Button>
      </Modal>
    </div>
  );
};

export default function WarehouseSettings() {
  const [isOwner, setIsOwner] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const backendUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${backendUrl}/warehouse/getSpecificInventory`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventoryOptions(response.data.inventories);
        console.log('Inventory:', response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, [backendUrl, token]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'} min-h-screen`}>

      <UserDashboard
        isOwner={isOwner}
        isDarkMode={isDarkMode}
        inventory={inventoryOptions}
      />
    </div>
  );
}
