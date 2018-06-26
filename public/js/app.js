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

var currentSpot = {
    id: "F1XtT9ll8GlT98hCanNZ",
    F: "Dancier",
    MF: "Londontime",
    age: "5 years",
    img: "../images/davinci.jpg",
    name: "Davinci",
    sex: "Gelding"
};

var currentCodeList = "m6g018XblXf7duo9ghkj";

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
        loadingMask(true, '#horse-list .ui-content');

        firestore.collection("codelists").doc(currentCodeList).get().then((codeList) => {
            let horses = codeList.data().horses;
            let count = 0;

            for (let horse of horses) {
                firestore.collection("horses").doc(horse).get().then((querySnapshot) => {

                    let item = querySnapshot.data();

                    let el = $(`<li class="card ui-grid-a" data-id="${horse}">
                                    <div class="ui-block-a">
                                        <img class="img-card" src="${item.img}">
                                    </div>
                                    <div class=" ui-block-b">
                                        <h2>
                                            <span>${item.name}</span>
                                        </h2>
                                        <p>${item.F} / ${item.MF}</p>
                                        <p>${item.sex}</p>
                                        <p>${item.age}</p>
                                    </div>
                               </li>`);

                    el.appendTo(horseListView);

                    el.bind("tap", (event) => {
                        currentSpot = item;
                        currentSpot.id = horse;

                        $.mobile.navigate("#rating");
                    });

                    let rate;
                    firestore.collection("ratings").where("spot_id", "==", horse).get().then((querySnapshot) => {
                        if (querySnapshot.docs.length > 0) {
                            rate = calcAvgRating(querySnapshot.docs[0].data());
                        }

                        if (rate) {
                            el.append(`<div class="ribbon ribbon-top-right"><span>${rate}</span></div>`);
                        }
                    });

                    count++;

                    if (count >= horses.length) {
                        horseListView.listview();
                        loadingMask(false);
                    }
                });
            }
        });
    }
});

$("#rating").on("pagebeforeshow", function (event) {
    let infoPanel = $('#rating .spot-info');

    loadingMask(true, '#rating .ui-content');

    firestore.collection("ratings").where("spot_id", "==", currentSpot.id).get().then((querySnapshot) => {

        if (querySnapshot.docs.length > 0) {
            let rating = querySnapshot.docs[0].data();

            applyRatings(rating);

            loadingMask(false);
        }

        else {
            applyRatings({});

            loadingMask(false);
        }


        $('#rating .slider').off().change((event) => {
            let rate = calcAvgRating(getRatings());

            if (rate) {
                $("#rating .spot-info-rate").text(rate);
            } else {
                $("#rating .spot-info-rate").text("-.-");
            }
        });

        $("#rating .ui-content").scrollTop(0);
    });

    if (infoPanel.length > 0) {
        infoPanel.find('.spot-info-name').text(currentSpot.name);
        infoPanel.find('.spot-info-img').attr('src', currentSpot.img);
        infoPanel.find('.spot-info-F').text(currentSpot.F);
        infoPanel.find('.spot-info-MF').text(currentSpot.MF);
        infoPanel.find('.spot-info-sex').text(currentSpot.sex);
        infoPanel.find('.spot-info-age').text(currentSpot.age);
    }
});

$("#rating .save-btn").bind("tap", function (event) {
    let rating = getRatings();

    loadingMask(true, '#rating .ui-content');

    firestore.collection("ratings").where("spot_id", "==", currentSpot.id).get().then((querySnapshot) => {
        let docId;

        if (querySnapshot.docs.length > 0) {
            docId = querySnapshot.docs[0].id;

            firestore.collection("ratings").doc(docId).set(rating).then(() => {
                loadingMask(false);
                $.mobile.navigate("#horse-list");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        } else {
            firestore.collection("ratings").add(rating).then(() => {
                loadingMask(false);
                $.mobile.navigate("#horse-list");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }

        let rate = calcAvgRating(rating);
        let card = $("#horse-list .card[data-id=" + currentSpot.id + "]");
        card.find('.ribbon').remove();
        card.append(`<div class="ribbon ribbon-top-right"><span>${rate}</span></div>`);

        card = $("#personal-list .card[data-id=" + currentSpot.id + "]");
        card.find('.ribbon').remove();
        card.append(`<div class="ribbon ribbon-top-right"><span>${rate}</span></div>`);
    });
});

$("#rating .cancel-btn").bind("tap", (event) => {
    $.mobile.navigate("#horse-list");
});

$("#get-code .fetch-code-btn").bind("tap", (event) => {
    let code = $("#list-code").val();
    let error = $(".not-found-message");

    loadingMask(true, 'body');

    firestore.collection("codelists").where("code", "==", code).get().then((codelists) => {
        if (codelists.docs.length > 0) {
            currentCodeList = codelists.docs[0].id;
            $("#horse-list .horse-list").remove();
            $("#horse-list .ui-content").append("<ul class='horse-list' data-filter='true'></ul>");

            $.mobile.navigate("#horse-list");

            error.hide();
            $("#list-code").val("");
        } else {
            loadingMask(false);
            error.show();
        }
    });
});


$("#personal-list").on("pagebeforeshow", function (event) {
    let personalListView = $('.personal-list');

    if (!personalListView.hasClass('ui-listview')) {
        loadingMask(true, '#personal-list .ui-content');

        firestore.collection("ratings").get().then((ratings) => {
            var count = 0;

            ratings.forEach((doc) => {
                let rate = doc.data();

                //firestore.collection("horses").where("id", "==", rate.spot_id).get().then((horse) => {
                firestore.collection("horses").doc(rate.spot_id).get().then((horse) => {
                    let item = horse.data();

                    let el = $(`<li class="card ui-grid-a" data-id="${rate.spot_id}">
                                    <div class="ui-block-a">
                                        <img class="img-card" src="${item.img}">
                                    </div>
                                    <div class=" ui-block-b">
                                        <h2>
                                            <span>${item.name}</span>
                                        </h2>
                                        <p>${item.F} / ${item.MF}</p>
                                        <p>${item.sex}</p>
                                        <p>${item.age}</p>
                                    </div>
                               </li>`);

                    el.appendTo(personalListView);

                    el.bind("tap", (event) => {
                        currentSpot = item;
                        currentSpot.id = rate.spot_id;

                        $.mobile.navigate("#rating");
                    });

                    el.append(`<div class="ribbon ribbon-top-right"><span>${calcAvgRating(rate)}</span></div>`);


                    count++;
                    if (count >= ratings.docs.length) {
                        personalListView.listview();
                        loadingMask(false);
                    }
                });
            });
        });

    }
});

$("#compare-list").on("pagebeforeshow", function (event) {
    let compareTable = $('.compare-table-tbody');

    loadingMask(true, '#compare-list .ui-content');

    firestore.collection("ratings").get().then((ratings) => {
        var count = 0;

        ratings.forEach((doc) => {
            let rate = doc.data();

            firestore.collection("horses").doc(rate.spot_id).get().then((horse) => {
                let item = horse.data();

                let el = $(`<tr>
                                <td class="td-name">${item.name}</td>
                                <td class="td-total">${calcAvgRating(rate)}</td>  
                                <td>${rate.sex}</td>  
                                <td>${rate.age}</td>  
                                <td>${rate.pedigree}</td>  
                                <td>${rate.color}</td>  
                                <td>${rate.height}</td>  
                                <td>${rate.rideability}</td>  
                                <td>${rate.walk}</td>  
                                <td>${rate.trot}</td>  
                                <td>${rate.canter}</td>  
                             </tr>`);

                el.appendTo(compareTable);

                count++;
                if (count >= ratings.docs.length) {
                    $("#table-column-toggle").table("refresh");
                    let totals = $("#table-column-toggle td.td-total");

                    totals.each((index)=>{
                        let cell = totals[index];
                        let val = $(cell).text()/1;
                        if(val>4) $(cell).addClass('best');
                        else if(val>2) $(cell).addClass('better');
                        else $(cell).addClass('good');
                    });

                    $("#table-column-toggle").table("refresh");
                    let subs = $("#table-column-toggle td:not(.td-total):not(.td-name)");

                    subs.each((index)=>{
                        let cell = subs[index];
                        let val = $(cell).text()/1;
                        if(val>4) $(cell).addClass('best-sub');
                        else if(val>2) $(cell).addClass('better-sub');
                        else $(cell).addClass('good-sub');
                    });

                    loadingMask(false);
                }
            });
        });
    });
});

function loadingMask(switcher, container) {
    if (switcher) {
        $(container).append('<div class="dzidr-mask"><div class="loader"></div></div>');
    }

    else {
        $('.dzidr-mask').fadeOut(500, () => {
            $('.dzidr-mask').remove()
        });
    }
}

function applyRatings(rating) {
    $("#rating-sex").val(rating.sex / 1);
    $("#rating-age").val(rating.age / 1);
    $("#rating-pedigree").val(rating.pedigree / 1);
    $("#rating-color").val(rating.color / 1);
    $("#rating-height").val(rating.height / 1);
    $("#rating-rideability").val(rating.rideability / 1);
    $("#rating-walk").val(rating.walk / 1);
    $("#rating-trot").val(rating.trot / 1);
    $("#rating-canter").val(rating.canter / 1);

    $('.spot-rating .slider').slider('refresh');

    let rate = calcAvgRating(rating);
    if (rate) {
        $("#rating .spot-info-rate").text(rate);
    } else {
        $("#rating .spot-info-rate").text("-.-");
    }
}

function getRatings() {
    let sex = $("#rating-sex").val(),
        age = $("#rating-age").val(),
        pedigree = $("#rating-pedigree").val(),
        color = $("#rating-color").val(),
        height = $("#rating-height").val(),
        rideability = $("#rating-rideability").val(),
        walk = $("#rating-walk").val(),
        trot = $("#rating-trot").val(),
        canter = $("#rating-canter").val(),
        rating = {
            sex: sex,
            age: age,
            pedigree: pedigree,
            color: color,
            height: height,
            rideability: rideability,
            walk: walk,
            trot: trot,
            canter: canter,
            spot_id: currentSpot.id
        };

    return rating;

}

function calcAvgRating(rating) {
    if (!rating) return null;

    let sum = 0,
        count = 0;

    for (let r in rating) {
        if (rating[r] && r != 'spot_id') {
            let add = rating[r] / 1;

            if (add !== 0) {
                sum += add;
                count++;
            }
        }
    }

    if (count === 0) return null;
    return (sum / count).toFixed(1);
}
