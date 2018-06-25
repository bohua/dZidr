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
        $.ajax({
            url: "getHorseList"
        }).done((data) => {
            console.log(data);
            for (let item of data) {
                $(`<li class="card oneHorse ui-grid-a" href="#rating?horse=${item.id}">
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
               
                </div>
               </li>`).appendTo(horseListView);
            }
            for (let item of data) {
                $(`<option>${item.F}</option>`).appendTo(pedigreeF);
                $(`<option>${item.MF}</option>`).appendTo(pedigreeMF);
            }
            horseListView.listview();
            //$("input[data-role='flipswitch']").flipswitch();
            pedigreeF.selectmenu();
            pedigreeMF.selectmenu();
            $(".oneHorse").bind("tap", tapHandler);

            function tapHandler(event) {
                $.mobile.navigate( $(this).attr( "href" ));
              
            }
        });
    }
});

$("#rating").on("pagebeforeshow", function (event) {
    let main=$("#rating-page");
    $.ajax({
        url: "getOneHorse"
    }).done((data) => {
        var item=data[0];
        var rating="";
        console.log(item);
        //console.log(data[0])
        $(`<img src="${item.img}">
        <h2>
                <span>${item.name}</span>
                <span class="rating"> ${rating} </span>
                </h2>
                <p>${item.F} / ${item.MF}</p>
                <p>${item.sex}</p>
                <p>${item.age}</p>
                <hr>
                
                `).appendTo(main);
                
        
        //$(".slider").slider();
    })

    

});





