import * as yup from "yup";
import { Task } from "../types";

export const taskSchema = (tasks: Task[] | { [key: string]: any }) => {
  const shape: { [key: string]: yup.StringSchema } = {};

  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      shape[`${task.id}`] = yup
        .string()
        .oneOf([task.options.find((option) => option.isCorrect)?.id.toString()], "Incorrect answer")
        .required("An answer is required");
    });
  } else {
    Object.keys(tasks).forEach((key) => {
      const task = tasks[key];
      shape[`${task.id}`] = yup.string().oneOf([task.answer], "Incorrect answer").required("An answer is required");
    });
  }

  return yup.object().shape(shape);
};
