// Functions
let collapseNav = () => {
    if ($(".nav-expand").attr("state") === "collapsed") {
        $(".nav-expand").animate({
            height: "100%"
        })
        $(".nav-expand").attr("state", "open")
    } else {
        $(".nav-expand").animate({
            height: "0"
        })
        $(".nav-expand").attr("state", "collapsed")
    }
}

let scrollLink = function (event) {
    event.preventDefault();
    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
    }, 500);
    $(".nav-expand").animate({
        height: "0"
    })
    $(".nav-expand").attr("state", "collapsed")
}


// Scroll in animations
var $portfolioCards = $('.sliding');
var $window = $(window);

let checkIfInView = function () {
    let windowHeight = $window.height();
    let windowTopPosition = $window.scrollTop();
    let windowBottomPosition = windowTopPosition + windowHeight;

    $.each($portfolioCards, function () {
        let $card = $(this);
        var cardHeight = $card.outerHeight();
        let cardTopPosition = $card.offset().top;
        let cardBottomPosition = cardTopPosition + cardHeight;

        if (cardBottomPosition >= windowTopPosition && cardTopPosition <= windowBottomPosition) {
            $card.addClass('in-view')
        } else {
            $card.removeClass('in-view')
        }
    })
}

$window.on('scroll resize', checkIfInView);


// Document listeners
$(document).on('click', '.nav-button', collapseNav)

$(document).on('click', '.scroll-link', scrollLink)