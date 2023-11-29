// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

        // 监听第二个输入框的输入事件
        document.getElementById("myInputPrice").addEventListener('input', function() {
          // 将焦点设置回第一个输入框
          
          // console.log("hello ");  
      });

// Create a new list item when clicking on the "Add" button
function addPrice() {
  var ul = document.querySelector("#myUL");
  var li = document.createElement("li");
  var inputValuePeople = document.getElementById("myInputPeople").value ;
  var inputValuePrice = document.getElementById("myInputPrice").value;
  var finialValue = inputValuePeople +  "號競買人 喊價 " + numberComma(inputValuePrice) + " 元";
  var t = document.createTextNode(finialValue);
  // li.appendChild(t);
  li.appendChild(t);
  
  if (inputValuePeople === '' || inputValuePrice === "") {
    if(inputValuePeople === ''){
      alert("必須輸入競買人資料");
      document.getElementById("myInputPeople").focus();
    }else if(inputValuePrice === ""){
      alert("必須輸入喊價金額資料");
      document.getElementById("myInputPrice").focus();
    }
  } else {
    // document.getElementById("myUL").appendChild(li);
    document.querySelector(".nowPrice").textContent = numberComma(inputValuePrice) + '元';

    document.querySelector(".price").style.display = "block";

    document.getElementById("myUL").prepend(li);
    document.getElementById("myInputPeople").value = "";
    document.getElementById("myInputPrice").value = "";
  
    document.getElementById("myInputPeople").focus();
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }

    //add now price 
    
  }

  // li.prepend(span);




}

// 按 Enter 新增
document.querySelector('#myInputPrice').addEventListener('keypress', function (e) {
    // Enter 對應鍵盤代碼：13
    if (e.which === 13) {
        addPrice();
    }
    // console.log("hello");
  });


  function numberComma(num){
    let comma=/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    return num.toString().replace(comma, ',')
  }