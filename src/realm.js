export default class Realm {
    width;
    height;

    position;

    grid;
    capacity;

    slotQueue;

    frame;

    constructor(width, height, position) {
        this.position = {...position};
        this.width = width;
        this.height = height;
        this.capacity = 0;

        this.grid = [...Array(width)].map(e => Array(height).fill(null));

        this.initializeSlotQueue();

        // let offset = {x: -1, y: -1}
        this.frame = new Path2D();
        this.frame.rect(-1, -1, this.width+1, this.height+1);
    }
    
    initializeSlotQueue() {
        this.slotQueue = [...Array(this.width*this.height)].map((e,i) => ({x: Math.floor(i/this.height), y: i % this.height}));
        let currentIndex = this.slotQueue.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.slotQueue[currentIndex], this.slotQueue[randomIndex]] = [
            this.slotQueue[randomIndex], this.slotQueue[currentIndex]];
        }
    }

    addSoul(soul) {
        if (this.capacity == this.width * this.height)
            return false;
        this.capacity ++;

        let soulPos = this.slotQueue.pop();
        soul.position = {...soulPos};

        this.grid[soulPos.x][soulPos.y] = soul;

        return true;
    }

    removeSoul(soul) {
        this.grid[soul.position.x, soul.position.y] = null;
        this.slotQueue.unshift({...soul.position});
        soul.position = {x:null, y:null};
        this.capacity--;
    }

    draw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);        

        context.translate(-this.width/2, -this.height/2);
        context.lineWidth = 1
        context.strokeStyle = 'white';
        context.stroke(this.frame);
        
        
        
        context.save();
        // context.translate(-this.width, -this.height);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.grid[i][j] != null)
                    this.grid[i][j].draw(context);
            }
        }

        context.restore();

        context.restore();
    }
}