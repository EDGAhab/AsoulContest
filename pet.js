// document.createElement('body');

$(document).ready(function () {
    // error: $ is not defined. Pls ignore it cause this code can work.
    var pet = $("<div class='pet'></div>");
    $("body").parent().append(pet);
    petImgURL = chrome.runtime.getURL("images/DianaStandL.png");
    $('.pet').prepend($('<img>', { id:"pet-img", src: petImgURL }));
    $(".pet").css({
        "left": "100px",
        "bottom": "0px",
        "z-index": "9999",
        "position": "fixed",
    });

    // Drag pet around
    $(".pet").draggable({
        // axis: "x", // I want it only stand on the ground
        start: function() {
            $("#pet-img").attr("src", chrome.runtime.getURL("images/DianaDrag.png"));
        },
        stop: function() {
            $("#pet-img").attr("src", chrome.runtime.getURL("images/DianaStandL.png"));
            // $(".pet").css({ "bottom": "0px" }); // Want to rest it back to the ground
        }
    }); 

    
});
