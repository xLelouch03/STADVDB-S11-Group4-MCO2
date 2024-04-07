var node1Connected;
var node2Connected;
var node3Connected;

async function fetchNodeStatus() {
    try {
        // Fetch node status
        const response = await fetch('/api/nodeStatus');
        const data = await response.json();

        // Update the status of nodes
        document.getElementById("node1Status").innerText = data.node1Connected ? "Online" : "Offline";
        document.getElementById("node2Status").innerText = data.node2Connected ? "Online" : "Offline";
        document.getElementById("node3Status").innerText = data.node3Connected ? "Online" : "Offline";
    } catch (error) {
        console.error('Error fetching node status:', error);
    }
}

fetchNodeStatus();