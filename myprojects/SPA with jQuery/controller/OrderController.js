var selectedItemId;
var selectedCustomerId;

generateOrderId();
setDate();
disableEdit();

$("#cmb").change(function(e){
    selectedCustomerId = $('#cmb').find(":selected").text();
    selectedCustomer(selectedCustomerId);

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

//add to cart
$("#addBtn").click(function(){
    addItemToCart();
});


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
    $("#iDate").text(dd[0]+"-"+dd[1]+"-"+dd[2]);
}

var fullTotal = 0;
function addItemToCart() {
    let id = selectedItemId;
    let iName = $("#itemName").val();
    let iQtyOnHand = $("#qtyOnHand").val();
    let iPrice = $("#price").val();
    let iOrderQTY = $("#oQty").val();

    let total = 0;

    // Check Qty Availability
    if (iQtyOnHand >= iOrderQTY) {
        iQtyOnHand = iQtyOnHand - iOrderQTY;
    }else{
        alert("Enter Valid QTY");
        $("#oQty").val("");
        return;
    }
    //updateing qty
    for (let i = 0; i < itemDB.length; i++) {
        if (id == itemDB[i].getItemCode()) {
            itemDB[i].setItemQTY(iQtyOnHand);
        }
    }

    let newQty = 0;
    let newTotal= 0;

    if (checkDuplicates(id)==-1) {
        total = iOrderQTY * iPrice;
        fullTotal = fullTotal + total;
        let row =
            `<tr><td>${id}</td><td>${iName}</td><td>${iPrice}</td><td>${iOrderQTY}<td>${total}</td></tr>`;
        $("#OrderTB").append(row);
        $("#lblFullTotal").text(fullTotal+" LKR");
        clearInputItems();

    }else{

        let rowNo = checkDuplicates(id);
        newQty = iOrderQTY;
        let oldQty = parseInt($($('#OrderTB>tr').eq(rowNo).children(":eq(3)")).text());
        let oldTotal = parseInt($($('#OrderTB>tr').eq(rowNo).children(":eq(4)")).text());

        fullTotal = fullTotal-oldTotal;
        newQty = parseInt(oldQty) + parseInt(newQty) ;
        newTotal = newQty * iPrice;
        fullTotal = fullTotal + newTotal;

        //Update row
        $('#OrderTB tr').eq(rowNo).children(":eq(3)").text(newQty);
        $('#OrderTB tr').eq(rowNo).children(":eq(4)").text(newTotal);

        $("#lblFullTotal").text(fullTotal+" LKR");
        alert("test");
        clearInputItems();
    }

}