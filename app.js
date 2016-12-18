// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    //cluster domain collection
    var mesosDomain = [];

    function addServer(event) {

        console.log(event);

        $.ajax("server_instance/_server_instance_tepm.html" ,
		      {dataType: "text"}
        )
		.then(function(contents){
			$content.append(contents);
		});

        mesosDomain.push();
    }

    function destroyServer(event) {
        event.preventDefault();
        console.log("destroy clicked");

    }

    var $content = $("#server-canvas-content");

    $("#add-server").on("click", addServer);

    $("#destroy").on("click", destroyServer);

});
