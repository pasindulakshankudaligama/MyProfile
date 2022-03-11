generateOrderId();
setDate();
disableEdit();

$("#cmb").change(function(e){
    let selectedCus = $('#cmb').find(":selected").text();
    selectedCustomer(selectedCus);

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
    // console.log(dd);
    $("#iDate").val(dd[0]+"-"+dd[1]+"-"+dd[2]);
    $("#hDate").text(dd[0]+"-"+dd[1]+"-"+dd[2]);
}