document.addEventListener("DOMContentLoaded", () => {
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
        displayAlert(threshold * 100);
      }
    });
  };

  const displayAlert = (percentage) => {
    alert(`You have reached ${percentage}% of the article.`);
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
