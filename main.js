function startConfetti() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 999;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettis = [];

  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();
    });

    update();
  }

  function update() {
    confettis.forEach((c) => {
      c.y += Math.cos(c.d) + 1 + c.r / 2;
      c.x += Math.sin(c.d);
      c.tiltAngle += c.tiltAngleIncrement;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.x = Math.random() * canvas.width;
        c.y = -10;
      }
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play().catch((err) => {
      alert("Klik dulu untuk memulai musik (aturan browser)");
      console.log(err);
    });
  } else {
    music.pause();
  }
}
