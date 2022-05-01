
function initSocket() {
    socket = io.connect("http://localhost:3001");
    socket.on("totalWaitingCallsUpdate", (total) => {
        totalWaitingCalls=total;
    })
}
