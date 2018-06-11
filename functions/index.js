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

exports.getHorseList = functions.https.onRequest((request, response) => {
    const horseList = [
        {
            name:'Ascenzione',
            F:'F: Zack',
            MF:'MF: Don Schufro',
            sex:'Mare',
            age:'5 years',
            img: "../images/ascenzione.jpg"
        },
        {
            name:'Captain Fleurop',
            F:'F: Captain Fire',
            MF:'MF: Fleurop',
            sex:'Gelding',
            age:'9 years',
            img: "../images/captain-fleurop.jpg"
        },
        {
            name:'Chicago',
            F:'F: Ciacomini',
            MF:'MF: Carthago',
            sex:'Gelding',
            age:'10 years',
            img: "../images/chicago.jpg"
        },
        {
            name:'Clark',
            F:'F: Consul',
            MF:'MF: Come Back II',
            sex:'Stallion',
            age:'13 years',
            img: "../images/clark.jpg"
        },
        {
            name:'Davinci',
            F:'F: Dancier',
            MF:'MF: Londontime',
            sex:'Gelding',
            age:'5 years',
            img: "../images/davinci.jpg"
        },
        {
            name:'Djamaica',
            F:'F: Damon Hill',
            MF:'MF: Sandro Hit',
            sex:'Mare',
            age:'6 years',
            img: "../images/djamaica.jpg"
        },
        {
            name:'Fascinate',
            F: 'S: Fürstenball',
            MF: 'DS: Dacaprio',
            sex:'Mare',
            age:'5 years',
            img: "../images/fascinate.jpg"
        },
        {
            name:'Fellini',
            F:'F: Ampere',
            MF:'MF: Jazz',
            sex:'Gelding',
            age:'8 years',
            img: "../images/fellini.jpg"
        },
        {
            name:'Florentina',
            F:'F: For Romance',
            MF:'MF: Sandro Hit',
            sex:'Mare',
            age:'5 years',
            img: "../images/florentina.jpg"
        },
        {
            name:'Fraulein Hansemann',
            F:'F: Floriscount',
            MF:'MF: Weltmeyer',
            sex:'Mare',
            age:'7 years',
            img: "../images/fraulein-hansemann.jpg"
        }
        
    ];

    response.json(horseList);
});