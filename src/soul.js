export default class Soul {
    karma = {};
    stage;

    color = 'white';

    maxKarma;

    position;

    age;

    /*
     * Random Constructor
     */
    constructor(maxKarma) {
        this.maxKarma = maxKarma;
        this.karma.pos = Math.random()*maxKarma;
        this.karma.neg = Math.random()*maxKarma;
        this.stage = Math.floor(15*Math.exp(500*(Math.random()-1)));
        this.age = 0;

        this.position = {x:null, y:null};

        this.path = new Path2D();
        this.path.rect(-0.5,-0.5,1,1);
    }

    getRealmLevel() {
        if (this.stage == 14)
            return 13;
        let netKarma = this.karma.pos - this.karma.neg;

        let realm = netKarma/this.maxKarma;
        if (realm < 0) {
            realm = Math.ceil(realm * 7.5 + 0.5);

            realm = 6+realm;
        }
        else {
            realm = Math.floor(realm * 6.5 - 0.5);

            realm = 8 + realm;
        }

        return Math.max(0, Math.min(13, realm));
    }

    update(neighbors) {
        this.age ++;

        const seed = Math.random();

        this.karma.pos += Math.random()*5;
        this.karma.neg += Math.random()*5;

        /**
         * LIFE
         */

        /**
         * DEATH
         */

        if (neighbors.length > 3) {
            // this.color = 'blue';
            return false;

        }

        if (seed > Math.exp(-0.01*this.age)) {
            // this.color = 'red';
            return false;

        }

        return true;
    }

    draw(context) {
        context.save();

        context.translate(this.position.x, this.position.y);

        context.fillStyle = this.color;
        context.fill(this.path);


        context.restore();
    }
}