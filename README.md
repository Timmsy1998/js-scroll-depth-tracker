# Scroll Depth Tracker

This project tracks the scroll depth through a news article webpage and dispatches an event to the window object at 25%, 50%, and 100% scroll offsets. The offset percentage is included in the details of the event. The project also displays a modal to inform the user of their current progress.

## Table of Contents
- Introduction
- Features
- Methodology
- Design Patterns

## Introduction
The Scroll Depth Tracker is a JavaScript-based solution designed to monitor user scroll activity on a webpage. It calculates the scroll depth as a percentage of the total article height and dispatches custom events when specific thresholds (25%, 50%, 100%) are reached. Additionally, it displays a modal to inform the user of their progress.

## Features
- Tracks scroll depth at 25%, 50%, and 100% of the article height.
- Dispatches custom events with the scroll depth percentage.
- Displays a modal to inform the user of their current progress.
- Plug-and-play solution that can be implemented via a single JavaScript file.

## Methodology
The Scroll Depth Tracker uses the following methodology:
1. **DOMContentLoaded Event Listener**: Ensures the script runs after the DOM is fully loaded.
2. **Create and Style the Modal**: The modal and its content are created and styled directly within the JavaScript code.
3. **Append Modal to Body**: The modal is appended to the document body.
4. **Select the Article Element**: Selects the `<article>` element from the DOM.
5. **Define Thresholds**: Defines the scroll depth thresholds as 25%, 50%, and 100%.
6. **Set of Dispatched Events**: Creates a set to keep track of which events have been dispatched.
7. **Calculate Article and Viewport Heights**: Calculates the height of the article and the viewport.
8. **Handle Scroll Function**: Handles the scroll event and calculates the scroll depth.
9. **Display Modal Function**: Displays the modal with the scroll depth percentage.
10. **Throttle Function**: Throttles the scroll event handler to improve performance.
11. **Add Scroll Event Listener**: Adds the scroll event listener with throttling.

## Design Patterns
The Scroll Depth Tracker uses the following design patterns:
1. **Observer Pattern**: The scroll event acts as the subject, and the callback function registered with the scroll event acts as the observer. When the scroll depth reaches a specified threshold, custom events are dispatched to the window object.
2. **Event Listener Pattern**: The event listener pattern is used to listen for specific events (scroll and click) and execute callback functions when those events occur.
3. **Throttling Pattern**: The throttling pattern is used to limit the rate at which the scroll event handler is called, improving performance.

