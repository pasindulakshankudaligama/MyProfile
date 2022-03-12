function Orders(orderId,customerId,itemId,date,discount,total) {
    var __oId = orderId;
    var __cId = customerId;
    var __iId = itemId;
    var __date = date;
    var __discount = discount;
    var __total = total;

    this.setOrderId = function(orderId){
        __oId = orderId;
    }

    this.getOrderId = function(){
        return __oId;
    }

    this.setCustomerId = function(customerId){
        __cId = customerId;
    }

    this.getCustomerId = function(){
        return __cId;
    }

    this.setItemId = function(itemId){
        __iId = itemId;
    }

    this.getItemId = function(){
        return __iId;
    }

    this.setDate = function(date){
        __date = date;
    }

    this.getDate = function(){
        return __date;
    }

    this.setDiscount = function(discount){
        __discount = discount;
    }

    this.getDiscount = function(){
        return __discount;
    }

    this.setTotal = function(total){
        __total = total;
    }

    this.getTotal = function(){
        return __total;
    }

}