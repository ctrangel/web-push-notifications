const client = (() => {
    let serviceWorker = undefined;
    const notificationButton = document.getElementById('btn-notify');

    const showNotificationButton = () => {
        notificationButton.style.display = "block";
        notificationButton.addEventListener('click', showNotification);
    }

    const showNotification = () => {
        // console.log("button clicked");
        const simpleTextNotifications = reg => reg.showNotification("first notification");

        const customizedNotifications = reg => {
            const options = {
                body: "Spring Semester is done",
                icon: "/imgs/notification_icon.png",
            
             actions:[
                {action: "search", title: "Search PPU"},
                {action: "close", title: "Nevermind"},
            ],
            data: {
                notificationTime: Date.now(),
                githubuser: 'ctrangel'
            }
            // options.actions = actions;
        }
            reg.showNotification("Second Notifications", options);
        }
        navigator.serviceWorker.getRegistration()
        .then(registration => customizedNotifications(registration));

    }

    const checkNotificationSupport = () => {
       
        if (!('Notification' in window)) {
          return Promise.reject("This browser does not support notifications");
        }
        console.log("the browser support notifications")
        return Promise.resolve("ok");
    }
   
    const registerServiceWorker = () => {
        if (!('serviceWorker') in navigator) {
            return Promise.reject("service worker is not available");
        }
        return  navigator.serviceWorker.register('service-worker.js')
        .then(regObj => {
            console.log('service worker is registered successfully');
            serviceWorkerRegObj = regObj;
            showNotificationButton();
        })
        
    }

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Notifications Permission Status: ", status)
        })
        
        
    }


    checkNotificationSupport()
      .then(registerServiceWorker)
      .then(requestNotificationPermissions)
      .catch((err) => console.error(err));


})();