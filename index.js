import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-champions-c056b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const weAreChampionsDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("endorse-input")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementSection = document.getElementById("endorsement-cards-holster")


publishBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(weAreChampionsDB, inputValue)
    
    
    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}