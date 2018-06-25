// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZ_sO2xunjRfsAjizC00YL-cmzyNH7ySY",
    authDomain: "spot-2c63e.firebaseapp.com",
    databaseURL: "https://spot-2c63e.firebaseio.com",
    projectId: "spot-2c63e",
    storageBucket: "spot-2c63e.appspot.com",
    messagingSenderId: "47936778003"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

$("#select-spot").on("pagebeforeshow", function (event) {
    let spotListView = $('.spot-list');

    if (!spotListView.hasClass('ui-listview')) {
        $.ajax({
            url: "getSpotList"
        }).done((data) => {
            console.log(data);


            for (let item of data) {
                $(`<li>
                    <a href="#spot-list?spot=${item.id}">
                    <img src="${item.img}">
                    <h2>${item.title}</h2>
                    <p>${item.subtitle}</p>
                    </a>
               </li>`).appendTo(spotListView);
            }

            spotListView.listview();
        });
    }


});

$("#horse-list").on("pagebeforeshow", function (event) {
    let horseListView = $('.horse-list');
    let pedigreeF = $('#pedigree-F');
    let pedigreeMF = $('#pedigree-MF');

    if (!horseListView.hasClass('ui-listview')) {
        loadingMask('#horse-list .ui-content', true);

        firestore.collection("horses").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let item = doc.data();

                $(`<li class="card ui-grid-a">
                <div class="ui-block-a">
                <img class="img-card" src="${item.img}">
                </div>
                <div class=" ui-block-b">
                <h2>
                <span>${item.name}</span>
                <span class="rating"> 5.0 </span>
                </h2>
                <p>${item.F} / ${item.MF}</p>
                <p>${item.sex}</p>
                <p>${item.age}</p>
                <form method="post" action="demoform.asp">
                    <input type="checkbox" data-role="flipswitch" name="switch"  data-on-text="True" data-off-text="False">
                    <br>
                </form>
                </div>
               </li>`).appendTo(horseListView);
            });

            horseListView.listview();
            $("input[data-role='flipswitch']").flipswitch();

            loadingMask('#horse-list .ui-content', false);
        });

        // $.ajax({
        //     url: "getHorseList"
        // }).done((data) => {
        //     console.log(data);
        //     for (let item of data) {
        //         $(`<li class="card ui-grid-a">
        //         <div class="ui-block-a">
        //         <img class="img-card" src="${item.img}">
        //         </div>
        //         <div class=" ui-block-b">
        //         <h2>${item.name}</h2>
        //         <p>${item.F} / ${item.MF}</p>
        //         <p>${item.sex}</p>
        //         <p>${item.age}</p>
        //         <form method="post" action="demoform.asp">
        //             <input type="checkbox" data-role="flipswitch" name="switch"  data-on-text="True" data-off-text="False">
        //             <br>
        //         </form>
        //         </div>
        //        </li>`).appendTo(horseListView);
        //     }
        //
        //     horseListView.listview();
        //     $("input[data-role='flipswitch']").flipswitch();
        // });
    }
});

function loadingMask(container, switcher){
    if(switcher){
        $(container).append('<div class="dzidr-mask"><div class="loader"></div></div>');
    }

    else {
        $('.dzidr-mask').remove();
    }
}

