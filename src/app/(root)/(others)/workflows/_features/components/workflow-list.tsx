"use client";

import { useSuspenseGetWorkflows } from "../hooks/useWorkflow";
import { ColumnDef, PaginationState, RowSelectionState, SortingState } from "@tanstack/react-table";
import { HeaderColumn, LinkCell } from "@/components/shared/grids/cells";
import { useWorkflowsParams } from "../hooks/useWorkflowParams";
import {
  DGridColumns,
  DGridPagination,
  DGridProvider,
  DGridRows,
  DGridTable,
} from "@/components/shared/grids/d-grid-provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const WorkflowList = () => {

  const workflows = useSuspenseGetWorkflows();
  const [params, setParams] = useWorkflowsParams();
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  // Get selected row IDs
  const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id])

  const columns: ColumnDef<(typeof workflows.data.items)[number]>[] = [
    {
      accessorKey: "name",
      header: () => <HeaderColumn alignment="left">Name</HeaderColumn>,
      size: 650,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <LinkCell href={`/workflows/${id}`}>
            <span>{row.getValue("name")}</span>
          </LinkCell>
        );
      },
    },
    {
      accessorKey: "createdAt",
      size: 450,
      header: () => <HeaderColumn alignment="center">Created At</HeaderColumn>,
      cell: ({ row }) => (
        <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>
      ),
    },
    {
      accessorKey: "updatedAt",
      size: 450,
      header: () => <HeaderColumn alignment="center">Updated At</HeaderColumn>,
      cell: ({ row }) => (
        <p>{new Date(row.original.updatedAt).toLocaleDateString()}</p>
      ),
    },
  ];

  

    const handlePaginationChange = (pagination:PaginationState) =>{
      setParams({
        ...params,
        page: pagination.pageIndex +1,
        pageSize: pagination.pageSize,
      });

    }

    const pagination: PaginationProps = {
      pageCount
    }
  return (
    <>
      <DGridProvider
        data={workflows.data.items}
        columns={columns}
        loading={workflows.isLoading}
        pagination={{
          pageIndex: workflows.data.page - 1,
          pageSize: workflows.data.pageSize,
        }}
        sorting={sorting}
        onSortingChange={setSorting}
        manualPagination
        pageCount={workflows.data.totalPages}
        rowCount={workflows.data.totalCount }
        onPaginationChange={handlePaginationChange}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection={true}
        getRowId={(row) => row.id}
      >
        <DGridTable>
          <DGridColumns enableCheckbox />
          <DGridRows enableCheckbox />
        </DGridTable>
        <DGridPagination />
        {selectedIds.length > 0 && (
          <Button onClick={() => console.log(selectedIds)}>Get Ids</Button>

        )}
      </DGridProvider>
    </>
  );
};
export default WorkflowList;
