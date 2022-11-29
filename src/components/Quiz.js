import {useEffect, useState} from "react";
import axios from "axios";
import {axiosErrorHandler} from "../interceptors/axios";
import $ from "jquery";

export const Quiz = () => {
    const [courseList, setCourseList] = useState([]);
    const [quizList, setQuizList] = useState([]);
    const [load, setLoad] = useState(false);
    const [currentQuizId, setCurrentQuizId] = useState(0);
    const [currentQuizName, setCurrentQuizName] = useState(0);
    const [currentQuizDescription, setCurrentQuizDescription] = useState(0);

    useEffect(() => {
        if(!load) {
            const onPageLoad = async () => {
                console.log(axios.defaults.headers.common['Authorization']);
                let data;
                try {
                    data = await axios.get('quiz', {withCredentials: true});
                } catch (e) {
                    axiosErrorHandler(e.response);
                }
                console.log("loaded quiz list", data.data);
                setQuizList(data.data.quizzes);
                try{
                    data = await axios.get('course', {withCredentials: true});
                } catch (e) {
                    axiosErrorHandler(e.response);
                }
                console.log("loaded course list", data.data);
                setCourseList(data.data.courses);

                setLoad(true);
            }
            if (document.readyState === 'complete') {
                onPageLoad();
            } else {
                window.addEventListener('load', onPageLoad);
                return () => window.removeEventListener('load', onPageLoad);
            }
        }
    })

    const onEdit = () => {
        try {
            axios.post('quiz/' + currentQuizId, {
                name: currentQuizName,
                description: currentQuizDescription
            }, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }

    const onDelete = (id) => {
        try {
            axios.delete('quiz/' + id, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }

    const onCreate = () => {
        let name = $('#fc-name').val();
        let description = $("#fc-description").val();
        let courseId = parseInt($("#fc-courses").val());
        try {
            axios.post('quiz', {name, description, courseId}, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }

    return (
        <div className="container">
            <div className="modal fade" id="createQuizModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content row">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Create</h3>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onCreate} noValidate className={"col-md-12"}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                           className="form-control"
                                           name="name"
                                           id="fc-name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text"
                                           className="form-control"
                                           name="description"
                                           id="fc-description"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="courses">Select Course</label>
                                    <select id="fc-courses" name="courses">
                                        {courseList.map((course) => {
                                            return <option value={course.id}>{course.name}</option>
                                        })}
                                    </select>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editQuizModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content row">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Edit</h3>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onEdit} noValidate className={"col-md-12"}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                           className="form-control"
                                           name="name"
                                           id="fc-name"
                                           value={currentQuizName}
                                           onChange={(e) => setCurrentQuizName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text"
                                           className="form-control"
                                           name="description"
                                           id="fc-description"
                                           value={currentQuizDescription}
                                           onChange={(e) => setCurrentQuizDescription(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="h3 mb-3 font-weight-normal text-center">My Quizzes</h1>
            <button className="btn btn-info" type="button" data-toggle="modal" data-target="#createQuizModal">Create</button>
            <br/> <br/>
            <table className="table table-dark table-striped">
                <thead className="table-dark">
                <tr className="">
                    <th>Quiz Name</th>
                    <th>Quiz Description</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {quizList.map((quiz) => (
                    <tr key={quiz.id}>
                        <td>{quiz.name}</td>
                        <td>{quiz.description}</td>
                        <td>
                            <button className="btn btn-warning" data-toggle="modal" data-target="#editQuizModal"
                                    onClick={() => {
                                        setCurrentQuizId(quiz.id)
                                        setCurrentQuizName(quiz.name)
                                        setCurrentQuizDescription(quiz.description)}}
                            >
                                Edit
                            </button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => {onDelete(quiz.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}