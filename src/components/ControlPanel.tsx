// ControlPanel.tsx

import { Box, Button, ButtonGroup, TextField } from "@material-ui/core";
import React, { FC } from "react";
import { TodoFilter } from "../App";

type ControlPanelProps = {
  value: string;
  filter: TodoFilter;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTodo: React.MouseEventHandler<HTMLButtonElement>;
  onReset: () => void;
  onToggleFilterTodo: () => void;
  onToggleFilterCompleted: () => void;
};

const ControlPanel: FC<ControlPanelProps> = ({
  value,
  filter,
  onChange,
  onAddTodo,
  onReset,
  onToggleFilterTodo,
  onToggleFilterCompleted,
}) => {
  return (
    <>
      <form>
        <Box display="flex" alignItems="center">
          <TextField fullWidth placeholder="Try yourslef!" value={value} onChange={onChange} />
          <Box marginLeft={2}>
            <Button
              disableRipple
              disabled={!value.trim()}
              type="submit"
              color="primary"
              variant="contained"
              onClick={onAddTodo}
            >
              Add
            </Button>
          </Box>
        </Box>
      </form>
      <Box marginY={2} display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup>
          <Button disableRipple color="secondary" onClick={onReset}>
            rese todos
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
