import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/Header';

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [employeeData, setEmployeeData] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Designation: '',
        Gender: '',
        Course: [],
        Image: '',
        is_active: true
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`);
                const result = await response.json();
                setEmployeeData(result.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox' && name === 'Course') {
            setEmployeeData(prevData => {
                const updatedCourses = prevData.Course.includes(value)
                    ? prevData.Course.filter(course => course !== value)
                    : [...prevData.Course, value];
                return {
                    ...prevData,
                    Course: updatedCourses
                };
            });
        } else {
            setEmployeeData({
                ...employeeData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setEmployeeData({
                ...employeeData,
                Image: file
            });
        } else {
            alert('Please upload a valid image file (JPEG/PNG)');
            e.target.value = '';
        }
    };

    const handleActive = () => {
        setEmployeeData(prevData => ({
            ...prevData,
            is_active: true
        }));
    };

    const handleDeactive = () => {
        setEmployeeData(prevData => ({
            ...prevData,
            is_active: false
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in employeeData) {
            formData.append(key, employeeData[key]);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                method: "PUT",
                body: formData
            });

            const result = await response.json();
            if (!response.ok) {
                return alert(result.error || "Failed to update employee");
            }
            navigate('/employees');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="border rounded shadow-lg bg-light col-10 col-md-5 mx-auto mt-5 p-4">
                <h2 className="text-center mb-4">Employee Edit</h2>
                <form onSubmit={handleSubmit}>
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
                                    checked={employeeData.Gender === "Male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Female"
                                    checked={employeeData.Gender === "Female"}
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
                                MCA <input
                                    type="checkbox"
                                    name="Course"
                                    value="MCA"
                                    checked={employeeData.Course.includes("MCA")}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="me-3">
                                BCA <input
                                    type="checkbox"
                                    name="Course"
                                    value="BCA"
                                    checked={employeeData.Course.includes("BCA")}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                BSC <input
                                    type="checkbox"
                                    name="Course"
                                    value="BSC"
                                    checked={employeeData.Course.includes("BSC")}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    {employeeData.Image && (
                        <div className="mb-3">
                            <img
                                src={`http://localhost:5000/${employeeData.Image}`}
                                alt="Employee"
                                width="80"
                                height="80"
                                className="mb-2"
                            />
                        </div>
                    )}
                    <div className="d-flex mb-3">
                        <label className="form-label my-auto me-3 col-3">Img Upload</label>
                        <input
                            type="file"
                            name="Image"
                            onChange={handleFileChange}
                            accept=".jpg,.png"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <button type="button" onClick={handleActive} className="btn btn-primary me-2">Mark as Active</button>
                        <button type="button" onClick={handleDeactive} className="btn btn-secondary">Mark as Deactive</button>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>

    );
}
