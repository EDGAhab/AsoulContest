$(document).ready(function () {
    var pet = $("<div class='pet'></div>");
    var noControllingPet = true;
    curPetName = "Ava"; // pet name can be changed
    petImgConfigJSON_URL = chrome.runtime.getURL("pet-img-config.json");

    // initialize pet
    $("body").parent().append(pet);
    $.getJSON(petImgConfigJSON_URL, function (data) {
        petImgURL = chrome.runtime.getURL(data[curPetName].stand.right);
        $('.pet').prepend($('<img>', { id: "pet-img", src: petImgURL }));
    })

    $(".pet").css({
        "left": "100px",
        "top": "400px",
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none"
    });

    var containx1 = window.scrollX
    var containx2 = window.scrollX + window.screen.availWidth - 128
    var containy1 = window.scrollY
    var containy2 = window.scrollY + window.screen.availHeight- 220

    /*
    Idle()
    
    //wink
    //还不知道为什么会报错，但至少可以运行
    function Idle() {
        setTimeout(function(){
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL_beforeWink = petImgURL;
                if (petImgURL_beforeWink == chrome.runtime.getURL(data[curPetName].stand.right)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.right);
                } else if (petImgURL_beforeWink == chrome.runtime.getURL(data[curPetName].stand.left)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.left);
                }
                $("#pet-img").attr("src", petImgURL);
                petImgURL = petImgURL_beforeWink;
                setTimeout(function () {
                    $("#pet-img").attr("src", petImgURL);
                }, 170)
            })
            Idle();
        }, 3000 + Math.random()*5000);
      }
    */

    $(window).scroll(function(){
        containx1 = window.scrollX
        containx2 = window.scrollX + window.screen.availWidth - 128
        containy1 = window.scrollY
        containy2 = window.scrollY + window.screen.availHeight- 220
        console.log(containy2);
        var set1 = [containx1, containy1 , containx2, containy2];
        $(".pet").draggable( "option", "containment", set1 );
      });

    // Drag pet around
    $(".pet").draggable({
        // axis: "x", // I want it only stand on the ground
        start: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL_beforeDrag = petImgURL;
                if (petImgURL_beforeDrag == chrome.runtime.getURL(data[curPetName].stand.right)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.right);
                } else if (petImgURL_beforeDrag == chrome.runtime.getURL(data[curPetName].stand.left)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.left);
                }
                $("#pet-img").attr("src", petImgURL);
            })
        },
        stop: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL = petImgURL_beforeDrag;
                $("#pet-img").attr("src", petImgURL);
            })
            containx1 = window.scrollX
            containx2 = window.scrollX + window.screen.availWidth - 128
            containy1 = window.scrollY
            containy2 = window.scrollY + window.screen.availHeight- 220
            var set2 = [containx1, containy1 , containx2, containy2];
            $(".pet").draggable( "option", "containment", set2 );
        },
        containment:[containx1, containy1 , containx2, containy2]
    });


    //Jump
    $(document).keydown(function(e){
        //Up arrow
        //当拖动以后，animate失败，所以我先整个comment掉了
        if(e.which == 38) {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL_beforeJump = petImgURL;
                if (petImgURL_beforeJump == chrome.runtime.getURL(data[curPetName].stand.right)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].jump.right);
                    $("#pet-img").attr("src", petImgURL);
                    $(".pet").animate({bottom: "+=50px"}, 300);
                    $(".pet").animate({bottom: "-=50px"}, 200);
                } else if (petImgURL_beforeJump == chrome.runtime.getURL(data[curPetName].stand.left)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].jump.left);
                    $("#pet-img").attr("src", petImgURL);
                    $(".pet").animate({bottom: "+=50px"}, 300);
                    $(".pet").animate({bottom: "-=50px"}, 200);
                }
                petImgURL = petImgURL_beforeJump;
                setTimeout(function () {
                    $("#pet-img").attr("src", petImgURL);
                }, 500)
            })
        }
    });
    

    // pet walk around

});
