import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useRef, useEffect } from 'react';
import styles from "./todo.module.css";
import axios from "axios";

const Todo = (props) => {

    const [values, setValues] = useState(props.data);
    const [disabled, setDisabled] = useState(() => { if (values.id === 0) return false; else return true; });
    const [inEdit, setInEdit] = useState(false);
    const formBtnTargeted = useRef();

    const onChange = (event) => {
        if(event.target.name === "isCompleted"){
            setValues({...values, [values.isCompleted]: event.target.checked});   
        }
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onEditClick = () => {
        setInEdit(!inEdit);
        setDisabled(!disabled);
    }

    const onDelete = () => {
        axios.delete("https://localhost:7271/api/TodoItems/DeleteItem/" + values.id)
        .then(res => {if(res.status == 200) props.onUpdate()})
        .catch(err => console.log(err));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(formBtnTargeted.current === "update"){
            console.log("Update");
            onEditClick();
            axios.put("https://localhost:7271/api/TodoItems/UpdateItem/"+ values.id, values)
            .then(res => console.log(res))
            .catch(err => console.log(err));
            props.onUpdate();
        }else if(formBtnTargeted.current === "submit"){
            e.target.reset();
            axios.post("https://localhost:7271/api/TodoItems/CreateItem", values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            props.onUpdate();
        }
    }

    return (
        <div className={values.isCompleted ? styles.formContainerDone : styles.formContainerTodo}>
            <Form className={styles.form} onSubmit={onSubmit}>
                <Row className="m-1">
                    <Col sm={7}>
                        <Form.Group>
                            <Form.Label className="fs-5 fw-bold badge rounded-pill text-bg-dark align-self-start">Task Name: </Form.Label>
                            <Form.Control
                                className={styles.input}
                                disabled={disabled}
                                name="name"
                                onChange={onChange}
                                defaultValue={values.name}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="flex-grow-1 d-flex">
                        <Form.Group className="flex-grow-1" as={Col}>
                            <Form.Label className="fs-5 fw-bold badge rounded-pill text-bg-dark align-self-start">Completed</Form.Label>
                            <Form.Check
                                type="checkbox"
                                className="mt-1"
                                disabled={disabled}
                                name="isCompleted"
                                onChange={onChange}
                                defaultChecked={values.isCompleted}
                            />
                        </Form.Group>
                    </Col>
                    {values.id === 0 ? 
                        <Col className="d-flex align-items-center justify-content-center">
                            <Button key="submitBtn" name="submit" variant="primary" type="Submit" onClick={() => formBtnTargeted.current = "submit"}>Submit</Button>
                        </Col>
                        : disabled === true ?
                            <Col className="d-flex flex-column align-items-center justify-content-around">
                                <Button key="editBtn" onClick={onEditClick}>Edit</Button>
                                <Button key="deleteBtn" onClick={onDelete}>Delete</Button>
                            </Col>
                        : inEdit === true ?
                            <Col className="d-flex flex-column align-items-center justify-content-around">
                                <Button key="updateBtn" name="update" variant="primary" type="Submit" onClick={() => formBtnTargeted.current = "update"}>Update</Button>
                                <Button key="deleteBtn" onClick={onDelete}>Delete</Button>
                            </Col> : <div></div>
                    }
                </Row>
            </Form>
        </div>
    );
}

export default Todo;