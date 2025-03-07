/**

Author: Liyu, Nevathan 

Student Number: 400559252, 400576019

Date Created: Mar 6 2025



This JavaScript file handles user interactions for drawing shapes on an HTML5 canvas.

Users can select a shape, set its color and dimensions, and draw it on the canvas.

The application supports undoing the last shape, clearing the canvas, and saving shapes to local storage.


*/


import { Circle} from './circle.js';
import { Square } from './square.js';
import { Triangle } from './triangle.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    window.ctx = ctx; 

    const shapeSelect = document.getElementById('shapeSelect');
    const colorInput = document.getElementById('colorInput');
    const drawButton = document.getElementById('drawButton');
    const undoButton = document.getElementById('undoButton');
    const clearButton = document.getElementById('clearButton');

  const circleParams = document.getElementById('circleParams');
  const squareParams = document.getElementById('squareParams');
  const triangleParams = document.getElementById('triangleParams');

  const radiusInput = document.getElementById('radiusInput');
  const sideInput = document.getElementById('sideInput');
  const sideAInput = document.getElementById('sideAInput');
  const sideBInput = document.getElementById('sideBInput');
  const sideCInput = document.getElementById('sideCInput');

  let shapes = [];

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

    function saveShapes() {
        const shapesToStore = shapes.map(shape => ({
            ...shape,
            type: shape.constructor.name.toLowerCase()
        }));
        localStorage.setItem('shapes', JSON.stringify(shapesToStore));
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw());
    }

    shapeSelect.addEventListener('change', function() {
        const shape = shapeSelect.value;
        circleParams.style.display = shape === 'circle' ? 'inline-block' : 'none';
        squareParams.style.display = shape === 'square' ? 'inline-block' : 'none';
        triangleParams.style.display = shape === 'triangle' ? 'inline-block' : 'none';

        colorInput.className = shape;
    });

    colorInput.addEventListener('input', () => {
        if (shapeSelect.value === 'triangle') {
            colorInput.style.backgroundColor = colorInput.value;
        } else {
            colorInput.style.backgroundColor = '';
        }
    });

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

    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const shape = createShape(e.clientX - rect.left, e.clientY - rect.top);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

    drawButton.addEventListener('click', function() {
        const shape = createShape(canvas.width / 2, canvas.height / 2);
        if (shape) {
            shapes.push(shape);
            shape.draw();
            saveShapes();
        }
    });

  undoButton.addEventListener('click', function() {
      shapes.pop();
      redrawCanvas();
      saveShapes();
  });

  clearButton.addEventListener('click', function() {
      shapes = [];
      redrawCanvas();
      localStorage.removeItem('shapes');
  });
});