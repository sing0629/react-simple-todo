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
import { FC } from "react";
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
    updateTodoHandler({
      id,
      completed: !completed,
    });
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
          defaultChecked={completed}
          checked={!completed}
          onChange={handleToggleUpdate}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            style={{ textDecoration: completed ? "line-through" : "initial" }}
            color={completed ? "textSecondary" : "initial"}
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
