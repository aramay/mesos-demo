
$( document ).ready(function() {
    console.log( "ready!" );

    //cluster domain collection, plus app running in that cluster
    var mesosDomain = [
        {
            cluster: 1,
            apps: []
        }
    ];


    function addServer(event) {

        console.log(event);

        $.ajax("server_instance/_server_instance_tepm.html" ,
		      {dataType: "text"}
        )
		.then(function(contents){
			$content.append(contents);
		});

        mesosDomain.push({
                    cluster: mesosDomain.length + 1, app:[]
                });

        console.log(mesosDomain);
    }

    function destroyServer(event) {
        event.preventDefault();
        // console.log("destroy clicked");

        var target = event.target

        var $removeCluster = $("#server-canvas-content").children().last();

        var target = mesosDomain.length;

        $removeCluster.remove();
        // for(var cluster in mesosDomain){
        //
        //     console.log(cluster);
        //     console.log(mesosDomain[cluster]);
        //
        //     if (mesosDomain[cluster].apps.length === 0) {
        //
        //         $removeCluster.remove();
        //     }
        // }


    }

    var $content = $("#server-canvas-content");

    $("#add-server").on("click", addServer);

    $("#destroy").on("click", destroyServer);

});
