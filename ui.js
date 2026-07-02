let autoPlay = false;

document.getElementById("autoBtn").addEventListener("click", () => {
    autoPlay = !autoPlay;
    document.getElementById("autoBtn").innerText =
        autoPlay ? "Auto Play: ON" : "Auto Play";
});
