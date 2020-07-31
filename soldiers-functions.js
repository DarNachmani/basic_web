//read soldiers from local storage
const getSavedSoldiers = function(){
    const soldiersJSON = localStorage.getItem('soldiers')
    if(soldiersJSON !== "null"){
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

const validateNumOfDays = function(numOfDays){
    var message;
    message = document.getElementById("p3");
    message.innerHTML = "";
    try { 
        x = Number(numOfDays);
        if(numOfDays == "")  throw "empty";
        else if(isNaN(numOfDays)) throw "not a number";
        else if(x < 0)  throw "invalid number";
        else if(x > 14)   throw "too high";
        else{
            document.querySelector("#create-soldier").disabled = false
            return numOfDays
        }
    }
    catch(err) {
        message.innerHTML = "Input is " + err;
        document.querySelector("#create-soldier").disabled = true
        return undefined
    }
}

const validateName = function(name){
    var message;
    message = document.getElementById("p1");
    message.innerHTML = "";
    try { 
        x = Number(name);
        var hasNumber = /\d/
        if(name == "")  throw "empty";
        else if(!isNaN(name)) throw "a number";
        else if(hasNumber.test(name)) throw "not a pure string"
        else{
            document.querySelector("#create-soldier").disabled = false
            return name
        }
    }
    catch(err) {
        message.innerHTML = "Input is " + err;
        document.querySelector("#create-soldier").disabled = true
        return undefined
    }
}

const validateEmail = function(email){
    var message
    message = document.getElementById("p2");
    message.innerHTML = "";
    try{
        isNumber = isNaN(email)
        if(email == "") throw "empty"
        else if(!email.includes('@')) throw "invalid"
        else if(!email.includes('.')) throw "invalid"
        else if(!isNaN(email)) throw "a number"
        else if(email.length < 5) throw "invalid"
        else{
            document.querySelector("#create-soldier").disabled = false
            return email
        }
    }
    catch(err){
        message.innerHTML = "Input is " + err;
        document.querySelector("#create-soldier").disabled = true
        return undefined
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
    var someDate
    someDate = new Date()
    someDate.setDate(someDate.getDate() + Number(numOfDays));
    debugger
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();

    return dd + '/'+ mm + '/'+ y;
}