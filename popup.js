
const msg = document.querySelector('.msg');
var changeButton1 = document.getElementById("pet-change1");
var changeButton2 = document.getElementById("pet-change2");
var changeButton3 = document.getElementById("pet-change3");
var changeButton4 = document.getElementById("pet-change4");
var changeButton5 = document.getElementById("pet-change5");



changeButton1.addEventListener('click', onChange1);
changeButton2.addEventListener('click', onChange2);
changeButton3.addEventListener('click', onChange3);
changeButton4.addEventListener('click', onChange4);
changeButton5.addEventListener('click', onChange5);

const changeSubmit = document.getElementById("pet-submit");
var petName = "Ava";





function onChange1(e) {
    e.preventDefault();
    petName = "Ava";
    chineseName = "向晚";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${chineseName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange2(e) {
    e.preventDefault();
    petName = "Bella";
    chineseName = "贝拉";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${chineseName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange3(e) {
    e.preventDefault();
    petName = "Carol";
    chineseName = "珈乐";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${chineseName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange4(e) {
    e.preventDefault();
    petName = "Diana";
    chineseName = "嘉然";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${chineseName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange5(e) {
    e.preventDefault();
    petName = "Eileen";
    chineseName = "乃琳";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${chineseName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


changeSubmit.onclick= function(e) {
    e.preventDefault();

    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getName: petName}, function(response) {
            chrome.tabs.reload(tabs[0].id);
            console.log(response);
        });
      });
}


