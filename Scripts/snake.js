function Snake(tileSize, direction){
    this.parts = [];

    this.head = null;
    this.tail = null;

    this.direction = direction;
    this.collisionWith = null;

    this.width = tileSize;
    this.height = tileSize;

    this.headImg = [];
    this.bodyImg = new Image();

    this.move = function(){
        var newCoords = { x: this.parts[0].x, y: this.parts[0].y};

        if(this.direction == Direction.UP || this.direction == DirectionWASD.UP) newCoords.y--;
        if(this.direction == Direction.DOWN || this.direction == DirectionWASD.DOWN) newCoords.y++;
        if(this.direction == Direction.LEFT || this.direction == DirectionWASD.LEFT) newCoords.x--;
        if(this.direction == Direction.RIGHT || this.direction == DirectionWASD.RIGHT) newCoords.x++;

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

    this.removeFirst = function(){
        this.parts.shift();
        this.head = this.parts[0];
    }
}
