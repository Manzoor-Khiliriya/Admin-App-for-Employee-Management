import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

export default function CreateEmployee() {
    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Designation: '',
        Gender: '',
        Course: [],
        Image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'Course') {
            setEmployeeData(prevState => {
                const updatedCourses = checked
                    ? [...prevState.Course, value]
                    : prevState.Course.filter(course => course !== value);
                return { ...prevState, Course: updatedCourses };
            });
        } else {
            setEmployeeData({
                ...employeeData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const fileInput = e.target;
        const filePath = fileInput.value;
        const allowedExtensions = /(\.jpg|\.png)$/i;

        if (!allowedExtensions.exec(filePath)) {
            alert('Please upload a file with a .jpeg or .jpg extension.');
            fileInput.value = '';
            return;
        }

        setEmployeeData({
            ...employeeData,
            Image: fileInput.files[0]
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in employeeData) {
            formData.append(key, employeeData[key]);
        }

        try {
            const response = await fetch("http://localhost:5000/api/v1/employees", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                return alert(result.error);
            }
            navigate('/employees')
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="border  rounded shadow-lg bg-light col-10 col-md-5 mx-auto mt-5 p-4">
                <h2 className="text-center mb-4">Create Employee</h2>
                <form onSubmit={handleSubmit} >
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={employeeData.Name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="Email"
                            value={employeeData.Email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Mobile No</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="Mobile"
                            value={employeeData.Mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile no"
                            required
                        />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Designation</label>
                        <select
                            name="Designation"
                            className="form-select"
                            value={employeeData.Designation}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Designation</option>
                            <option value="Hr">Hr</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Gender</label>
                        <div>
                            <label className="me-3">
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Male"
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Female"
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Course</label>
                        <div>
                            <label className="me-3">
                                <input
                                    type="checkbox"
                                    name="Course"
                                    value="MCA"
                                    onChange={handleChange}
                                />
                                MCA
                            </label>
                            <label className="me-3">
                                <input
                                    type="checkbox"
                                    name="Course"
                                    value="BCA"
                                    onChange={handleChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Course"
                                    value="BSC"
                                    onChange={handleChange}
                                />
                                BSC
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Img Upload</label>
                        <input
                            type="file"
                            name="Image"
                            onChange={handleFileChange}
                            accept=".jpg,.png"
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>

    )
}
