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

    if (!horseListView.hasClass('ui-listview')) {
        $.ajax({
            url: "getHorseList"
        }).done((data) => {
            console.log(data);
            for (let item of data) {
                $(`<li class="card ui-grid-a">
                <div class="ui-block-a">
                <img class="img-card" src="${item.img}">
                </div>
                <div class=" ui-block-b">
                <h2>${item.name}</h2>
                <p>${item.F} / ${item.MF}</p>
                <p>${item.sex}</p>
                <p>${item.age}</p>
                <form method="post" action="demoform.asp">
        <input type="checkbox" data-role="flipswitch" name="switch"  data-on-text="True" data-off-text="False">
        <br>
    </form>
                </div>
               </li>`).appendTo(horseListView);
            }

            horseListView.listview();
            $("input[data-role='flipswitch']").flipswitch();
        });
    }
});



