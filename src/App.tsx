// App.tsx
import { Box, List, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { delTodo, getTodos } from "./api/todo-api";
import ControlPanel from "./components/ControlPanel";
import TodoListItem from "./components/TodoListItem";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
export type TodoFilter = { completed: null | boolean };

// const intialTodos: Todo[] = [
//   { id: 0, text: "Click me to complete", completed: false },
//   { id: 1, text: "<- you can also check this box", completed: true },
//   { id: 2, text: "press the bin to delete ->", completed: false },
//   { id: 3, text: "you can filter me by TODO", completed: false },
//   { id: 4, text: "you can filter me by COMPLETED", completed: true },
//   { id: 5, text: "more advance tutorials are coming...😍⚛️", completed: false },
// ];

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

  const toggleTodoById = (id: string, value: boolean) => {
    // setTodos((oldTodos) => {
    //   return oldTodos.map((todoItem) => {
    //     if (todoItem.id === id) {
    //       // if match, change the completed value
    //       return { ...todoItem, completed: value };
    //     }
    //     // remain unchanged
    //     return todoItem;
    //   });
    // });
  };

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
                onToggle={toggleTodoById}
              />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default App;
