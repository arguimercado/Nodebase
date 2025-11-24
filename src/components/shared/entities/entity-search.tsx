import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface EntitySearchProps {
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
}

const EntitySearch = ({ value, onChange, placeholder }: EntitySearchProps) => {
  return (
    <InputGroup className="flex-1">
      <InputGroupInput 
         placeholder={placeholder} 
         value={value} 
         onChange={e => onChange(e.target.value)}

      />
      <InputGroupAddon>
         <SearchIcon className="size-4" />
      </InputGroupAddon>
    </InputGroup>
  )
}
export default EntitySearch