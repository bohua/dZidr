// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

var horseList = [
    {
        name: 'Ascenzione',
        F: 'F: Zack',
        MF: 'MF: Don Schufro',
        sex: 'Mare',
        age: '5 years',
        img: "../images/ascenzione.jpg"
    },
    {
        name: 'Captain Fleurop',
        F: 'F: Captain Fire',
        MF: 'MF: Fleurop',
        sex: 'Gelding',
        age: '9 years',
        img: "../images/captain-fleurop.jpg"
    },
    {
        name: 'Chicago',
        F: 'F: Ciacomini',
        MF: 'MF: Carthago',
        sex: 'Gelding',
        age: '10 years',
        img: "../images/chicago.jpg"
    },
    {
        name: 'Clark',
        F: 'F: Consul',
        MF: 'MF: Come Back II',
        sex: 'Stallion',
        age: '13 years',
        img: "../images/clark.jpg"
    },
    {
        name: 'Davinci',
        F: 'F: Dancier',
        MF: 'MF: Londontime',
        sex: 'Gelding',
        age: '5 years',
        img: "../images/davinci.jpg"
    },
    {
        name: 'Djamaica',
        F: 'F: Damon Hill',
        MF: 'MF: Sandro Hit',
        sex: 'Mare',
        age: '6 years',
        img: "../images/djamaica.jpg"
    },
    {
        name: 'Fascinate',
        F: 'S: Fürstenball',
        MF: 'DS: Dacaprio',
        sex: 'Mare',
        age: '5 years',
        img: "../images/fascinate.jpg"
    },
    {
        name: 'Fellini',
        F: 'F: Ampere',
        MF: 'MF: Jazz',
        sex: 'Gelding',
        age: '8 years',
        img: "../images/fellini.jpg"
    },
    {
        name: 'Florentina',
        F: 'F: For Romance',
        MF: 'MF: Sandro Hit',
        sex: 'Mare',
        age: '5 years',
        img: "../images/florentina.jpg"
    },
    {
        name: 'Fraulein Hansemann',
        F: 'F: Floriscount',
        MF: 'MF: Weltmeyer',
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