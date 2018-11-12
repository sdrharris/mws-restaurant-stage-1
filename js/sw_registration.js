//Registering the Service Worker
if ("serviceWorker" in navigator) {
    navigator.ServiceWorker.register("/s.w.js")
    .then(function() {
      console.error('Registration worked!');
    })
    .catch(function() {
        console.log('Registration failed!');
    });
  }
  