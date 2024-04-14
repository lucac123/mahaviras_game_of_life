import {GameState, ViewState} from './state.js';
// import Realm from './realm.js';
import Soul from './soul.js';

export default class Universe {
    gameState;
    viewState;

    realms;
    souls;

    context;
    width;
    height;

    maxKarma;

    constructor(context, width, height, numSouls) {
        this.context = context;
        this.width = width;
        this.height = height;

        this.souls = Array(numSouls);
        this.realms = Array(13);

        this.background = new Path2D();
        this.background.rect(-this.width / 2, -this.height / 2, this.width, this.height);

        this.maxKarma = 1000;

        this.initialize();
    }

    initialize() {
        for (let i = 0; i < this.souls.length; i++)
            this.souls[i] = new Soul(this.maxKarma);

        console.log(this.souls);

    }

    update() {
    }

    draw() {
        this.context.fillStyle = '#081015';
        this.context.fill(this.background);
        if (this.viewState == ViewState.COSMIC) {

        }
        else if (this.viewState == ViewState.LOCAL) {

        }
    }
}