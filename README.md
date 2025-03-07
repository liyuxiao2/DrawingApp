# Shape Drawing Application

## Overview
This is a simple web-based application that allows users to draw different geometric shapes (circles, squares, and triangles) on an HTML5 canvas. Users can select a shape, define its dimensions, choose a color, and draw it on the canvas. The application also supports undoing the last shape, clearing the canvas, and saving shapes to local storage.

## Features
- Select a shape (Circle, Square, Triangle)
- Choose a color for the shape
- Click on the canvas to draw the shape at the clicked position
- Undo the last drawn shape
- Clear the canvas
- Save shapes to local storage and reload them on page refresh

## Technologies Used
- HTML5 Canvas API
- JavaScript (ES6 modules)
- Local Storage API
- CSS for basic styling

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/shape-drawing-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd shape-drawing-app
   ```
3. Open the `index.html` file in a browser (ensure it supports ES6 modules).

## File Structure
```
shape-drawing-app/
│── index.html          # Main HTML file
│── styles.css          # CSS for styling
│── main.js             # Main JavaScript file
│── circle.js           # Circle class
│── square.js           # Square class
│── triangle.js         # Triangle class
│── README.md           # Project documentation
```

## Usage
1. Open the application in a web browser.
2. Select a shape from the dropdown menu.
3. Enter the required dimensions for the shape.
4. Choose a color.
5. Click on the canvas to draw the shape at the clicked location.
6. Use the "Undo" button to remove the last drawn shape.
7. Click "Clear" to remove all shapes from the canvas.

## Troubleshooting
- **Shapes not appearing?** Ensure your browser supports JavaScript ES6 modules and local storage.
- **Console error about 'export'?** Ensure you are running the script with `type="module"` in your HTML file.
- **Local storage not saving shapes?** Check browser settings to ensure local storage is enabled.

## License
This project is open-source under the MIT License.

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request with your improvements!

## Contact
For any questions or suggestions, contact me at `your.email@example.com`.

