import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const products = [
  {
    productID: "a1b2c3d4",
    name: "Organic Apples",
    pricePerUnit: 1.99,
    minOrderQuantity: 10,
    stock: 100,
    creatorEmail: "john@example.com",
    creatorName: "John Doe",
    isRural: true,
    createdAt: new Date("2023-01-15"),
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    productID: "e5f6g7h8",
    name: "Fresh Milk",
    pricePerUnit: 2.49,
    minOrderQuantity: 5,
    stock: 50,
    creatorEmail: "jane@example.com",
    creatorName: "Jane Smith",
    isRural: false,
    createdAt: new Date("2023-02-20"),
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    productID: "i9j0k1l2",
    name: "Free-range Eggs",
    pricePerUnit: 3.99,
    minOrderQuantity: 12,
    stock: 200,
    creatorEmail: "bob@example.com",
    creatorName: "Bob Johnson",
    isRural: true,
    createdAt: new Date("2023-03-10"),
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    productID: "m3n4o5p6",
    name: "Artisanal Cheese",
    pricePerUnit: 8.99,
    minOrderQuantity: 2,
    stock: 30,
    creatorEmail: "alice@example.com",
    creatorName: "Alice Brown",
    isRural: false,
    createdAt: new Date("2023-04-05"),
    image: "/placeholder.svg?height=200&width=200"
  },
]

export default function MarketPlacePage() {
  const [interestedProducts, setInterestedProducts] = useState(new Set());
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleInterestClick = (productId) => {
    setInterestedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold mb-4 text-center">Market Place</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.productID} className="flex overflow-hidden relative">
              {product.isRural && (
                <Badge className="absolute top-2 right-2 bg-green-500">Rural</Badge>
              )}
              <div className="w-1/3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-lg font-medium text-gray-600">${product.pricePerUnit} per unit</p>
                  <p className="text-sm text-gray-500">Owner: {product.creatorName}</p>
                  <p className="text-sm text-gray-500">Min. Order: {product.minOrderQuantity}</p>
                  <p className="text-sm text-gray-500">In Stock: {product.pricePerUnit}</p>
                </div>
                <Button
                  className="mt-2 self-end"
                  onClick={() => handleInterestClick(product.productID)}
                >
                  {interestedProducts.has(product.productID) ? 'Interested' : 'Chat'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}