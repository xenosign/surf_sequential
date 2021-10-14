export class Sun {
  constructor() {
    this.radius = 200;

    // @2, 에니메이션을 위한 점의 좌표는 고정 좌표 이므로 미리 선언하여 저장
    this.total = 200;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }

    // @3, FPS 정의
    this.fps = 8;
    this.fpsTime = 1000 / this.fps;

    // @@@@@@@ 햇님 이미지 추가
    this.img = new Image(); // 이미지 객체로 이미지 로드
    this.img.src = "tele.png"; // 이미지 파일명 알려주기
    this.imgWidth = 342; // 햇님 이미지 크기
    this.imgHeight = 338; // 햇님 이미지 크기

    this.scale = 0.75; // 햇님 이미지 크기 조절

    this.imgWidth2 = this.imgWidth * this.scale; // 크기 조절 된 이미지 크기 값 반환
    this.imgHeight2 = this.imgHeight * this.scale; // 크기 조절 된 이미지 크기 값 반환
  }

  resize(seaWidth, seaHeight) {
    this.seaWidth = seaWidth;
    this.seaHeight = seaHeight;

    this.x = this.seaWidth - this.radius - 100;
    this.y = this.radius + 50;
  }

  draw(ctx, t) {
    // @3, FPS 정의
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    // @6, 원 대신 랜덤으로 업데이트 되는 점을 연결해서 해를 표현
    ctx.fillStyle = "#fce85c";
    ctx.beginPath();
    let pos = this.pos[0];
    ctx.moveTo(pos.x + this.x, pos.y + this.y);
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }
    ctx.fill();

    ctx.drawImage(
      this.img,
      this.x - this.imgWidth2 / 2, // 해의 중심 좌표에서 이미지 그릴 이미지 크기의 x 값의 반을 빼줘서 이미지가 해의 중간에 위치하도록 설정
      this.y - this.imgHeight2 / 2, // 해의 중심 좌표에서 이미지 그릴 이미지 크기의 y 값의 반을 빼줘서 이미지가 해의 중간에 위치하도록 설정
      this.imgWidth2,
      this.imgHeight2
    );
  }

  // @4, 점의 위치를 꾸준히 업데이트
  updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.ranInt(5),
        y: pos.y + this.ranInt(5),
      };
    }
  }

  // @5, 랜덤 포인트 생성을 위하 함수
  ranInt(max) {
    return Math.random() * max;
  }

  // @2, 원 위의 점 포인트 좌표 구하기
  getCirclePoint(radius, t) {
    const theta = Math.PI * 2 * t;

    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
    };
  }
}
