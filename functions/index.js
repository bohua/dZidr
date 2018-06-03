const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.getSpotList = functions.https.onRequest((request, response) => {
    const spotList = [
        {
            id: 'car',
            title: "Cars",
            subtitle: "Find your favorite ride",
            img: "../images/car.png"
        },
        {
            id: 'house',
            title: "Real Estate",
            subtitle: "What about a new life in bigger house",
            img: "../images/house.png"
        },
        {
            id: 'bike',
            title: "Bikes",
            subtitle: "Get a flexible way to roll out",
            img: "../images/bike.png"
        },

        {
            id: 'travel',
            title: "Travels",
            subtitle: "Have a great trip and souvenirs",
            img: "../images/suitcase.png"
        },

        {
            id: 'motor',
            title: "Motor Bikes",
            subtitle: "Pretty cool, isn't it",
            img: "../images/motor.png"
        }
    ];

    response.json(spotList);
});

