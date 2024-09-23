const Employee = require('../models/employee');

const getAllEmployees = async ({ offset, limit }) => {
    try {
        const employees = await Employee.find()
            .skip(offset)
            .limit(limit);
        const totalCount = await Employee.countDocuments();
        return { employees, totalCount };
    } catch (error) {
        throw error;
    }
}

const getEmployeeById = async (id) => {
    try {
        const employee = await Employee.findById(id);
        return employee;
    } catch (error) {
        throw error;
    }

}

const getEmployeeByEmail = async (Email) => {
    try {
        const employee = await Employee.findOne({ Email: Email });
        return employee;
    } catch (error) {
        throw error;
    }

}

const createEmployee = async (employeeData) => {
    try {
        const newEmployeeData = new Employee(employeeData);
        const employee = await newEmployeeData.save();
        return employee;
    } catch (error) {
        throw error;
    }
}

const updateEmployee = async (id, data) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, data);
        return updatedEmployee;
    } catch (error) {
        throw error;
    }
};

const deleteEmployee = async (id, data) => {
    try {
        const deleted = await Employee.findByIdAndDelete(id);
        return deleted;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByEmail,
    createEmployee,
    updateEmployee,
    deleteEmployee
}