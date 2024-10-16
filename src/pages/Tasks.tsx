import React, { useCallback, useState } from "react";
import cn from "clsx";

import { Typography } from "../components/Typography";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import Loading from "../components/Loading";
import { useGetTaskAnswer, useSubmitTasks, useTasks } from "../hooks/useTasks";
import { useTheme } from "../hooks/useTheme";
import { useForm } from "react-hook-form";
import { Form } from "../components/Form";
interface TaskAnswer {
  [taskId: string]: string;
}

const Tasks: React.FC = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const [checkedAnswers, setCheckedAnswers] = useState<{ [key: string]: boolean | null }>({});

  const { data: answer, mutateAsync } = useGetTaskAnswer();
  const { data: submittedTask, mutateAsync: submitTask, isSuccess } = useSubmitTasks();
  const { theme } = useTheme();

  const methods = useForm();

  const onSubmit = useCallback(
    (data: TaskAnswer[]) => {
      const formattedData = Object.entries(data).map(([taskId, optionId]) => ({
        taskId: Number(taskId),
        optionId: Number(optionId),
      }));
      submitTask(formattedData);
    },
    [submitTask]
  );

  const onCheckAnswer = useCallback(
    async (taskId: number) => {
      const selectedOption = methods.getValues(`${taskId}`);

      if (!selectedOption) {
        return;
      }

      try {
        await mutateAsync(taskId);
        const answerId = answer?.id;

        const isCorrect = selectedOption == answerId;

        setCheckedAnswers((prev) => ({
          ...prev,
          [taskId]: isCorrect,
        }));
      } catch (error) {
        console.error("Error checking answers:", error);
      }
    },
    [answer, mutateAsync, methods]
  );

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <Typography variant="h2" className="text-center text-red-500">
        Error loading tasks
      </Typography>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h1" className="mb-6">
        Tasks
      </Typography>
      <Typography variant="h3" className="mb-4">
        {submittedTask && isSuccess && (
          <p>
            Score: {submittedTask?.score} / {submittedTask?.totalQuestions}
          </p>
        )}
      </Typography>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid gap-4">
          {tasks?.map((task) => (
            <Card key={task.id} className="transition-colors duration-300">
              <Typography variant="h2" className="mb-2">
                {task.instruction}
              </Typography>
              <div className="flex flex-col gap-2">
                {task.options.map((option) => (
                  <Form.RadioButton
                    key={option.id}
                    bgDanger={checkedAnswers[task.id] !== null && !checkedAnswers[task.id] && methods.getValues(`${task.id}`) === option.id}
                    name={`${task.id}`}
                    label={option.optionText}
                    value={option.id}
                    className={cn(
                      "w-full text-left transition-colors duration-300",
                      theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-600 hover:bg-gray-500"
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="primary" className="mt-4" onClick={() => onCheckAnswer(Number(task.id))}>
                Check Answer
              </Button>
            </Card>
          ))}
        </div>
        <Button type="submit" variant="primary" className="mt-6">
          Submit Answers
        </Button>
      </Form>
    </div>
  );
};

export default Tasks;
