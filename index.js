const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'source-over'; //default
// ctx.globalCompositeOperation = 'multiply';
// ctx.globalCompositeOperation = 'source-out';
// ctx.globalCompositeOperation = 'source-stop';
// ctx.globalCompositeOperation = 'destination-over'; // draws behind existing draw
// ctx.globalCompositeOperation = 'lighter'; // add color values on canvas
// ctx.globalCompositeOperation = 'copy'; // copy existing canvas
// ctx.globalCompositeOperation = 'xor'; // draw on overlap


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when not moused down

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // set new canvas position
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // increment hue and reset to 0 at 360
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // switch increment/decrement direction
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    // increment/decrement lineWidth
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);