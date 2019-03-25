// Firebase class to build functions and listeners
class Firebase {
    constructor() {
        this.db;
        this.stor;
        this.initDatabase()
    }
    initDatabase() {
        let config = {
            apiKey: "AIzaSyDuNNb9ZnYEqWdNrSAZu0fetPIAF6JNLWE",
            authDomain: "omgoat-development.firebaseapp.com",
            databaseURL: "https://omgoat-development.firebaseio.com",
            projectId: "omgoat-development",
            storageBucket: "omgoat-development.appspot.com",
            messagingSenderId: "987034386295"
        };
        firebase
            .initializeApp(config)
            .auth().signInAnonymously()
            .then(function () {

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        this.db = firebase.firestore()
        this.stor = firebase.storage().ref()
    }
}

// Class to store portfolio cards
class PortfolioCard {
    constructor(title, description, picture, link, github) {
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.link = link;
        this.github = github;
    }
}

// Class to build the portfolio and render it on screen
class Portfolio {
    constructor(projects) {
        this.projects = projects;
        this.buildPortfolio()
    }
    buildPortfolio() {
        let width = $(window).width()
        if (width > 1276) {
            let rowStart = 21;
            let leftCol = 3;
            let rightCol = 9;
            for (let i = 0; i < this.projects.length; i++) {
                let div;
                let link = $('<a>').attr('href', this.projects[i].link).addClass('portfolio-card-button').text(`Explore ${this.projects[i].title}`)
                let img = $('<img>').attr('src', this.projects[i].picture).attr('alt', this.projects[i].title).attr('data-github', this.projects[i].github).addClass('portfolio-modal-toggle')
                if (i % 2 !== 0) {
                    div = $('<div>')
                        .addClass('portfolio-card sliding slide-left d-none')
                        .attr('style', `grid-area:${rowStart + (3*i)} / ${leftCol} / ${rowStart + (3*i) + 5} / ${leftCol + 4}`)
                    img.addClass('portfolio-card-image-left')
                    link.attr('style', `grid-area:${rowStart + (3*i)+5} / ${leftCol} / ${rowStart + (3*i) + 6} / ${leftCol + 4}`).addClass('portfolio-card sliding slide-left d-none')
                } else {
                    div = $('<div>')
                        .addClass('portfolio-card sliding slide-right d-none')
                        .attr('style', `grid-area:${rowStart + (3*i)} / ${rightCol} / ${rowStart + (3*i) + 5} / ${rightCol + 4}`)
                    img.addClass('portfolio-card-image-right')
                    link.attr('style', `grid-area:${rowStart + (3*i)+5} / ${rightCol} / ${rowStart + (3*i) + 6} / ${rightCol + 4}`).addClass('portfolio-card sliding slide-right d-none')
                }
                $('.wrapper').append(div.append(img), link)
            }
        }
    }

}

// TODO: Add modal to card build that appears on hover over the image itself.
// Should bring focus to modal and away from background

const hangman = new PortfolioCard("Hangman", "A basic hangman game built from HTML, CSS, and JavaScript", "assets/images/hangman.png", "https://eblouin876.github.io/Word-Guess-Game/", "https://github.com/eblouin876/Word-Guess-Game")
const barkParkFinder = new PortfolioCard("Bark Park Finder", "A web application that allows users to find and check in to their local dog pars", "assets/images/barkParkFinder.jpg", "https://eblouin876.github.io/Bark-Park-Finder/", "https://github.com/eblouin876/Bark-Park-Finder")
const starWarsRPG = new PortfolioCard("Star Wars RPG", "Basic Star Wars RPG built with HTML, CSS, JavaScript, and JQuery", "assets/images/star-wars.jpg", "https://eblouin876.github.io/unit-4-game/", "https://github.com/eblouin876/unit-4-game")
const Trivia = new PortfolioCard("Trivia Game", "A basic trivia game with multiple categories of questions to choose from built off of an open source trivia API", "assets/images/trivia.jpg", "https://eblouin876.github.io/TriviaGame/", "https://github.com/eblouin876/TriviaGame")
const GifTastic = new PortfolioCard("Gif Tastic", "A simple page where you can go to generate random Gifs by subject, play and puase, and choose to download", "assets/images/gif.gif", "https://eblouin876.github.io/Gif-Tastic/", "https://github.com/eblouin876/Gif-Tastic")
const TTTMultiplayer = new PortfolioCard("Tic Tact Toe", "A multiplayer tic tac toe game that allows users to challenge anyone actively on the site. Built on firebase", "assets/images/ttt.jpg", "https://eblouin876.github.io/TTT-Multiplayer/", "https://github.com/eblouin876/TTT-Multiplayer")
let port = [barkParkFinder, starWarsRPG, Trivia, GifTastic, TTTMultiplayer]

// Function to toggle the git hub modal for portfolio cards
function showModal() {
    // targets the data-github on  the portfolio-modal-toggle class
}


$(document).ready(() => {
    // Initiate modals
    $(".iziModal").iziModal();

    // Trigger a scroll event to populate array
    $(window).trigger('scroll')

    // Initiate firebase
    let fire = new Firebase()

    // Build portfolio cards
    new Portfolio(port)


    // ScrollIn animations
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
                $card.removeClass('d-none')
            } else {
                $card.removeClass('in-view')
                $card.removeClass('d-none')
            }
        })
    }
    $window.on('scroll resize', checkIfInView);


    function submit(event) {
        event.preventDefault()
        let name = $("#contact-form")
        let email = $("#email");
        let message = $("#message");
        if (name.val() && email.val() && message.val()) {
            fire.db.collection('messages').doc().set({
                    name: name.val(),
                    email: email.val(),
                    message: message.val()
                })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            name.val("");
            email.val("");
            message.val("");
        }
    }

    $("#contact").on('submit', submit)
    $("#message").on('keyup', function (event) {
        if (event.key === "Enter") {
            submit()
        }
    })
    $(document).on('hover', '.portfolio-modal-toggle', showModal)
})