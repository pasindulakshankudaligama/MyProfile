// CRUD Operations
$("#btnSave").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
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
    var customerObject = new Customer(customerID,customerName,customerAddress,customerSalary);

    customerDB.push(customerObject);

}
$("#btnUpdate").click(function (){
    let customerID = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();
    for(var i=0; i<customerDB.length;i++){
        if (customerDB[i].getCustomerId()==customerID) {
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerSalary(customerSalary);
        }

    }
    loadAllCustomers();
});

function deleteCustomer (){
    $("#btnDelete").click(function (){
        let getClickData=$("#txtCusID").val();
        for (let i=0;i<customerDB.length;i++){
            if (customerDB[i].getCustomerId()==getClickData){
                customerDB.splice(i, 1);
            }
        }
        clearAll();
        loadAllCustomers();

    });
}

/*_________clear button___________*/
$("#btnClear").click(function (){
    clearAll();
});


/*_________click customer Table ___________*/
function bindCustomer (){
    $("#customerTB > tr").click(function (){
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




