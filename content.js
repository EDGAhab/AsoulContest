window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    const pet = document.createElement('div');
    const position = {
        x: 0,
        y: 0,
      };
    pet.style.left = (position.x = 100) + 'px';
    pet.style.top = (position.y = 100) + 'px';
    pet.classList.add('asoul-pet');
    document.body.appendChild(pet);
  });