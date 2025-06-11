
const coins = ["bitcoin", "ethereum", "solana", "binancecoin", "ripple", "cardano"];
let previousPrices = {};

function fetchPrices() {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`)
    .then(res => res.json())
    .then(data => {
      const alertBox = document.getElementById("alerts");
      alertBox.innerHTML = "";
      coins.forEach(id => {
        const price = data[id].usd;
        const prev = previousPrices[id] || price;
        const change = ((price - prev) / prev) * 100;
        const div = document.createElement("div");
        div.className = "coin";

        if (change <= -3) {
          div.classList.add("buy");
          div.innerHTML = `🟢 <b>${id.toUpperCase()}</b>: $${price} → <b>BUY</b>`;
          document.getElementById("alertSound").play();
        } else if (change >= 3) {
          div.classList.add("sell");
          div.innerHTML = `🔴 <b>${id.toUpperCase()}</b>: $${price} → <b>SELL</b>`;
          document.getElementById("alertSound").play();
        } else {
          div.innerHTML = `⚪ <b>${id.toUpperCase()}</b>: $${price}`;
        }

        previousPrices[id] = price;
        alertBox.appendChild(div);
      });
    });
}

setInterval(fetchPrices, 5000);
fetchPrices();
