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

type TodoListItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onRemove: (id: number) => void;
  onToggle: (id: number, value: boolean) => void;
};

const TodoListItem: FC<TodoListItemProps> = ({ id, text, completed, onToggle, onRemove }) => {
  return (
    <ListItem dense button onClick={() => onToggle(id, !completed)} disableRipple>
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
        <IconButton edge="end" aria-label="comments" onClick={() => onRemove(id)}>
          <DeleteForever />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
