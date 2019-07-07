export let linkFunction = () => {
    let listOfAFromDocker = document.querySelectorAll('.dock-container a');
    let listOfImageFromDocker = document.querySelectorAll('.dock-container a img');
    for (let i = 0; i < listOfAFromDocker.length; i++) {
        listOfAFromDocker[i].href = 'edit.html?src=' + listOfImageFromDocker[i].src;
    }

    let listOfAFromCenter = document.querySelectorAll('.masonry a');
    let listOfImageFromCenter = document.querySelectorAll('.masonry a img');
    for (let i = 0; i < listOfAFromCenter.length; i++) {
        listOfAFromCenter[i].href = 'edit.html?src=' + listOfImageFromCenter[i].src;
    }
};