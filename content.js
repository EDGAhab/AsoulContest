function onload() {
    const pet = document.createElement('div');
    const position = {
        x: 0,
        y: 0,
      };
    pet.style.left = (position.x = 100) + 'px';
    pet.style.top = (position.y = 100) + 'px';
    pet.classList.add('carol-pet');
    document.body.appendChild(pet);
}
window.addEventListener('load', onload);