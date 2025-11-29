"use client";
import { useQueryStates } from "nuqs";
import { workflowParams } from "@/globals/vars/params";

export const useWorkflowsParams = () => useQueryStates(workflowParams);
