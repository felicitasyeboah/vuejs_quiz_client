var ws = new WebSocket("ws://localhost:8080/websocket");

ws.onopen = function () {
    alert("Connected to Cyber Chat");
};

ws.onclose = function () {
    alert("DISCONNECTED");
};

ws.onmessage = function (payload) {
    alert(payload.data);
};
