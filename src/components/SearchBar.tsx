
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<string[]>([]);
  
  const platforms = ["Web", "Mobile", "Desktop"];
  
  const handleCheckboxChange = (value: string) => {
    setPlatform(current => 
      current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
    );
  };
  
  const handleSearch = () => {
    onSearch(query);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search links by URL, description, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Options</h4>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Platform</h5>
              {platforms.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${item}`}
                    checked={platform.includes(item)}
                    onCheckedChange={() => handleCheckboxChange(item)}
                  />
                  <Label htmlFor={`platform-${item}`}>{item}</Label>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t">
              <Button onClick={handleSearch} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
