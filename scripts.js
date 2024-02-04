document.addEventListener("DOMContentLoaded", function() {
    var refreshButton = document.getElementById("refreshButton");
    refreshButton.addEventListener("click", function() {
        checkServerStatus();
    });

    // Memanggil fungsi checkServerStatus() saat halaman dimuat
    setInterval(checkServerStatus, 1000);
});

function checkServerStatus() {
    var serverStatusDiv = document.getElementById("serverStatus");
    var playerStatusDiv = document.getElementById("playerStatus");
    var loader = document.getElementById("loader");

    // Menampilkan animasi loading
    loader.classList.add("active");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.mcsrvstat.us/2/play.peoplemc.xyz", true);

    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.online) {
                // Mengganti innerHTML dengan emoji centang hijau saat server online
                serverStatusDiv.innerHTML = " Server Online  <span class='status-check'>&#x2714;</span>";
                playerStatusDiv.innerHTML = response.players.online + " / " + response.players.max + " player online";
            } else {
                serverStatusDiv.innerHTML = " Server Offline  <span class='status-cross'>&#x274C;</span>";
                playerStatusDiv.innerHTML = "";
            }
        } else {
            serverStatusDiv.innerHTML = "Failed to fetch server status.";
            playerStatusDiv.innerHTML = "";
        }

        // Menyembunyikan animasi loading setelah selesai
        loader.classList.remove("active");
    };

    xhr.onerror = function() {
        serverStatusDiv.innerHTML = "Failed to fetch server status.";
        playerStatusDiv.innerHTML = "";
        // Menyembunyikan animasi loading jika terjadi kesalahan
        loader.classList.remove("active");
    };

    xhr.send();
}
