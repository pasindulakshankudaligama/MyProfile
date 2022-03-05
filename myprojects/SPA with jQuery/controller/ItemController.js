
// Validations
const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemQTYRegEx = /^[0-9]{1,10}$/;
const unitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemCode,#txtItemName,#txtItemQTY,#txtUnitPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); 
    }
});

$('#txtItemCode,#txtItemName,#txtItemQTY,#txtUnitPrice').on('blur', function () {
    formValid();
});

//focusing events
$("#txtItemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtItemCode").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtItemCode").val(srcCustomer.getCustomerID());
        $("#txtItemName").val(srcCustomer.getCustomerName());
        $("#txtItemQTY").val(srcCustomer.getCustomerAddress());
        $("#txtUnitPrice").val(srcCustomer.getCustomerSalary());
    }


});

$("#txtItemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtItemQTY").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtUnitPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnItemSave").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnItemSave").attr('disabled', true);
    loadAllCustomers();
    $("#txtItemCode,#txtItemName,#txtItemQTY,#txtUnitPrice").text("");
}

function formValid() {
    var cusID = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#txtItemCode").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtItemName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#txtItemName").text("");
            var cusAddress = $("#txtItemQTY").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtUnitPrice").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtItemQTY").css('border', '2px solid green');
                $("#txtItemQTY").text("");
                if (resp) {
                    $("#txtUnitPrice").css('border', '2px solid green');
                    $("#txtUnitPrice").text("");
                    return true;
                } else {
                    $("#txtUnitPrice").css('border', '2px solid red');
                    $("#txtUnitPrice").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtItemQTY").css('border', '2px solid red');
                $("#txtItemQTY").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#txtItemName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#txtItemCode").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtItemCode").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtItemName").focus();
        var cusName = $("#txtItemName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtItemQTY").focus();
            var cusAddress = $("#txtItemQTY").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtUnitPrice").focus();
                var cusSalary = $("#txtUnitPrice").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#txtUnitPrice").focus();
                }
            } else {
                $("#txtItemQTY").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}

$('#btnItemSave').click(function () {
    checkIfValid();
});
