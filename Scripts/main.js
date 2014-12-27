$(document).ready(function(){
    /* initialize the game / game loop */
    var gameLoop;
    var canvas = $('#mainCanvas');
    const fps = 65;
    const tileSize = 24;
    const width = 672;
    const height = 672;
    /* game objects */
    var snake;
    var food;
    /* UI elements */
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
    /* images */
    var snakeHeadImg = [];
    var snakeBodyImg = new Image();
    var foodImg = new Image();
    var wallImg = new Image();
    var bgImg = new Image();

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
        /* load images */
        for(var i = Direction.LEFT; i <= Direction.DOWN ; i++)
            snakeHeadImg[i] = new Image();

        snakeHeadImg[Direction.UP].src = "Images/snake/snake_head_up.png";
        snakeHeadImg[Direction.LEFT].src = "Images/snake/snake_head_left.png";
        snakeHeadImg[Direction.RIGHT].src = "Images/snake/snake_head_right.png";
        snakeHeadImg[Direction.DOWN].src = "Images/snake/snake_head_down.png";
        snakeBodyImg.src = "Images/snake/snake_body.png";
        wallImg.src = "Images/wall.png";
        foodImg.src = "Images/food.png";
        bgImg.src = "Images/bg.png";
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

        /* game objects */
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
        gameLoop = setTimeout(animate, fps);
    };

    var initHard = function(){
        gameDiffUI.hide();
        /* game initEasy */
        Game.init(canvas, canvas.get(0).getContext('2d'));
        Game.difficulty = Difficulty.HARD;

        /* game objects */
        snake = new Snake(tileSize);

        Map.init(tileSize);

        /* init snake */
        var index = { x: Math.floor(Map.rows - 3), y: Math.floor(Map.columns - 3) };
        for(var i = 0; i < 3; i++) {
            snake.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* init walls */
        Map.drawWalls();

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
        gameLoop = setTimeout(animate, fps);
    };

    var animate = function(){
        Game.context.clearRect(0, 0, Game.width, Game.height);

        update();
        draw();

        if(Game.inProgress) setTimeout(animate, fps);
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
                        /*Game.context.fillStyle = '#3C798C';
                        Game.context.fillRect(i* tileSize, j * tileSize, tileSize, tileSize);*/
                        Game.context.drawImage(bgImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.SNAKE:
                        if(i == snake.head.x && j == snake.head.y) {
                            switch(Game.direction){
                                case Direction.UP:
                                    Game.context.drawImage(snakeHeadImg[Direction.UP], i * tileSize, j * tileSize, tileSize, tileSize)
                                    break;
                                case Direction.LEFT:
                                    Game.context.drawImage(snakeHeadImg[Direction.LEFT], i * tileSize, j * tileSize, tileSize, tileSize)
                                    break;
                                case Direction.RIGHT:
                                    Game.context.drawImage(snakeHeadImg[Direction.RIGHT], i * tileSize, j * tileSize, tileSize, tileSize)
                                    break;
                                case Direction.DOWN:
                                    Game.context.drawImage(snakeHeadImg[Direction.DOWN], i * tileSize, j * tileSize, tileSize, tileSize)
                                    break;
                            }
                        }
                        else Game.context.drawImage(snakeBodyImg, i * tileSize, j * tileSize, tileSize, tileSize);

                        /* Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize); */
                        break;

                    case Type.FOOD:
                        /*Game.context.fillStyle = '#8C5012';
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);*/
                        Game.context.drawImage(foodImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.WALL:
                        /*Game.context.fillStyle = '#153640';
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);*/
                        Game.context.drawImage(wallImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;
                }
            }
        }
    };

    setDefault();
});
