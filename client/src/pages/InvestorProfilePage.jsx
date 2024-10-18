import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const backendUrl = import.meta.env.VITE_SERVER_URL; 
  const navigate = useNavigate();


  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  useEffect(() => {
    const displayProfile = async () => {  
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendUrl}/user/details`,
        { email: jwtDecode(token).email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
    };
    displayProfile();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      setIsSaving(true);
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `${backendUrl}/user/update`,
          {
            fullName: profile.fullName,
            phoneNumber: profile.phoneNumber,
            country: profile.country,
            state: profile.state,
            city: profile.city,
            profilePicture: profile.profilePicture,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Your changes have been saved successfully.");
      } catch (error) {
        toast.error("Failed to save profile details.");
      }
      setIsSaving(false);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsSaving(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
        setIsSaving(false);
        toast.success("Your new profile photo has been uploaded successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="mb-6 border shadow-lg transition-transform">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.profilePicture} alt="Profile" />
                <AvatarFallback>{profile.fullName?.[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label htmlFor="photo-upload" className="absolute bottom-0 right-0 text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-gray-100 transition">
                  <Camera size={16} />
                  <Input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </Label>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold">{profile.fullName}</h3>
              <p className="text-sm text-muted-foreground">Email: {profile.email}</p>
            </div>
          </div>
          <Button variant={isEditing ? "default" : "outline"} onClick={handleEditToggle} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Phone:</span> {profile.phoneNumber}</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Location</h4>
              <div className="space-y-2">
                {['country', 'state', 'city'].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}:</Label>
                    {isEditing ? (
                      <Input
                        id={field}
                        name={field}
                        value={profile[field]}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <p>{profile[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
