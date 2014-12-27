var Map = {
    rows: 0,
    columns: 0,
    tiles: [],
    tileSize: 0,

    init: function(tileSize){
        this.tileSize = tileSize;

        this.rows = Math.floor(Game.width / tileSize);
        this.columns = Math.floor(Game.height / tileSize);

        /* initialize the tiles 2d array to empty */
        for(var i = 0; i < this.rows; i++){
            this.tiles[i] = [];
            for(var j = 0; j < this.columns; j++)
                this.tiles[i][j] = Type.EMPTY;
        }
    },

    /* x and y are the indices of the 2d array tiles
    * getters and setters */
    set: function(type, x, y){ this.tiles[x][y] = type; },
    get: function(x, y){ return this.tiles[x][y]; },

    drawWalls: function(){
        var offset = 11;

        /* generate Y */
        var index = { x: Math.floor(Map.rows / 2), y: Math.floor((Map.columns / 2)) - offset};
        for(var i = 0; i < 22; i++){
            Map.set(Type.WALL, index.x, index.y);
            Map.set(Type.WALL, index.x - 1, index.y);
            index.y++;
        }

        /* generate X */
        index = { x: Math.floor((Map.rows / 2)) - offset, y: Math.floor(Map.columns / 2) };
        for(var i = 0; i < 22; i++){
            Map.set(Type.WALL, index.x, index.y);
            Map.set(Type.WALL, index.x, index.y + 1);
            index.x++;
        }
    }
};
