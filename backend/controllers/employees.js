const employeesRepositories = require('../repositories/employees');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { getPaginationParams } = require('../utils/pagination');


const getAllEmployees = asyncHandler(async (req, res, next) => {
    const { limit, offset, page } = getPaginationParams(req.query, 5);
    const { employees, totalCount } = await employeesRepositories.getAllEmployees({ offset, limit });
    if (!employees || employees.length === 0) {
        return res.status(204).send();
    }
    res.status(200).json({ success: true, data: employees, pagination: { currentPage: page, pageSize: limit, totalCount } });
})

const getEmployeeById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const employee = await employeesRepositories.getEmployeeById(id);
    if (!employee) {
        return next(new ErrorResponse('Employee not found', 404));
    }
    res.status(200).json({ success: true, data: employee });
})

const createEmployee = asyncHandler(async (req, res, next) => {
    const { Name, Email, Mobile, Designation, Gender, Course } = req.body;
    const imagePath = req.file ? req.file.path : '';

    if (!Name || !Email || !Mobile || !Designation || !Gender || !Course) {
        return next(new ErrorResponse('All fields are required' , 400));
    }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(Email)) {
           return next(new ErrorResponse('Invalid email format', 400));
       }
   
       const mobileRegex = /^[0-9]+$/;
       if (!mobileRegex.test(Mobile) || Mobile.length < 10 || Mobile.length > 15) {
           return next(new ErrorResponse('Mobile number must be numeric and 10-15 digits long', 400 ));
       }
   
       const existingEmployee = await employeesRepositories.getEmployeeByEmail(Email);
       if (existingEmployee) {
           return res.statunext(new ErrorResponse('Email already in use', 400 ));
       }

       const coursesArray = Array.isArray(Course) ? Course : Course.split(',').map(course => course.trim());


    const EmployeeData = {
        Image: imagePath ,
        Name,
        Email,
        Mobile,
        Designation,
        Gender,
        Course: coursesArray
    };

    const Employee = await employeesRepositories.createEmployee(EmployeeData);
    res.status(201).json({ success: true, data: Employee });
});

const updateEmployee = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    if (!data.Name || !data.Email || !data.Mobile || !data.Designation || !data.Gender || !data.Course) {
        return next(new ErrorResponse('All fields are required', 400));
    }

    const existingEmployee = await employeesRepositories.getEmployeeById(id);
    if (!existingEmployee) {
        return next(new ErrorResponse('Employee not found', 404));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.Email)) {
        return next(new ErrorResponse('Invalid email format', 400));
    }

    if (data.Email !== existingEmployee.Email) {
        const existingEmployeeByEmail = await employeesRepositories.getEmployeeByEmail(data.Email);
        if (existingEmployeeByEmail) {
            return next(new ErrorResponse('Email already in use', 400));
        }
    }


    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(data.Mobile)) {
        return next(new ErrorResponse('Mobile number must be numeric and 10-15 digits long', 400));
    }

    if (req.file) {
        data.Image = req.file.path; 
    } else {
        data.Image = existingEmployee.Image;
    }

    const updatedCourses = Array.isArray(data.Course) ? data.Course : data.Course.split(',').map(course => course.trim());
    
    await employeesRepositories.updateEmployee(id, { ...data, Course: updatedCourses });

    const updatedData = await employeesRepositories.getEmployeeById(id);
    res.status(200).json({ success: true, data: updatedData });
});

const deleteEmployee = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingEmployee = await employeesRepositories.getEmployeeById(id);
    if (!existingEmployee) {
        return next(new ErrorResponse('Employee not found', 404));
    }

    await employeesRepositories.deleteEmployee(id);
    res.status(200).json({ success: true,  message: 'Employee deleted successfully' });
});


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}