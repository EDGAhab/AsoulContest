function onload(pet_id) {
  const pet = document.createElement('div');
  const position = {
      x: 0,
      y: 0,
    };
  pet.style.left = (position.x = 100) + 'px';
  pet.style.top = (position.y = 600) + 'px';

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


  document.addEventListener('keydown', logKey);
  function logKey(e) {
    if(e.code == "ArrowUp") {
      animateJump()
    }
  }


  async function animateJump() {
    pet.classList.add('jump');
    jumpped = true;
    //offsetPosition(0, -30);
    await new Promise(r => setTimeout(r, 200));
    pet.classList.remove('jump');
  }


  function offsetPosition(x, y) {
    updatePosition(position.x + x, position.y + y);
  }
  function updatePosition(x, y) {
    pet.style.left = (position.x = x) + 'px';
    pet.style.top = (position.y = y) + 'px';
  }



  var active = false;

  //拖动人物
  pet.onmousedown = function(event) {
    if (active == true) {
      return;
    }
    active = true
    pet.classList.add('drag');
    function moveAt(pageX, pageY) {
      pet.style.left = pageX - pet.offsetWidth / 2 + 'px';
      pet.style.top = pageY - pet.offsetHeight / 2 + 'px';
    }
  
    // move our absolutely positioned pet under the pointer
    moveAt(event.pageX, event.pageY);
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // (2) move the pet on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // (3) drop the pet, remove unneeded handlers
    pet.onmouseup = function() {
      pet.classList.remove('drag');
      document.removeEventListener('mousemove', onMouseMove);
      //pet.onmouseup = null;
      active = false
    };
  
  };
  
}

window.addEventListener('load', () => {
  onload(4);
});
