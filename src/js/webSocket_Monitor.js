/**
 * Created by Blake on 2014/5/23.
 */
/**
 * Created by Blake on 2014/4/8.
 */
function createWebSocket()
{
//    var ws = new WebSocket("ws://140.115.216.4:8080/");
//    var ws = new WebSocket("ws://140.115.156.132:30010/");
//    var ws = new WebSocket("ws://127.0.0.1:8080/");
    var ws = new WebSocket("ws://140.115.156.135:35003/");
    ws.onopen = function()
    {
        console.log("Successful Connect to : "+ws.url);
        ws.send("Hello WebSocketServer");
        updateMonitorLinkStatus(0);
    };
    ws.onmessage = function (evt)
    {
        var temp=evt.data;
        if(temp.substr(temp.indexOf("%")+1,temp.indexOf("\n")-1)=="AD_M")
        {
            var adXml=temp.substr(temp.indexOf("\n")+1);
            parseADXml(adXml);
        }
        else if(temp.substr(temp.indexOf("%")+1,temp.indexOf("%%")-1)=="MNT")
        {
            var commands=(temp.substr(temp.indexOf("\n")+1)).split("\n");
//            console.log(commands);
            var num_threads = commands.length;
            var MT = new Multithread(num_threads);
            for(var i=0;i<commands.length;i++)
            {
                parse_execute(commands[i]);

//                MT.processInt32(parse_execute(commands[i]));
//                MT.process(parse_execute,null)(commands[i]);
            }
        }
    };
    ws.onclose = function()
    {
        console.log("Successful Close Connection : "+ws.url);
        ws.sendMsg("%MNT_CL%%");
        updateMonitorLinkStatus(1);
    };
    ws.onerror = function(err)
    {
        console.error("Error: " + err);
        ws.sendMsg("%MNT_CL%%");
        updateMonitorLinkStatus(1);
    };
    ws.sendMsg= function(msg)
    {
        ws.send(msg);
    };
    websocket=ws;
    return ws;
}
function requestInfo()
{
    var requestmsg="%MNT%%";
    websocket.sendMsg(requestmsg);
//    console.log(temp);
}