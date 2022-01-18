// TodoListItem.tsx;

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { delTodo, updateTodo } from "../api/todo-api";
import { useInvalidateTodo } from "../App";

type TodoListItemProps = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoListItem: FC<TodoListItemProps> = ({ id, text, completed }) => {
  const { invalidateTodos } = useInvalidateTodo();
  const [done, setDone] = useState(completed);
  useEffect(() => {
    setDone(completed);
  }, [completed]);

  const {
    mutateAsync: delTodoHandler,
    isLoading: isDeleting,
    error: delError,
  } = useMutation(delTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const {
    mutateAsync: updateTodoHandler,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation(updateTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const handleToggleUpdate = () => {
    updateTodoHandler({ id, completed: !done });
    setDone(!done);
  };

  return (
    <ListItem
      disabled={isUpdating}
      dense
      button
      onClick={handleToggleUpdate}
      disableRipple
    >
      <ListItemIcon>
        <Checkbox
          disabled={isUpdating}
          edge="start"
          defaultChecked={done}
          checked={!done}
          onChange={handleToggleUpdate}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            style={{ textDecoration: done ? "line-through" : "initial" }}
            color={done ? "textSecondary" : "initial"}
          >
            {text}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          disabled={isDeleting}
          edge="end"
          aria-label="comments"
          onClick={() => delTodoHandler(id)}
        >
          <DeleteForever />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
