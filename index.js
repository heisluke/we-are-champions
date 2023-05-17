import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-champions-c056b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementEntriesInDB = ref(database, "endorsementEntries")

const inputFieldEl = document.getElementById("endorse-input")
const addButtonEl = document.getElementById("publish-btn")
const endorsementCardsHolster = document.getElementById("endorsement-cards-holster")

addButtonEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value
    push(endorsementEntriesInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(endorsementEntriesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEntries()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        endorsementCardsHolster.innerHTML = "No items here... yet"
    }
})

function clearEntries() {
    endorsementCardsHolster.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementEntries/${itemID}`)
        console.log("omo");
        remove(exactLocationOfItemInDB)
    })
    
    endorsementCardsHolster.append(newEl)
}