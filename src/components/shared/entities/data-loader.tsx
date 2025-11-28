import { Loader2Icon } from "lucide-react"
import { StateViewProps } from "../state/props"

interface DataLoaderProps extends StateViewProps {
  entity?: string
}
const DataLoader = ({
  entity = "items",
  message,
}: DataLoaderProps) => {
  return (
    <div className="flex justify-center items-center w-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {message || `Loading ${entity}...`}
      </p>
    </div>
  )
}
export default DataLoader