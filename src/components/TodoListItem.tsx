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
import { delTodo } from "../api/todo-api";
import { useInvalidateTodo } from "../App";

type TodoListItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string, value: boolean) => void;
};

const TodoListItem: FC<TodoListItemProps> = ({
  id,
  text,
  completed,
  onToggle,
}) => {
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

  return (
    <ListItem
      dense
      button
      onClick={() => onToggle(id, !completed)}
      disableRipple
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          defaultChecked={completed}
          checked={completed}
          onChange={({ target: { checked } }) => onToggle(id, checked)}
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
