// document.createElement('body');

$(document).ready(function () {
    // error: $ is not defined. Pls ignore it cause this code can work.
    var pet = $("<div class='pet'></div>");
    $("body").parent().append(pet);
    petImgURL = chrome.runtime.getURL("images/DianaStandL.png");
    $('.pet').prepend($('<img>', { src: petImgURL }));
    $(".pet").css({
        "left": "100px",
        "bottom": "100px",
        "position": "absolute",
    });

    $(".pet").draggable(); // Drag pet around
});
