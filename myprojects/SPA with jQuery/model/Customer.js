function Customer(id, name, address, salary) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __salary = salary;

    this.setCustomerId = function (id) {
        __id = id;
    }
    this.getCustomerId = function () {
        return __id;
    }
    this.setCustomerName = function (name) {
        __name = name;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.setCustomerAddress = function (address) {
        __address = address;
    }
    this.getCustomerAddress = function () {
        return __address;
    }
    this.setCustomerSalary = function (salary) {
        __salary = salary;
    }
    this.getCustomerSalary = function () {
        return __salary;
    }
}