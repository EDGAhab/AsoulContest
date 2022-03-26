const msg = document.querySelector('.msg');
const changeButton = document.getElementById("pet-change");

changeButton.addEventListener('click', onChange);

function onChange(e) {
    e.preventDefault();
    
    var newContent =`<input class="btn" type="submit" id="pet-change" value="Change Pet">` +
                     "<div class='blockContent'>" +
                    `<div class="msg">`+ 
                    `<h3>Carol</h3>` + 
                    `<p>`+
                    `<img height="100" style="max-width: 120px;background-position: top left;" src="/images/CarolPet128.png" />`+
                    `</p>`+
                    `</div>`+`</div>`;
    
document.getElementById("my-form").innerHTML = newContent;

}

