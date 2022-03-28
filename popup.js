
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


function onChange1(e) {
    e.preventDefault();
    
    petName = "Ava"
    console.log(newPetName);
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange1(e) {
    e.preventDefault();
    
    petName = "Ava";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange2(e) {
    e.preventDefault();
    
    petName = "Bella";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange3(e) {
    e.preventDefault();
    
    petName = "Carol";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange4(e) {
    e.preventDefault();
    
    petName = "Diana";
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}


function onChange5(e) {
    e.preventDefault();
    
    petName = "Eileen"
    let image = "/images/" + petName + "Pet128.png";
    var newContent = `<h3 id="pet-name"> ${petName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`;
    msg.innerHTML = newContent;
}



