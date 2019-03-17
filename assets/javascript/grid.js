// Functions
let collapse = () => {
    if ($(".nav-expand").attr("state") === "collapsed") {
        $(".wrapper").animate({
            marginTop: "+=2.5rem"
        })
        $(".nav-expand").animate({
            height: "100%"
        })
        $(".nav-expand").attr("state", "open")
    } else {
        $(".nav-expand").animate({
            height: "0"
        })
        $(".wrapper").animate({
            marginTop: "-=2.5rem"
        })
        $(".nav-expand").attr("state", "collapsed")
    }
}

let scroll = function (event) {
    event.preventDefault();
    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
    }, 500);
}



// Document listeners
$(document).on('click', '.nav-button', collapse)

$(document).on('click', '.scroll-link', scroll)