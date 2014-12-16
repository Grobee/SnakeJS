var Game = {
    context: null,
    canvas: null,

    width: 0,
    height: 0,

    score: 0,
    inProgress: false,
    keys: [],
    direction: Direction.UP,

    checkKeys: function(){
        var keyCount = 0;

        /* see if two or more keys are pressed */
        for(var i = 37; i <= 40; i++) if(this.keys[i]) keyCount++;

        if(this.keys[Direction.UP] && this.direction != Direction.DOWN && keyCount == 1)
            this.direction = Direction.UP;

        if(this.keys[Direction.DOWN] && this.direction != Direction.UP && keyCount == 1)
            this.direction = Direction.DOWN;

        if(this.keys[Direction.LEFT] && this.direction != Direction.RIGHT && keyCount == 1)
            this.direction = Direction.LEFT;

        if(this.keys[Direction.RIGHT] && this.direction != Direction.LEFT && keyCount == 1)
            this.direction = Direction.RIGHT;

        /* initialize to default */
        for(var i = 37; i <= 40; i++)
            this.keys[i] = false;
    }
};
