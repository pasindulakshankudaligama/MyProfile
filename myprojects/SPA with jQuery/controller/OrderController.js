generateOrderId();
setDate();
disableEdit();

$("#cmb").change(function(e){
    let selectedCus = $('#cmb').find(":selected").text();
    selectedCustomer(selectedCus);

});

$("#idCmb").change(function(){
    selectedItemId = $('#idCmb').find(":selected").text();
    selectedItem(selectedItemId);
});

/* Load Customer ID's to Combo Box - Function */
function loadAllCustomerIds() {
    $("#cmb").empty();

    let cusHint = `<option selected>Select Customer ID</option>`;
    $("#cmb").append(cusHint);

    for (let i in customerDB) {
        let option = `<option value="${customerDB[i].getCustomerId()}">${customerDB[i].getCustomerId()}</option>`;
        $("#cmb").append(option);
    }

}

/* Load Item ID's to Combo Box - Function */
function loadAllItemCodes() {
    $("#idCmb").empty();

    let itemHint = `<option disabled selected>Select Item ID</option>`;
    $("#idCmb").append(itemHint);

    for (let i in itemDB) {
        let option = `<option value="${itemDB[i].getItemCode()}">${itemDB[i].getItemCode()}</option>`;
        $("#idCmb").append(option);
    }
}

function selectedCustomer(CustomerId) {
    for (const i in customerDB) {
        if (customerDB[i].getCustomerId()==CustomerId) {
            let element = customerDB[i];
            $("#cusName").val(element.getCustomerName());
            $("#salary").val(element.getCustomerSalary());
            $("#address").val(element.getCustomerAddress());
        }
    }
}

/* Load Item Data To input Fields */
function selectedItem(ItemId) {
    for (const i in itemDB) {
        if (itemDB[i].getItemCode()==ItemId) {
            let element = itemDB[i];
            $("#itemName").val(element.getItemName());
            $("#qtyOnHand").val(element.getItemQTY());
            $("#price").val(element.getUnitPrice());
        }
    }
}

function disableEdit() {
    $("#OID,#cusName,#salary,#address,#iDate").css("pointer-events", "none");
    $("#itemName,#qtyOnHand,#price").css("pointer-events", "none");
    $("#balance").css("pointer-events", "none");
}

function generateOrderId() {
    let index = orderDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = orderDB[orderDB.length - 1].getOrderId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#txtOrderId").val("O00-001");
    } else if (temp <= 9) {
        $("#txtOrderId").val("O00-00" + temp);
    } else if (temp <= 99) {
        $("#txtOrderId").val("O00-0" + temp);
    } else {
        $("#txtOrderId").val("O00-" + temp);
    }
}

function setDate() {
    let d = new Date();
    let dd = d.toISOString().split("T")[0].split("-");
    $("#iDate").val(dd[0]+"-"+dd[1]+"-"+dd[2]);
    $("#hDate").text(dd[0]+"-"+dd[1]+"-"+dd[2]);
}