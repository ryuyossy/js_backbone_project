//hide address bar
function hideURLbar() {
    if (window.location.hash.indexOf('#') == -1) {
        window.scrollTo(0, 1);
    }
}
if (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1) {
    addEventListener("load", function() {
            setTimeout(hideURLbar, 0);
    }, false);
}

//button object data-link
$(function() {
    $(".link,.btn").live("click", function() {
        window.location = $(this).data("href");
        return false;
    });
});

//button & tab tap rollover
/*
$(function(){
	var start = "touchstart";
	var end   = "touchend";
$(".tabNav li").bind(start,function(){
		$(this).addClass("hover");
	});
$(".tavNav li").bind(end,function(){
		$(this).removeClass("hover");
	});
});
*/

//modal window
$(function(){
	$(".overlay").click(function(){
		var wn = $(this).attr("name");
		var tw = "#" + wn;
		$("body").append("<div class='modalBG'></div>");
		$(".modalBG").css({"height":$("body").innerHeight()});
		$(".modalBG").fadeTo(500, 0.7);
		$(tw + ".modalBox").fadeIn(500);
	});

	$(".modalBG,.close").click(function(){
		$(".modalBox,.modalBG").fadeOut(500, function() {
			$(".modalBG").remove();
		});
	});

	$(window).resize(function(){
		var windowW = $(".modalBox").outerHeight();
		var windowH = $(".modalBox").outerWidth();
		$(".modalbox").css({
			top: ((screen.height - windowW) / 2),
			left: ((screen.width -  windowH) / 2)
		});
	});
});

//tab panel
$(function(){
	$(".tabNav li:first button").addClass("select");
	$(".tabInner section:not(:first)").css({"display":"none"});
	$(".tabNav button").click(function(){
		var wn = $(this).attr("name");
		var tw = "#" + wn;
		if(!$(this).hasClass("select")){
			$(".tabNav button.select").removeClass("select");
			$(this).addClass("select");
			$(".tabInner section").css({"display":"none"}).filter(wn).css({"display":"block"});
		}
		return false;
	});
});

// slide menu (list)
$(function(){
	$(".slideMenu,.slideMenuList dd").css({"display":"none"});
	$("#globalHeader .slideMenuToggle").toggle(
		function(){
			$("#grandMenuHeader").addClass("select").slideDown();
		},
		function(){
			$("#grandMenuHeader").removeClass("select").slideUp();
		}
	);
	$("#globalFooter .slideMenuToggle").toggle(
		function(){
			$("#grandMenuFooter").addClass("select").slideDown();
		},
		function(){
			$("#grandMenuFooter").removeClass("select").slideUp();
		}
	);
	$(".slideMenuList dt").toggle(
		function(){
			$(".slideMenuList dd").addClass("select").slideDown();
		},
		function(){
			$(".slideMenuList dd").removeClass("select").slideUp();
		}
	);
});
