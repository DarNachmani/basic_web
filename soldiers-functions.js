//read soldiers from local storage
const getSavedSoldiers = function(){
    const soldiersJSON = localStorage.getItem('soldiers')
    if(soldiersJSON !== null){
        return JSON.parse(soldiersJSON)
    }else{
        return []
    }
}

const saveSoldiers = function(soldiers){
    localStorage.setItem('soldiers', JSON.stringify(soldiers))
}

// remove soldier
const removeSoldier = function(id){
    const soldierIndex = soldiers.findIndex(function(soldier){
        return soldier.id === id
    })

    if(soldierIndex > -1){
        soldiers.splice(soldierIndex, 1)
    }
}

// generate the DOM structure for a soldier
const generateSoldierDOM = function(soldier){
    const soldierEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    button.textContent = 'x'
    soldierEl.appendChild(button)
    button.addEventListener('click', function(e){
        removeSoldier(soldier.id)
        saveSoldiers(soldiers)
        renderSoldiers(soldiers)
    })

    if(soldier.name.length > 0){
        textEl.textContent = `Name: ${soldier.name}, Email: ${soldier.email}, Date Of Freedom: ${soldier.days}`
    }else{
        textEl.textContent = 'Unnamed soldier'
    }
    textEl.setAttribute('href', `/add-soldier.html#${soldier.id}`)

    soldierEl.appendChild(textEl)
    return soldierEl
}

// render app soldiers
const renderSoldiers = function(soldiers){

    document.querySelector('#soldiers').innerHTML = ''

    soldiers.forEach(function(soldier){
        const soldierEl = generateSoldierDOM(soldier)
        
        document.querySelector('#soldiers').appendChild(soldierEl)
    })
}

const getDateOfFreedom = function(numOfDays){
    var someDate = new Date();
    someDate.setDate(someDate.getDate() + numOfDays);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();

    return dd + '/'+ mm + '/'+ y;
}