export const func = () => {
  // 次の問題を見る画面では使用しないので、処理打ち切り
  const nextQuiz = document.querySelector('button[phx-click="clickNext"]');
  if (nextQuiz) return;

  const cards = document.querySelectorAll(".card:not(.bg-red)");
  cards.forEach((card) => {
    const ans = card.querySelector<HTMLDivElement>(".keyboard-show-answer");
    if (!ans) return;
    ans.classList.add("pb-6", "bg-white");

    const footer = card.querySelector("footer");
    if (!footer) return;
    footer.style.zIndex = "2";

    const img = card.querySelector<HTMLImageElement>(
      'img[phx-hook="SameAnswerShowResultCanvas"]'
    );

    if (footer.querySelector("button") === null) {
      const showButton = document.createElement("button");
      showButton.textContent = "見る";
      showButton.style.position = "absolute";
      showButton.style.right = "3rem";
      showButton.style.bottom = "0.5rem";
      showButton.style.color = "white";
      showButton.addEventListener("click", () => {
        ans.classList.remove("bg-white");
        showButton.style.opacity = "0";
      });
      footer.appendChild(showButton);

      const plusButton = document.createElement("button");
      plusButton.textContent = "＋";
      plusButton.style.position = "absolute";
      plusButton.style.right = "1rem";
      plusButton.style.bottom = "0.5rem";
      plusButton.style.color = "white";
      plusButton.addEventListener("click", () => {
        if (img) {
          const maxHeightStr = /.+(?=px)/.exec(
            getComputedStyle(img).getPropertyValue("max-height")
          )?.[0];
          if (maxHeightStr) {
            img.style.maxHeight = `${Number(maxHeightStr) * 1.1}px`;
          }
          const maxWidthStr = /.+(?=px)/.exec(
            getComputedStyle(img).getPropertyValue("max-width")
          )?.[0];
          if (maxWidthStr) {
            img.style.maxWidth = `${Number(maxWidthStr) * (1.1 * 1.778)}px`;
          }
        }

        if (ans) {
          const fontSize = /.+(?=px)/.exec(
            getComputedStyle(ans).getPropertyValue("font-size")
          )?.[0];
          if (fontSize) {
            ans.style.fontSize = `${Number(fontSize) * 1.3}px`;
          }
        }
      });
      footer.appendChild(plusButton);

      const minusButton = document.createElement("button");
      minusButton.textContent = "−";
      minusButton.style.position = "absolute";
      minusButton.style.right = "0rem";
      minusButton.style.bottom = "0.5rem";
      minusButton.style.color = "white";
      minusButton.addEventListener("click", () => {
        if (img) {
          const maxHeightStr = /.+(?=px)/.exec(
            getComputedStyle(img).getPropertyValue("max-height")
          )?.[0];
          if (maxHeightStr) {
            img.style.maxHeight = `${Number(maxHeightStr) / 1.1}px`;
          }
          const maxWidthStr = /.+(?=px)/.exec(
            getComputedStyle(img).getPropertyValue("max-width")
          )?.[0];
          if (maxWidthStr) {
            img.style.maxWidth = `${Number(maxWidthStr) / (1.1 * 1.778)}px`;
          }
        }

        if (ans) {
          const fontSize = /.+(?=px)/.exec(
            getComputedStyle(ans).getPropertyValue("font-size")
          )?.[0];
          if (fontSize) {
            ans.style.fontSize = `${Number(fontSize) / 1.3}px`;
          }
        }
      });
      footer.appendChild(minusButton);
    }

    const parent = card.parentElement;
    if (parent) {
      parent.classList.add("is-12");
      parent.classList.remove("mw-560");
    }

    const grandParent = parent?.parentElement;
    if (grandParent) {
      grandParent.classList.add("is-flex-wrap-wrap");
    }
  });
};
