document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.id = "scrollDepthModal";
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.zIndex = "1";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.overflow = "auto";
  modal.style.backgroundColor = "rgba(0,0,0,0.4)";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "#fefefe";
  modalContent.style.margin = "15% auto";
  modalContent.style.padding = "20px";
  modalContent.style.border = "1px solid #888";
  modalContent.style.width = "80%";

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "×";
  closeBtn.style.color = "#aaa";
  closeBtn.style.float = "right";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";

  const modalMessage = document.createElement("p");
  modalMessage.id = "modalMessage";

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalMessage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const article = document.querySelector("article");
  const thresholds = [0.25, 0.5, 1.0];
  const dispatchedEvents = new Set();

  const articleHeight = article.scrollHeight;
  const viewportHeight = window.innerHeight;

  const handleScroll = () => {
    const scrollPosition = window.scrollY + viewportHeight;
    const scrollDepth = scrollPosition / articleHeight;

    thresholds.forEach((threshold) => {
      if (scrollDepth >= threshold && !dispatchedEvents.has(threshold)) {
        const event = new CustomEvent("scrollDepth", {
          detail: { percentage: threshold * 100 },
        });
        window.dispatchEvent(event);
        dispatchedEvents.add(threshold);
        displayModal(threshold * 100);
      }
    });
  };

  const displayModal = (percentage) => {
    modalMessage.textContent = `You have reached ${percentage}% of the article.`;
    modal.style.display = "block";
  };

  window.addEventListener("scroll", throttle(handleScroll, 200));
});

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
