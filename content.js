function onload(pet_id) {
  const pet = document.createElement('div');
  const position = {
      x: 0,
      y: 0,
    };
  pet.style.left = (position.x = 100) + 'px';
  pet.style.top = (position.y = 100) + 'px';

  if (pet_id == 1) {
      pet.classList.add('ava-pet');
  } else if (pet_id == 2) {
      pet.classList.add('bella-pet');
  } else if (pet_id == 3) {
      pet.classList.add('carol-pet');
  } else if (pet_id == 4) {
      pet.classList.add('diana-pet');
  } else {
      pet.classList.add('eileen-pet');
  }

  document.body.appendChild(pet);
}

window.addEventListener('load', () => {
  onload(1);
});
