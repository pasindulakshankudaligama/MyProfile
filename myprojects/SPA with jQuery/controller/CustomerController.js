



// CRUD Operations
generateId();

$("#btnSave").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
    generateId();

});


function saveCustomer() {
    let customerID = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();

    //create Object
    /*  var customerObject = {
          id: customerID, name: customerName, address: customerAddress, salary: customerSalary
      };*/
    var customerObject = new Customer(customerID, customerName, customerAddress, customerSalary);

    customerDB.push(customerObject);

}

$("#btnUpdate").click(function () {
    let customerID = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == customerID) {
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerSalary(customerSalary);
        }

    }
    generateId();
    loadAllCustomers();
});

function deleteCustomer() {
    $("#btnDelete").click(function () {
        let getClickData = $("#txtCusID").val();
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getCustomerId() == getClickData) {
                customerDB.splice(i, 1);
            }
        }
        generateId();
        clearAll();
        loadAllCustomers();

    });
}

/*_________clear button___________*/
$("#btnClear").click(function () {
    clearAll();
});


/*_________click customer Table ___________*/
function bindCustomer() {
    $("#customerTB > tr").click(function () {
        let customerID = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        /*_________set data for text fields__________*/
        $("#txtCusID").val(customerID);
        $("#txtCusName").val(customerName);
        $("#txtCusAddress").val(customerAddress);
        $("#txtCusSalary").val(customerSalary);

    });
}

function loadAllCustomers() {

    $("#customerTB").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`;
        $("#customerTB").append(row);

        bindCustomer();
        deleteCustomer();

    }
}

$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCusID").val(response.getCustomerId());
        $("#txtCusName").val(response.getCustomerName());
        $("#txtCusAddress").val(response.getCustomerAddress());
        $("#txtCusSalary").val(response.getCustomerSalary());
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == id) {
            return customerDB[i];
        }
    }
}

function clearAll() {
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary,#txtSearchCusID").val("");    // Clear input Fields (Add)
}

function generateId() {
    let index = customerDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = customerDB[customerDB.length - 1].getCustomerId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#txtCusID").val("C00-001");
    } else if (temp <= 9) {
        $("#txtCusID").val("C00-00" + temp);
    } else if (temp <= 99) {
        $("#txtCusID").val("C00-0" + temp);
    } else {
        $("#txtCusID").val("C00-" + temp);
    }
}

