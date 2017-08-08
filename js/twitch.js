// animation that contracts the switch to only show the circle

function contractSwitch(id){
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 

    // if this switch is active, exit
    if (elem.classList.contains("fullBar")) return;

    elem.classList.remove("expand");
    elem.classList.add("contract");

    document.getElementById(id+"Text").classList.add("hide");

    // timer to contract the width of the switch to 20px
    // exit when 20px or mouseout
    if (width <= 80) {
        let timer = setInterval(frame, 5); 
        function frame(){
            if (width == 20) {
                clearInterval(timer);
            } else if (elem.classList.contains("expand")) {
                clearInterval(timer);
            } else {
                width--;
                elem.style.width = width + 'px';
            }
        }
    }
    
    
}

// animation that expands the switch to also show the switch name

function expandSwitch(id){
    let elem = document.getElementById(id);
    let width = elem.getBoundingClientRect().width; 

    // if this switch is active, exit
    if (elem.classList.contains("fullBar")) return;

    elem.classList.remove("contract");
    elem.classList.add("expand");

    // timer to expand the width of the switch to 80px
    // exit when 100px or mouseenter
    if (width >= 20) {
        let timer = setInterval(frame, 5);
        function frame(){
            if (width == 80) {
                clearInterval(timer);
                document.getElementById(id+"Text").classList.remove("hide");
            } else if (elem.classList.contains("contract")) {
                clearInterval(timer);
            } else {
                width++;
                elem.style.width = width + 'px';

            }
        }
    }
}

// toggles the results list to show all entries or only those who are
// online or offline

function toggleSwitch(id) {
    const elem = document.getElementById(id);

    // if this switch is already active, exit
    if (elem.classList.contains("fullBar")) return;

    // obtain the ID of the switch that was previously active, remove "fullBar"
    // and contract the switch
    const prevFullBarID = document.getElementsByClassName("fullBar")[0].id;
    document.getElementById(prevFullBarID).classList.remove("fullBar");
    contractSwitch(prevFullBarID);

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
                document.getElementById("loading-twitch").classList.add("hide");
            }
            $.ajax({
              dataType: 'jsonp',
              url: channelURL + stream,
              success: function(data) {
                const channelURL = data["url"];
                const game = data["game"];
                const logo = data["logo"];
                const gameHeading = data["status"].substring(0,50) + "...";


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