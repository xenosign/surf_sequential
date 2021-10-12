import { Wave } from "./wave.js";
import { SurferController } from "./surfer-controller.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    // #4
    this.waves = [
      new Wave("#0b57a2", 0.4, 6, 0.4, 0.4),
      new Wave("#50d2f9", 0.7, 8, 0.3, 0.3),
      new Wave("#4295f2", 1.0, 10, 0.1, 0.6),
    ];

    // #11, 서퍼 컨트롤러 추가
    this.surferController = new SurferController();


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

    // #4
    for (let i = 0; i < this.waves.length; i++) {
      this.waves[i].resize(this.seaWidth, this.seaHeight);      
    }

    // #11, 서퍼 컨트롤러 추가
    this.surferController.resize(this.seaWidth, this.seaHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.seaWidth, this.seaHeight);

    // #4
    let dots;
    for (let i = 0; i < this.waves.length; i++) {
      dots = this.waves[i].draw(this.ctx);
    }

    // #11, 서퍼 컨트롤러 추가
    this.surferController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};
