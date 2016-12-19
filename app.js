
$( document ).ready(function() {
    console.log( "ready!" );

    //cluster domain collection, plus app running in that cluster
    var mesosDomain = [
        // {
        //     cluster: 0,
        //     apps: []
        // }
    ];

    var ID = mesosDomain.length;

    function addServer(event) {

        $("#server-canvas-content").append("<div class='col-md-3'>Server Instances</div>");

        mesosDomain.push({
                    cluster: mesosDomain.length + 1, apps:[]
                });

        console.log(mesosDomain);
    }//end addServer function

    function destroyServer(event) {
        event.preventDefault();

        var $removeCluster = $("#server-canvas-content").children().last();

        var removeClusterLocation = $("#server-canvas-content").children().length - 1;

        if ($("#server-canvas-content").children().length === 0) {
            alert("No Server Instance Running");
        }

        //When a server is destroyed, each app running on it should be restarted elsewhere in the cluster following the algorithm above. If there is no capacity for the apps, they should be killed.
        else {

            if (mesosDomain[removeClusterLocation].apps.length > 0) {
            // if (mesosDomain[removeClusterLocation].apps === undefined) {

                // updateClusterApps(removeClusterLocation);
                updateClusterApps(mesosDomain[removeClusterLocation].apps.length);
            }
            $removeCluster.remove();
            mesosDomain.pop();
        }


    }//end destroyServer function

    function updateClusterApps(numOfApps) {

        console.log("numOfApps ", numOfApps);

        for(var i=0; i<numOfApps; i++){

            if (mesosDomain[i].apps.length === 0) {

                mesosDomain[i].apps.push(i);
                console.log("added app");
            }
            //2. If all servers are running at least 1 app, the new app should be started on the first server running only 1 app.
            else if (mesosDomain[i].apps.length < 2) {
                mesosDomain[i].apps.push(i);
                console.log("added where there is 1 app");
            }
            //3. If all servers are running two apps, the app should not be started.
            else {
                alert("Cluster capacity full");

                return;

            }
        }

    }


    function addApp(event) {

        event.preventDefault();

        var $target = event.target;

        console.log("add app clicked");
        console.log($target);
console.log(mesosDomain);
        if ($("#server-canvas-content").children().length === 0)  {
            alert("No CLuster present to add-app");

            return ;
        }

        //1. Run on the first server running 0 apps.
        for(var cluster in mesosDomain){

            if (mesosDomain[cluster].apps.length === 0) {

                mesosDomain[cluster].apps.push($target);
                console.log("added app");
            }
            //2. If all servers are running at least 1 app, the new app should be started on the first server running only 1 app.
            else if (mesosDomain[cluster].apps.length < 2) {
                mesosDomain[cluster].apps.push($target);
                console.log("added where there is 1 app");
            }
            //3. If all servers are running two apps, the app should not be started.
            else {
                alert("Cluster capacity full");

                return;

            }

            console.log(mesosDomain);
        }

    }


    var $content = $("#server-canvas-content");

    $("#add-server").on("click", addServer);

    $("#destroy").on("click", destroyServer);

    $(".app-controll button").on("click", addApp);

});
