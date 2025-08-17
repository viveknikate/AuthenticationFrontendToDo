import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { Context } from "../AppWrapper";
import { Navigate } from "react-router-dom";
const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { isAuthenticated } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${server}/tasks/new`,
                {
                    title,
                    description,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(data.message);
            setLoading(false);
            setTitle("");
            setDescription("");
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        axios
            .get(`${server}/tasks/mytasks`, {
                withCredentials: true,
            })
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, [refresh]);

    if (!isAuthenticated) return <Navigate to="/login" />;

    const updateHandler = async (task) => {
        try {
            const { data } = await axios.put(
                `${server}/tasks/${task._id}`,
                {},
                {
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deleteHandler = async (task) => {
        try {
            const { data } = await axios.delete(`${server}/tasks/${task._id}`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler} className="task-form">
                <label className="task-label">Enter Task Title:</label>
                <input
                    type="text"
                    placeholder="Enter Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="task-input"
                />

                <label className="task-label">Enter Task Description:</label>
                <input
                    type="text"
                    placeholder="Enter Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="task-input"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="task-button"
                >
                    Add Task
                </button>
            </form>
            <article>
                <div>
                    {tasks.map((task) => (
                        <div key={task._id} className="task">
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <h4>{task.description}</h4>
                            </div>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => updateHandler(task)}
                            />
                            <button
                                type="button"
                                onClick={() => deleteHandler(task)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default Home;
