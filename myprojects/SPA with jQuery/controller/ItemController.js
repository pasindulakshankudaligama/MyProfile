//crud
$("#btnItemSave").click(function(){
    saveItem();
    clearAll();
    loadAllItems();
});


function saveItem(){
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQTY = $("#txtItemQTY").val();
    let unitPrice = $("#txtUnitPrice").val();

    //create Object
   /* var itemObject = {
        code: itemCode,
        name: itemName,
        qTY: itemQTY,
        unitPrice: unitPrice
    };
*/
    var itemObject = Item(itemCode,itemName,itemQTY,unitPrice);
    itemDB.push(itemObject);
}

function bindItem (){
    /*_________click Item Table ___________*/
    $("#ItemTB > tr").click(function (){
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();

        /*_________set data for text fields__________*/
        $("#txtItemCode").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemQTY").val(itemQty);
        $("#txtUnitPrice").val(unitPrice);

    });

};

/*_________Update Customer___________*/
$("#btnItemUpdate").click(function (){
    let itemId = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQTY").val();
    let itemPrice = $("#txtUnitPrice").val();

    for (var i=0;i<itemDB.length;i++){
        if ( itemDB[i].getItemCode()==itemId){
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemQTY(itemQty);
            itemDB[i].setUnitPrice(itemPrice);
        }
    }
    loadAllItems();
    clearAll();
});

/*_________Delete Item___________*/
function deleteItem (){
    $("#btnItemDelete").click(function (){
        let getClickItemData=$("#txtItemCode").val();
        for (let i=0;i<itemDB.length;i++){
            if (itemDB[i].getItemCode()==getClickItemData){
                itemDB.splice(i, 1);
            }
        }
        clearAll();
        loadAllItems();

    });
}


function loadAllItems() {
    $("#ItemTB").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQTY()}</td><td>${i.getUnitPrice()}</td></tr>`;
        $("#ItemTB").append(row);

        bindItem();
        deleteItem();
    }
}

$("#btnItemSearch").click(function () {
    var searchItemCode = $("#txtSearchItemCode").val();

    var response = searchItem(searchItemCode);
    if (response) {
        $("#txtItemCode").val(response.itemCode);
        $("#txtItemName").val(response.itemName);
        $("#txtItemQTY").val(response.itemQTY);
        $("#txtUnitPrice").val(response.unitPrice);
    }else{
        clearAll();
        alert("No Such a item");
    }
});


function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            return itemDB[i];
        }
    }
}

function deleteCustomer(){
   
}

function updateCustomer(){
    
}






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
        var srcCustomer = searchItemFromCode(typedItemCode);
        $("#txtItemCode").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtItemQTY").val(srcItem.getItemQTY());
        $("#txtUnitPrice").val(srcItem.getUnitPrice());
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
    var itemCode = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#txtItemCode").text("");
    if (itemIDRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#txtItemName").text("");
            var itemQTY = $("#txtItemQTY").val();
            if (itemQTYRegEx.test(cusAddress)) {
                var unitPrice = $("#txtUnitPrice").val();
                var resp = unitPriceRegEx.test(unitPrice);
                $("#txtItemQTY").css('border', '2px solid green');
                $("#txtItemQTY").text("");
                if (resp) {
                    $("#txtUnitPrice").css('border', '2px solid green');
                    $("#txtUnitPrice").text("");
                    return true;
                } else {
                    $("#txtUnitPrice").css('border', '2px solid red');
                    $("#txtUnitPrice").text("unit price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtItemQTY").css('border', '2px solid red');
                $("#txtItemQTY").text("Item Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#txtItemName").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#txtItemCode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValid() {
    var itemCode = $("#txtItemCode").val();
    if (itemCodeRegEx.test(cusID)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemQTY").focus();
            var itemQTY = $("#txtItemQTY").val();
            if (itemQTYRegEx.test(itemQTY)) {
                $("#txtUnitPrice").focus();
                var unitPrice = $("#txtUnitPrice").val();
                var resp = unitPriceRegEx.test(unitPrice);
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
