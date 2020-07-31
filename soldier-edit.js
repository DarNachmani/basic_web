const nameEl = document.querySelector('#soldier-name')
const emailEl = document.querySelector('#new-email')
const daysEl = document.querySelector('#number-of-days')
const soldierId = location.hash.substring(1)

// let numOfSoldiersInFullIsolation = 0
let soldiers = getSavedSoldiers()
let soldier = soldiers.find(function(soldier){
    return soldier.id == soldierId
})

if(soldier === undefined){
    location.assign('/index.html')
}

nameEl.addEventListener('input', function(e){
    soldierName = validateName(e.target.value)
    if(soldierName !== undefined){
        soldier.name = soldierName
    }
})

emailEl.addEventListener('input', function(e){
    soldierEmail = validateEmail(e.target.value)
    if(soldierEmail !== undefined){
        soldier.email = soldierEmail
    }
})

daysEl.addEventListener('input', function(e){
    numOfDays = validateNumOfDays(e.target.value)
    if(numOfDays !== undefined){
        soldier.days = getDateOfFreedom(numOfDays)
    }
})

document.querySelector("#create-soldier").addEventListener("click", function(e){
    saveSoldiers(soldiers)
    location.assign("/index.html")
})

window.addEventListener('storage', function(e){
    if(e.key === 'soldiers'){
        soldiers = JSON.parse(e.newValue)
        soldier = soldiers.find(function(soldier){
            return soldier.id == soldierId
        })
        if(soldier == undefined){
            location.assign('/index.html')
        }

        nameEl.value = soldier.name
        emailEl.value = soldier.email
        daysEl.value = soldier.days
    }
})