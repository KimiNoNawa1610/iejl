export interface QuizQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

export function isQuizQuestionArray(value: unknown): value is QuizQuestion[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "question" in item &&
        typeof (item as any).question === "string" &&
        "answers" in item &&
        Array.isArray((item as any).answers) &&
        (item as any).answers.every((ans: any) => typeof ans === "string") &&
        "correctIndex" in item &&
        typeof (item as any).correctIndex === "number",
    )
  );
}
