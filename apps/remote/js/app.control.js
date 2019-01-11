$(function () {

    var id = location.search.split('id=')[1];
    var database = firebase.database();

    database.ref('/app_slide/users/' + id).set({
        action: 'connect',
        time: Date.now()
    });

    $("#swipeArea")
        .on("swipeleft", function () {

            database.ref('/app_slide/users/' + id).set({
                action: 'next',
                time: Date.now()
            });

            $("#closeBtn").hide();
            $("#showBtn").show();
        })
        .on("swiperight", function () {

            database.ref('/app_slide/users/' + id).set({
                action: 'prev',
                time: Date.now()
            });

            $("#closeBtn").hide();
            $("#showBtn").show();
        });

    $("#showBtn")
        .on("click", function () {

            database.ref('/app_slide/users/' + id).set({
                action: 'show',
                time: Date.now()
            });

            $(this).hide();
            $("#closeBtn").show();
        });

    $("#closeBtn")

        .on("click", function () {

            database.ref('/app_slide/users/' + id).set({
                action: 'close',
                time: Date.now()
            });

            $(this).hide();
            $("#showBtn").show();
        });

});