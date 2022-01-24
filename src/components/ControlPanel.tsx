// ControlPanel.tsx

import { Box, Button, ButtonGroup, TextField } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useMutation } from "react-query";
import { addTodo } from "../api/todo-api";
import { TodoFilter, useInvalidateTodo } from "../App";

type ControlPanelProps = {
  filter: TodoFilter;
  onToggleFilterTodo: () => void;
  onToggleFilterCompleted: () => void;
};

const ControlPanel: FC<ControlPanelProps> = ({
  filter,
  onToggleFilterTodo,
  onToggleFilterCompleted,
}) => {
  const [value, setValue] = useState("");
  const { invalidateTodos } = useInvalidateTodo();

  const {
    mutateAsync: addTodoHandler,
    isLoading: isAdding,
    // error: addError,
  } = useMutation(addTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    // setTodos(intialTodos);
    setValue("");
  };

  const handleAddTodo: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    const trimedText = value.trim();
    // Add a new document with a generated id.
    addTodoHandler(trimedText);

    // reset input after create
    setValue("");
  };

  return (
    <>
      <form>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            placeholder="Try yourslef!"
            value={value}
            onChange={handleChange}
          />
          <Box marginLeft={2}>
            <Button
              disableRipple
              disabled={!value.trim() || isAdding}
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleAddTodo}
            >
              {isAdding ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </form>
      <Box
        marginY={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ButtonGroup>
          <Button disableRipple color="secondary" onClick={handleReset}>
            reset todos
          </Button>
          <Button
            disableRipple
            variant={filter.completed === false ? "contained" : "outlined"}
            color="secondary"
            onClick={onToggleFilterTodo}
          >
            todo
          </Button>
          <Button
            disableRipple
            variant={filter.completed === true ? "contained" : "outlined"}
            color="secondary"
            onClick={onToggleFilterCompleted}
          >
            completed
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default ControlPanel;
