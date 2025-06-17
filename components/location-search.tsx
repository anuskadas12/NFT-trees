"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Location = {
  id: number
  name: string
  country: string
  coordinates: string
}

const mockLocations: Location[] = [
  { id: 1, name: "Amazon Rainforest", country: "Brazil", coordinates: "-3.4653° S, 62.2159° W" },
  { id: 2, name: "Borneo Rainforest", country: "Indonesia", coordinates: "0.9619° N, 114.5548° E" },
  { id: 3, name: "California Redwoods", country: "USA", coordinates: "41.2132° N, 124.0046° W" },
  { id: 4, name: "Congo Basin", country: "DRC", coordinates: "0.7832° S, 23.6585° E" },
  { id: 5, name: "Great Green Wall", country: "Sahel, Africa", coordinates: "14.5844° N, 4.2995° E" },
  { id: 6, name: "Madagascar Forests", country: "Madagascar", coordinates: "18.7669° S, 46.8691° E" },
  { id: 7, name: "Sundarbans", country: "Bangladesh/India", coordinates: "21.9497° N, 89.1833° E" },
  { id: 8, name: "Taiga Forest", country: "Russia", coordinates: "60.0000° N, 105.0000° E" },
  { id: 9, name: "Atlantic Forest", country: "Brazil", coordinates: "23.9608° S, 46.3925° W" },
  { id: 10, name: "Daintree Rainforest", country: "Australia", coordinates: "16.2500° S, 145.4167° E" },
]

interface LocationSearchProps {
  onSelect?: (location: Location) => void
  placeholder?: string
  className?: string
}

export function LocationSearch({ onSelect, placeholder = "Search locations...", className = "" }: LocationSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations)

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.country.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(mockLocations)
    }
  }, [searchTerm])

  const handleSelect = (location: Location) => {
    if (onSelect) {
      onSelect(location)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`relative ${className}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onClick={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No locations found.</CommandEmpty>
            <CommandGroup heading="Locations">
              {filteredLocations.map((location) => (
                <CommandItem key={location.id} onSelect={() => handleSelect(location)} className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">{location.name}</span>
                    <span className="text-sm text-gray-500">
                      {location.country} • {location.coordinates}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
