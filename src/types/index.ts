export interface TaskOption {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export interface Task {
  id: string;
  instruction: string;
  options: TaskOption[];
}

export interface SubmitTaskAnswerParams {
  taskId: number;
  optionId: number;
}
