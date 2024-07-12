// Function to copy server IP to clipboard
function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Show notification
    const notification = document.getElementById('copyNotification');
    notification.style.display = 'block';

    // Trigger animation
    notification.style.animation = 'slideIn 0.5s ease-in-out';

    setTimeout(function() {
        // Hide notification
        notification.style.animation = 'slideOut 0.5s ease-in-out';
        setTimeout(function() {
            notification.style.display = 'none';
        }, 500); // Hide after animation completes
    }, 2000); // Hide after 2 seconds
}

// Function to fetch server status
async function fetchServerStatus() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/air-usb.gl.joinmc.link');
        if (!response.ok) {
            throw new Error('Failed to fetch server status');
        }
        const data = await response.json();
        document.getElementById('uptime').textContent = data.debug.ping;
        document.getElementById('avgPing').textContent = data.ping;
        document.getElementById('currentPing').textContent = data.ping;
        document.getElementById('currentPlayers').textContent = data.players.online;
    } catch (error) {
        console.error('Error fetching server status:', error);
        document.getElementById('uptime').textContent = 'N/A';
        document.getElementById('avgPing').textContent = 'N/A';
        document.getElementById('currentPing').textContent = 'N/A';
        document.getElementById('currentPlayers').textContent = 'N/A';
    }
}

// Initial fetch when the page loads
fetchServerStatus();

// Refresh server status every 30 seconds
setInterval(fetchServerStatus, 30000);
