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

        if (document.getElementById("node1Status").innerText === "Online") {
            document.getElementById("node1Status").classList.add("text-success");
        } else {
            document.getElementById("node1Status").classList.add("text-danger");
        }

        if (document.getElementById("node2Status").innerText === "Online") {
            document.getElementById("node2Status").classList.add("text-success");
        } else {
            document.getElementById("node2Status").classList.add("text-danger");
        }

        if (document.getElementById("node3Status").innerText === "Online") {
            document.getElementById("node3Status").classList.add("text-success");
        } else {
            document.getElementById("node3Status").classList.add("text-danger");
        }
        
    } catch (error) {
        console.error('Error fetching node status:', error);
    }
}

fetchNodeStatus();