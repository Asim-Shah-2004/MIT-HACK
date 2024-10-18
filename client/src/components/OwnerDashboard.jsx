import React, { useState } from 'react';
import { Lock, Unlock, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/Modal";  // Correct import for default export

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectTrigger } from './ui/select';

const OwnerDashboard = ({ inventory, inventoryOptions, isDarkMode, openModal }) => {
  
  const handleFreeze = () => {
    openModal('Freeze', renderForm('Freeze', ['Customer Email', 'Agreed Rental Space', 'Agreed Price per sq ft', 'Bank Name', 'Additional Details'], () => handleSubmit('Freeze')));
  };

  const handleUnfreeze = () => {
    openModal('Unfreeze', renderForm('Unfreeze', ['Email of Customer to unfreeze'], () => handleSubmit('Unfreeze')));
  };

  const handleConfirmOwnerPayment = () => {
    openModal('Confirm Owner Payment', renderForm('Confirm Owner Payment', ['Customer Email'], () => handleSubmit('Confirm Owner Payment')));
  };

  const renderForm = (title, fields, onSubmit) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      {fields.map((field) => (
        <div key={field} className="mb-4">
          <Label htmlFor={field}>{field}</Label>
          <Input
            type="text"
            id={field}
            name={field}
            required={field !== 'Additional Details'}
            className="mt-1"
          />
        </div>
      ))}
      
      <div className="mb-4">
        <Label htmlFor="inventory">Select Inventory Item</Label>
        <Select onValueChange={(value) => setSelectedInventory(value)} value={selectedInventory}>
          <SelectTrigger>
            <SelectValue placeholder="Select an Item" />
          </SelectTrigger>
          <SelectContent>
            {inventoryOptions.length > 0 ? (
              inventoryOptions.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.propertyName}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="">No items available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full mt-4">
        Submit
      </Button>
    </form>
  );

  return (
    <Card className={`max-w-4xl mx-auto ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
      <CardHeader>
        <CardTitle>Owner Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button onClick={handleFreeze} className="flex items-center justify-center">
            <Lock className="mr-2" /> Freeze
          </Button>
          <Button onClick={handleUnfreeze} className="flex items-center justify-center">
            <Unlock className="mr-2" /> Unfreeze
          </Button>
          <Button onClick={handleConfirmOwnerPayment} className="flex items-center justify-center">
            <DollarSign className="mr-2" /> Confirm Owner Payment
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
        <Card>
          <CardContent>
            {inventory.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                {inventory.map((item) => (
                  <li key={item._id} className="py-4 flex justify-between items-center">
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
      </CardContent>
    </Card>
  );
};

export default OwnerDashboard;
