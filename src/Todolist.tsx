import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType, TasksType } from "./App";
import { Button } from "./components/Button";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
  todolistId: number;
  title: string;
  tasks: Array<TasksType>;
  students: Array<string>;
  removeTask: (taskId: string, todolistId: number) => void;
  changeFilter: (value: FilterValuesType, todolistId: number) => void;
  addTask: (title: string, todolistId: number) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void;
  removeTodolist: (id: number) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      // addTask();
    }
  };
  const removeTodoListHandler = () => {
    props.removeTodolist(props.todolistId);
  };

  const addTaskHandler = () => {
    props.addTask(title, props.todolistId);
  };
  const removeTaskHandler = (taskId: string) => {
    props.removeTask(taskId, props.todolistId);
  };

  const changeFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value, props.todolistId);
  };
  return (
    <div>
      <h3>
        {" "}
        {props.title}
        {/* <button
          onClick={() => {
            "removeTodolist";
          }}
        >
          x
        </button> */}
        <Button name={"x"} onClick={removeTodoListHandler} />
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        {/* <button
          onClick={() => {
            "addTask";
          }}
        >
          +
        </button> */}

        <Button name={"+"} onClick={addTaskHandler} />
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.taskId, newIsDoneValue, props.todolistId);
          };

          return (
            <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              {/* <button
                onClick={() => {
                  "removeTask";
                }}
              >
                x
              </button> */}
              <Button name={"x"} onClick={() => removeTaskHandler(t.taskId)} />
            </li>
          );
        })}
      </ul>
      <div>
        {/* <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => {}}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => {}}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => {}}
        >
          Completed
        </button> */}
        <Button name={"all"} onClick={() => changeFilterHandler("all")} />
        <Button name={"active"} onClick={() => changeFilterHandler("active")} />
        <Button
          name={"completed"}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
      <p></p>
      {props.students.map((el) => {
        return <div>{el}</div>;
      })}
    </div>
  );
}
