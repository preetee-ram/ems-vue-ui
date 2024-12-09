export const EmployeeModel = {
  validate(employee) {
    const errors = {};

    if (!employee.name || employee.name.trim() === "") {
      errors.name = "Name cannot be empty!";
    }

    if (employee.name.length < 2) {
      console.log(employee.name.length);
      errors.name = "name is too short!";
    }
    if (employee.name.length > 151) {
      errors.name = "name should not be more than 150 characters!";
    }

    if (!employee.age) {
      errors.age = "age cannot be empty!";
    }
    if (employee.age < 18) {
      errors.age = "age cannot be less than 18!";
    }
    if (employee.age > 110) {
      errors.age = "age cannot be greater than 110";
    }

    if (!employee.address || employee.address.trim() === "") {
      errors.age = "address cannot be empty!";
    }
    if (employee.address.length < 2) {
      errors.address = "address is too short!";
    }
    if (employee.address.length > 250) {
      errors.address = "address cannot be greater than 250 characters!";
    }

    const today = new Date();
    const joiningDate = new Date(employee.joiningDate);

    if (!employee.joiningDate || isNaN(joiningDate.getTime())) {
      errors.joiningDate = "Joining date is required";
    } else if (joiningDate > today) {
      errors.joiningDate = "Joining date must be today or in the past";
    }

    console.log("validation errors:", errors);

    return errors;
  },
};
