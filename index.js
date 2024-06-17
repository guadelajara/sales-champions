import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-503ca-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputField = document.getElementById("input-field")
const btn = document.getElementById("btn")
const endorsementsList = document.getElementById("endorsements-list")


btn.addEventListener("click", function() {

    let inputValue = inputField.value

    push(endorsementsInDB, inputValue)

    clearInputField()

})


onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndoresmentsList()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsList(currentItem)
        }    
    } else {
        endorsementsList.innerHTML = "No items here... yet"
    }
})




function clearInputField() {

    inputField.value = ""

}

function clearEndoresmentsList () {

    endorsementsList.textContent = ""

}

function appendItemToEndorsementsList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")

    
    newEl.textContent = itemValue

    endorsementsList.append(newEl)
}