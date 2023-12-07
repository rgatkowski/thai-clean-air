import { randomClamped } from '@tc/utils/clamp';
import { SMOKE } from '@tc/images';

class Particle {
  private canvas: SmokeCanvas;
  private x: number;
  private y: number;
  private speedX: number;
  private speedY: number;
  private speedAngular: number;
  private image: HTMLImageElement;
  private size: number;
  private angle: number;

  public constructor(canvas: SmokeCanvas, image: HTMLImageElement) {
    this.canvas = canvas;
    this.image = image;

    this.size = randomClamped(this.canvas.width / 6, this.canvas.width / 4);
    this.speedAngular = randomClamped(0.01, 0.02);
    this.angle = 0;

    this.x = randomClamped(0, canvas.width);
    this.y = randomClamped(0, canvas.height);

    this.speedX = randomClamped(-2, 2);
    this.speedY = randomClamped(-1.7, 1.7);
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
    context.restore();
  }

  public update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.speedAngular;

    if (this.x <= 0 || this.x >= this.canvas.width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= this.canvas.height) this.speedY *= -1;
  }
}

class SmokeCanvas {
  private particles: Particle[];
  private context: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public time: number;

  constructor(canvas: HTMLCanvasElement, particlesNumber: number = 10) {
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.particles = new Array<Particle>();
    this.time = 0;

    const particleImage = new Image();

    particleImage.onload = () => {
      for (let i = 0; i < particlesNumber; i++) {
        this.particles.push(new Particle(this, particleImage));
      }
    };
    particleImage.src = SMOKE.src;
    particleImage.alt = SMOKE.alt;
  }

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((particle) => particle.draw(this.context));
  }

  public update(deltaTime: number) {
    this.time += deltaTime;
    this.particles.forEach((particle) => particle.update());
  }
}

export default SmokeCanvas;
