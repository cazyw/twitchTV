


function contractSwitch(id){

    console.log("in");
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 
    let height = elem.getBoundingClientRect().height; 

    if (elem.classList.contains("fullBar")) return;

    elem.classList.remove("expand");
    elem.classList.add("contract");

    //document.getElementById(id+"Text").style.visibility = "hidden";
    document.getElementById(id+"Text").classList.add("hide");
    elem.style.height = height + 'px';
    if (width <= 80) {
        let timer = setInterval(frame, 5); 
        function frame(){
            let switchWidth = elem.getBoundingClientRect().width; 
            console.log(switchWidth);
            if (switchWidth == 20) {
                clearInterval(timer);
            } else if (elem.classList.contains("expand")) {
                clearInterval(timer);
            } else {
                switchWidth--;
                elem.style.width = switchWidth + 'px';
            }
        }
    }
    
    
}

function expandSwitch(id){
    console.log("out");
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 
    let height = elem.getBoundingClientRect().height; 


    if (elem.classList.contains("fullBar")) return;

    elem.classList.remove("contract");
    elem.classList.add("expand");

    //document.getElementById(id+"Text").style.visibility = "hidden";
    elem.style.height = height + 'px';
    if (width >= 20) {
        let timer = setInterval(frame, 5);
        function frame(){
            let switchWidth = elem.getBoundingClientRect().width; 
            console.log(switchWidth);
            if (switchWidth == 80) {
                clearInterval(timer);
                document.getElementById(id+"Text").classList.remove("hide");
            } else if (elem.classList.contains("contract")) {
                clearInterval(timer);
            } else {
                switchWidth++;
                elem.style.width = switchWidth + 'px';

            }
        }
    }
}

function toggleSwitch(id) {
    console.log(`${id} clicked`);
    const elem = document.getElementById(id);
    if (elem.classList.contains("fullBar")) return;
    const wasBarID = document.getElementsByClassName("fullBar")[0].id;
    const wasBar = document.getElementById(wasBarID);
    wasBar.classList.remove("fullBar");
    contractSwitch(wasBarID);

    elem.classList.add("fullBar");
    const all = document.getElementsByClassName("result");
    const online = document.getElementsByClassName("online");
    const offline = document.getElementsByClassName("offline");

    switch(id){
        case 'all':
            [].forEach.call(all, (item) => {
                if (item.classList.contains("hide")) {
                    item.classList.remove("hide");
                }
            });
            break;
        case 'online':
            [].forEach.call(online, (item) => {
                if (item.classList.contains("hide")) {
                    item.classList.remove("hide");
                }
            });
            [].forEach.call(offline, (item) => {
                item.classList.add("hide");
            });
            break;
        case 'offline':
            [].forEach.call(offline, (item) => {
                if (item.classList.contains("hide")) {
                    item.classList.remove("hide");
                }
            });
            [].forEach.call(online, (item) => {
                item.classList.add("hide");
            });
            break;
        default:
            break;
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

        

    });
}