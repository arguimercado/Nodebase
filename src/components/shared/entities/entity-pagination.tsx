"use client"
import { Button } from "@/components/ui/button";


interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const EntityPagination = ({
   page,
   totalPages,
   onPageChange,
   disabled = false,
} : EntityPaginationProps) => {

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
         Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
         <Button
            disabled={disabled || page <= 1}
            variant={"outline"}
            onClick={() => onPageChange(Math.max(1, page - 1))}
         >
            Previous
         </Button>
         <Button
               disabled={disabled || page >= totalPages || totalPages === 0}
            variant={"outline"}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
         >
            Next
         </Button>
      </div>
    </div>
  )
}
export default EntityPagination