document.addEventListener("DOMContentLoaded", () => {
    const defaultName = "player_stats";
    const input = document.getElementById("filename");
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", saveData);
    input.addEventListener("keypress", evt => {
        const key = evt.witch || evt.keyCode;
        if (key === 13) {
            saveData();
        }
    });

    function saveData() {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { method: "getDOM" },
                response => {
                    if (chrome.runtime.lastError) {
                        // An error occurred :(
                        console.log("ERROR: ", chrome.runtime.lastError);
                    } else {
                        const a = document.createElement("a");
                        const blob = new Blob([JSON.stringify(response.data)], {
                            type: "application/json"
                        });
                        const filename = `${input.value || defaultName}.json`;
                        const url = window.URL.createObjectURL(blob);
                        a.setAttribute("target", "_blank");
                        a.setAttribute("href", url);
                        a.setAttribute("download", filename);
                        a.click();
                    }
                }
            );
        });
    }
});
