/**
 * Author: Liyu, Nevathan
 * Student Number: 400559252, 400576019
 * Date Created: Mar 6 2025
 *
 * Handles drawing shapes on an HTML5 canvas.
 * Supports drawing, undoing, clearing, and saving shapes to localStorage.
 */

import { Circle } from './circle.js';
import { Square } from './square.js';
import { Triangle } from './triangle.js';

window.addEventListener('load', function() {
    // Retrieve canvas and its context, then expose context globally for shape modules
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    window.ctx = ctx;

    // Get control elements
    const shapeSelect = document.getElementById('shapeSelect');
    const colorInput = document.getElementById('colorInput');
    const drawButton = document.getElementById('drawButton');
    const undoButton = document.getElementById('undoButton');
    const clearButton = document.getElementById('clearButton');

    // Get input fields for parameters
    const radiusInput = document.getElementById('radiusInput');
    const sideInput = document.getElementById('sideInput');
    const sideAInput = document.getElementById('sideAInput');
    const sideBInput = document.getElementById('sideBInput');
    const sideCInput = document.getElementById('sideCInput');

    // Get parameter group containers
    const circleParams = document.getElementById('circleParams');
    const squareParams = document.getElementById('squareParams');
    const triangleParams = document.getElementById('triangleParams');

    // Default: show circle parameters and update color input style
    circleParams.style.display = "block";
    squareParams.style.display = "none";
    triangleParams.style.display = "none";
    colorInput.className = "";
    colorInput.classList.add('circle');

    // Update parameter groups and color styling when shape selection changes
    shapeSelect.addEventListener('change', function() {
        // Hide all parameter groups first
        circleParams.style.display = "none";
        squareParams.style.display = "none";
        triangleParams.style.display = "none";
        // Clear previous color input classes
        colorInput.className = "";
        // Toggle the right group and styling based on the selected shape
        if (shapeSelect.value === 'circle') {
            circleParams.style.display = "block";
            colorInput.classList.add('circle');
        } else if (shapeSelect.value === 'square') {
            squareParams.style.display = "block";
            colorInput.classList.add('square');
        } else if (shapeSelect.value === 'triangle') {
            triangleParams.style.display = "block";
            colorInput.classList.add('triangle');
        }
    });

    // Array to store drawn shapes
    let shapes = [];

    // Load shapes from localStorage if available
    if (localStorage.getItem('shapes')) {
        try {
            const storedShapes = JSON.parse(localStorage.getItem('shapes'));
            storedShapes.forEach(obj => {
                let shape;
                if (obj.type === 'circle') {
                    shape = new Circle(obj.radius, obj.color, obj.x, obj.y);
                }
                if (obj.type === 'square') {
                    shape = new Square(obj.side, obj.color, obj.x, obj.y);
                }
                if (obj.type === 'triangle') {
                    shape = new Triangle(obj.sideA, obj.sideB, obj.sideC, obj.color, obj.x, obj.y);
                }
                if (shape) shapes.push(shape);
            });
            redrawCanvas();
        } catch (e) {
            console.error("Error loading shapes:", e);
        }
    }

    // Save shapes array to localStorage
    function saveShapes() {
        const shapesToStore = shapes.map(shape => ({
            ...shape,
            type: shape.constructor.name.toLowerCase()
        }));
        localStorage.setItem('shapes', JSON.stringify(shapesToStore));
    }

    // Redraw the canvas with current shapes
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw());
    }

    // Create a shape from the selected type and input values at (x,y)
    function createShape(x, y) {
        const color = colorInput.value;
        switch (shapeSelect.value) {
            case 'circle':
                return new Circle(parseInt(radiusInput.value), color, x, y);
            case 'square':
                return new Square(parseInt(sideInput.value), color, x, y);
            case 'triangle':
                return new Triangle(
                    parseInt(sideAInput.value),
                    parseInt(sideBInput.value),
                    parseInt(sideCInput.value),
                    color,
                    x,
                    y
                );
            default:
                return null;
        }
    }

    // Draw shape at mouse click position
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const shape = createShape(e.clientX - rect.left, e.clientY - rect.top);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

    // Draw shape at canvas center when draw button is clicked
    drawButton.addEventListener('click', function() {
        const shape = createShape(canvas.width / 2, canvas.height / 2);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

    // Undo: Remove the last drawn shape
    undoButton.addEventListener('click', function() {
        shapes.pop();
        redrawCanvas();
        saveShapes();
    });

    // Clear: Remove all shapes and clear localStorage
    clearButton.addEventListener('click', function() {
        shapes = [];
        redrawCanvas();
        localStorage.removeItem('shapes');
    });
});
