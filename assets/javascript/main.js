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






// Document listeners
$(document).ready(() => {
    let fire = new Firebase()
})