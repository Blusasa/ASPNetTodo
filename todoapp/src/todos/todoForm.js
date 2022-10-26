import Form from "react-bootstrap/Form";
import {useState} from 'react'; 
import styles from "./todo.module.css";

const Todo = (props) => {

    const [values, setValues] = useState({
        task: '',
        isCompleted: false
    });

    const [interactable, setInteractable] = useState(false);

    const onChange = (event) => {
        setValues({...values, [event.name]: event.value});
    }


    return(
        <div className={styles.formContainer}>
            <Form className={styles.form}>
                <Form.Group>
                    <Form.Label>Task Name: </Form.Label>
                    <Form.Control
                        disabled={interactable} 
                        name="taskName"
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Completed</Form.Label>
                    <Form.Check
                        disabled={interactable}
                        name="isCompleted"
                        onChange={onChange}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default Todo;