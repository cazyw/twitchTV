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
            // if (index === 0){
            //     document.getElementById("loading-twitch").classList.add("hide");
            // }
            $.ajax({
              dataType: 'jsonp',
              url: channelURL + stream,
              success: function(data) {
                const channelURL = data["url"];
                const game = data["game"];
                const logo = data["logo"];
                let gameHeading = data["status"];
                if (gameHeading.length > 50) {
                    gameHeading = gameHeading.substring(0,50) + "...";
                }


                let result = "";
                result += `<a href=\"${channelURL}\" target=\"_blank\">`;
                result += `<li class=\"${streamStatus}\"><span><img class=\"imglogo\" src=\"${logo}\"></span><span>${stream}</span>`

                if(streamStatus === "offline") {
                    result += "<span>offline</span>";
                } else {
                    result += "<span><div class=\"streamDetails\">" + game + "</div>";
                    result += "<div class=\"gameHeading\">" + gameHeading + "</div></span>";   
                }

                result += `</li>`;
                result += `</a>`;

                $(".results").append(result);    

                // let result = "";
                // result += "<a href=\"" + channelURL + "\" target=\"_blank\">";
                // result += "<div id=\"" + stream + "\" class=\"result " + streamStatus + "\">";
                // result += "<div class=\"logo\"><img class=\"imglogo\" src=\"" + logo + "\" /></div>";
                // result += "<div class=\"streamer\">" + stream + "</div>";

                // if(streamStatus === "offline") {
                //     result += "offline";
                // } else {
                //     result += "<div class=\"streamDetails\">" + game + "<br />";
                //     result += "<span class=\"gameHeading\">" + gameHeading + "</span></div>";   
                // }
                        
                // result += "</div></a>";
                // document.getElementById("results").innerHTML += result;
                                
                }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("hmmm there was an error"); 
                }
            });
        });

    });
}


$(document).ready(function() {
    console.log("ready");
    getTwitchStreams();
});