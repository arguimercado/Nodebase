import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { StateViewProps } from "../state/props";
import { DatabaseIcon } from "lucide-react";

const EmptyContainer = ({ message }: StateViewProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DatabaseIcon className="size-12 text-muted-foreground" />
        </EmptyMedia>
        <EmptyDescription>
          There is no data to display at the moment.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
export default EmptyContainer;
