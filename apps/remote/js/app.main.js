$(function () {

    $( "#dialog:ui-dialog" ).dialog( "destroy" );

	$( "#dialog-modal" ).dialog({
		height: 140,
		autoOpen: false
	});
	
	
	var $target = $('#menu ul li a');
	var viewIdx = 0;
	window.viewIdx = viewIdx;
	var len = $('#menu ul li a').length;
	
	
	
	var totWidth=0;
	var positions = new Array();
	
	$('#slides .slide').each(function(i){
		
		/* Traverse through all the slides and store their accumulative widths in totWidth */
		
		positions[i]= totWidth;
		totWidth += $(this).width();
		
		/* The positions array contains each slide's commulutative offset from the left part of the container */
		
		if(!$(this).width())
		{
			alert("Please, fill in width & height for all your images!");
			return false;
		}
		
	});
	
	$('#slides').width(totWidth);

	/* Change the cotnainer div's width to the exact width of all the slides combined */

	$('#menu ul li a').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('li.menuItem').removeClass('act').addClass('inact');
			$(this).parent().addClass('act');
			
			var pos = $(this).parent().prevAll('.menuItem').length;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			//if(!keepScroll) clearInterval(itvl);
	});
	
	$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
	/* On page load, mark the first thumbnail as active */
	
	
	
	/*****
	 *
	 *	Enabling auto-advance.
	 *
	 ****/
	 
	var current=1;


    var id = Date.now() + '' + Math.floor(Math.random() * 1000);
    var url = location.origin + '/apps/remote/control.html?id=' + id;

    // urlText
    document.getElementById('urlText').innerText = url;

    var qrcode = new QRCode("qrcode", {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });

    var database = firebase.database();

    database.ref('/app_slide/users/' + id).on('value', function (snapshot) {
        console.log(snapshot.val());
        var data = snapshot.val();

        if (data.action) {

            switch (data.action) {
                case "connect":
                    $("#qrcode").hide();
                    nextImage();
                    $("#no_qrcode").hide();
                    break;
                case "next":
                    nextImage();
                    break;
                case "prev":
                    prevImage();
                    break;
                case "show":
                    showDescribe();
                    break;
                case "close":
                    closeDescribe();
                    break;
            }
        }

    });

    database.ref('/app_slide/users/' + id).set({
        state: 'init'
    });

    function nextImage() {

        if (viewIdx < len - 1) {

            $target.eq(++viewIdx).trigger("click");

            window.viewIdx = viewIdx;

            $("#dialog-modal").dialog("close");
        } else {
            $("#warning_msg").text("마지막 그림입니다. 반대방향으로 문질러 주세요.");
            $("#warning_msg").animate({
                top: 0
            }, 500, function () {
                setTimeout(function () {
                    $("#warning_msg").animate({ top: -40 }, 500);
                }, 1500);
            });
        }
    }

    function prevImage() {

        if (viewIdx > 1) {
            $target.eq(--viewIdx).trigger("click");

            window.viewIdx = viewIdx;
            $("#dialog-modal").dialog("close");
        } else {
            $("#warning_msg").text("이전 그림이 존재하지 않습니다. 반대방향으로 문질러 주세요.");
            $("#warning_msg").animate({
                top: 0
            }, 500, function () {
                setTimeout(function () {
                    $("#warning_msg").animate({ top: -40 }, 500);
                }, 1500);
            });
        }
    }

    function showDescribe() {
        var title = [
            "이미지 슬라이드",
            "Dreams of California : 2011",
            "Delicately smooth Taste : ? ",
            "Au Naturel : 2009",
            "made with tomato : 2011",
            "VALLEJO PINK",
            "STREAMLINE",
            "TWO-TONE TERRY",
            "Chaos on the Street : 2008",
            "Recycle : 2009"
        ];
        var cts = [
            "스마트폰을 이용하여 QR코드를 인식시켜 보세요.",
            "극 사실주의 화가 : Tom Martin",
            "극 사실주의 화가 : Tom Martin",
            "극 사실주의 화가 : Tom Martin",
            "극 사실주의 화가 : Tom Martin",
            "극 사실주의 화가 : Mark Goings",
            "극 사실주의 화가 : Mark Goings",
            "극 사실주의 화가 : Mark Goings",
            "극 사실주의 화가 : Steve Mills",
            "극 사실주의 화가 : Steve Mills"
        ];


        $("#dialog-modal p").text(cts[viewIdx]);
        $("#dialog-modal").dialog("option", "title", title[viewIdx]).dialog("open");
    }

    function closeDescribe() {
        $("#dialog-modal").dialog("close");
    }

});