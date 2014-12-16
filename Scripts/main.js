$(document).ready(function(){
    /* initialize the game / game loop */
    var gameLoop;
    var ctx;
    var tileSize = 16;
    /* game objects */
    var snake;
    var food;
    /* UI elements */
    var gameOverUI = $('#gameOverUI');
    var menuUI = $('#menuUI');

    $(document).keydown(function(event){
        Game.keys[event.keyCode] = true;
    });

    var init = function(){
        /* game init */
        var canvas = $('canvas');
        Game.canvas = canvas;
        Game.context = canvas.get(0).getContext('2d');
        Game.width = canvas.width();
        Game.height = canvas.height();
        ctx = Game.context;

        /* map */
        Map.init(tileSize);

        /* keys */
        /* populate the keys array */
        for(var i = 37; i <= 40; i++)
            Game.keys[i] = false;

        Game.inProgress = true;

        /* game objects
        * snake */
        snake = new Snake(tileSize);

        var index = { x: Math.floor(Map.rows /2), y: Math.floor(Map.columns / 2) };
        for(var i = 0; i < 3; i++) {
            snake.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* food */
        food = new Food(tileSize, tileSize);
        food.spawn();
        Map.set(Type.FOOD, food.x, food.y);

        /* UI */
        gameOverUI.hide();
        menuUI.hide();
        //requestAnimationFrame(animate);
        gameLoop = setTimeout(animate, 33);
    };

    var animate = function(){
        ctx.clearRect(0, 0, Game.width, Game.height);

        update();
        draw();

        //requestAnimationFrame(animate);
        if(Game.inProgress) setTimeout(animate, 33);
    };

    var update = function(){
        Game.checkKeys();

        updateSnake();
        /* see if our snake hit a dead end */
        if(!Game.inProgress) return;
        updateFood();
    };

    /* update the snake object's movement */
    var updateSnake = function(){
        snake.move();

        if(Physics.checkIfOutOfBounds(snake.head)){
            /* inside */
            Game.inProgress = false;
            clearTimeout(gameLoop);
            /* outside */
            gameOverUI.show();
        }

        Map.set(Type.SNAKE, snake.head.x, snake.head.y);
    };

    /* update the food object's position */
    var updateFood = function(){
        if(Physics.checkCollision(snake.head, food)){
            food.spawn();
            Game.score++;
            Map.set(Type.FOOD, food.x, food.y);
        }
        else {
            snake.removeLast();
        }
    };

    var draw = function(){
        /* draw out the tiles */
        for(var i = 0; i < Map.rows; i++){
            for(var j = 0; j < Map.columns; j++){
                /* check the tile's type and draw the appropriate
                 * image to the given position */
                 switch(Map.get(i, j)){
                    case Type.EMPTY:
                        ctx.fillStyle = 'rgb(0,64,128)';
                        ctx.fillRect(i* tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.SNAKE:
                        ctx.fillStyle = 'rgb(255,255,255)';
                        ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.FOOD:
                        ctx.fillStyle = 'rgb(128,128,0)';
                        ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break;
                }
            }
        }
    };
    init();
});
