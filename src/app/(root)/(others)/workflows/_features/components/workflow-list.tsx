"use client";

import { useSuspenseGetWorkflows } from "../hooks/useWorkflow";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderColumn, LinkCell } from "@/components/shared/grids/cells";
import DGrid from "@/components/shared/grids/d-grid";
import { useWorkflowsParams } from "../hooks/useWorkflowParams";

const WorkflowList = () => {
  const workflows = useSuspenseGetWorkflows();
  const [params,setParams] = useWorkflowsParams();

  const columns: ColumnDef<(typeof workflows.data.items)[number]>[] = [
    {
      accessorKey: "name",
      header: () => <HeaderColumn alignment="left">Name</HeaderColumn>,
      cell: ({ row }) => {
			const id = row.original.id;
			return (
				<LinkCell href={`/workflows/${id}`}>
					<span>{row.getValue("name")}</span>
				</LinkCell>
			)
		},
    },
    {
      accessorKey: "createdAt",
      header: () => <HeaderColumn alignment="center">Created At</HeaderColumn>,
      cell: ({ row }) => (
        <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>
      ),
    },
	 {
      accessorKey: "updatedAt",
      header: () => <HeaderColumn alignment="center">Updated At</HeaderColumn>,
      cell: ({ row }) => (
        <p>{new Date(row.original.updatedAt).toLocaleDateString()}</p>
      ),
    },
  ];

  const handleNextPage = () => setParams({
	 ...params,
	 page: (params.page || 1) + 1,
  });

  const handlePrevPage = () => setParams({
	 ...params,
	 page: (params.page || 1) - 1,
  });

  return (
    <DGrid
      data={workflows.data.items}
      pagination={{
        currentPage: workflows.data.page,
        totalPages: workflows.data.totalPages,
        totalItems: workflows.data.totalCount,
        itemsPerPage: workflows.data.pageSize,
      }}
		onNextPage={handleNextPage}
		onPrevPage={handlePrevPage}
		loading={workflows.isLoading}
		enableSorting={false}
      columns={columns}
    />
  );
};
export default WorkflowList;
