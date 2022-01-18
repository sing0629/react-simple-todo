// App.tsx
import { Box, List, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getTodos } from "./api/todo-api";
import ControlPanel from "./components/ControlPanel";
import TodoListItem from "./components/TodoListItem";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
export type TodoFilter = { completed: null | boolean };

export const useInvalidateTodo = () => {
  const queryClient = useQueryClient();
  const invalidateTodos = () => {
    queryClient.invalidateQueries("todos");
  };

  return { invalidateTodos };
};

function App() {
  const { data: todos = [], isLoading, error } = useQuery("todos", getTodos);

  const [filter, setFilter] = useState<TodoFilter>({ completed: null });

  const filteredTodos =
    filter.completed === null
      ? todos
      : todos.filter((todo) => todo.completed === filter.completed);

  const toggleFilterTodo = () => {
    if (filter.completed !== false) {
      setFilter({ completed: false });
    } else {
      // reset to null
      setFilter({ completed: null });
    }
  };
  const toggleFilterCompleted = () => {
    if (filter.completed !== true) {
      setFilter({ completed: true });
    } else {
      // reset to null
      setFilter({ completed: null });
    }
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <Box maxWidth={400} margin="auto">
      <Box padding={4}>
        <Typography variant="h6" align="center">
          My first React Simple Todo
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        <ControlPanel
          filter={filter}
          onToggleFilterTodo={toggleFilterTodo}
          onToggleFilterCompleted={toggleFilterCompleted}
        />

        {isLoading ? (
          <div>Sing Loading...</div>
        ) : (
          <List
            subheader={
              <Typography variant="body2">{`${filteredTodos.length} todos`}</Typography>
            }
          >
            {filteredTodos.map((todo, i) => (
              <TodoListItem
                key={`todo-item-${i}`}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default App;
