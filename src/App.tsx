// App.tsx

import { Box, List, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import TodoListItem from "./components/TodoListItem";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
export type TodoFilter = { completed: null | boolean };

const intialTodos: Todo[] = [
  { id: 0, text: "Click me to complete", completed: false },
  { id: 1, text: "<- you can also check this box", completed: true },
  { id: 2, text: "press the bin to delete ->", completed: false },
  { id: 3, text: "you can filter me by TODO", completed: false },
  { id: 4, text: "you can filter me by COMPLETED", completed: true },
  { id: 5, text: "more advance tutorials are coming...😍⚛️", completed: false },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(intialTodos);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<TodoFilter>({ completed: null });

  const filteredTodos =
    filter.completed === null ? todos : todos.filter((todo) => todo.completed === filter.completed);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const toggleTodoById = (id: number, value: boolean) => {
    setTodos((oldTodos) => {
      return oldTodos.map((todoItem) => {
        if (todoItem.id === id) {
          // if match, change the completed value
          return { ...todoItem, completed: value };
        }
        // remain unchanged
        return todoItem;
      });
    });
  };

  const removeTodoById = (id: number) => {
    setTodos((oldTodos) => {
      // filter out todo item where it's id match
      // only return todo item id doesn't match
      return oldTodos.filter((todoItem) => todoItem.id !== id);
    });
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

  const handleAddTodo: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setTodos((oldTodos) => {
      return [
        ...oldTodos,
        {
          id: oldTodos.length,
          text: value.trim(),
          completed: false,
        },
      ];
    });
    // reset input after create
    setValue("");
  };

  const handleReset = () => {
    setTodos(intialTodos);
    setValue("");
  };

  return (
    <Box maxWidth={400} margin="auto">
      <Box padding={4}>
        <Typography variant="h6" align="center">
          My first React Simple Todo
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        <ControlPanel
          value={value}
          filter={filter}
          onChange={handleChange}
          onAddTodo={handleAddTodo}
          onReset={handleReset}
          onToggleFilterTodo={toggleFilterTodo}
          onToggleFilterCompleted={toggleFilterCompleted}
        />
        <List
          subheader={<Typography variant="body2">{`${filteredTodos.length} todos`}</Typography>}
        >
          {filteredTodos.map((todo, i) => (
            <TodoListItem
              key={`todo-item-${i}`}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onRemove={removeTodoById}
              onToggle={toggleTodoById}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default App;
