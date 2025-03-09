/**
 * Author: Liyu, Nevathan
 * Student Number: 400559252, 400576019
 * Date Created: Mar 6 2025
 *
 * This JavaScript file handles user interactions for drawing shapes on an HTML5 canvas.
 * Users can select a shape, set its color and dimensions, and draw it on the canvas.
 * The application supports undoing the last shape, clearing the canvas, and saving shapes to local storage.
 */

import { Circle } from './circle.js';
import { Square } from './square.js';
import { Triangle } from './triangle.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    let shapes = [];

    // Load previously stored shapes from localStorage
    if (localStorage.getItem('shapes')) {
        try {
            const storedShapes = JSON.parse(localStorage.getItem('shapes'));
            storedShapes.forEach(obj => {
                let shape;
                if (obj.type === 'circle') shape = new Circle(obj.radius, obj.color, obj.x, obj.y);
                if (obj.type === 'square') shape = new Square(obj.side, obj.color, obj.x, obj.y);
                if (obj.type === 'triangle') shape = new Triangle(obj.sideA, obj.sideB, obj.sideC, obj.color, obj.x, obj.y);
                if (shape) shapes.push(shape);
            });
            redrawCanvas();
        } catch(e) {
            console.error(e);
        }
    }

    // Saves shapes array to localStorage
    function saveShapes() {
        const shapesToStore = shapes.map(shape => ({
            ...shape,
            type: shape.constructor.name.toLowerCase()
        }));
        localStorage.setItem('shapes', JSON.stringify(shapesToStore));
    }

    // Clears and redraws shapes on the canvas
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw());
    }

    // Creates a shape object based on current user inputs
    function createShape(x, y) {
        const color = colorInput.value;
        switch(shapeSelect.value) {
            case 'circle':
                return new Circle(parseInt(radiusInput.value), color, x, y);
            case 'square':
                return new Square(parseInt(sideInput.value), color, x, y);
            case 'triangle':
                return new Triangle(
                    parseInt(sideAInput.value),
                    parseInt(sideBInput.value),
                    parseInt(sideCInput.value),
                    color, x, y
                );
            default: return null;
        }
    }

    // Canvas click event to add shape at clicked position
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const shape = createShape(e.clientX - rect.left, e.clientY - rect.top);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

    // Draw button adds shape to canvas center
    drawButton.addEventListener('click', function() {
        const shape = createShape(canvas.width / 2, canvas.height / 2);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

    // Undo button removes last shape drawn
    undoButton.addEventListener('click', function() {
        shapes.pop();
        redrawCanvas();
        saveShapes();
    });

    // Clear button clears canvas and localStorage
    clearButton.addEventListener('click', function() {
        shapes = [];
        redrawCanvas();
        localStorage.removeItem('shapes');
    });
});
