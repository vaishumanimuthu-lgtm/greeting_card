(() => {
  let current = 1;
  let timer = null;
  const screens = [...document.querySelectorAll('.screen')];
  const progress = document.getElementById('progress');

  function show(n) {
    clearInterval(timer);
    timer = null;
    screens.forEach(s => s.classList.toggle('active', s.dataset.screen === String(n)));
    current = n;
    progress.textContent = `${n}/8`;
    const screen = document.querySelector(`.screen[data-screen="${n}"]`);
    if (screen && screen.dataset.countdown) startCountdown(screen);
  }

  function startCountdown(screen) {
    let remaining = Number(screen.dataset.countdown);
    const next = Number(screen.dataset.next);
    const number = screen.querySelector('.countdown-cover span');
    if (!number) return;

    const animate = () => {
      number.classList.remove('change');
      void number.offsetWidth;
      number.classList.add('change');
    };

    number.textContent = remaining;
    animate();

    timer = setInterval(() => {
      remaining -= 1;
      number.textContent = remaining;
      animate();
      if (remaining <= 0) {
        clearInterval(timer);
        timer = null;
        setTimeout(() => {
          if (current === Number(screen.dataset.screen)) show(next);
        }, 650);
      }
    }, 1000);
  }

  document.querySelectorAll('.zone').forEach(button => {
    button.addEventListener('click', () => show(Number(button.dataset.next)));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      show(current < 8 ? current + 1 : 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(current > 1 ? current - 1 : 8);
    } else if (e.key === 'Escape') {
      show(1);
    }
  });

  show(1);
})();
