import CreateTopicForm from "./CreateTopicForm";

export default function NewTopicPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Topic</h1>
      <CreateTopicForm />
    </div>
  );
}
