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
    const snakeSize = 16;
    const tileSize = 16;
    var snake = [];
    var food;

    $(document).keydown(function(event){
        Game.keys[event.keyCode] = true;
    });

    /* init */
    var init = function(){
        /* populate the keys array */
        for(var i = 37; i <= 40; i++)
            Game.keys[i] = false;

        /* map init */
        Map.init(tileSize);

        /* snake functions and initialization */
        snake[0] = new Snake(Map.tiles[Math.floor(Map.rows / 2)][Math.floor(Map.columns / 2)].x, Map.tiles[Math.floor(Map.rows / 2)][Math.floor(Map.columns / 2)].y, snakeSize, snakeSize);

        for(var i = 1; i < 3; i++)
            snake.push(new Snake(snake[i - 1].x , snake[i - 1].y + snakeSize, snakeSize, snakeSize));

        /* food */
        food = new Food(tileSize, tileSize);
        food.spawn();

        /* show / hide UI elements */
        gameOverUI.hide();
    };

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

        snakeUpdate();
        foodUpdate();
    }

    function snakeUpdate(){
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

    function foodUpdate(){
        if(Physics.checkCollision(snake[0], food)){
            food.spawn();
            snake.push(new Snake(snake[snake.length - 1].prevX, snake[snake.length - 1].prevY, snakeSize, snakeSize));
            Game.score++;
            console.log(snake[0].x + " : " + snake[0].y);
        }
    }

    function draw(){
        /* draw out the snake */
        context.fillStyle = 'rgb(255, 255, 255)';
        for(var i = 0; i < snake.length; i++)
            context.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);

        /* draw out the food */
        context.fillStyle = 'rgb(255, 163 ,8)';
        context.fillRect(food.x, food.y, food.width, food.height);
    }

    init();
});
