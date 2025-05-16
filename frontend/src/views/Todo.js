import { useState, useEffect } from 'react' // Importing React hooks for state and effect
import useAxios from '../utils/useAxios' // Custom Axios hook for API requests
import { jwtDecode } from 'jwt-decode' // JWT decoder to extract user information from token
import Swal from 'sweetalert2' // SweetAlert for displaying notifications


function Todo() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL // Base URL for the API
    const api = useAxios() // Axios instance

    const token = localStorage.getItem("authTokens") // Getting the auth token from localStorage
    const decoded = jwtDecode(token) // Decoding the JWT token to get user info
    const user_id = decoded.user_id // Extracting user ID from the decoded token

    const [todo, setTodo] = useState([]) // State to store todos

    // Fetch todos on component mount
    useEffect(() => {
        fetchTodos()
    }, []) // Empty dependency array ensures this runs once on mount

    // Function to fetch all todos from the API
    const fetchTodos = async () => {
        await api.get(baseUrl + '/todo/' + user_id + '/').then((res) => {
            setTodo(res.data) // Updating state with fetched todos
        })
    }

    const [createTodo, setCreateTodo] = useState({ title: "", completed: "" }) // State for creating new todo

    // Function to handle input change for new todo
    const handleNewTodoTitle = (event) => {
        setCreateTodo({
            ...createTodo,
            [event.target.name]: event.target.value
        })
    }

    // Function to submit new todo to the API
    const formSubmit = () => {
        const formdata = new FormData()

        formdata.append("user", user_id)
        formdata.append("title", createTodo.title)
        formdata.append("completed", false) // Default completed status is false

        try {
            // Sending POST request to add new todo
            api.post(baseUrl + '/todo/' + user_id + '/', formdata).then((res) => {
                // Display success notification
                Swal.fire({
                    title: "Todo Added",
                    icon: "success",
                    toast: true,
                    timer: 600,
                    position: "top-right",
                    timerProgressBar: true,
                })
                fetchTodos() // Refresh todos after adding
                createTodo.title = "" // Clear input field
            })
        } catch (error) {
            console.log(error); // Log any errors
        }
    }

    // Function to delete a todo by its ID
    const deleteTodo = async (todo_id) => {
        await api.delete(baseUrl + '/todo-detail/' + user_id + '/' + todo_id + '/')
        // Display success notification
        Swal.fire({
            title: "Todo Deleted",
            icon: "success",
            toast: true,
            timer: 600,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTodos() // Refresh todos after deletion
    }

    // Function to mark a todo as complete
    const markTodoAsComplete = async (todo_id) => {
        await api.patch(baseUrl + '/todo-mark-as-completed/' + user_id + '/' + todo_id + '/')
        // Display success notification
        Swal.fire({
            title: "Todo Completed",
            icon: "success",
            toast: true,
            timer: 600,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTodos() // Refresh todos after completion
    }

    return (
        <div>
            <div>
                <div className="container" style={{ marginTop: "150px", padding: "10px" }}>
                    <div className="row justify-content-center align-items-center main-row">
                        <div className="col shadow main-col bg-white">
                            {/* Header with the title */}
                            <div className="row bg-primary text-white">
                                <div className="col p-2">
                                    <h4>TaskBoard</h4>
                                </div>
                            </div>
                            {/* Todo input and button */}
                            <div className="row justify-content-between text-white p-2">
                                <div className="form-group flex-fill mb-2">
                                    <input 
                                        id="todo-input" 
                                        name='title' 
                                        onChange={handleNewTodoTitle} 
                                        value={createTodo.title} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Write a todo...' 
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    onClick={formSubmit} 
                                    className="btn btn-primary mb-2 ml-2"
                                >
                                    Add todo
                                </button>
                            </div>
                            {/* List of todos */}
                            <div className="row" id="todo-container">
                                {todo.map((todo) =>
                                    <div key={todo.id} className="col col-12 p-2 todo-item">
                                        <div className="input-group">
                                            {/* Display todo title, strike-through if completed */}
                                            {todo.completed.toString() === "true" &&
                                                <p className="form-control"><strike>{todo.title}</strike></p>
                                            }
                                            {todo.completed.toString() === "false" &&
                                                <p className="form-control">{todo.title}</p>
                                            }
                                            {/* Buttons to mark as complete or delete */}
                                            <div className="input-group-append">
                                                <button 
                                                    className="btn bg-success text-white ml-2" 
                                                    type="button" 
                                                    onClick={() => markTodoAsComplete(todo.id)}
                                                >
                                                    <i className='fas fa-check'></i>
                                                </button>
                                                <button 
                                                    className="btn bg-danger text-white me-2 ms-2 ml-2" 
                                                    type="button" 
                                                    onClick={() => deleteTodo(todo.id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Todo
