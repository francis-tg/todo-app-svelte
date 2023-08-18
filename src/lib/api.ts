// src/lib/api.ts
export async function fetchTodos() {
  const response = await fetch('/api/todos');
  return response.json();
}

export async function createTodo(todoData: any) {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoData),
  });
  return response.json();
}
