var Game = {
    context: null,
    canvas: null,

    width: 0,
    height: 0,

    multiplayer: false,
    scoreOne: 0,
    scoreTwo: 0,
    inProgress: false,
    difficulty: Difficulty.EASY,
    keys: [],
    winner: null,
    tie: false,

    init: function(canvas, context){
        /* game canvas*/
        this.canvas = canvas;
        this.context = context;
        this.width = canvas.width();
        this.height = canvas.height();
        /* game attributes */
        this.direction = Direction.UP;
        this.inProgress = true;
        this.scoreOne = 0;
        this.scoreTwo = 0;
        this.tie = false;
        this.winner = null;
        /* populate the keys array */
        for(var i = 37; i <= 40; i++)
            Game.keys[i] = false;

        this.keys[DirectionWASD.UP] = false;
        this.keys[DirectionWASD.LEFT] = false;
        this.keys[DirectionWASD.RIGHT] = false;
        this.keys[DirectionWASD.DOWN] = false;
    },

    checkKeys: function(obj){
        var keyCount = 0;

        /* see if two or more keys are pressed */
        for(var i = Direction.LEFT; i <= Direction.DOWN; i++) if(this.keys[i]) keyCount++;

        if(this.keys[Direction.UP] && obj.direction != Direction.DOWN && keyCount == 1)
            obj.direction = Direction.UP;

        if(this.keys[Direction.DOWN] && obj.direction != Direction.UP && keyCount == 1)
            obj.direction = Direction.DOWN;

        if(this.keys[Direction.LEFT] && obj.direction != Direction.RIGHT && keyCount == 1)
            obj.direction = Direction.LEFT;

        if(this.keys[Direction.RIGHT] && obj.direction != Direction.LEFT && keyCount == 1)
            obj.direction = Direction.RIGHT;

        /* initialize to default */
        for(var i = Direction.LEFT; i <= Direction.DOWN; i++)
            this.keys[i] = false;
    },

    checkKeysWASD: function(obj){
        var keyCount = 0;

        /* see if two or more keys are pressed */
        if(this.keys[DirectionWASD.UP]) keyCount++;
        if(this.keys[DirectionWASD.LEFT]) keyCount++;
        if(this.keys[DirectionWASD.RIGHT]) keyCount++;
        if(this.keys[DirectionWASD.DOWN]) keyCount++;

        if(this.keys[DirectionWASD.UP] && obj.direction != DirectionWASD.DOWN && keyCount == 1)
            obj.direction = DirectionWASD.UP;

        if(this.keys[DirectionWASD.DOWN] && obj.direction != DirectionWASD.UP && keyCount == 1)
            obj.direction = DirectionWASD.DOWN;

        if(this.keys[DirectionWASD.LEFT] && obj.direction != DirectionWASD.RIGHT && keyCount == 1)
            obj.direction = DirectionWASD.LEFT;

        if(this.keys[DirectionWASD.RIGHT] && obj.direction != DirectionWASD.LEFT && keyCount == 1)
            obj.direction = DirectionWASD.RIGHT;

        /* initialize to default */
        this.keys[DirectionWASD.UP] = false;
        this.keys[DirectionWASD.LEFT] = false;
        this.keys[DirectionWASD.RIGHT] = false;
        this.keys[DirectionWASD.DOWN] = false;
    }
};
