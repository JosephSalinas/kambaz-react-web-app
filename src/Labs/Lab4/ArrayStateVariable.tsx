import { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables" className="container mt-3">
            <h4 className="mb-3">Array State Variable</h4>
            <button className="btn btn-success mb-3" onClick={addElement}>
                Add Element
            </button>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteElement(index)}
                            id="wd-delete-element-click"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
