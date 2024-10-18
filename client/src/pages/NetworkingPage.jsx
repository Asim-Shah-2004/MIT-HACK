import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const investors = [
  { id: 1, name: 'John Doe', location: 'New York, USA', industry: 'Tech, Healthcare', investmentRange: '$100k - $500k', type: 'Equity', engagement: 'Mentorship / Partnership' },
  { id: 2, name: 'Jane Smith', location: 'San Francisco, USA', industry: 'Fintech, AI', investmentRange: '$500k - $1M', type: 'Equity', engagement: 'Advisory' },
  { id: 3, name: 'Bob Johnson', location: 'Chicago, USA', industry: 'E-commerce, Retail', investmentRange: '$250k - $750k', type: 'Debt', engagement: 'Strategic Partnership' },
  { id: 4, name: 'Alice Brown', location: 'Boston, USA', industry: 'Biotech, Pharmaceuticals', investmentRange: '$1M - $5M', type: 'Equity', engagement: 'Board Member' },
];

const entrepreneurs = [
  { id: 1, name: 'TechStart Inc.', location: 'Austin, USA', businessType: 'SaaS', fundingNeeded: '$1M - $3M', stage: 'Series A' },
  { id: 2, name: 'GreenEnergy Co.', location: 'Berlin, Germany', businessType: 'CleanTech', fundingNeeded: '$2M - $5M', stage: 'Seed' },
  { id: 3, name: 'HealthAI Solutions', location: 'London, UK', businessType: 'HealthTech', fundingNeeded: '$500k - $1M', stage: 'Pre-seed' },
  { id: 4, name: 'EduTech Innovations', location: 'Toronto, Canada', businessType: 'EdTech', fundingNeeded: '$3M - $7M', stage: 'Series B' },
];

const Carousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2 >= items.length ? 0 : prevIndex + 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 < 0 ? Math.max(items.length - 2, 0) : prevIndex - 2));
  };

  return (
    <div className="relative w-full">
      <Button variant="outline" className="absolute top-1/2 left-[-3rem] transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white" onClick={prevSlide}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="w-1/2 flex-shrink-0 px-2">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="absolute top-1/2 right-[-3rem] transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white" onClick={nextSlide}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ProposalDialog = ({ buttonText }) => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    console.log({ title, purpose, body, attachment });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Proposal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Input id="purpose" className="mt-1" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea id="body" className="mt-1" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="attachment">Attachment</Label>
            <Input id="attachment" className="mt-1" type="file" onChange={(e) => setAttachment(e.target.files[0])} />
          </div>
          <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">Submit Proposal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const InvestorCard = ({ investor }) => (
  <Card className="m-2 shadow-lg">
    <CardHeader>
      <CardTitle>{investor.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{investor.location}</p>
      <p className="text-sm">Industries: {investor.industry}</p>
      <p className="text-sm">Investment Range: {investor.investmentRange}</p>
      <p className="text-sm">Investment Type: {investor.type}</p>
      <p className="text-sm">Engagement: {investor.engagement}</p>
    </CardContent>
    <CardFooter>
      <ProposalDialog buttonText="Send Proposal" />
    </CardFooter>
  </Card>
);

const EntrepreneurCard = ({ entrepreneur }) => (
  <Card className="m-2 shadow-lg">
    <CardHeader >
      <CardTitle >{entrepreneur.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{entrepreneur.location}</p>
      <p className="text-sm">Business Type: {entrepreneur.businessType}</p>
      <p className="text-sm">Funding Needed: {entrepreneur.fundingNeeded}</p>
      <p className="text-sm">Stage: {entrepreneur.stage}</p>
    </CardContent>
    <CardFooter>
      <ProposalDialog buttonText="Send Proposal" />
    </CardFooter>
  </Card>
);

const Post = ({ post }) => {
  const [postId, setPostId] = useState(post.postId);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    await axios.post(`${SERVER_URL}/post/like`, { postId }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setIsLiked(!isLiked);
  };

  return (
    <Card className="m-2 shadow-lg max-h-84 w-full">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-sm">{post.author}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <img src={post.image} alt="Post content" className="mb-2 w-full max-h-32 object-cover rounded" />
        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-start items-center">
        <Button variant="ghost" className={`hover:text-red-500 ${isLiked ? 'text-red-500' : 'text-gray-600'}  `} onClick={handleLike}>
          <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
          {likes}
        </Button>
      </CardFooter>
    </Card>
  );
};

const NetworkingPage = () => {

  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email);
    }
  }, [token]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/post/getAll`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res); // Log the response data
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);


  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 pb-6 sm:px-0">
          <h2 className="text-2xl font-semibold mb-2">Recommended Investors</h2>
          <Carousel items={investors} renderItem={(investor) => <InvestorCard investor={investor} />} />

          <h2 className="text-2xl font-semibold mt-4 mb-2">Recommended Entrepreneurs</h2>
          <Carousel items={entrepreneurs} renderItem={(entrepreneur) => <EntrepreneurCard entrepreneur={entrepreneur} />} />

          <h2 className="text-2xl font-semibold mt-8 my-4">Recent Posts</h2>
          <div className='flex flex-col items-center'>
            {posts && posts.map((post) => (
              <Post key={post.id} post={post} className="w-full" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkingPage;