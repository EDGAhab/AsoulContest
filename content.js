function onload(pet_id) {
    const pet = document.createElement('div');
    const position = {
        x: 0,
        y: 0,
      };
    pet.style.left = (position.x = 100) + 'px';
    pet.style.top = (position.y = 100) + 'px';
    pet.classList.add('bella-pet');
    document.body.appendChild(pet);
}
window.addEventListener('load', onload);