//Registering the Service Worker
if ("serviceWorker" in navigator) {
    navigator.ServiceWorker.register("js/sw.js").catch(function(err) {
      console.error(err);
    });
  };
  