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

        this.age = 0;

        this.updateStage();

        this.position = {x:null, y:null};

        this.path = new Path2D();
        this.path.rect(-0.5,-0.5,1,1);
    }

    getRealmLevel() {
        if (this.stage >= 14) {
            return 14;
        }
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
        if (this.stage >= 14)
            return true;

        this.age ++;

        const seed = Math.random();

        /**
         * LIFE
         */

        this.updateKarma();

        this.updateStage();

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

        if (this.stage >= 14)
            return false;

        return true;
    }

    updateKarma() {
        // console.log("======================");
        // console.log(this.karma);
        const karmic_multiplier = 1-this.stage/14
        const pos_multiplier = Math.max(0, (this.karma.pos-this.karma.neg)/this.maxKarma);
        const neg_multiplier = Math.max(0, (this.karma.neg-this.karma.pos)/this.maxKarma);

        const offset = {x:0, y:0};

        /**
         * CHANCE OF CERTAIN RANDOM ACTIONS
         */

        /**
         * Add Karma
         */

        // Help a soul
        offset.x += Math.random()*pos_multiplier*karmic_multiplier;

        // Hurt a soul
        offset.y += Math.random()*neg_multiplier*karmic_multiplier;


        /**
         * Rid oneself of karma
         */

        // Remove positive karma
        offset.x -= Math.random()*10*(1-karmic_multiplier);

        // Remove negative karma
        offset.y -= Math.random()*10*(1-karmic_multiplier);

        this.karma.pos = Math.abs(Math.min(this.maxKarma, this.karma.pos + offset.x));
        this.karma.neg = Math.abs(Math.min(this.maxKarma, this.karma.neg + offset.y));
    }

    updateStage() {

        const seed = Math.random();

        if (this.stage == 0)
            return;

        
        const karmaPower = this.karma.pos+this.karma.neg;
        const stageFactor = 1 - karmaPower/(2*this.maxKarma);

        const stage = Math.floor(14*Math.exp(10*(stageFactor-1)));

        this.stage = stage;

        if (this.stage == 1)
            if (seed > 0.8)
                this.stage = 3;
        else if (this.stage >= 2 && this.stage <= 5)
            if (seed > 0.99)
                this.stage = 7;
        else if (this.stage >= 10)
            if (seed > 0.99)
                this.stage == 14;

        this.updateColor();
    }

    updateColor() {
        if (this.stage <= 1)
            this.color = 'white';
        else if (this.stage <= 5)
            this.color = 'blue';
        else if (this.stage <= 13)
            this.color = 'red';
        else
            this.color = 'black'
    }

    draw(context) {
        context.save();

        context.translate(this.position.x, this.position.y);

        context.fillStyle = this.color;
        context.fill(this.path);

        if (this.stage >= 14) {
            context.lineWidth = 0.2;
            context.strokeStyle = 'white';
            context.stroke(this.path);
        }


        context.restore();
    }
}