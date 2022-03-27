
// const msg = document.querySelector('.msg');
// var changeButton = document.getElementById("pet-change");
// var petName = document.getElementById("pet-name").innerHTML;

// changeButton.addEventListener('click', onChange);

function onChange(petNames) {
    let petName = JSON.stringify(petNames);
    
    // let petNames = document.getElementById("pet-name");
    // console.log("petNames: ", petNames);
    // let petName = petNames.innerHTML;
    console.log("petname: ", petName);
    let newPetName ="";
    if (petName === "Bella") {
        newPetName = "Carol";
    } else if (petName === "Carol") {
        newPetName = "Diana";
    } else if (petName === "Diana") {
        newPetName = "Eileen";
    } else if (petName === "Eileen") {
        newPetName = "Ava";
    } else {
        newPetName = "Bella";
    }
    console.log(typeof petName);
    console.log(newPetName);
    let image = "/images/" + newPetName + "Pet128.png";
    // let id = newPetName+"-change";
    console.log(image);
    var newContent =`<input class="btn" type="submit" id="pet-change" value="Change Pet" onClick="onChange('${newPetName}')">` +
                     "<div class='blockContent'>" +
                    `<div class="msg">`+ 
                    `<h3 id="pet-name"> ${newPetName} </h3>` +
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src=${image} />`+
                    `</p>`+
                    `</div>`+`</div>`;
    
document.getElementById("my-form").innerHTML = newContent;
}




