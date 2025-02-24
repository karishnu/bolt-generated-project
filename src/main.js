const player = document.querySelector('.player');
const aliensContainer = document.querySelector('.aliens');
let playerPosition = 50;
let aliens = [];
let bullets = [];

function createAliens() {
  for (let i = 0; i < 5; i++) {
    const alien = document.createElement('div');
    alien.classList.add('alien');
    alien.style.left = `${i * 60 + 20}px`;
    aliensContainer.appendChild(alien);
    aliens.push(alien);
  }
}

function movePlayer(direction) {
  if (direction === 'left' && playerPosition > 0) {
    playerPosition -= 5;
  } else if (direction === 'right' && playerPosition < 100) {
    playerPosition += 5;
  }
  player.style.left = `${playerPosition}%`;
}

function shoot() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = `${playerPosition}%`;
  bullet.style.bottom = '60px';
  document.body.appendChild(bullet);
  bullets.push(bullet);
}

function moveBullets() {
  bullets.forEach((bullet, index) => {
    const bulletBottom = parseInt(bullet.style.bottom);
    if (bulletBottom > window.innerHeight) {
      bullet.remove();
      bullets.splice(index, 1);
    } else {
      bullet.style.bottom = `${bulletBottom + 5}px`;
    }
  });
}

function gameLoop() {
  moveBullets();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    movePlayer('left');
  } else if (e.key === 'ArrowRight') {
    movePlayer('right');
  } else if (e.key === ' ') {
    shoot();
  }
});

createAliens();
gameLoop();
