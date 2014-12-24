$(document).ready(function(){
    /* initialize the game / game loop */
    var gameLoop;
    var canvas = $('#mainCanvas');
    const tileSize = 16;
    const width = 640;
    const height = 512;
    /* game objects */
    var snake;
    var food;
    /* UI elements */
    var gameUI = $('#gamePlayUI');
    /* game score */
    var gameScoreUI = $('#gameScoreUI');
    /* game over */
    var gameOverUI = $('#gameOverUI');
    var gameRestartUI = $('#gameRestartUI');
    var goToMenuUI = $("#goToMenuUI");
    /* menu */
    var menuUI = $('#menuUI');
    var playUI = $('#playUI');
    var creditsUI = $('#creditsUI');
    /* choose game difficulty */
    var gameDiffUI = $('#choose_diff_id');
    var easyDiffBtnUI = $('#easy_btn');
    var hardDiffBtnUI = $('#hard_btn');

    $(document).keydown(function(event){ Game.keys[event.keyCode] = true; });

    gameRestartUI.click(function(){
        if(Game.difficulty == Difficulty.EASY) initEasy();
        if(Game.difficulty == Difficulty.HARD) initHard();
    });

    playUI.click(function(){ chooseMap(); });

    easyDiffBtnUI.click(function(){ initEasy(); });
    hardDiffBtnUI.click(function(){ initHard(); });
    goToMenuUI.click(function() { setDefault(); });

    var chooseMap = function(){
        gameDiffUI.show();
        menuUI.hide();
    };

    var setDefault = function(){
        /* default visibility */
        canvas.hide();
        gameScoreUI.hide();
        gameOverUI.hide();
        gameDiffUI.hide();
        menuUI.show();
        /* default values */
        canvas.attr('width', width);
        canvas.attr('height', height);
    };

    var hideGameOverUI = function(){
        gameOverUI.hide();
        gameRestartUI.hide();
    };

    var showGameOverUI = function(){
        gameOverUI.show();
        gameRestartUI.show();
    };

    var initEasy = function(){
        gameDiffUI.hide();
        /* game initEasy */
        Game.init(canvas, canvas.get(0).getContext('2d'));
        Game.difficulty = Difficulty.EASY;

        /* game objects
        * snake */
        snake = [];
        snake = new Snake(tileSize);

        Map.init(tileSize);

        var index = { x: Math.floor(Map.rows /2), y: Math.floor(Map.columns / 2) };
        for(var i = 0; i < 3; i++) {
            snake.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* food */
        food = new Food(tileSize);
        food.spawn();
        Map.set(Type.FOOD, food.x, food.y);

        /* UI */
        hideGameOverUI();
        canvas.show();
        gameScoreUI.html("Score: 0");
        gameScoreUI.show();
        menuUI.hide();
        gameLoop = setTimeout(animate, 50);
    };

    var initHard = function(){
        gameDiffUI.hide();
        /* game initEasy */
        Game.init(canvas, canvas.get(0).getContext('2d'));
        Game.difficulty = Difficulty.HARD;

        /* game objects
         * snake */
        snake = [];
        snake = new Snake(tileSize);

        Map.init(tileSize);

        /* init snake */
        var index = { x: Math.floor(Map.rows - 3), y: Math.floor(Map.columns - 3) };
        for(var i = 0; i < 3; i++) {
            snake.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* init walls */
        Game.drawWalls();

        /* food */
        food = new Food(tileSize);
        food.spawn();
        Map.set(Type.FOOD, food.x, food.y);

        /* UI */
        hideGameOverUI();
        canvas.show();
        gameScoreUI.html("Score: 0");
        gameScoreUI.show();
        menuUI.hide();
        gameLoop = setTimeout(animate, 50);
    };

    var animate = function(){
        Game.context.clearRect(0, 0, Game.width, Game.height);

        update();
        draw();

        if(Game.inProgress) setTimeout(animate, 50);
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

        if(Physics.checkIfOutOfBounds(snake.head)
            || Physics.checkCollision(snake.head)){
            /* inside */
            Game.inProgress = false;
            clearTimeout(gameLoop);
            /* outside */
            showGameOverUI();
        }
        else { Map.set(Type.SNAKE, snake.head.x, snake.head.y); }
    };

    /* update the food object's position */
    var updateFood = function(){
        if(Physics.checkCollision(snake.head, food)){
            food.spawn();
            Game.score++;
            gameScoreUI.html("Score: " + Game.score);
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
                        Game.context.fillStyle = 'rgb(0,64,128)';
                        Game.context.fillRect(i* tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.SNAKE:
                        Game.context.fillStyle = 'rgb(255,255,255)';
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.FOOD:
                        Game.context.fillStyle = 'rgb(128,128,0)';
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.WALL:
                        Game.context.fillStyle = 'rgb(192,0,0)';
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break;
                }
            }
        }
    };

    setDefault();
});
