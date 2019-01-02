if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
            .register('./../service-worker.js')
            .then(reg=> console.log('Service worker registered'))
            .catch(err=> console.log(`error ${err}`))
    })
}


function addItem() {
    var textInput = document.getElementById('text-input')
    var text = textInput.value
    text = text.trim()

    if(text == ''){
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

    newItem.onclick = function () { this.parentNode.removeChild(this) }
}