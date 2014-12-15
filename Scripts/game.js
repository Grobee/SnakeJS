var Game = {
    inProgress: false,
    score: 0,
    canvas: { width: 0, height: 0},
    keys: [],
    checkKeys: function(snake){
        var keyCount = 0;

        /* see if two or more keys are pressed */
        for(var i = 37; i <= 40; i++)
            if(this.keys[i]) keyCount++;

        if(this.keys[Direction.UP] && snake[0].direction != Direction.DOWN && keyCount == 1)
            snake[0].direction = Direction.UP;

        if(this.keys[Direction.DOWN] && snake[0].direction != Direction.UP && keyCount == 1)
            snake[0].direction = Direction.DOWN;

        if(this.keys[Direction.LEFT] && snake[0].direction != Direction.RIGHT && keyCount == 1)
            snake[0].direction = Direction.LEFT;

        if(this.keys[Direction.RIGHT] && snake[0].direction != Direction.LEFT && keyCount == 1)
            snake[0].direction = Direction.RIGHT;

        /* initialize to default */
        for(var i = 37; i <= 40; i++)
            this.keys[i] = false;
    }
};
