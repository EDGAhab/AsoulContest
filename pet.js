
function onload(pet_id) {
    $(document).ready(function () {
        var pet = $("<div class='pet'></div>");
        $("body").append(pet);
        $(".pet").prepend("<img id='pet-img' src='./images/DianaStandL.png'/>");
        $(".pet").css({
            "left": "100px",
            "bottom": "100px",
            "position": "absolute",
        });

        $(".pet").draggable();
    });
}


window.addEventListener('load', () => {
    onload(5);
});
