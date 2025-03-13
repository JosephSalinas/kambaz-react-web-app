import AddRedux from "./AddRedux";
import CounterRedux from "./CounterRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    return (
        <div>
            <h2>Redux Examples</h2>
            <CounterRedux />
            <AddRedux />
            <TodoList />
        </div>
    );
};