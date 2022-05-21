var curPetName;
var posLeft;
var posTop;
var standRight;
var standLeft;
var dragLeft;
var dragRight;
var walkLeft1;
var walkLeft2;
var walkRight1;
var walkRight2;
var jumpLeft;
var jumpRight;
var eatRight1;
var eatRight2;
var eatRight3;
var eatLeft1;
var eatLeft2;
var eatLeft3;

//set and get positionLeft
chrome.storage.sync.get('positionLeft', function(result) {
    console.log(result)
    if (result.positionLeft == undefined) {
        posLeft = '100px'
        console.log('null, but set to 100, 400' + posLeft)
    } else {
        posLeft = result.positionLeft;
        console.log('LeftValue currently is ' + result.positionLeft);
    }
    
});

//set and get positionTop
chrome.storage.sync.get('positionTop', function(result) {
    console.log(result)
    if (result.positionTop == undefined) {
        posTop = '400px'
        console.log('null, but set to 100, 400')
    } else {
        posTop = result.positionTop;
        console.log('TopValue currently is ' + result.positionTop);
    }  
});

$(document).ready(function readyHandler() {
    //set and get name
    chrome.storage.sync.get('thoname', function(result) {
        console.log(result)
        if (result.thoname == undefined) {
            curPetName = 'Ava'
            console.log('null, but set to Ava')
        } else {
            console.log('Value currently is ' + result.thoname);
            curPetName = result.thoname;
        }     
    });


    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        curPetName=request.getName;
        
        chrome.storage.sync.set({'thoname': curPetName}, function() {
            console.log('Name is set to ' + curPetName);
        });
        
        sendResponse('GET message:'+JSON.stringify("request"));
        
        $("body").parent().children("div").remove();
        $(document).off();
        readyHandler()
    });

    


    petImgConfigJSON_URL = chrome.runtime.getURL("pet-img-config.json");

    $.getJSON(petImgConfigJSON_URL, function (data) {
        standRight = chrome.runtime.getURL(data[curPetName].stand.right);
        standLeft = chrome.runtime.getURL(data[curPetName].stand.left);
        dragRight = chrome.runtime.getURL(data[curPetName].drag.right);
        dragLeft = chrome.runtime.getURL(data[curPetName].drag.left);
        walkRight1 = chrome.runtime.getURL(data[curPetName].walk.right1);
        walkRight2 = chrome.runtime.getURL(data[curPetName].walk.right2);
        walkLeft1 = chrome.runtime.getURL(data[curPetName].walk.left1);
        walkLeft2 = chrome.runtime.getURL(data[curPetName].walk.left2);
        jumpRight = chrome.runtime.getURL(data[curPetName].jump.right);
        jumpLeft = chrome.runtime.getURL(data[curPetName].jump.left);
        eatRight1 = chrome.runtime.getURL(data[curPetName].eat.right1);
        eatRight2 = chrome.runtime.getURL(data[curPetName].eat.right2);
        eatRight3 = chrome.runtime.getURL(data[curPetName].eat.right3);
        eatLeft1 = chrome.runtime.getURL(data[curPetName].eat.left1);
        eatLeft2 = chrome.runtime.getURL(data[curPetName].eat.left2);
        eatLeft3 = chrome.runtime.getURL(data[curPetName].eat.left3);
    })

    var pet = $("<div class='pet'></div>");

    var animating = false;

    // initialize pet
    $("body").parent().append(pet);
    $.getJSON(petImgConfigJSON_URL, function (data) {
        petImgURL = standRight;
        $('.pet img').remove(); 
        $('.pet').prepend($('<img>', { id: "pet-img", src: petImgURL }));
        idleActivate = false;
        document.body.style.cursor = 'url('+chrome.runtime.getURL(data[curPetName].point)+'), default'
        $('.pet').css('cursor', 'url('+chrome.runtime.getURL(data[curPetName].move)+'), auto');
    })

    
    $(".pet").css({
        //"left": "100px",
        //"top": "400px",
        "z-index": "9999",
        "position": "fixed",
        "touch-action": "none"
    });
    $(".pet").css("left", posLeft);
    $(".pet").css("top", posTop);
    

    var containx1 = window.scrollX
    var containx2 = window.scrollX + window.screen.availWidth - 128
    var containy1 = window.scrollY
    var containy2 = window.scrollY + window.screen.availHeight- 220

    var inputTarget = null;
    var finishEating = false;
    var idleActivate = false;


    Idle()
    function Idle() {
        if(idleActivate == false) {
            return;
        }
        if(animating == false) {
            animating = true;
            if(inputTarget != null && inputTarget.value != "") {
                setTimeout(function(){
                    petImgURL_beforeEat = petImgURL
                    if (petImgURL_beforeEat == standRight) {
                        petImgURL = eatRight1;
                    } else if (petImgURL_beforeEat == standLeft) {
                        petImgURL = eatLeft1;
                    }
                    $("#pet-img").attr("src", petImgURL);

                    eatInputValue(inputTarget)

                    petImgURL = petImgURL_beforeEat;
                    setTimeout(function () {
                        $("#pet-img").attr("src", petImgURL);
                    }, 200)

                    if(inputTarget.value == "") {
                        finishEating = true;
                    }

                    Idle();
                }, 1000 + Math.random()*1000);
            } else {
                if(finishEating == true) {
                    setTimeout(function(){
                        finishEating = false;
                        petImgURL_beforeJump = petImgURL;
                        if (petImgURL_beforeJump == standRight) {
                            petImgURL = jumpRight;
                            $("#pet-img").attr("src", petImgURL);
                            $(".pet").animate({top: "-=50px"}, 300);
                            $(".pet").animate({top: "+=50px"}, 200);
                        } else if (petImgURL_beforeJump == standLeft) {
                            petImgURL = jumpLeft;
                            $("#pet-img").attr("src", petImgURL);
                            $(".pet").animate({top: "-=50px"}, 300);
                            $(".pet").animate({top: "+=50px"}, 200);
                        }
                        petImgURL = petImgURL_beforeJump;
                        setTimeout(function () {
                            $("#pet-img").attr("src", petImgURL);
                            animating = false;
                        }, 500)
                        Idle();
                    }, 100);
                } else {
                    setTimeout(function(){
                        petImgURL_beforeWink = petImgURL;
                        if (petImgURL_beforeWink == standRight) {
                            petImgURL = dragRight;
                        } else if (petImgURL_beforeWink == standLeft) {
                            petImgURL = dragLeft;
                        }
                        $("#pet-img").attr("src", petImgURL);
                        petImgURL = petImgURL_beforeWink;
                        setTimeout(function () {
                            $("#pet-img").attr("src", petImgURL);
                        }, 170)
                        Idle();
                    }, 3000 + Math.random()*5000);
                }
                
            }
            animating = false;
        }
    }

    //eat
    document.body.addEventListener('input', async event => {
        inputTarget = event.target
    });

    function eatInputValue(elem) {
        // remember selection position
        const start = elem.selectionStart, end = elem.selectionEnd;
        elem.value = elem.value.slice(1);
        // restore selection position
        elem.setSelectionRange(Math.max(start - 1, 0), Math.max(end - 1, 0));
    }

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
        start: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL_beforeDrag = petImgURL;
                if (petImgURL_beforeDrag == standRight) {
                    petImgURL = dragRight;
                } else if (petImgURL_beforeDrag == standLeft) {
                    petImgURL = dragLeft;
                }
                $("#pet-img").attr("src", petImgURL);
            }, () => chrome.runtime.lastError)
        },
        stop: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL = petImgURL_beforeDrag;
                $("#pet-img").attr("src", petImgURL);
            }, () => chrome.runtime.lastError)
            containx1 = window.scrollX
            containx2 = window.scrollX + window.screen.availWidth - 128
            containy1 = window.scrollY
            containy2 = window.scrollY + window.screen.availHeight- 220
            var set2 = [containx1, containy1 , containx2, containy2];
            $(".pet").draggable( "option", "containment", set2 );

            setThePosition()
        },
        containment:[containx1, containy1 , containx2, containy2]
    }, () => chrome.runtime.lastError);

    var rightCount = true;
    var leftCount = true;
    var specialAnimation = false;

    function setThePosition() {
        posLeft = $(".pet").offset().left
        posTop = $(".pet").offset().top
        
        if (posTop > window.screen.availHeight) {
            posTop = window.screen.availHeight- 220
        }
        console.log(window.screen.availWidth)
        if (posLeft > window.screen.availWidth) {
            posLeft = window.screen.availWidth - 128
        }    

        chrome.storage.sync.set({'positionLeft': posLeft}, function() {
            console.log('posLeft is set to ' + posLeft);
        });
        chrome.storage.sync.set({'positionTop': posTop}, function() {
            console.log('posTop is set to ' + posTop);
        });
    }


    //Jump and Walk
    $(document).keydown(function(e){
        if(animating == false) {
            if(e.which == 38) {  //Up arrow
                animating = true;
                petImgURL_beforeJump = petImgURL;
                if (petImgURL_beforeJump == standRight) {
                    petImgURL = jumpRight;
                    $("#pet-img").attr("src", petImgURL);
                    $(".pet").animate({top: "-=50px"}, 300);
                    $(".pet").animate({top: "+=50px"}, 200);
                } else if (petImgURL_beforeJump == standLeft) {
                    petImgURL = jumpLeft;
                    $("#pet-img").attr("src", petImgURL);
                    $(".pet").animate({top: "-=50px"}, 300);
                    $(".pet").animate({top: "+=50px"}, 200);
                }
                petImgURL = petImgURL_beforeJump;
                setTimeout(function () {
                    $("#pet-img").attr("src", petImgURL);
                    animating = false;
                }, 500)
            } else if (e.which == 39  && $(".pet").offset().left < window.screen.availWidth - 148) {  //right arrow
                animating = true;
                petImgURL_afterWalk = standRight;
                if (rightCount == true) {
                    petImgURL = walkRight1;
                    rightCount = false;
                } else if (rightCount == false) {
                    petImgURL = walkRight2;
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
            } else if (e.which == 37 && $(".pet").offset().left > 20) {  //left arrow
                animating = true;
                petImgURL_afterWalk = standLeft;
                if (leftCount == true) {
                    petImgURL = walkLeft1;
                    leftCount = false;
                } else if (leftCount == false) {
                    petImgURL = walkLeft2;
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
            } else if (e.which == 40 && specialAnimation == false) {  //down arrow
                specialAnimation = true;
                petImgURL_beforeDrag = petImgURL;
                if (petImgURL_beforeDrag == standRight) {
                    petImgURL = dragRight;
                } else if (petImgURL_beforeDrag == standLeft) {
                    petImgURL = dragLeft;
                }
                $("#pet-img").attr("src", petImgURL);
                petImgURL = petImgURL_beforeDrag;
                setTimeout(function () {
                    $("#pet-img").attr("src", petImgURL);
                }, 170)
                if(idleActivate == false) {
                    idleActivate = true;
                    Idle()
                } else {
                    idleActivate = false;
                }
                specialAnimation = false;
            }
        }
        setThePosition()
    });

}, () => chrome.runtime.lastError);
