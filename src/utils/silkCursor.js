export function initSilkCursor() {
  if (typeof window === 'undefined') return () => {};

  function WaveOscillator(options = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.0015;
    this.amplitude = options.amplitude || 85;
    this.currentValue = 0;
  }

  WaveOscillator.prototype.update = function () {
    this.phase += this.frequency;
    this.currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.currentValue;
  };

  function PhysicsNode() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  function SilkTrail(options, config, mousePos) {
    this.config = config;
    this.mousePos = mousePos;
    this.spring = options.spring + (0.1 * Math.random() - 0.02);
    this.friction = this.config.friction + (0.01 * Math.random() - 0.002);
    this.nodes = [];

    for (let i = 0; i < this.config.size; i++) {
      const node = new PhysicsNode();
      node.x = this.mousePos.x;
      node.y = this.mousePos.y;
      this.nodes.push(node);
    }
  }

  SilkTrail.prototype.update = function () {
    let springFactor = this.spring;
    const leadNode = this.nodes[0];

    leadNode.vx += (this.mousePos.x - leadNode.x) * springFactor;
    leadNode.vy += (this.mousePos.y - leadNode.y) * springFactor;

    for (let i = 0, len = this.nodes.length; i < len; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * springFactor;
        node.vy += (prevNode.y - node.y) * springFactor;
        node.vx += prevNode.vx * this.config.dampening;
        node.vy += prevNode.vy * this.config.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      springFactor *= this.config.tension;
    }
  };

  SilkTrail.prototype.draw = function (ctx) {
    if (this.nodes.length < 2) return;

    let currX = this.nodes[0].x;
    let currY = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(currX, currY);

    let i = 1;
    const end = this.nodes.length - 2;
    for (; i < end; i++) {
      const nodeA = this.nodes[i];
      const nodeB = this.nodes[i + 1];
      currX = 0.5 * (nodeA.x + nodeB.x);
      currY = 0.5 * (nodeA.y + nodeB.y);
      ctx.quadraticCurveTo(nodeA.x, nodeA.y, currX, currY);
    }

    const nodeLastA = this.nodes[i];
    const nodeLastB = this.nodes[i + 1];
    ctx.quadraticCurveTo(nodeLastA.x, nodeLastA.y, nodeLastB.x, nodeLastB.y);
    ctx.stroke();
    ctx.closePath();
  };

  const existingCanvas = document.getElementById('belgrade-cursor-canvas');
  if (existingCanvas) existingCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'belgrade-cursor-canvas';
  canvas.className = 'belgrade-cursor-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let running = true;
  let rafId = null;

  const mousePos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const config = {
    friction: 0.5,
    trails: 10,
    size: 10,
    dampening: 0.1,
    tension: 0.98,
  };

  const strokeHue = 'hsla(34.2, 42%, 58%, 0.28)';
  const accentStrokeHue = 'hsla(0, 72%, 48%, 0.38)';
  let currentStroke = strokeHue;

  const oscillator = new WaveOscillator({
    phase: 2 * Math.random() * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  const trails = [];
  for (let i = 0; i < config.trails; i++) {
    trails.push(
      new SilkTrail(
        { spring: 0.4 + (i / config.trails) * 0.025 },
        config,
        mousePos
      )
    );
  }

  const handleResize = () => {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  const handleMouseMove = (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      mousePos.x = e.touches[0].clientX;
      mousePos.y = e.touches[0].clientY;
    }
  };

  const handleMouseOver = (e) => {
    if (e.target.closest('a, button, .cta, .lnk, .nav-cta, .process-step, .stat-card, [role="button"]')) {
      currentStroke = accentStrokeHue;
    }
  };

  const handleMouseOut = (e) => {
    if (e.target.closest('a, button, .cta, .lnk, .nav-cta, .process-step, .stat-card, [role="button"]')) {
      currentStroke = strokeHue;
    }
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);

  handleResize();

  const render = () => {
    if (!running || !ctx || !canvas) return;

    oscillator.update();
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = currentStroke;
    ctx.lineWidth = 1.2;

    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i];
      trail.update();
      trail.draw(ctx);
    }

    rafId = requestAnimationFrame(render);
  };

  render();

  return () => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}
