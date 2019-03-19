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


// Document listeners
$(document).on('click', '.nav-button', collapseNav)

$(document).on('click', '.scroll-link', scrollLink)