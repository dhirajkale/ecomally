(function () {
    const SCRIPT_URL = document.currentScript ? document.currentScript.src : '';
    const urlParams = new URLSearchParams(SCRIPT_URL.split('?')[1]);
    const SHOP_DOMAIN = urlParams.get('shop');

    if (!SHOP_DOMAIN) {
        console.error('Ecomally Pixel: Missing shop parameter');
        return;
    }

    const API_ENDPOINT = SCRIPT_URL.split('/pixel.js')[0] + '/track/event';

    // Helper to send events
    function sendEvent(eventName, payload = {}) {
        const data = {
            event_type: eventName,
            store_domain: SHOP_DOMAIN,
            url: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            payload: payload
        };

        // Use beacon for better reliability on page unload
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            navigator.sendBeacon(API_ENDPOINT, blob);
        } else {
            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(console.error);
        }
    }

    // Track Page View
    sendEvent('page_view');

    // Shopify Analytics API Integration
    // This listens for standard Shopify custom events if available
    window.addEventListener('load', () => {
        // Example: hooking into buttons or forms
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.action && form.action.includes('/cart/add')) {
                sendEvent('add_to_cart', { form_data: new FormData(form) });
            }
        });
    });

    // Expose global tracker
    window.Ecomally = {
        track: sendEvent
    };

})();
