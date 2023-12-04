let item;
let priceDetailArray;
let nowPrice = document.querySelector(".nowPrice");
createDate();

window.onload = function() {
    let i = 0;
    // setInterval(function(){
    //     i += 1;
    //     document.querySelector(".nowPrice").textContent = i;
    // }, 1000);
    createData();
    setInterval(function(){
        createDate();
    }, 1000);
    
};

function createDate(){
    let time = new Date();
    let finialTime = '<span style="font-size: 1em">(現在時間：' + time.toLocaleString() + ') </span>';
    document.querySelector("h3").innerHTML = finialTime;
}

    // setInterval(function(){
    //   createData();
    //   console.log(1);
    // }, 1000);

function numberComma(num) {
    let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    return num.toString().replace(comma, ',')
}

// import firebase from "firebase/app";
// import "firebase/compat/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

async function removeTag() {
    // 
    // if(document.querySelectorAll("li").length!= 0){
    // //   for (let i = 0; i < document.querySelectorAll("li").length; i++) {
    // //     document.querySelectorAll("li")[i].remove();

    // //     console.log(document.querySelectorAll("li")[i]);
    // // }
    //  document.querySelectorAll("li")[0].remove()
    // }
    // return 'done';

    while (true) {
        if (document.querySelectorAll("li").length == 0) {
            return 'done';
            break;
        } else {
            document.querySelectorAll("li")[0].remove();
        }
    }
}

async function main(itemArray) {
    const result = await removeTag();
    // console.log(result);
    // console.log(result);
    for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i].status == 1) {
            // console.log(itemArray[i].itemID)
            if (itemArray[i].price_detail != null) {
                priceDetailArray = Object.values(itemArray[i].price_detail.li);
            }
        }
    }
    let ul = document.querySelector("#myUL");

    if (priceDetailArray != null) {
        for (let i = 0; i < priceDetailArray.length; i++) {
            if (priceDetailArray[i]['myInputPeople'] != null) {
                let li = document.createElement("li");
                // var finialValue = inputValuePeople + "號競買人 喊價 " + numberComma(inputValuePrice) + " 元";
                let finialValue = priceDetailArray[i]['myInputPeople'] + "號競買人 喊價 " + numberComma(priceDetailArray[i]['myInputPrice']).toString() + " 元";
                // console.log(finialValue);
                let t = document.createTextNode(finialValue);
                // li.appendChild(t);
                li.appendChild(t);
                ul.prepend(li);
                nowPrice.textContent = numberComma(priceDetailArray[i]['myInputPrice']) + " 元";
            }
        }
    }
}

function createData() {


    let firebaseConfig = {
        // ...
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://auction-88ffa-default-rtdb.firebaseio.com/",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    // Initialize Realtime Database and get a reference to the service
    let database = firebase.database();

    database.ref("/").on('value', e => {
        item = e.val();
        if (item != null) {
            let itemArray = Object.values(item);
            // console.log(document.querySelectorAll("li").length);

            // removeTag();
            // main(itemArray);
            // for (let i = 0; i < document.querySelectorAll("li").length; i++) {
            //     document.querySelectorAll("li")[i].remove();
            //     console.log(i);
            // }


            // for (let i = 0; i < itemArray.length; i++) {
            //     if (itemArray[i].status == 1) {
            //         // console.log(itemArray[i].itemID)
            //         if(itemArray[i].price_detail != null){
            //           priceDetailArray = Object.values(itemArray[i].price_detail.li);
            //         }
            //     }
            // }
            // let ul = document.querySelector("#myUL");

            // if(priceDetailArray != null){
            //   for (let i = 0; i < priceDetailArray.length; i++) {
            //     if (priceDetailArray[i]['myInputPeople'] != null) {
            //         let li = document.createElement("li");
            //         // var finialValue = inputValuePeople + "號競買人 喊價 " + numberComma(inputValuePrice) + " 元";
            //         let finialValue = priceDetailArray[i]['myInputPeople'] + "號競買人 喊價 " + numberComma(priceDetailArray[i]['myInputPrice']).toString() + " 元";
            //         // console.log(finialValue);
            //         let t = document.createTextNode(finialValue);
            //         // li.appendChild(t);
            //         li.appendChild(t);
            //         ul.prepend(li);
            //         nowPrice.textContent = numberComma(priceDetailArray[i]['myInputPrice']) + " 元";
            //     }
            // }
            // }

            while (true) {
                if (document.querySelectorAll("li").length == 0) {
                    // return 'done';
                    break;
                } else {
                    document.querySelectorAll("li")[0].remove();
                }
            }
            for (let i = 0; i < itemArray.length; i++) {
              if (itemArray[i].status == 1) {
                  // console.log(itemArray[i].itemID)
                  if (itemArray[i].price_detail != null) {
                      let webId = itemArray[i].itemID;
                      let webName = itemArray[i].itemName;
                      console.log(webName);
                    console.log(webId);
                      document.querySelector("h2").textContent = "拍賣物編編號：" + webId + "拍賣物名稱 : " + webName ;
                      priceDetailArray = Object.values(itemArray[i].price_detail.li);
                  }
              }
          }
          let ul = document.querySelector("#myUL");
      
          if (priceDetailArray != null) {
              for (let i = 0; i < priceDetailArray.length; i++) {
                  if (priceDetailArray[i]['myInputPeople'] != null) {
                      let li = document.createElement("li");
                      // var finialValue = inputValuePeople + "號競買人 喊價 " + numberComma(inputValuePrice) + " 元";
                      let finialValue = priceDetailArray[i]['myInputPeople'] + "號競買人 喊價 " + numberComma(priceDetailArray[i]['myInputPrice']).toString() + " 元";
                      // console.log(finialValue);
                      let t = document.createTextNode(finialValue);
                      // li.appendChild(t);
                      li.appendChild(t);
                      ul.prepend(li);
                      nowPrice.textContent = numberComma(priceDetailArray[i]['myInputPrice']) + " 元";
                    //   console.log(priceDetailArray.length);
                    //   console.log(priceDetailArray);
                  }else{
                    // nowPrice.textContent = "";
                  }
              }

              if(priceDetailArray.length != 0 && priceDetailArray[0]['myInputPeople'] != null){
                document.querySelector("li").setAttribute("class", "check");
              }


              let number = 0;
              for (let i = 0; i < priceDetailArray.length; i++) {
                if (priceDetailArray[i]['myInputPeople'] == null){
                    number++;
                }
              }
              if(priceDetailArray.length == number){
                nowPrice.textContent = "";
              }

          }
        }
    })
}