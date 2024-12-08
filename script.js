document.addEventListener('DOMContentLoaded', () => {
    let secondsvalue = 1000; // Default to 1 second
    const seconds = document.getElementById("secondsInput");
    
    seconds.addEventListener('input', (e) => {
        const inputValue = e.target.value.trim(); // Remove whitespace
        
        // Validate input
        if (inputValue === "" || isNaN(Number(inputValue)) || Number(inputValue) <= 0) {
            alert("Please enter a valid positive number");
            e.target.value = ""; // Clear invalid input
            secondsvalue = 1000; // Reset to default
        } else {
            // Convert to milliseconds
            secondsvalue = Number(inputValue) * 1000;
        }
    });

    let reloadbool = false;
    let reloadInterval;
    const toggleButton = document.getElementById("toggleReload");
    
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            reloadbool = !reloadbool;
            
            if (reloadbool) {
                toggleButton.innerText = "Stop Auto-Reload";
                reloadInterval = setInterval(() => {
                    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                        if (tabs[0]) {
                            chrome.tabs.reload(tabs[0].id);
                        }
                    });
                }, secondsvalue);
            } else {
                toggleButton.innerText = "Start Auto-Reload";
                clearInterval(reloadInterval);
            }
        });
    }
});