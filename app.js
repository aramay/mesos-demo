
$( document ).ready(function() {
    console.log( "ready!" );

    //cluster domain collection, plus app running in that cluster
    var mesosDomain = [
        {
            cluster: 0,
            apps: []
        }
    ];

    var ID = mesosDomain.length;

    function addServer(event) {

        console.log(event);

        $.ajax("server_instance/_server_instance_temp.html" ,
		      {dataType: "text"}
        )
		.then(function(contents){
			$content.append(contents);
		});

        mesosDomain.push({
                    cluster: mesosDomain.length + 1, app:[]
                });

        console.log(mesosDomain);
    }//end addServer function

    function destroyServer(event) {
        event.preventDefault();

        var $removeCluster = $("#server-canvas-content").children().last();

        if ($("#server-canvas-content").children().length === 0) {
            alert("No Server Instance Running");
        }else {
            $removeCluster.remove();
        }

        //When a server is destroyed, each app running on it should be restarted elsewhere in the cluster following the algorithm above. If there is no capacity for the apps, they should be killed.

    }//end destroyServer function

    function addApp(event) {

        event.preventDefault();

        var $target = event.target;

        console.log("add app clicked");
        console.log($target);

        //1. Run on the first server running 0 apps.
        for(var cluster in mesosDomain){

            if (mesosDomain[cluster].apps.length === 0) {

                mesosDomain[cluster].apps.push($target);
                console.log("added app");


            }else {
                alert("Cluster capacity full");
            }

        }
        //2. If all servers are running at least 1 app, the new app should be started on the first server running only 1 app.

        //3. If all servers are running two apps, the app should not be started.
    }

    function updateClusterInfo() {


    }

    var $content = $("#server-canvas-content");

    $("#add-server").on("click", addServer);

    $("#destroy").on("click", destroyServer);

    $(".app-controll button").on("click", addApp);

});
