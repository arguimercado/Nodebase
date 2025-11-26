"use client"
import { workflowParams } from "@/globals/vars/params";
import { useQueryStates } from "nuqs";

export const useWorkflowsParams = () => useQueryStates(workflowParams);