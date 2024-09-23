const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    Image: {
        type: String,
        require
    },
    Name: {
        type: String,
        require
    },
    Email: {
        type: String,
        require
    },
    Mobile: {
        type: String,
        require
    },
    Designation: {
        type: String,
        require
    },
    Gender: {
        type: String,
        require
    },
    Course: {
        type: [String],
        require
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean,
        default: true
    }
});


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;