
document.getElementById("customer").style.setProperty("Display","block","important");
document.getElementById("item").style.setProperty("Display","none","important");
document.getElementById("order").style.setProperty("Display","none","important");

// NavBar clicks
document.getElementById("customer-click").addEventListener("click",function (){
    document.getElementById("customer").style.setProperty("Display","block","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});
document.getElementById("item-click").addEventListener("click",function (){
    document.getElementById("item").style.setProperty("Display","block","important");
    document.getElementById("customer").style.setProperty("Display","none","important");
    document.getElementById("order").style.setProperty("Display","none","important");
});

document.getElementById("order-click").addEventListener("click",function (){
    document.getElementById("order").style.setProperty("Display","block","important");
    document.getElementById("item").style.setProperty("Display","none","important");
    document.getElementById("customer").style.setProperty("Display","none","important");
  
});




