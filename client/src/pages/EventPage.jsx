'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Bell, Menu, MapPin, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Navbar Component
const Navbar = () => (
  <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
    <div className="text-2xl font-bold">EventDash</div>
    <div className="flex items-center space-x-4">
      <Bell className="w-6 h-6" />
      <Menu className="w-6 h-6" />
    </div>
  </nav>
)

// TrendingEvents Component
const TrendingEvents = () => (
  <Carousel className="w-full max-w-5xl mx-auto my-8">
    <CarouselContent>
      {[...Array(5)].map((_, index) => (
        <CarouselItem key={index} className="md:basis-full">
          <Card className="h-80">
            <CardContent className="flex h-full p-6">
              <div className="flex-1 pr-6">
                <h3 className="text-2xl font-semibold mb-2">Trending Event {index + 1}</h3>
                <p className="text-sm text-muted-foreground mb-4">Exciting description here! This event is going to be amazing and you don't want to miss it.</p>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">New York, NY</span>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">June 15, 2024</span>
                </div>
                <div className="flex items-center mb-4">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm">$99.99</span>
                </div>
                <Button>Register Now</Button>
              </div>
              <div className="w-1/2 h-full bg-muted rounded-lg" style={{ backgroundImage: `url('/placeholder.svg?height=300&width=400')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)

// SearchAndFilter Component
const SearchAndFilter = () => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input type="text" placeholder="Search events..." className="pl-10" />
    </div>
    <Button variant="outline">
      <Filter className="w-4 h-4 mr-2" />
      Filter
    </Button>
  </div>
)

// EventCard Component
const EventCard = ({ title, description, image, location, date, price, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Card className="cursor-pointer h-full">
      <CardContent className="p-0">
        <div className="aspect-square bg-muted" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center mb-1">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm">{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

// EventGrid Component
const EventGrid = ({ events }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event, index) => (
      <EventCard
        key={index}
        title={event.title}
        description={event.description}
        image={event.image}
        location={event.location}
        date={event.date}
        price={event.price}
        onClick={() => console.log(`Clicked Event ${index + 1}`)}
      />
    ))}
  </div>
)

// Main Dashboard Component
export default function EventPage() {
  const [activeTab, setActiveTab] = useState("registration")

  const registrationEvents = [
    { title: "Tech Conference 2024", description: "Annual tech conference featuring the latest innovations", image: "/placeholder.svg?height=300&width=300", location: "San Francisco, CA", date: "August 10-12, 2024", price: "$299.99" },
    { title: "Music Festival", description: "Three days of non-stop music from top artists", image: "/placeholder.svg?height=300&width=300", location: "Austin, TX", date: "July 15-17, 2024", price: "$150.00" },
    { title: "Food & Wine Expo", description: "Taste cuisines from around the world", image: "/placeholder.svg?height=300&width=300", location: "Chicago, IL", date: "September 5-7, 2024", price: "$75.00" },
    { title: "Art Exhibition", description: "Featuring works from emerging artists", image: "/placeholder.svg?height=300&width=300", location: "New York, NY", date: "October 1-30, 2024", price: "$25.00" },
    { title: "Marathon", description: "Annual city marathon for all skill levels", image: "/placeholder.svg?height=300&width=300", location: "Boston, MA", date: "April 15, 2024", price: "$50.00" },
    { title: "Business Summit", description: "Network with industry leaders and innovators", image: "/placeholder.svg?height=300&width=300", location: "Miami, FL", date: "November 20-22, 2024", price: "$399.99" },
  ]

  const watchlistEvents = [
    { title: "Film Festival", description: "Showcasing independent films from around the world", image: "/placeholder.svg?height=300&width=300", location: "Los Angeles, CA", date: "June 1-7, 2024", price: "$100.00" },
    { title: "Comic Con", description: "Annual gathering for comic and pop culture fans", image: "/placeholder.svg?height=300&width=300", location: "San Diego, CA", date: "July 23-26, 2024", price: "$150.00" },
    { title: "Science Fair", description: "Showcasing groundbreaking research and innovations", image: "/placeholder.svg?height=300&width=300", location: "Washington D.C.", date: "May 15-17, 2024", price: "Free" },
  ]

  const recentViewEvents = [
    { title: "Book Fair", description: "Annual gathering for book lovers and authors", image: "/placeholder.svg?height=300&width=300", location: "Seattle, WA", date: "March 20-22, 2024", price: "$25.00" },
    { title: "Dance Competition", description: "Watch top dancers compete for the championship", image: "/placeholder.svg?height=300&width=300", location: "Orlando, FL", date: "October 15, 2024", price: "$20.00" },
  ]

  return (
    <div>
      <Navbar />
      <SearchAndFilter />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="recent">Recent Views</TabsTrigger>
        </TabsList>
        <TabsContent value="registration">
          <EventGrid events={registrationEvents} />
        </TabsContent>
        <TabsContent value="watchlist">
          <EventGrid events={watchlistEvents} />
        </TabsContent>
        <TabsContent value="recent">
          <EventGrid events={recentViewEvents} />
        </TabsContent>
      </Tabs>
      <TrendingEvents />
    </div>
  )
}
