const nameEl = document.querySelector('#soldier-name')
const emailEl = document.querySelector('#new-email')
const daysEl = document.querySelector('#number-of-days')

let soldiers = getSavedSoldiers()
renderSoldiers(soldiers)

document.querySelector('#create-soldier').addEventListener('click', function(e){
    soldier = {
        id: uuidv4(),
        name = nameEl,
        email = emailEl,
        days = daysEl
    }
    soldiers.push(soldier)
    saveSoldiers(soldiers)

    location.assign(`/edit.html#${soldier.id}`)
})


//read soldiers from local storage
const getSavedSoldiers = function(){
    const soldierssJSON = localStorage.getItem('soldiers')
    if(soldierssJSON !== null){
        return JSON.parse(soldiersJSON)
    }else{
        return []
    }
}

window.addEventListener('storage', function(e){
    if(e.key === 'soldiers'){
        soldiers = JSON.parse(e.newValue)
        renderSoldiers(soldiers)
    }
})

//
const saveSoldiers = function(soldiers){
    localStorage.setItem('soldiers', JSON.stringify(soldiers))
}

// remove soldier
const removeNote = function(id){
    const soldierIndex = notes.findIndex(function(soldier){
        return soldier.email === id
    })

    if(soldierIndex > -1){
        soldiers.splice(soldierIndex, 1)
    }
}

// generate the DOM structure for a soldier
const generateSoldierDOM = function(note){
    const soldierEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    button.textContent = 'x'
    soldierEl.appendChild(button)
    button.addEventListener('click', function(e){
        removeSoldier(note.id)
        saveSoldiers(notes)
        renderSoldiers(soldiers)
    })

    if(soldier.title.length > 0){
        textEl.textContent = soldier.title
    }else{
        textEl.textContent = 'Unnamed soldier'
    }
    textEl.setAttribute('href', `/edit.html#${soldier.id}`)

    soldierEl.appendChild(textEl)
    return soldierEl
}

// render app soldiers
const renderSoldiers = function(soldiers){

    document.querySelector('#soldiers').innerHTML = ''

    soldiers.forEach(function(note){
        const soldierEl = generateSoldierDOM(note)
        
        document.querySelector('#soldiers').appendChild(soldierEl)
    })
}