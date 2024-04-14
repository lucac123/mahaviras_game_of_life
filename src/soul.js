export default class Soul {
    karma = {};
    stage;

    /*
     * Random Constructor
     */
    constructor(maxKarma) {
        this.karma.pos = Math.random()*maxKarma;
        this.karma.neg = Math.random()*maxKarma;
        this.stage = Math.floor(15*Math.exp(500*(Math.random()-1)))
    }

    draw(context) {
        
    }
}