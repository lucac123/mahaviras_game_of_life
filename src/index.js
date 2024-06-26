import Universe from './universe.js';

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('game');
    const hud = document.getElementById('hud');
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.translate(canvas.width / 2, canvas.height / 2)

    const universe = new Universe(context, canvas.width, canvas.height, 900, 10000);

    function draw() {
                
        universe.draw();

        window.requestAnimationFrame(draw);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key == 'w')
            universe.zoom += 0.1;
        if (event.key == 's')
            universe.zoom -= 0.1;
        if (event.key == 'ArrowUp')
            universe.offset += 20;
        if (event.key == 'ArrowDown')
            universe.offset -= 20;
        if (event.key == 'ArrowLeft')
            universe.deltaTime = Math.min(universe.deltaTime+0.1, 3);
        if (event.key == 'ArrowRight')
            universe.deltaTime = Math.max(universe.deltaTime-0.1, 0);
    });

    window.requestAnimationFrame(draw);
})