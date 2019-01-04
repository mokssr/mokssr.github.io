if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./../service-worker.js')
            .then(reg => console.log('Service worker registered'))
            .catch(err => console.log(`error ${err}`))
    })
}

if (!('Notification' in window)) {
    console.log('Browser dont support notification')
}
Notification.requestPermission(function (status) {
    console.log('Notification status : ' + status)
})

function showNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'Task Deleted!',
                icon: 'images/notification-flat.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    {
                        action: 'explore', title: 'Go to the site',
                        // icon: 'images/checkmark.png'
                    },
                    {
                        action: 'close', title: 'Close the notification',
                        // icon: 'images/xmark.png'
                    },
                ]
            };

            reg.showNotification('ToDo Application', options)
        })
    }
}

function addItem() {
    var textInput = document.getElementById('text-input')
    var text = textInput.value
    text = text.trim()

    if (text == '') {
        alert('Field empty!')
        textInput.value = ''
        textInput.focus()
        return
    }

    var newItem = document.createElement('li')
    newItem.innerHTML = text

    var list = document.getElementById('list')
    list.insertBefore(newItem, list.childNodes[0])
    textInput.value = ''

    newItem.onclick = function () { this.parentNode.removeChild(this); showNotification() }
}