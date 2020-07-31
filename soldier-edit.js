const nameEl = document.querySelector('#soldier-name')
const emailEl = document.querySelector('#new-email')
const daysEl = document.querySelector('#number-of-days')
const soldierId = location.hash.substring(1)

let soldiers = getSavedSoldiers()
let soldier = soldiers.find(function(soldier){
    return soldier.id == soldierId
})

if(soldier === undefined){
    location.assign('/index.html')
}

nameEl.addEventListener('input', function(e){
    soldier.name = e.target.value
    saveNotes(notes)
})

emailEl.addEventListener('input', function(e){
    soldier.email = e.target.value
    saveSoldiers(soldiers)
})

daysEl.addEventListener('input', function(e){
    soldier.days = getDateOfFreedom(e.target.value)
    saveNotes(notes)
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