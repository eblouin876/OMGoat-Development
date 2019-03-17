// Functions
let collapseNav = () => {
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

let collapseContact = function () {
    if ($(".contact-form").attr("state") === "collapsed") {
        $(".contact-form").animate({
            height: "100%"
        })
        $(".contact-form").attr("state", "open")
    } else {
        $(".contact-form").animate({
            height: "0"
        })
        $(".contact-form").attr("state", "collapsed")
    }
}

// Document listeners
$(document).on('click', '.nav-button', collapseNav)

$(document).on('click', '.contact-button', collapseContact)

$(document).on('click', '.scroll-link', scroll)