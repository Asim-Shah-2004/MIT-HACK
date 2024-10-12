"use client"

import React, { useState, useEffect, createContext, useContext } from 'react'
import { Search, Filter, ChevronDown, User, MapPin, Briefcase, DollarSign, Handshake, TreeDeciduous, Building, Coins, Target, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Create a context for the theme
const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

// Mock data for investors and SMEs
const mockData = [
    { type: 'investor', name: 'John Doe', location: 'New York, USA', industries: ['Tech', 'Healthcare'], investmentRange: '$100k - $500k', investmentType: 'Equity', engagement: 'Mentorship / Partnership', ruralFocus: false },
    { type: 'investor', name: 'Jane Smith', location: 'San Francisco, USA', industries: ['Fintech', 'AI'], investmentRange: '$500k - $2M', investmentType: 'Debt', engagement: 'Advisory', ruralFocus: true },
    { type: 'sme', name: 'TechStart Inc.', location: 'Austin, USA', businessType: 'SaaS', fundingNeeded: '$1M - $3M', stage: 'Series A' },
    { type: 'investor', name: 'Robert Johnson', location: 'London, UK', industries: ['Biotech', 'Cleantech'], investmentRange: '$1M - $5M', investmentType: 'Equity', engagement: 'Board Member', ruralFocus: false },
    { type: 'sme', name: 'GreenEnergy Co.', location: 'Berlin, Germany', businessType: 'Renewable Energy', fundingNeeded: '$5M - $10M', stage: 'Series B' },
    { type: 'investor', name: 'Sarah Lee', location: 'Singapore', industries: ['E-commerce', 'Logistics'], investmentRange: '$200k - $1M', investmentType: 'Convertible Note', engagement: 'Strategic Partner', ruralFocus: true },
    { type: 'sme', name: 'HealthTech Solutions', location: 'Toronto, Canada', businessType: 'MedTech', fundingNeeded: '$500k - $2M', stage: 'Seed' },
]

export default function NetworkingPage() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSME, setIsSME] = useState(false)
    const [fundingRange, setFundingRange] = useState([10000, 10000000])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState(mockData)
    const [selectedIndustry, setSelectedIndustry] = useState('all')
    const [selectedState, setSelectedState] = useState('all')

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    useEffect(() => {
        console.log('Filtering data...')
        const filterData = () => {
            const filtered = mockData.filter((item) => {
                const matchesType = isSME ? item.type === 'sme' : item.type === 'investor'
                const matchesSearch = searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesIndustry = selectedIndustry === 'all' || (item.industries && item.industries.includes(selectedIndustry))
                const matchesState = selectedState === 'all' || item.location.toLowerCase().includes(selectedState.toLowerCase())
            
                let matchesFunding = true
                if (fundingRange && fundingRange.length === 2) {
                    const [minFunding, maxFunding] = fundingRange
                    const itemMin = parseInt((item.type === 'investor' ? item.investmentRange : item.fundingNeeded).split('-')[0].replace(/\D/g, ''))
                    const itemMax = parseInt((item.type === 'investor' ? item.investmentRange : item.fundingNeeded).split('-')[1].replace(/\D/g, ''))
                    matchesFunding = itemMin <= maxFunding && itemMax >= minFunding
                }

                return matchesType && matchesSearch && matchesIndustry && matchesState && matchesFunding
            })
            console.log('Filtered data:', filtered)
            setFilteredData(filtered)
        }

        filterData()
    }, [searchTerm, isSME, selectedIndustry, selectedState, fundingRange])

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

    console.log('Rendering NetworkingPage, filteredData:', filteredData)

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
                    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
                        <div className="flex items-center space-x-6">
                            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Elev8</h1>
                            <Button variant="ghost">Dashboard</Button>
                            <Button variant="ghost">Marketplace</Button>
                            <Button variant="ghost">Events</Button>
                            <Button variant="ghost">Networking</Button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-medium">John Doe</span>
                            <User className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 p-1 text-blue-600 dark:text-blue-400" />
                            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            </Button>
                        </div>
                    </nav>

                    <main className="container mx-auto mt-8 px-4">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input 
                                    type="search" 
                                    placeholder="Search..." 
                                    className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button onClick={toggleFilter} variant="outline" className="flex items-center border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700">
                                <Filter className="mr-2 h-4 w-4" /> Filter <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {isFilterOpen && (
                            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                                    <div className="flex items-center space-x-2">
                                        <span className={isSME ? "text-gray-500 dark:text-gray-400" : "text-blue-600 dark:text-blue-400 font-medium"}>Investor</span>
                                        <Switch checked={isSME} onCheckedChange={(checked) => setIsSME(checked)} />
                                        <span className={isSME ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-500 dark:text-gray-400"}>SME</span>
                                    </div>
                                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                                        <SelectTrigger className="border-gray-300 dark:border-gray-700">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Industries</SelectItem>
                                            <SelectItem value="Tech">Technology</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Fintech">Fintech</SelectItem>
                                            <SelectItem value="AI">AI</SelectItem>
                                            <SelectItem value="Biotech">Biotech</SelectItem>
                                            <SelectItem value="Cleantech">Cleantech</SelectItem>
                                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedState} onValueChange={setSelectedState}>
                                        <SelectTrigger className="border-gray-300 dark:border-gray-700">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Locations</SelectItem>
                                            <SelectItem value="New York">New York</SelectItem>
                                            <SelectItem value="San Francisco">San Francisco</SelectItem>
                                            <SelectItem value="Austin">Austin</SelectItem>
                                            <SelectItem value="London">London</SelectItem>
                                            <SelectItem value="Berlin">Berlin</SelectItem>
                                            <SelectItem value="Singapore">Singapore</SelectItem>
                                            <SelectItem value="Toronto">Toronto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Funding Range</label>
                                        <Slider
                                            min={10000}
                                            max={10000000}
                                            step={10000}
                                            value={fundingRange}
                                            onValueChange={setFundingRange}
                                            className="mt-2"
                                        />
                                        <div className="flex justify-between text-sm mt-1 text-gray-600 dark:text-gray-400">
                                            <span>${fundingRange && fundingRange[0] ? fundingRange[0].toLocaleString() : '10,000'}</span>
                                            <span>${fundingRange && fundingRange[1] ? fundingRange[1].toLocaleString() : '10,000,000'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">Apply Filters</Button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData.map((item, index) => (
                                <CardComponent key={index} item={item} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

function CardComponent({ item }) {
    const [isOpen, setIsOpen] = useState(false)
    const { isDarkMode } = useContext(ThemeContext)

    return (
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold mb-4">{item.type === 'investor' ? 'Investor' : 'SME'}</h2>
            <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" alt={item.name} />
                    <AvatarFallback>{item.name[0]}{item.name.split(' ')[1][0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold flex items-center"><User className="w-4 h-4 mr-2" /> {item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center"><MapPin className="w-4 h-4 mr-2" /> {item.location}</p>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                {item.type === 'investor' ? (
                    <>
                        <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Industries: {item.industries.join(', ')}</p>
                        <p className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /> Looking to Invest: {item.investmentRange}</p>
                        <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Investment Type: {item.investmentType}</p>
                        <p className="flex items-center"><Handshake className="w-4 h-4 mr-2" /> Engagement: {item.engagement}</p>
                        <div className="flex items-center">
                            <TreeDeciduous className="w-4  h-4 mr-2" />
                            <span>Rural Focus: </span>
                            <input type="checkbox" className="ml-2" checked={item.ruralFocus} readOnly />
                        </div>
                    </>
                ) : (
                    <>
                        <p className="flex items-center"><Building className="w-4 h-4 mr-2" /> Business Type: {item.businessType}</p>
                        <p className="flex items-center"><Coins className="w-4 h-4 mr-2" /> Funding Needed: {item.fundingNeeded}</p>
                        <p className="flex items-center"><Target className="w-4 h-4 mr-2" /> Stage: {item.stage}</p>
                    </>
                )}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">View Profile</Button>
                </DialogTrigger>
                <DialogContent className={isDarkMode ? 'dark:bg-gray-800 dark:text-gray-100' : ''}>
                    <DialogHeader>
                        <DialogTitle>{item.type === 'investor' ? 'Investment Proposal' : 'Funding Opportunity'}</DialogTitle>
                        <DialogDescription className={isDarkMode ? 'dark:text-gray-400' : ''}>
                            Review the {item.type === 'investor' ? 'investment opportunity' : 'funding request'} for {item.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <h3 className="font-semibold">Proposal Details</h3>
                        <p className="mt-2">
                            {item.type === 'investor' 
                                ? `${item.name} is seeking partnership opportunities in the ${item.industries.join(' and ')} sectors. 
                                   With a focus on ${item.investmentType} investments ranging from ${item.investmentRange}, ${item.name} offers 
                                   not just capital but also ${item.engagement} to help businesses grow.`
                                : `${item.name} is a ${item.businessType} company at the ${item.stage} stage, seeking ${item.fundingNeeded} in funding. 
                                   They are looking for investors who can provide not only capital but also strategic guidance to help them scale their operations.`
                            }
                        </p>
                        <Button className="mt-4 w-full" onClick={() => setIsOpen(false)}>
                            {item.type === 'investor' ? 'Send Proposal' : 'Express Interest'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}