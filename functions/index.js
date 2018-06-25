const functions = require('firebase-functions');
const horseList = [
    {
        id: 1,
        name: 'Ascenzione',
        F: 'F: Zack',
        MF: 'MF: Don Schufro',
        sex: 'Mare',
        age: '5 years',
        img: "../images/ascenzione.jpg"
    }, {
        id: 2,
        name: 'Captain Fleurop',
        F: 'F: Captain Fire',
        MF: 'MF: Fleurop',
        sex: 'Gelding',
        age: '9 years',
        img: "../images/captain-fleurop.jpg"
    }, {
        id: 3,
        name: 'Chicago',
        F: 'F: Ciacomini',
        MF: 'MF: Carthago',
        sex: 'Gelding',
        age: '10 years',
        img: "../images/chicago.jpg"
    }, {
        id: 4,
        name: 'Clark',
        F: 'F: Consul',
        MF: 'MF: Come Back II',
        sex: 'Stallion',
        age: '13 years',
        img: "../images/clark.jpg"
    }, {
        id: 5,
        name: 'Davinci',
        F: 'F: Dancier',
        MF: 'MF: Londontime',
        sex: 'Gelding',
        age: '5 years',
        img: "../images/davinci.jpg"
    }, {
        id: 6,
        name: 'Djamaica',
        F: 'F: Damon Hill',
        MF: 'MF: Sandro Hit',
        sex: 'Mare',
        age: '6 years',
        img: "../images/djamaica.jpg"
    }, {
        id: 7,
        name: 'Fascinate',
        F: 'S: Fürstenball',
        MF: 'DS: Dacaprio',
        sex: 'Mare',
        age: '5 years',
        img: "../images/fascinate.jpg"
    }, {
        id: 8,
        name: 'Fellini',
        F: 'F: Ampere',
        MF: 'MF: Jazz',
        sex: 'Gelding',
        age: '8 years',
        img: "../images/fellini.jpg"
    }, {
        id: 9,
        name: 'Florentina',
        F: 'F: For Romance',
        MF: 'MF: Sandro Hit',
        sex: 'Mare',
        age: '5 years',
        img: "../images/florentina.jpg"
    }, {
        id: 10,
        name: 'Fraulein Hansemann',
        F: 'F: Floriscount',
        MF: 'MF: Weltmeyer',
        sex: 'Mare',
        age: '7 years',
        img: "../images/fraulein-hansemann.jpg"
    }

];

// // Create and Deploy Your First Cloud Functions //
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getSpotList = functions
    .https
    .onRequest((request, response) => {
        const spotList = [
            {
                id: 'car',
                title: "Cars",
                subtitle: "Find your favorite ride",
                img: "../images/car.png"
            }, {
                id: 'house',
                title: "Real Estate",
                subtitle: "What about a new life in bigger house",
                img: "../images/house.png"
            }, {
                id: 'bike',
                title: "Bikes",
                subtitle: "Get a flexible way to roll out",
                img: "../images/bike.png"
            }, {
                id: 'travel',
                title: "Travels",
                subtitle: "Have a great trip and souvenirs",
                img: "../images/suitcase.png"
            }, {
                id: 'motor',
                title: "Motor Bikes",
                subtitle: "Pretty cool, isn't it",
                img: "../images/motor.png"
            }
        ];

        response.json(spotList);
    });

exports.getHorseList = functions
    .https
    .onRequest((request, response) => {
        response.json(horseList);
    });

exports.getOneHorse = functions.https.onRequest((request, response)=>{
    response.json([{
        id: 10,
        name: 'Fraulein Hansemann',
        F: 'F: Floriscount',
        MF: 'MF: Weltmeyer',
        sex: 'Mare',
        age: '7 years',
        img: "../images/fraulein-hansemann.jpg"
    }])
})

    