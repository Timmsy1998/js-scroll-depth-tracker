// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Create the modal element
  const modal = document.createElement("div");
  modal.id = "scrollDepthModal";
  modal.style.display = "none"; // Initially hide the modal
  modal.style.position = "fixed"; // Position the modal fixed on the screen
  modal.style.zIndex = "1"; // Ensure the modal is on top of other elements
  modal.style.left = "0"; // Align the modal to the left of the screen
  modal.style.top = "0"; // Align the modal to the top of the screen
  modal.style.width = "100%"; // Make the modal cover the full width of the screen
  modal.style.height = "100%"; // Make the modal cover the full height of the screen
  modal.style.overflow = "auto"; // Allow scrolling if the content is too large
  modal.style.backgroundColor = "rgba(0,0,0,0.4)"; // Semi-transparent background

  // Create the modal content container
  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "#fefefe"; // White background for the content
  modalContent.style.margin = "15% auto"; // Center the content vertically and horizontally
  modalContent.style.padding = "20px"; // Add padding inside the content container
  modalContent.style.border = "1px solid #888"; // Add a border around the content
  modalContent.style.width = "80%"; // Set the width of the content container

  // Create the close button for the modal
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "×"; // Set the content of the close button
  closeBtn.style.color = "#aaa"; // Set the color of the close button
  closeBtn.style.float = "right"; // Align the close button to the right
  closeBtn.style.fontSize = "28px"; // Set the font size of the close button
  closeBtn.style.fontWeight = "bold"; // Make the close button bold
  closeBtn.style.cursor = "pointer"; // Change the cursor to a pointer when hovering

  // Create the paragraph element for the modal message
  const modalMessage = document.createElement("p");
  modalMessage.id = "modalMessage"; // Set the ID for the message element

  // Add an event listener to the close button to hide the modal when clicked
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Add an event listener to the window to hide the modal when clicking outside of it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Append the close button and message to the modal content container
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalMessage);
  // Append the modal content container to the modal
  modal.appendChild(modalContent);
  // Append the modal to the document body
  document.body.appendChild(modal);

  // Select the article element
  const article = document.querySelector("article");
  // Define the scroll depth thresholds (25%, 50%, 100%)
  const thresholds = [0.25, 0.5, 1.0];
  // Create a set to keep track of dispatched events
  const dispatchedEvents = new Set();

  // Calculate the height of the article and the viewport
  const articleHeight = article.scrollHeight;
  const viewportHeight = window.innerHeight;

  // Function to handle the scroll event
  const handleScroll = () => {
    // Calculate the current scroll position
    const scrollPosition = window.scrollY + viewportHeight;
    // Calculate the scroll depth as a percentage of the article height
    const scrollDepth = scrollPosition / articleHeight;

    // Check each threshold to see if it has been reached
    thresholds.forEach((threshold) => {
      if (scrollDepth >= threshold && !dispatchedEvents.has(threshold)) {
        // Create a custom event with the scroll depth percentage
        const event = new CustomEvent("scrollDepth", {
          detail: { percentage: threshold * 100 },
        });
        // Dispatch the custom event to the window object
        window.dispatchEvent(event);
        // Add the threshold to the set of dispatched events
        dispatchedEvents.add(threshold);
        // Display the modal with the scroll depth percentage
        displayModal(threshold * 100);
      }
    });
  };

  // Function to display the modal with the scroll depth percentage
  const displayModal = (percentage) => {
    // Set the message content of the modal
    modalMessage.textContent = `You have reached ${percentage}% of the article.`;
    // Show the modal
    modal.style.display = "block";
  };

  // Add a throttled scroll event listener to the window
  window.addEventListener("scroll", throttle(handleScroll, 200));
});

// Throttle function to limit the rate at which a function can be called
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
