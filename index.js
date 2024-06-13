let index = 0;
let attempts = 0;

function appStart() {
  const handleKeydown = (event) => {
    const handleEnter = () => {
      // 정답확인
      console.log("졸려..");
    };

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Enter") {
      handleEnter();
    } else if (index === 5) return;
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

appStart();
