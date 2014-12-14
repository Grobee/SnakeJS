function Snake(x, y, width, height){
    var speed = 15;
    this.direction = Direction.UP;

    this.x = x;
    this.y = y;

    this.prevX = null;
    this.prevY = null;

    this.width = width;
    this.height = height;

    this.velocityX = speed;
    this.velocityY = speed;

    this.move = function(){
        this.prevX = this.x;
        this.prevY = this.y;

        if(this.direction == Direction.UP) this.y -= this.velocityY;
        if(this.direction == Direction.DOWN) this.y += this.velocityY;
        if(this.direction == Direction.LEFT) this.x -= this.velocityX;
        if(this.direction == Direction.RIGHT) this.x += this.velocityX;
    };

    this.moveTo = function(x, y){
        this.prevX = this.x;
        this.prevY = this.y;

        this.x = x;
        this.y = y;
    };
}
