import { useQuery, useMutation } from "@tanstack/react-query";
import { createTask, getTaskAnswer, getTasks, submitTaskAnswers } from "../services/api";
import { Task } from "../types";
import { toast } from "react-toastify";

export const useTasks = () =>
  useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

export const useGetTaskAnswer = () => {
  return useMutation({ mutationKey: ["task"], mutationFn: (id: number) => getTaskAnswer(id) });
};

export const useSubmitTasks = () => {
  return useMutation({
    mutationKey: ["answers"],
    mutationFn: (answers: Task[]) => submitTaskAnswers(answers),

    onError: () => {
      toast.error("There was an error submitting your answers. Please try again.");
    },
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTask,
  });
};
