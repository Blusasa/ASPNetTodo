import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useState } from 'react';
import styles from "./todo.module.css";

const TodoDisplay = (props) => {

    const [completed, isCompleted] = useState(false);

    const onChange = (event) => {
        isCompleted(!completed);
    }

    return(
        <div class={styles.formContainer}>
            <div>
                <h3>Task Name: </h3>
                <span>Name</span>
            </div>
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Completed</Form.Label>
                        <Form.Check name="isCompleted"/>
                    </Form.Group>
                </Form>
            </div>
            <Button>Delete</Button>
        </div>
    );
}

export default TodoDisplay;