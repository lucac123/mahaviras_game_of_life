export default class Soul {
    karma = {};
    stage;

    maxKarma;

    position;

    /*
     * Random Constructor
     */
    constructor(maxKarma) {
        this.maxKarma = maxKarma;
        this.karma.pos = Math.random()*maxKarma;
        this.karma.neg = Math.random()*maxKarma;
        this.stage = Math.floor(15*Math.exp(500*(Math.random()-1)));

        this.position = {x:null, y:null};

        this.path = new Path2D();
        this.path.rect(-0.5,-0.5,1,1);
    }

    getRealmLevel() {
        let netKarma = this.karma.pos - this.karma.neg;

        let realm = netKarma/this.maxKarma;
        if (realm < 0) {
            realm = Math.ceil(realm * 7.5 + 0.5);

            return 6+realm;
        }
        else {
            realm = Math.floor(realm * 6.5 - 0.5);

            return 8 + realm;
        }
    }

    draw(context) {
        context.save();

        context.translate(this.position.x, this.position.y);

        context.fillStyle = 'white';
        context.fill(this.path);


        context.restore();
    }
}