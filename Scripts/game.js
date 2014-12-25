var Game = {
    context: null,
    canvas: null,

    width: 0,
    height: 0,

    score: 0,
    inProgress: false,
    difficulty: Difficulty.EASY,
    keys: [],
    direction: Direction.UP,

    init: function(canvas, context){
        /* game canvas*/
        this.canvas = canvas;
        this.context = context;
        this.width = canvas.width();
        this.height = canvas.height();
        /* game attributes */
        this.direction = Direction.UP;
        this.inProgress = true;
        this.score = 0;
        /* populate the keys array */
        for(var i = 37; i <= 40; i++)
            Game.keys[i] = false;
    },

    setDimensions: function(width, height){
        this.width = width;
        this.height = height;
    },

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
    },

    drawWalls: function(){
        var offset = 10;

        /* generate Y */
        var index = { x: Math.floor(Map.rows / 2), y: Math.floor((Map.columns / 2)) - offset};
        for(var i = 0; i < 21; i++){
            Map.set(Type.WALL, index.x, index.y);
            Map.set(Type.WALL, index.x - 1, index.y);
            index.y++;
        }

        /* generate X */
        index = { x: Math.floor((Map.rows / 2)) - offset, y: Math.floor(Map.columns / 2) };
        for(var i = 0; i < 20; i++){
            Map.set(Type.WALL, index.x, index.y);
            Map.set(Type.WALL, index.x, index.y + 1);
            index.x++;
        }
    }
};
