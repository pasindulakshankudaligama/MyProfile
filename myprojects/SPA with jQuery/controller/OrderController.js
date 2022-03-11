generateOrderId();
setDate();
disableEdit();

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