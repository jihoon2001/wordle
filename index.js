const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let 맞은_갯수 = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:35vw; background-color: white; width:200px; height:100px;";
    document.body.appendChild(div);
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    displayGameover();
    window.removeEventListener("keydown", handleKeydown);
  };

  const handleEnterKey = () => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        block.style.backgroundColor = "#6AAA64";
        맞은_갯수++;
      } else if (정답.includes(입력한_글자))
        block.style.backgroundColor = "#C9B458";
      else block.style.backgroundColor = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    const handleBackspace = () => {
      if (index > 0) {
        const preBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
        if (index != 0) index -= 1;
      }
    };

    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  function startTimer() {
    const 시작_시간 = new Date();

    const Timer = () => {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart("2", 0);
      const 초 = 흐른_시간.getSeconds().toString().padStart("2", 0);
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${분}:${초}`;
    };
    timer = setInterval(Timer, 1000);
  }

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
