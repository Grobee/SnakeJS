$(document).ready(function(){
    /* initialize the canvas and the context */
    var canvas = $('canvas');
    var context = canvas.get(0).getContext('2d');
    /* defining the constants and variables
     * first init the game static class */
    Game.inProgress = true;
    Game.canvas.width = canvas.width();
    Game.canvas.height = canvas.height();
    /* snake and the others */
    var gameOverUI = $('#gameOverUI');
    /* create the initial snake */
    const snakeDim = 15;
    /* populate the keys array */
    for(var i = 37; i <= 40; i++)
        Game.keys[i] = false;

    var snake = [];
    snake.push(new Snake(canvas.width() / 2, canvas.height() / 2, snakeDim, snakeDim));

    for(var i = 1; i < 17; i++)
        snake.push(new Snake(snake[i - 1].x , snake[i - 1].y + snakeDim, snakeDim, snakeDim));

    /* init */
    gameOverUI.hide();

    $(document).keydown(function(event){
        Game.keys[event.keyCode] = true;
    });

    /* animation */
    var gameLoop = setInterval(animate, 40);

    function animate(){
        context.clearRect(0, 0, canvas.width(), canvas.height());

        update();
        draw();

        if(!Game.inProgress) clearInterval(gameLoop);
    }

    function update(){
        Game.checkKeys(snake);
        snake[0].move();

        if(Physics.checkIfOutOfBounds(snake)){
            gameOverUI.show();
            Game.inProgress = false;
            //Physics.killSnake(snake);
            return;
        }

        for(var i = 1; i < snake.length; i++)
            snake[i].moveTo(snake[i - 1].prevX, snake[i - 1].prevY);
    }

    function draw(){
        context.fillStyle = 'rgb(255,255,255)';

        /* draw out the snake */
        for(var i = 0; i < snake.length; i++)
            context.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    }
});
