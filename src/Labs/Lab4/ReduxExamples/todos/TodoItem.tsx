import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>
            <div>
                <Button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                >
                    Edit
                </Button>
                <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                >
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
}
