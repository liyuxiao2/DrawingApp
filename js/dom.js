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
          if (obj.type === 'circle') {
            shape = new Circle(obj.radius, obj.color, obj.x, obj.y);
          } else if (obj.type === 'square') {
            shape = new Square(obj.side, obj.color, obj.x, obj.y);
          } else if (obj.type === 'triangle') {
            shape = new Triangle(obj.sideA, obj.sideB, obj.sideC, obj.color, obj.x, obj.y);
          }
          if (shape) {
            shapes.push(shape);
          }
        });
        redrawCanvas();
      } catch(e) {
        console.error("Error loading shapes from local storage", e);
      }
    }
  
    function saveShapes() {
      
      const shapesToStore = shapes.map(shape => {
        if (shape instanceof Circle) {
          return { type: 'circle', radius: shape.radius, color: shape.color, x: shape.x, y: shape.y };
        } else if (shape instanceof Square) {
          return { type: 'square', side: shape.side, color: shape.color, x: shape.x, y: shape.y };
        } else if (shape instanceof Triangle) {
          return { type: 'triangle', sideA: shape.sideA, sideB: shape.sideB, sideC: shape.sideC, color: shape.color, x: shape.x, y: shape.y };
        }
      });
      localStorage.setItem('shapes', JSON.stringify(shapesToStore));
    }
  
    function redrawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => {
        shape.draw();
      });
    }
  
    
    shapeSelect.addEventListener('change', function() {
      const shape = shapeSelect.value;
      circleParams.style.display = shape === 'circle' ? 'inline-block' : 'none';
      squareParams.style.display = shape === 'square' ? 'inline-block' : 'none';
      triangleParams.style.display = shape === 'triangle' ? 'inline-block' : 'none';
    });
  
    function createShape(x, y) {
      const shapeType = shapeSelect.value;
      const color = colorInput.value;
      let shape;
      if (shapeType === 'circle') {
        const radius = parseInt(radiusInput.value);
        shape = new Circle(radius, color, x, y);
      } else if (shapeType === 'square') {
        const side = parseInt(sideInput.value);
        shape = new Square(side, color, x, y);
      } else if (shapeType === 'triangle') {
        const sideA = parseInt(sideAInput.value);
        const sideB = parseInt(sideBInput.value);
        const sideC = parseInt(sideCInput.value); 
        shape = new Triangle(sideA, sideB, sideC, color, x, y);
      }
      return shape;
    }
  
    canvas.addEventListener('click', function(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const shape = createShape(x, y);
      if (shape) {
        shapes.push(shape);
        shape.draw();
        saveShapes();
      }
    });
  
    drawButton.addEventListener('click', function() {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const shape = createShape(x, y);
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
  