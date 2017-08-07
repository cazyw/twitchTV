// function myMove() {
//     var elem = document.getElementById("animate"); 
//     var pos = 0;
//     var id = setInterval(frame, 5);
//     function frame() {
//         if (pos == 350) {
//             clearInterval(id);
//         } else {
//             pos++; 
//             elem.style.top = pos + 'px'; 
//             elem.style.left = pos + 'px'; 
//         }
//     }
// }

function slideIn(id){
    console.log("in");
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 
    let height = elem.getBoundingClientRect().height; 
    let startPoint = elem.getBoundingClientRect().left;

    //document.getElementById(id+"Text").style.visibility = "hidden";
    document.getElementById(id+"Text").classList.add("hide");
    elem.style.height = height + 'px';
    if (width == 100) {
        let timer = setInterval(frame, 5); 
        function frame(){
            let switchWidth = elem.getBoundingClientRect().width; 
            console.log(switchWidth, " + ", startPoint);
            if (switchWidth == 20) {
                clearInterval(timer);
            } else {
                switchWidth--;
                startPoint++;
                elem.style.width = switchWidth + 'px';
               // elem.style.left = startPoint + 'px';
            }
        }
    }
    
    
}

function slideOut(id){
    console.log("out");
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 
    let height = elem.getBoundingClientRect().height; 
    let startPoint = elem.getBoundingClientRect().left;

    //document.getElementById(id+"Text").style.visibility = "hidden";
    elem.style.height = height + 'px';
    if (width == 20) {
        let timer = setInterval(frame, 5);
        function frame(){
            let switchWidth = elem.getBoundingClientRect().width; 
            console.log(switchWidth, " + ", startPoint);
            if (switchWidth == 100) {
                clearInterval(timer);
                document.getElementById(id+"Text").classList.remove("hide");
            } else {
                switchWidth++;
                startPoint--;
                elem.style.width = switchWidth + 'px';
               // elem.style.left = startPoint + 'px';
            }
        }
    }
    
    
}

function getTwitchStreams() {
    const streamURL = "https://wind-bow.gomix.me/twitch-api/streams/";
    const channelURL = "https://wind-bow.gomix.me/twitch-api/channels/";
    const streamers = ["ESL_SC2", "OgamingSC2", "hexsteph", "bajostream", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

    streamers.forEach((stream, index) => {
        console.log("index", index);
        let streamStatus = "";

        // STREAM INFO

        $.ajax({
          dataType: 'jsonp',
          url: streamURL + stream,
          success: function(data) {
            //console.log(data);
            streamOnOff = data["stream"];
            if (streamOnOff === "null" || streamOnOff === null){
                console.log("the streamer ", stream, " is offline");
                streamStatus = "offline";
                //document.getElementById(stream).getElementsByClassName("streamDetails")[0].innerHTML = "offline";
            }

            else {
                console.log("the streamer ", stream, " is online");
                streamStatus = "online";
                //document.getElementById(stream).classList.remove("offline");
                //document.getElementById(stream).classList.add("online");
            }
            
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("hmmm there was an error"); 
            }
        }).then(() => {
            // CHANNEL INFO
            if (index === 0){
                document.getElementById("loading-twitch").classList.add("hide");
            }
            $.ajax({
              dataType: 'jsonp',
              url: channelURL + stream,
              success: function(data) {
                //console.log(data);
                const channelURL = data["url"];
                const game = data["game"];
                const gameHeading = data["status"];
                const logo = data["logo"];
                //console.log("channel:", channelURL, " game: ", game, " sub heading: ", gameHeading);
                //console.log("logo:", logo);

                let result = "";
                result += "<a href=\"" + channelURL + "\" target=\"_blank\">";
                result += "<div id=\"" + stream + "\" class=\"result " + streamStatus + "\">";
                result += "<div class=\"logo\"><img class=\"imglogo\" src=\"" + logo + "\" /></div>";
                result += "<div class=\"streamer\">" + stream + "</div>";
                if(streamStatus === "offline") {
                    result += "offline";
                } else {
                    result += "<div class=\"streamDetails\">" + game + "<br />";
                    result += "<span class=\"gameHeading\">" + gameHeading + "</span></div>";   
                }
                        
                result += "</div></a>";
                
                document.getElementById("results").innerHTML += result;
                
                
                }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("hmmm there was an error"); 
                }
            });
        });

        

        // // STREAM INFO

        // $.ajax({
        //   dataType: 'jsonp',
        //   url: streamURL + stream,
        //   success: function(data) {
        //     //console.log(data);
        //     const streamStatus = data["stream"];
        //     if (streamStatus === "null" || streamStatus === null){
        //         console.log("the streamer ", stream, " is offline");
        //         document.getElementById(stream).getElementsByClassName("streamDetails")[0].innerHTML = "offline";
        //     }

        //     else {
        //         console.log("the streamer ", stream, " is online");
        //         document.getElementById(stream).classList.remove("offline");
        //         document.getElementById(stream).classList.add("online");
        //     }
            
        //     }, error: function(XMLHttpRequest, textStatus, errorThrown) {
        //         console.log("hmmm there was an error"); 
        //     }
        // });

    });
}