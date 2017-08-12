function getTwitchStreams() {
    const streamURL = "https://wind-bow.gomix.me/twitch-api/streams/";
    const channelURL = "https://wind-bow.gomix.me/twitch-api/channels/";
    const streamers = ["ESL_SC2", "OgamingSC2", "hexsteph", "bajostream", "screenplayau", "freecodecamp", "nichboy", "noopkat", "stockstream", "RobotCaleb", "noobs2ninjas"];

    streamers.forEach((stream, index) => {
        let streamStatus = "";

        // STREAM INFO
        $.ajax({
          dataType: 'jsonp',
          url: streamURL + stream,
          success: function(data) {
            streamOnOff = data["stream"];
            if (streamOnOff === "null" || streamOnOff === null){
                console.log("the streamer ", stream, " is offline");
                streamStatus = "offline";
            }

            else {
                console.log("the streamer ", stream, " is online");
                streamStatus = "online";
            }
            
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("hmmm there was an error"); 
            }
        }).then(() => {

            // CHANNEL INFO
            if (index === 0){
                $("#loading-twitch").fadeOut();
            }

            $.ajax({
              dataType: 'jsonp',
              url: channelURL + stream,
              success: function(data) {
                const channelURL = data["url"];
                const game = data["game"];
                const logo = data["logo"];
                let gameDescription = data["status"];
                
                if (gameDescription.length > 50) {
                    gameDescription = gameDescription.substring(0,50) + "...";
                }


                let result = "";
                result += `<a href=\"${channelURL}\" target=\"_blank\">`;
                result += `<li class=\"${streamStatus}\">`;
                result += `<img class=\"imglogo\" src=\"${logo}\">`;
                result += `<div class=\"streamer\">${stream}</div>`;

                if(streamStatus === "offline") {
                    result += "<div>offline</div>";
                } else {
                    result += "<div class=\"gameDetails\"><p class=\"gameName\">" + game + "</p>";
                    result += "<p class=\"gameDescription\">" + gameDescription + "</p></div>";   
                }

                result += `</li>`;
                result += `</a>`;

                $(".results").append(result);    

                }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("hmmm there was an error"); 
                }
            }); // end ajax channel
        }); // ends then
    }); // ends foreach
} // ends function

function toggleSwitches (hitSwitch, offSwitch){
    $(".switches li").removeClass("selected");
    $(".switches span").removeClass("switchTextOn").addClass("switchText");
    $(`#${hitSwitch}`).addClass("selected");
    $(`#${hitSwitch} span`).removeClass("switchText").addClass("switchTextOn");

    switch(hitSwitch){
        case 'all':
            $(".online").fadeIn(500);
            $(".offline").fadeIn(500);
            break;
        default:
            $(`.${hitSwitch}`).fadeIn(500);
            $(`.${offSwitch}`).fadeOut(500);
            break;
    }
}


$(".switch").on("click", function(){
    let thisID = this.id;

    if ($(this).hasClass("selected")) return;

    switch (thisID){
        case 'all':
            console.log("selected all");
            toggleSwitches("all", "all");
            break;
        case 'online':
            console.log("selected online");
            toggleSwitches("online", "offline");
            break;
        case 'offline':
            console.log("selected offline");
            toggleSwitches("offline", "online");
            break;
        default:
            console.log("no selection");
            break;
    }

});



$(document).ready(function() {
    console.log("ready");
    getTwitchStreams();
});