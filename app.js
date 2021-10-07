class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.seaWidth = document.body.clientWidth;
    this.seaHeight = document.body.clientHeight;

    this.canvas.width = this.seaWidth * 2;
    this.canvas.height = this.seaHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.seaWidth, this.seaHeight);
  }
}

window.onload = () => {
  new App();
};
