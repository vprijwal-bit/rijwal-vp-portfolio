/**
 * PARTICLE-MATRIX.JS
 * Fullscreen Interactive Cyber Constellation & Digital Grid
 * High-performance HTML5 Canvas with mouse repulsion & network nodes
 * Developed for Rijwal VP Portfolio
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-particle-matrix');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = window.innerWidth < 768;
  const nodeCount = isMobile ? 35 : 75;
  const connectionDist = isMobile ? 90 : 130;
  const nodes = [];

  const mouse = {
    x: -1000,
    y: -1000,
    radius: 140
  };

  const tokens = ['01', '10', 'SYN', 'ACK', 'SEC', 'AWS', 'TCP', 'SSH', '0xFF', 'ETH'];

  class CyberNode {
    constructor() {
      this.reset();
      // Scatter randomly initially
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1;
      this.isToken = Math.random() > 0.85;
      this.tokenText = tokens[Math.floor(Math.random() * tokens.length)];
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }

    draw() {
      if (this.isToken) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = this.color + (this.baseAlpha + 0.2) + ')';
        ctx.fillText(this.tokenText, this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.baseAlpha + ')';
        ctx.fill();
      }
    }
  }

  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new CyberNode());
  }

  // Mouse tracking
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Window resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let animationId;
  let isVisible = true;

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible) render();
    else cancelAnimationFrame(animationId);
  });

  function render() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, width, height);

    // Draw Subtle Cyber Horizon Lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridStep = 80;
    for (let x = 0; x < width; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect close nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    animationId = requestAnimationFrame(render);
  }

  render();
})();
