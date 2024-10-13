import { SelectItem } from '@radix-ui/react-select'
import { Slider } from '@radix-ui/react-slider'
import React from 'react'

const Filter = () => {
    return (
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
    )
}

export default Filter