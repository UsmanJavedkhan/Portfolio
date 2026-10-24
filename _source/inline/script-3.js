
window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
gtag("set","linker",{"domains":["nikolaradeski.com"]});
gtag("js", new Date());
gtag("set", "developer_id.dZTNiMT", true);
gtag("config", "GT-PHRCM75D");
 window._googlesitekit = window._googlesitekit || {}; window._googlesitekit.throttledEvents = []; window._googlesitekit.gtagEvent = (name, data) => { var key = JSON.stringify( { name, data } ); if ( !! window._googlesitekit.throttledEvents[ key ] ) { return; } window._googlesitekit.throttledEvents[ key ] = true; setTimeout( () => { delete window._googlesitekit.throttledEvents[ key ]; }, 5 ); gtag( "event", name, { ...data, event_source: "site-kit" } ); }; 
//# sourceURL=google_gtagjs-js-after

