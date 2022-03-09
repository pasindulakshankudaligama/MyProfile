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
/*_________click customer Table ___________*/
function bindCustomer (){
    $("#customerTB > tr").click(function (){
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        /*_________set data for text fields__________*/
        $("#txtCusID").val(customerId);
        $("#txtCusName").val(customerName);
        $("#txtCusAddress").val(customerAddress);
        $("#txtCusSalary").val(customerSalary);

    });
}

function loadAllCustomers() {
    $("#CustomerTB").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`;
        $("#CustomerTB").append(row);

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






// Validations
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCusID").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCusID").val(srcCustomer.getCustomerID());
        $("#txtCusName").val(srcCustomer.getCustomerName());
        $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCusSalary").val(srcCustomer.getCustomerSalary());
    }


});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnSave").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnSave").attr('disabled', true);
    loadAllCustomers();
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary").text("");
}

function formValid() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#txtCusID").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#txtCusName").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#txtCusAddress").text("");
                if (resp) {
                    $("#txtCusSalary").css('border', '2px solid green');
                    $("#txtCusSalary").text("");
                    return true;
                } else {
                    $("#txtCusSalary").css('border', '2px solid red');
                    $("#txtCusSalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#txtCusAddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#txtCusName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#txtCusID").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCusSalary").focus();
                var cusSalary = $("#txtCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCusSalary").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSave").attr('disabled', false);
    } else {
        $("#btnSave").attr('disabled', true);
    }
}

$('#btnSave').click(function () {
    checkIfValid();
});
