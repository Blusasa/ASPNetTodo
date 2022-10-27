import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from 'react';
import styles from "./todo.module.css";

const Todo = (props) => {

    const [values, setValues] = useState(props.data);

    const [disabled, setDisabled] = useState(() => { if (values.id === '') return false; else return true; });
    const [inEdit, setInEdit] = useState(false);

    const onChange = (event) => {
        setValues({ ...values, [event.name]: event.value });
    }

    const onEditClick = () => {
        setInEdit(!inEdit);
        setDisabled(!disabled);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        if(e.target.name === "update"){
            onEditClick();
        }
    }


    console.log("Form disabled: " + disabled + ", " + "Form in edit mode: " + inEdit);

    return (
        <div className={styles.formContainer}>
            <Form className={styles.form} onSubmit={onSubmit}>
                <Row className="m-1">
                    <Col sm={7}>
                        <Form.Group controlID="taskName">
                            <Form.Label className="fs-5 fw-bold badge rounded-pill text-bg-dark align-self-start">Task Name: </Form.Label>
                            <Form.Control
                                className={styles.input}
                                disabled={disabled}
                                name="taskName"
                                onChange={onChange}
                                value={values.id}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="flex-grow-1 d-flex">
                        <Form.Group className="flex-grow-1" as={Col} controlID="isCompleted">
                            <Form.Label className="fs-5 fw-bold badge rounded-pill text-bg-dark align-self-start">Completed</Form.Label>
                            <Form.Check
                                className="mt-1"
                                disabled={disabled}
                                name="isCompleted"
                                onChange={onChange}
                                value={values.isCompleted}
                            />
                        </Form.Group>
                    </Col>
                    {values.id === '' ? 
                        <Col className="d-flex align-items-center justify-content-center">
                            <Button name="submit" variant="primary" type="Submit">Submit</Button>
                        </Col>
                        : disabled === true ?
                            <Col className="d-flex align-items-center justify-content-center">
                                <Button onClick={onEditClick}>Edit</Button>
                            </Col>
                        : inEdit === true ?
                            <Col className="d-flex align-items-center justify-content-center">
                                <Button name="update" variant="primary" type="Submit">Update</Button>
                            </Col> : <div></div>
                    }
                </Row>
            </Form>
        </div>
    );
}

export default Todo;