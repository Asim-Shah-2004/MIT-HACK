import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { Search, MapPin, Calendar, DollarSign} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from '@/components/Navbar'
import useTheme from "@/hooks/useTheme"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function EventPage() {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")    
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
    const [registeredEvents, setRegisteredEvents] = useState([])
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
    
    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)

        handler()

        return () => {
            handler.cancel()
        }
    }, [searchTerm])

    const backendUrl = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const getEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("Token not found");
                    return;
                }

                const response = await axios.get(`${backendUrl}/event/getEvents`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);

                setRegisteredEvents(response.data);
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        };
        getEvents();
    }, []);




    const watchlistEvents = [
        { title: "Film Festival", description: "Showcasing independent films from around the world", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvetnLOz5AF4JPJGxqw0EJpwpBHl9swwqww&s", location: "Los Angeles, CA", date: "June 1-7, 2024", price: "$100.00" },
        { title: "Comic Con", description: "Annual gathering for comic and pop culture fans", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvetnLOz5AF4JPJGxqw0EJpwpBHl9swwqww&s", location: "San Diego, CA", date: "July 23-26, 2024", price: "$150.00" },
    ]

    // Filter events based on the debounced search term
    const filteredRegistrationEvents = registeredEvents.filter(event =>
        event.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    const filteredWatchlistEvents = watchlistEvents.filter(event =>
        event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    const handleCardClick = (event) => {
        setSelectedEvent(event)
    }

    const closeModal = () => {
        setSelectedEvent(null)
    }




    const handleSubmit = async (event) => {

        if (event.eventType === "private") {
            await axios.post(`${backendUrl}/event/register`, {
                eventId: event.eventId,
                eventType: event.eventType,
                userEmail: jwtDecode(localStorage.getItem('token')).email
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Request sent for approval");
            }).catch((err) => {
                toast.error(err.response.data.msg);
            })
        } else {
            await axios.post(`${backendUrl}/event/register`, {
                eventId: event.eventId,
                eventType: event.eventType,
                userEmail: jwtDecode(localStorage.getItem('token')).email
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success(res.data.msg);
            }).catch((err) => {
                toast.error(err.response.data.msg);
            })
        }
    }


    const EventCards = ({ events }) => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {events.map((event, index) => (
                    <Card
                        key={event._id}
                        onClick={() => handleCardClick(event)}
                        className="hover:shadow-xl transition-shadow border-2 border-dashed border-orange-500 duration-300 ease-in-out cursor-pointer relative"
                    >
                        {index < 3 && (
                            <span className="absolute top-2 right-2 text-xl">🔥</span> // Flame emoji
                        )}
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2 truncate">{event.eventDescription}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{event.eventFormat === "online" ? "Online" : "Offline"}</p>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <DollarSign className="w-4 h-4 mr-2" />
                                <span>{event.registrationFee === "Free" ? "Free" : `$${event.registrationFee}`}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                                <strong>Max Attendees:</strong> {event.maxAttendees}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

        );
    };


    const Modal = ({ event, onClose }) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-slate-950 p-8 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 max-w-3xl">
                    <h3 className="text-2xl font-semibold mb-2 text-dark dark:text-white">{event.title}</h3>
                    <p className="text-sm mb-4 text-dark dark:text-muted-foreground">{event.description}</p>
                    <div className="mb-4">
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s"} alt={event.title} className="w-full h-60 object-cover rounded-lg" />
                        <h3 className="text-lg font-semibold my-2 truncate">{event.eventDescription}</h3>
                    </div>
                    <div className="flex items-center mb-2 text-sm text-dark dark:text-white">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center mb-2 text-sm text-dark dark:text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm mb-4 text-dark dark:text-white">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>{event.registrationFee}</span>
                    </div>
                    <Button onClick={() => handleSubmit(event)} className="w-full mb-4 bg-orange-500 hover:bg-orange-400">Register Now</Button>
                    <Button onClick={onClose} variant="outline" className="w-full">Close</Button>
                </div>
            </div>
        )
    }


    return (
        <>
            <Navbar />
            <div className="container mx-auto p-3">
                <Toaster richColors />
                <div className="text-center mt-4">
                    <h2 className="text-3xl font-bold dark:text-white">Explore Events</h2>
                    <p className="mt-2 text-muted-foreground">Discover and register for upcoming events</p>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search events"
                        className="w-full sm:w-1/2"
                    />
                    <Button className="ml-2 bg-orange-500 hover:bg-orange-400">
                        <Search className="w-4 h-4 mr-1" />
                        Search
                    </Button>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold dark:text-white text-center mb-4">Registered Events</h2>
                    <EventCards events={registeredEvents} />
                </div>
                {selectedEvent && <Modal event={selectedEvent} onClose={closeModal} />}
            </div>
        </>
    )
}
