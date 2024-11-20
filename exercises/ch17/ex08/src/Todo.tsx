export type TodoType = {
  id: string;
  completed: boolean;
  task: string;
};

export const Todo = (props: {
  todo: TodoType;
  onCompletedClick: () => void;
  onDeleteClick: () => void;
}) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={props.onCompletedClick}
        checked={props.todo.completed}
      ></input>
      {props.todo.task}
      <button onClick={props.onDeleteClick}>Delete</button>
    </div>
  );
};
