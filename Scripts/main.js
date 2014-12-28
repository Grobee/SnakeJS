$(document).ready(function(){
    /* initialize the game / game loop */
    var gameLoop;
    var canvas = $('#mainCanvas');
    const fps = 65;
    const tileSize = 24;
    const width = 672;
    const height = 672;
    /* game objects */
    var snakeOne;
    var snakeTwo;
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
    var onePlayerUI = $('#onePlayerUI');
    var twoPlayerUI = $('#twoPlayerUI');
    var creditsUI = $('#creditsUI');
    /* choose game difficulty */
    var gameDiffUI = $('#choose_diff_id');
    var easyDiffBtnUI = $('#easy_btn');
    var hardDiffBtnUI = $('#hard_btn');
    /* images */
    var foodImg = new Image();
    var wallImg = new Image();
    var bgImg = new Image();

    $(document).keydown(function(event){ Game.keys[event.which] = true; console.log(Game.keys); });

    gameRestartUI.click(function(){
        /* snake defaults */
        snakeOne = new Snake(tileSize, Direction.UP);
        snakeTwo = new Snake(tileSize, DirectionWASD.DOWN);

        loadImages();

        if(Game.difficulty == Difficulty.EASY) initEasy();
        if(Game.difficulty == Difficulty.HARD) initHard();
    });

    onePlayerUI.click(function(){ Game.multiplayer = false; chooseMap(); });
    twoPlayerUI.click(function() { Game.multiplayer = true; chooseMap(); });

    easyDiffBtnUI.click(function(){ initEasy(); });
    hardDiffBtnUI.click(function(){ initHard(); });
    goToMenuUI.click(function() { setDefault(); });

    var chooseMap = function(){
        gameDiffUI.show();
        menuUI.hide();
    };

    var setDefault = function(){
        snakeOne = new Snake(tileSize, Direction.UP);
        snakeTwo = new Snake(tileSize, DirectionWASD.DOWN);
        /* default visibility */
        canvas.hide();
        gameScoreUI.hide();
        gameOverUI.hide();
        gameDiffUI.hide();
        menuUI.show();
        /* default values */
        canvas.attr('width', width);
        canvas.attr('height', height);

        loadImages();
    };

    var loadImages =  function(){
        /* pics */
        /* load images */
        /* snake one */
        for(var i = Direction.LEFT; i <= Direction.DOWN ; i++)
            snakeOne.headImg[i] = new Image();

        snakeOne.headImg[Direction.UP].src = "Images/snake/snake_head_up.png";
        snakeOne.headImg[Direction.LEFT].src = "Images/snake/snake_head_left.png";
        snakeOne.headImg[Direction.RIGHT].src = "Images/snake/snake_head_right.png";
        snakeOne.headImg[Direction.DOWN].src = "Images/snake/snake_head_down.png";

        snakeOne.bodyImg.src = "Images/snake/snake_body.png";

        /* snake two */
        if(Game.multiplayer){
            /* load images */
            snakeTwo.headImg[DirectionWASD.UP] = new Image();
            snakeTwo.headImg[DirectionWASD.LEFT] = new Image();
            snakeTwo.headImg[DirectionWASD.RIGHT] = new Image();
            snakeTwo.headImg[DirectionWASD.DOWN] = new Image();

            snakeTwo.headImg[DirectionWASD.UP].src = "Images/snake/snake_head_up.png";
            snakeTwo.headImg[DirectionWASD.LEFT].src = "Images/snake/snake_head_left.png";
            snakeTwo.headImg[DirectionWASD.RIGHT].src = "Images/snake/snake_head_right.png";
            snakeTwo.headImg[DirectionWASD.DOWN].src = "Images/snake/snake_head_down.png";

            snakeTwo.bodyImg.src = "Images/snake/snake_body.png";
        }

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
        Map.init(tileSize);

        /* snake #1 */
        var index = { x: Math.floor(Map.rows /2), y: Math.floor(Map.columns / 2) };
        for(var i = 0; i < 3; i++) {
            snakeOne.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* snake #2 */
        if(Game.multiplayer){
            var index = { x: 4, y: 4 };
            for(var i = 0; i < 3; i++) {
                snakeTwo.add(index.x, index.y - i);
                Map.set(Type.ENEMY, index.x, index.y - i);
            }
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

        Map.init(tileSize);

        /* init snake */
        var index = { x: Math.floor(Map.rows - 3), y: Math.floor(Map.columns - 3) };
        for(var i = 0; i < 3; i++) {
            snakeOne.add(index.x, index.y - i);
            Map.set(Type.SNAKE, index.x, index.y - i);
        }

        /* snake #2 */
        if(Game.multiplayer){
            var index = { x: 4, y: 4 };
            for(var i = 0; i < 3; i++) {
                snakeTwo.add(index.x, index.y - i);
                Map.set(Type.ENEMY, index.x, index.y - i);
            }
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
        Game.checkKeys(snakeOne);
        if(Game.multiplayer) Game.checkKeysWASD(snakeTwo);

        updateSnake();
        /* see if our snake hit a dead end */
        if(!Game.inProgress) return;
        updateFood();
    };

    /* update the snake object's movement */
    var updateSnake = function(){
        snakeOne.move();

        if(Game.multiplayer){
            snakeTwo.move();
            Map.set(Type.ENEMY, snakeTwo.head.x, snakeTwo.head.y);
        }

        if(Physics.checkIfOutOfBounds(snakeOne.head)
            || Physics.checkCollision(snakeOne.head)){
            /* inside */
            Game.inProgress = false;
            clearTimeout(gameLoop);
            /* outside */
            showGameOverUI();
        }
        else { Map.set(Type.SNAKE, snakeOne.head.x, snakeOne.head.y); }
    };

    /* update the food object's position */
    var updateFood = function(){
        if(Physics.checkCollision(snakeOne.head, food)){
            food.spawn();
            Game.score++;
            gameScoreUI.html("Score: " + Game.score);
            Map.set(Type.FOOD, food.x, food.y);
        }
        else {
            snakeOne.removeLast();
        }

        if(Game.multiplayer){
            if(Physics.checkCollision(snakeTwo.head, food)){
                food.spawn();
                Game.score++;
                gameScoreUI.html("Score: " + Game.score);
                Map.set(Type.FOOD, food.x, food.y);
            }
            else {
                snakeTwo.removeLast();
            }
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
                        Game.context.drawImage(bgImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.SNAKE:
                        /* if the snake's head needs to be drawed */
                        if(i == snakeOne.head.x && j == snakeOne.head.y) {
                            switch(snakeOne.direction){
                                case Direction.UP:
                                    Game.context.drawImage(snakeOne.headImg[Direction.UP], i * tileSize, j * tileSize, tileSize, tileSize);
                                    break;
                                case Direction.LEFT:
                                    Game.context.drawImage(snakeOne.headImg[Direction.LEFT], i * tileSize, j * tileSize, tileSize, tileSize);
                                    break;
                                case Direction.RIGHT:
                                    Game.context.drawImage(snakeOne.headImg[Direction.RIGHT], i * tileSize, j * tileSize, tileSize, tileSize);
                                    break;
                                case Direction.DOWN:
                                    Game.context.drawImage(snakeOne.headImg[Direction.DOWN], i * tileSize, j * tileSize, tileSize, tileSize);
                                    break;
                            }
                        } /* if its body */
                        else Game.context.drawImage(snakeOne.bodyImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.FOOD:
                        Game.context.drawImage(foodImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.WALL:
                        Game.context.drawImage(wallImg, i * tileSize, j * tileSize, tileSize, tileSize);
                        break;

                    case Type.ENEMY:
                        Game.context.fillStyle = "rgb(128,128,0)";
                        Game.context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                        break
                }
            }
        }
    };
    setDefault();
});
