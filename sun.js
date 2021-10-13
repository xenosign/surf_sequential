export class Sun {
  constructor() {
    this.radius = 200;
  }

  resize(seaWidth, seaHeight) {
    this.seaWidth = seaWidth;
    this.seaHeight = seaHeight;

    this.x = this.seaWidth - this.radius - 200;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    ctx.fillStyle = "#ffb200";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}