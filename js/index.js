function addItem() {
    var textInput = document.getElementById('text-input')
    var text = textInput.value
    text = text.trim()

    if(text == ''){
        alert('Field empty!')
        textInput.value = ''
        return
    }

    var newItem = document.createElement('li')
    newItem.innerHTML = text

    var list = document.getElementById('list')
    list.insertBefore(newItem, list.childNodes[0])
    textInput.value = ''

    newItem.onclick = function () { this.parentNode.removeChild(this) }
}