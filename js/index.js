let item;
let priceDetailArray;
let nowPrice;


window.onload = function() {
    nowPrice  = document.querySelector(".nowPrice");
    let i = 0;

    createDate();

    createData();

    setInterval(function() {
        createDate();
        // createData();
        endAuction();
    }, 1000);

};

function createDate() {
    let time = new Date();
    let finialTime = '<span style="font-size: 1.3em">(現在時間：' + time.toLocaleString() + ') </span>';
    document.querySelector("h3").innerHTML = finialTime;
}


function numberComma(num) {
    let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    return num.toString().replace(comma, ',')
}

// import firebase from "firebase/app";
// import "firebase/compat/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


function createData() {
    let firebaseConfig = {
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://auction-88ffa-default-rtdb.firebaseio.com/",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    let database = firebase.database();

    database.ref("/item").on('value', e => {
        item = e.val();
        if (item != null) {
            let itemArray = Object.values(item);
            // console.log(itemArray)
            // document.querySelector("h2").textContent = "拍賣物名稱 : " + itemArray[i].itemName;

            while (true) {
                if (document.querySelectorAll("li").length == 0) {
                    document.querySelector('.nowPrice').textContent = '';
                    break;
                } else {
                    document.querySelectorAll("li")[0].remove();
                }
            }

            priceDetailArray = null;
            for (let i = 0; i < itemArray.length; i++) {
                if (itemArray[i].status == 2 && itemArray.endAuction == null) {
                    // console.log(itemArray[i].itemID)
                    if (itemArray[i].itemLeastPrice != "") {
                        document.querySelector("h2").innerHTML = "拍賣物名稱 : " + itemArray[i].itemName + "<br>最低加價金額：" + numberComma(itemArray[i].itemLeastPrice);
                    } else {
                        document.querySelector("h2").innerHTML = "拍賣物名稱 : " + itemArray[i].itemName + "<br>最低加價金額：" + itemArray[i].itemLeastPrice;
                    }

                    if (itemArray[i].price_detail != null) {
                        let webId = itemArray[i].itemID;
                        let webName = itemArray[i].itemName;
                        // console.log(webName);
                        // console.log(webId);
                        // document.querySelector("h2").textContent = "拍賣物名稱 : " + webName;
                        priceDetailArray = Object.values(itemArray[i].price_detail.li);
                        // priceDetailArray = Object.values(itemArray[i].price_detail.li);
                    }
                }
            }
            let ul = document.querySelector("#myUL");
            // console.log(priceDetailArray);

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
                        nowPrice.textContent = numberComma(priceDetailArray[i]['myInputPrice']);
                        //   console.log(priceDetailArray.length);
                        //   console.log(priceDetailArray);
                    } else {
                        // nowPrice.textContent = "";
                    }
                }

                if (priceDetailArray.length != 0 && priceDetailArray[0]['myInputPeople'] != null) {
                    document.querySelector("li").setAttribute("class", "check");
                }


                let number = 0;
                for (let i = 0; i < priceDetailArray.length; i++) {
                    if (priceDetailArray[i]['myInputPeople'] == null) {
                        number++;
                    }
                }
                if (priceDetailArray.length == number) {
                    nowPrice.textContent = "";
                }
            }
        }
    })
}

function endAuction() {
    let firebaseConfig = {
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://auction-88ffa-default-rtdb.firebaseio.com/",
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp();

    // Initialize Realtime Database and get a reference to the service
    let database = firebase.database();

    database.ref("/item").once('value', e => {
        item = e.val();
        let nowNumber;
        if (item != null) {
            let itemArray = Object.values(item);

            // console.log(itemArray.length);
            // let numberEndAuction = 0;
            // let numberEndAuction2 = 0;

            for (let i = 0; i < itemArray.length; i++) {
                if (itemArray[i].status == 2) {
                    nowNumber = i;
                    break;
                }
            }
            // console.log("number" + numberEndAuction);
            // if (numberEndAuction == itemArray.length) {
            if (nowNumber != null) {
                if (itemArray[nowNumber].status == 2 && itemArray[nowNumber].endAuction == 2) {
                    // console.log("endAuction");
                    // document.querySelector('h2').textContent = '拍賣競買人喊價';
                    // document.querySelector('.nowPrice').textContent = '';

                    // while (true) {
                    //     if (document.querySelectorAll("li").length == 0) {
                    //         break;
                    //     } else {
                    //         document.querySelectorAll("li")[0].remove();
                    //     }
                    // }
                    createData();
                } else if (itemArray[nowNumber].status == 3){
                    document.querySelector('h2').textContent = '動產拍賣競買人喊價';
                    document.querySelector('.nowPrice').textContent = '';

                    while (true) {
                        if (document.querySelectorAll("li").length == 0) {
                            break;
                        } else {
                            document.querySelectorAll("li")[0].remove();
                        }
                    }

                }else if (itemArray[nowNumber].status == 2 && itemArray[nowNumber].nopeople == 1) {
                    // document.querySelector('h2').textContent = '拍賣競買人喊價';
                    document.querySelector('.nowPrice').textContent = '無人應買';
                    console.log("無人應買");
                    while (true) {
                        if (document.querySelectorAll("li").length == 0) {
                            break;
                        } else {
                            document.querySelectorAll("li")[0].remove();
                        }
                    }
                } 
            } else {
                document.querySelector('h2').textContent = '動產拍賣競買人喊價';
                // console.log("無資料");
            }
        } 

        //   let ul = document.querySelector("#myUL");
    })
}
