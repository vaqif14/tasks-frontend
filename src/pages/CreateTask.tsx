import React, { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/useTasks";
import { Task } from "../types";
import { FormProvider, Controller } from "react-hook-form";

const CreateTask: React.FC = () => {
  const methods = useForm<Task>({
    defaultValues: {
      instruction: "",
      options: [{ text: "", isCorrect: false }],
    },
  });
  const { mutateAsync } = useCreateTask();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "options",
  });

  const onSubmit = useCallback(
    async (data: Task) => {
      try {
        await mutateAsync(data);
        methods.reset();
      } catch (error) {
        console.log(error);
      }
    },
    [mutateAsync, methods]
  );

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create Task</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Task Instruction</label>
            <Controller
              name="instruction"
              control={methods.control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Options</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mb-4">
              <Controller
                name={`options.${index}.text`}
                control={methods.control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <label className="flex items-center space-x-2">
                <Controller
                  name={`options.${index}.isCorrect`}
                  control={methods.control}
                  render={({ field }) => <input {...field} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />}
                />
                <span>Correct</span>
              </label>
              <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ text: "", isCorrect: false })}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Option
          </button>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Task
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateTask;
