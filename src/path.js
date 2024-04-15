export default class Path {
    duration;
    startTime;
    startSoulPos;
    endSoul;
    startRealm;
    endRealm;

    start;
    end;

    constructor(startSoulPos, endSoul, startRealm, endRealm, duration=200, length = 0.1) {
        this.startTime = Date.now();
        this.startSoulPos = startSoulPos;
        this.endSoul = endSoul;
        this.startRealm = startRealm;
        this.endRealm = endRealm;
        this.duration = duration*(1-length);
        this.length = length;

        this.start = {};
        this.end = {};
        this.start.x = startRealm.position.x - startRealm.width/2 + startSoulPos.x;
        this.start.y = startRealm.position.y - startRealm.height/2 + startSoulPos.y;

        this.end.x = endRealm.position.x - endRealm.width/2 + endSoul.position.x;
        this.end.y = endRealm.position.y - endRealm.height/2 + endSoul.position.y;
    }

    getPoint(timeOff=0) {
        const deltaTime = Date.now() - this.startTime;

        const deltaTimeFactor = Math.min(1, Math.max(0, deltaTime/this.duration + timeOff));

        const offsetFactor = deltaTimeFactor*deltaTimeFactor*(3-2*deltaTimeFactor);
        const offset = {};
        offset.x = (this.end.x-this.start.x) * offsetFactor;
        offset.y = (this.end.y-this.start.y)*offsetFactor;

        const point = {... this.start}

        return {x: this.start.x + offset.x, y: this.start.y + offset.y};
    }


    draw(context) {
        
        if (Date.now()-this.startTime < this.duration) {
            context.save();
            const newPath = new Path2D();
            const start = this.getPoint();
            const end = this.getPoint(this.length);
            newPath.moveTo(start.x, start.y);
            newPath.lineTo(end.x, end.y);

            const length = Math.sqrt(Math.pow(end.x-start.x, 2)+Math.pow(end.y-start.y,2));

            context.strokeStyle = this.endSoul.color;
            context.globalAlpha = 0.3
            context.stroke(newPath);
            context.globalAlpha = 1
            context.restore();
        }
        if ((Date.now() - this.startTime)/this.duration > (1-0.1)) {
            context.save();
            context.translate(this.endRealm.position.x, this.endRealm.position.y);        

            context.translate(-this.endRealm.width/2, -this.endRealm.height/2);

            this.endSoul.draw(context);
            context.restore();
        }

    }
}