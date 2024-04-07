var node1Connected = true;
var node2Connected = true;
var node3Connected = false;

// Update the status of nodes
document.getElementById("node1Status").innerText = node1Connected ? "Online" : "Offline";
document.getElementById("node2Status").innerText = node2Connected ? "Online" : "Offline";
document.getElementById("node3Status").innerText = node3Connected ? "Online" : "Offline";