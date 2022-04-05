
$(document).ready(function () {
    var curPetName = "noName";
    console.log("petName0: ", curPetName);
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        curPetName=request.getName;
        console.log("petName: ", curPetName);
        console.log("type:",typeof(curPetName));
        // console.log(request, sender, sendResponse);
        sendResponse('GET message：'+JSON.stringify("request"));
    });
    console.log("petName2: ", curPetName);

    var pet = $("<div class='pet'></div>");
    var noControllingPet = true;
    var curPetName = "Ava"; // pet name can be changed
    petImgConfigJSON_URL = chrome.runtime.getURL("pet-img-config.json");

    var animating = false;

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

    
    // Idle()
    
    // //wink
    // //还不知道为什么会报错，但至少可以运行  //现在不报错了？？
    // function Idle() {
    //     setTimeout(function(){
    //         $.getJSON(petImgConfigJSON_URL, function (data) {
    //             petImgURL_beforeWink = petImgURL;
    //             if (petImgURL_beforeWink == chrome.runtime.getURL(data[curPetName].stand.right)) {
    //                 petImgURL = chrome.runtime.getURL(data[curPetName].drag.right);
    //             } else if (petImgURL_beforeWink == chrome.runtime.getURL(data[curPetName].stand.left)) {
    //                 petImgURL = chrome.runtime.getURL(data[curPetName].drag.left);
    //             }
    //             $("#pet-img").attr("src", petImgURL);
    //             petImgURL = petImgURL_beforeWink;
    //             setTimeout(function () {
    //                 $("#pet-img").attr("src", petImgURL);
    //             }, 170)
    //         })
    //         Idle();
    //     }, 3000 + Math.random()*5000);
    //   }
    

    $(window).scroll(function(){
        containx1 = window.scrollX
        containx2 = window.scrollX + window.screen.availWidth - 128
        containy1 = window.scrollY
        containy2 = window.scrollY + window.screen.availHeight- 220
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

    var rightCount = true;
    var leftCount = true;


    //Jump and Walk
    $(document).keydown(function(e){
        if(animating == false) {
            //Up arrow
            //当拖动以后，animate失败，所以我先整个comment掉了
            if(e.which == 38) {
                animating = true;
                $.getJSON(petImgConfigJSON_URL, function (data) {
                    petImgURL_beforeJump = petImgURL;
                    if (petImgURL_beforeJump == chrome.runtime.getURL(data[curPetName].stand.right)) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].jump.right);
                        $("#pet-img").attr("src", petImgURL);
                        $(".pet").animate({top: "-=50px"}, 300);
                        $(".pet").animate({top: "+=50px"}, 200);
                    } else if (petImgURL_beforeJump == chrome.runtime.getURL(data[curPetName].stand.left)) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].jump.left);
                        $("#pet-img").attr("src", petImgURL);
                        $(".pet").animate({top: "-=50px"}, 300);
                        $(".pet").animate({top: "+=50px"}, 200);
                    }
                    petImgURL = petImgURL_beforeJump;
                    setTimeout(function () {
                        $("#pet-img").attr("src", petImgURL);
                        animating = false;
                    }, 500)
                })
            } else if (e.which == 39  && $(".pet").offset().left < window.screen.availWidth - 148) {  //right arrow
                animating = true;
                $.getJSON(petImgConfigJSON_URL, function (data) {
                    petImgURL_afterWalk = chrome.runtime.getURL(data[curPetName].stand.right);
                    if (rightCount == true) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].walk.right1);
                        rightCount = false;
                    } else if (rightCount == false) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].walk.right2);
                        rightCount = true;
                    }
                    
                    $("#pet-img").attr("src", petImgURL);
                    if(curPetName == "Carol" || curPetName == "Bella" ) {
                        $(".pet").animate({left: "+=10px"}, 130);
                        $(".pet").animate({left: "+=10px"}, 120);
                    } else {
                        $(".pet").animate({left: "+=10px", top: "-=10px"}, 130);
                        $(".pet").animate({left: "+=10px", top: "+=10px"}, 120);
                    }
                    
                    petImgURL = petImgURL_afterWalk;
                    setTimeout(function () {
                        $("#pet-img").attr("src", petImgURL);
                        animating = false;
                    }, 250)
                })

            } else if (e.which == 37 && $(".pet").offset().left > 20) {  //left arrow
                animating = true;
                //console.log($(".pet").offset())
                $.getJSON(petImgConfigJSON_URL, function (data) {
                    petImgURL_afterWalk = chrome.runtime.getURL(data[curPetName].stand.left);
                    if (leftCount == true) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].walk.left1);
                        leftCount = false;
                    } else if (leftCount == false) {
                        petImgURL = chrome.runtime.getURL(data[curPetName].walk.left2);
                        leftCount = true;
                    }
                    
                    $("#pet-img").attr("src", petImgURL);
                    if(curPetName == "Carol" || curPetName == "Bella" ) {
                        $(".pet").animate({left: "-=10px"}, 130);
                        $(".pet").animate({left: "-=10px"}, 120);
                    } else {
                        $(".pet").animate({left: "-=10px", top: "-=10px"}, 130);
                        $(".pet").animate({left: "-=10px", top: "+=10px"}, 120);
                    }
                    petImgURL = petImgURL_afterWalk;
                    setTimeout(function () {
                        $("#pet-img").attr("src", petImgURL);
                        animating = false;
                    }, 250)
                })

            }
        }
        
    });
    

    // pet walk around

});
