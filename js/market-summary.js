function initialiseMarketSummary() {
    const mainLayout = document.querySelector(".waitlist");
    if (!mainLayout) return;

    const summarySection = document.createElement("section");
    summarySection.className = "market-summary-section";
    summarySection.innerHTML = `
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Market Summary</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Real-time infrastructure health and asset performance benchmarks.</p>
        <div class="market-grid" id="marketGridStage"></div>
    `;

    mainLayout.parentNode.insertBefore(summarySection, mainLayout);
    renderMarketCards();
}

function renderMarketCards() {
    const gridStage = document.getElementById("marketGridStage");
    if (!gridStage) return;

    const indicesData = [
        { name: "S&P 500 Index", symbol: "SPX", value: "5,432.15", change: "+0.32%", status: "up", points: [40, 35, 45, 30, 55, 40, 60, 50, 75, 70] },
        { name: "Crypto Market Cap", symbol: "TOTAL", value: "2.42T", change: "-1.45%", status: "down", points: [70, 65, 50, 55, 40, 45, 30, 35, 20, 25] },
        { name: "Volatility Index", symbol: "VIX", value: "12.84", change: "-2.11%", status: "down", points: [60, 55, 58, 40, 42, 30, 35, 22, 25, 18] }
    ];

    indicesData.forEach(index => {
        const statusColorClass = index.status === "up" ? "price-up" : "price-down";
        const pathClass = index.status === "up" ? "sparkline-up" : "sparkline-down";
        
        // Generate Scalable Vector Graphic Sparkline coordinates dynamically
        const width = 300;
        const height = 60;
        const totalPoints = index.points.length;
        const coordinateString = index.points.map((val, i) => {
            const x = (i / (totalPoints - 1)) * width;
            const y = height - val;
            return `${x},${y}`;
        }).join(" L ");

        const card = document.createElement("div");
        card.className = "glass-panel";
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-muted);">${index.name}</h3>
                    <span style="font-size: 12px; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; margin-top: 6px; display: inline-block;">${index.symbol}</span>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 20px; font-weight: 700;">${index.value}</div>
                    <div class="${statusColorClass}" style="font-size: 14px; font-weight: 600; margin-top: 4px;">${index.change}</div>
                </div>
            </div>
            <div class="sparkline-container">
                <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <path class="sparkline-path ${pathClass}" d="M ${coordinateString}" />
                </svg>
            </div>
        `;
        gridStage.appendChild(card);
    });
}
