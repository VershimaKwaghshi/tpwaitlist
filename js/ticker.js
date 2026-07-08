function initialiseLiveTicker() {
    const targetContainer = document.querySelector(".hero");
    if (!targetContainer) return;

    const tickerElement = document.createElement("div");
    tickerElement.className = "ticker-container";

    const initialAssets = [
        { symbol: "BTCUSD", price: 68450.25, change: 1.45 },
        { symbol: "EURUSD", price: 1.0852, change: -0.12 },
        { symbol: "GBPUSD", price: 1.2741, change: 0.08 },
        { symbol: "XAUUSD", price: 2342.80, change: -0.54 },
        { symbol: "SPX500", price: 5432.15, change: 0.32 },
        { symbol: "ETHUSD", price: 3750.60, change: 2.11 }
    ];

    let tickerHTML = `<div class="ticker-wrap">`;
    initialAssets.forEach(asset => {
        const directionClass = asset.change >= 0 ? "price-up" : "price-down";
        const sign = asset.change >= 0 ? "+" : "";
        tickerHTML += `
            <div class="ticker-item" id="ticker-${asset.symbol}">
                <span class="symbol">${asset.symbol}</span>
                <span class="price">${asset.price.toLocaleString()}</span>
                <span class="${directionClass}">${sign}${asset.change}%</span>
            </div>
        `;
    });
    tickerHTML += `</div>`;
    tickerElement.innerHTML = tickerHTML;
    
    targetContainer.parentNode.insertBefore(tickerElement, targetContainer);

    // Simulate constant live data oscillations
    setInterval(() => {
        initialAssets.forEach(asset => {
            const item = document.getElementById(`ticker-${asset.symbol}`);
            if (!item) return;

            const variance = (Math.random() - 0.5) * (asset.price * 0.001);
            asset.price += variance;

            const priceSpan = item.querySelector(".price");
            priceSpan.textContent = asset.price.toLocaleString(undefined, {
                minimumFractionDigits: asset.price > 10 ? 2 : 4,
                maximumFractionDigits: asset.price > 10 ? 2 : 4
            });
        });
    }, 2000);
}
