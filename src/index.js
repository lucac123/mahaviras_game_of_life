import Universe from './universe.js';

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('game');
    const hud = document.getElementById('hud');
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.translate(canvas.width / 2, canvas.height / 2)

    const universe = new Universe(context, canvas.width, canvas.height, 1080, 5000);

    function draw() {
        universe.update();
        universe.draw();

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
})