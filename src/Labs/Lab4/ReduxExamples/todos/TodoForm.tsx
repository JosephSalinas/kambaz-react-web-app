import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, Form, ListGroup } from "react-bootstrap";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <Form.Control
                type="text"
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="me-2"
                placeholder="Enter todo..."
            />
            <div>
                <Button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"
                >
                    Update
                </Button>
                <Button
                    className="btn btn-success btn-sm"
                    onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"
                >
                    Add
                </Button>
            </div>
        </ListGroup.Item>
    );
}
