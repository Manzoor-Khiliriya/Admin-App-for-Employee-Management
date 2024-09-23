import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

export default function Employees() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [sortedEmployees, setSortedEmployees] = useState([]);

    const employeeList = async (page) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/employees?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const result = await response.json();
            setEmployees(result.data);
            setTotalEmployees(result.pagination.totalCount);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        setSortedEmployees([...employees]);
    }, [employees]);

    useEffect(() => {
        employeeList(currentPage);
    }, [currentPage]);

    const sortByName = () => {
        const sorted = [...employees].sort((a, b) => a.Name.localeCompare(b.Name));
        setSortedEmployees(sorted);
    };

    const sortByEmail = () => {
        const sorted = [...employees].sort((a, b) => a.Email.localeCompare(b.Email));
        setSortedEmployees(sorted);
    };

    const sortByCreatedDate = () => {
        const sorted = [...employees].sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));;
        setSortedEmployees(sorted);
    };

    const filteredEmployees = sortedEmployees.filter((employee) => {
        const searchTextLower = searchText.toLowerCase();
        return ['Name', 'Email', 'Mobile', 'Designation', 'Gender', 'Course'].some((key) => {
            return employee[key]?.toString().toLowerCase().includes(searchTextLower);
        });
    });

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/ /g, '-');
    };

    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/employees/${id}`, {
                    method: "DELETE"
                });
                const result = await response.json();

                if (!response.ok) {
                    return alert(result.error || "Failed to delete employee");
                }
                employeeList(currentPage);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const totalPages = Math.ceil(totalEmployees / limit);
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Header />
            <div className='mx-3'>
                <div className='col-10 col-md-5 d-flex justify-content-between ms-auto my-3'>
                    <h5 className='me-4 my-auto'>Total count: {totalEmployees}</h5>
                    <button className='btn btn-success' onClick={() => { navigate('/create-employee') }}>Create Employee</button>
                </div>

                <div className='col-10 col-md-5 d-flex ms-auto my-3'>
                    <label className='form-label my-auto me-3'>Search</label>
                    <input
                        type="text"
                        className='form-control'
                        placeholder="Enter Search Keyword"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className='col-10 col-md-5 d-flex ms-auto my-3'>
                    <button className='btn btn-primary me-2' onClick={sortByName}>Sort by Name</button>
                    <button className='btn btn-primary me-2' onClick={sortByEmail}>Sort by Email</button>
                    <button className='btn btn-primary' onClick={sortByCreatedDate}>Sort by Created Date</button>

                </div>

                <div className='col-12'>
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Unique Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Created Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp._id}>
                                    <td>{emp._id}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/${emp.Image}`}
                                            alt={emp.Name}
                                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                        />
                                    </td>
                                    <td>{emp.Name}</td>
                                    <td>{emp.Email}</td>
                                    <td>{emp.Mobile}</td>
                                    <td>{emp.Designation}</td>
                                    <td>{emp.Gender}</td>
                                    <td>{emp.Course.join(', ')}</td>
                                    <td>{formatDate(emp.CreatedDate)}</td>
                                    <td>{emp.is_active ? 'Active' : 'Deactive'}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => navigate(`/update-employee/${emp._id}`)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteEmployee(emp._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalEmployees > 0 && (
                    <nav aria-label="Page navigation" className='col-12'>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => changePage(currentPage - 1)}>Previous</button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => changePage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}
