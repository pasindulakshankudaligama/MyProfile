function Item(itemCode, itemName, itemQTY, unitPrice) {
    var __itemCode = itemCode;
    var __itemName = itemName;
    var __itemQTY = itemQTY;
    var __unitPrice = unitPrice;

    this.setItemCode = function (itemCode) {
        __itemCode = itemCode;
    }
    this.getItemCode = function () {
        return __itemCode;
    }
    this.setItemName = function (itemName) {
        __itemName = itemName;
    }
    this.getItemName = function () {
        return __itemName;
    }
    this.setItemQTY = function (itemQTY) {
        __itemQTY = itemQTY;
    }
    this.getItemQTY = function () {
        return __itemQTY;
    }
    this.setUnitPrice = function (unitPrice) {
        __unitPrice = unitPrice;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
    }
}