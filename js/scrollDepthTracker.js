document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('article');
    const thresholds = [0.25, 0.5, 1.0];
    const dispatchedEvents = new Set();

    const articleHeight = article.scrollHeight;
    const viewportHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + viewportHeight;
        const scrollDepth = scrollPosition / articleHeight;

        thresholds.forEach(threshold => {
            if (scrollDepth >= threshold && !dispatchedEvents.has(threshold)) {
                const event = new CustomEvent('scrollDepth', {
                    detail: { percentage: threshold * 100 }
                });
                window.dispatchEvent(event);
                dispatchedEvents.add(threshold);
                alert(`You have reached ${threshold * 100}% of the article.`);
            }
        });
    });
});
