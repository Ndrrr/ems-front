import {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {axiosErrorHandler} from "../interceptors/axios";

export const Course = () => {
    const [courseList, setCourseList] = useState([]);
    const [load, setLoad] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(0);
    const [currentCourseName, setCurrentCourseName] = useState(0);
    const [currentCourseDescription, setCurrentCourseDescription] = useState(0);

    useEffect(() => {
        if(!load) {
            const onPageLoad = async () => {
                try {
                    const {data} = await axios.get('course', {withCredentials: true});
                    console.log("loaded course list", data);
                    setCourseList(data.courses);
                    setLoad(true);
                } catch (e) {
                    axiosErrorHandler(e.response);
                }
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
            axios.post('course/' + currentCourseId, {
                name: currentCourseName,
                description: currentCourseDescription
            }, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }
    const onDelete = (id) => {
        try {
            axios.delete('course/' + id, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }

    const onCreate = () => {
        let name = $('#fc-name').val();
        let description = $("#fc-description").val();
        try {
            axios.post('course', {name, description}, {withCredentials: true});
            window.location.reload();
        } catch (e) {
            axiosErrorHandler(e.response);
        }
    }

    return (
        <div className="container">
            <div className="modal fade" id="createCourseModal" tabIndex="-1" role="dialog"
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
            <div className="modal fade" id="editCourseModal" tabIndex="-1" role="dialog"
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
                                           value={currentCourseName}
                                           onChange={(e) => setCurrentCourseName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text"
                                           className="form-control"
                                           name="description"
                                           id="fc-description"
                                           value={currentCourseDescription}
                                           onChange={(e) => setCurrentCourseDescription(e.target.value)}
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
            <h1 className="h3 mb-3 font-weight-normal text-center">My Courses</h1>
            <button className="btn btn-info" type="button" data-toggle="modal" data-target="#createCourseModal">Create</button>
            <br/> <br/>
            <table className="table table-dark table-striped">
                <thead className="table-dark">
                <tr className="">
                    <th>Course Name</th>
                    <th>Course Description</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {courseList.map((course) => (
                    <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>
                            <button className="btn btn-warning" data-toggle="modal" data-target="#editCourseModal"
                                    onClick={() => {
                                        setCurrentCourseId(course.id)
                                        setCurrentCourseName(course.name)
                                        setCurrentCourseDescription(course.description)}}
                            >
                                Edit
                            </button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => {onDelete(course.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}