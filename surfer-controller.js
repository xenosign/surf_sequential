// #9
import { Surfer } from "./surfer.js";

export class SurferController {
  // #7, 변수 선언 및 이미지 로드
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "surfer.png";

    this.items = [];

    this.cur = 0;
    this.isLoaded = false;
  }

  resize(seaWidth, seaHeight) {
    this.seaWidth = seaWidth;
    this.seaHeight = seaHeight;
  }

  loaded() {
    // #8, 이미지 로드 여부 체크 후 첫 서퍼 추가
    this.isLoaded = true;
    this.addSurfer();
  }

  addSurfer() {
    // #9, 서퍼 추가
    this.items.push(new Surfer(this.img, this.seaWidth));
  }

  draw(ctx, t, dots) {
    // #10, 서퍼 그리기
    // 서퍼가 일정 시간을 넘으면 새로운 서퍼 추가
    if (this.isLoaded) {
      this.cur += 1;
      if (this.cur > 350) {
        this.cur = 0;
        this.addSurfer();
      }

      // 서퍼가 화면 밖으로 나가면 배열에서 빼줘서 메모리 관리
      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.x < -item.width) {
          this.items.splice(i, 1);
        } else {
          item.draw(ctx, t, dots);
        }
      }
    }
  }
}
