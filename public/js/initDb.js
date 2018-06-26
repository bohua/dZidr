// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

var horseList = [
    {
        name: 'Ascenzione',
        F: 'Zack',
        MF: 'Don Schufro',
        sex: 'Mare',
        age: '5 years',
        img: "../images/ascenzione.jpg"
    },
    {
        name: 'Captain Fleurop',
        F: 'Captain Fire',
        MF: 'Fleurop',
        sex: 'Gelding',
        age: '9 years',
        img: "../images/captain-fleurop.jpg"
    },
    {
        name: 'Chicago',
        F: 'Ciacomini',
        MF: 'Carthago',
        sex: 'Gelding',
        age: '10 years',
        img: "../images/chicago.jpg"
    },
    {
        name: 'Clark',
        F: 'Consul',
        MF: 'Come Back II',
        sex: 'Stallion',
        age: '13 years',
        img: "../images/clark.jpg"
    },
    {
        name: 'Davinci',
        F: 'Dancier',
        MF: 'Londontime',
        sex: 'Gelding',
        age: '5 years',
        img: "../images/davinci.jpg"
    },
    {
        name: 'Djamaica',
        F: 'Damon Hill',
        MF: 'Sandro Hit',
        sex: 'Mare',
        age: '6 years',
        img: "../images/djamaica.jpg"
    },
    {
        name: 'Fascinate',
        F: 'Fürstenball',
        MF: 'Dacaprio',
        sex: 'Mare',
        age: '5 years',
        img: "../images/fascinate.jpg"
    },
    {
        name: 'Fellini',
        F: 'Ampere',
        MF: 'Jazz',
        sex: 'Gelding',
        age: '8 years',
        img: "../images/fellini.jpg"
    },
    {
        name: 'Florentina',
        F: 'For Romance',
        MF: 'Sandro Hit',
        sex: 'Mare',
        age: '5 years',
        img: "../images/florentina.jpg"
    },
    {
        name: 'Fraulein Hansemann',
        F: 'Floriscount',
        MF: 'Weltmeyer',
        sex: 'Mare',
        age: '7 years',
        img: "../images/fraulein-hansemann.jpg"
    }
];


for(let horse of horseList){
    db.collection("horses").add(horse).then(function (docRef) {
        document.write(`<p>New horse added: ${horse.name}</p>`);
    });
}