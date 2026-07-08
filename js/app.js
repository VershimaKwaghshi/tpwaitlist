document.addEventListener("DOMContentLoaded", () => {
    // UI Layout Initialisation
    initialiseNavbar();
    initialiseHero();
    initialiseButtons();
    initialiseAnimations();
    
    // TradingView-Inspired Live Ecosystem
    initialiseLiveTicker();
    initialiseMarketSummary();
    
    // Interactive Infrastructure Elements
    initialiseChart3D();
    initialiseWaitlist();
    initialiseReferral();
    
    // Backend Pipeline Tasks
    checkSession();
    updateWaitlistCounter();
    createLiveStatus();
});
