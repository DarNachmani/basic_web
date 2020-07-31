let soldiers = getSavedSoldiers()


renderSoldiers(soldiers)

document.querySelector('#add-soldier').addEventListener('click', function(e){
    now = moment().valueOf()
    soldier = {
        id: uuidv4(),
        name: '',
        email: '',
        days: now
    }
    soldiers.push(soldier)
    saveSoldiers(soldiers)

    location.assign(`/add-soldier.html#${soldier.id}`)
})