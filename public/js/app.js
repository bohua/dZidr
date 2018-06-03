$("#select-spot").on("pagebeforeshow", function (event) {
    let spotListView = $('.spot-list');

    if(!spotListView.hasClass('ui-listview')){
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