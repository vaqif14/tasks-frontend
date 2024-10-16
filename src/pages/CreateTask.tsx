import React, { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useCreateTask } from "../hooks/useTasks";
import { Task } from "../types";
import { Form } from "../components/Form";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Task Instruction</label>
          <Input name="instruction" />
        </div>
        <div>
          <h3 className="text-xl mb-2">Options</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center space-x-2">
              <Input name={`options.${index}.text`} placeholder={`Option ${index + 1}`} />
              <label>
                <Input type="checkbox" name={`options.${index}.isCorrect`} className="ml-2" /> Correct
              </label>
              <Button type="button" variant="secondary" size="small" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="primary" onClick={() => append({ text: "", isCorrect: false })}>
            Add Option
          </Button>
        </div>
        <Button type="submit" variant="primary" className="mt-4">
          Create Task
        </Button>
      </Form>
    </div>
  );
};

export default CreateTask;
