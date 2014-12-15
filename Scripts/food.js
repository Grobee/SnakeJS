var Food = function(width, height){
    this.x = null;
    this.y = null;

    this.width = width;
    this.height = height;

    this.spawn = function(){
        var randomRow = Math.floor(Math.random() * Map.rows);
        var randomCol = Math.floor(Math.random() * Map.columns);

        this.x = Map.tiles[randomRow][randomCol].x;
        this.y = Map.tiles[randomRow][randomCol].y;
    };
};