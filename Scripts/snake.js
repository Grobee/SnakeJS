function Snake(tileSize){
    this.parts = [];

    this.head = null;
    this.tail = null;

    this.width = tileSize;
    this.height = tileSize;

    this.move = function(){
        var newCoords = { x: this.parts[0].x, y: this.parts[0].y};

        if(Game.direction == Direction.UP) newCoords.y--;
        if(Game.direction == Direction.DOWN) newCoords.y++;
        if(Game.direction == Direction.LEFT) newCoords.x--;
        if(Game.direction == Direction.RIGHT) newCoords.x++;

        this.parts.unshift({x: newCoords.x, y: newCoords.y});
        this.head = this.parts[0];
    };

    this.add = function(x, y){
        this.parts.unshift({x: x, y: y});
        this.head = this.parts[0];
        this.tail = this.parts[this.parts.length - 1];
    };

    this.removeLast = function(){
        Map.set(Type.EMPTY, this.tail.x, this.tail.y);
        this.parts.pop();
        this.tail = this.parts[this.parts.length - 1];
    };
}
