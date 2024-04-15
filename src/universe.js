import {GameState, ViewState} from './state.js';
import Realm from './realm.js';
import Soul from './soul.js';

export default class Universe {
    gameState;
    viewState;

    realms;
    souls;

    context;
    width;
    height;

    realmheight = 30;

    maxKarma;

    constructor(context, width, height, pixel_width, numSouls) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.resolution = width/pixel_width;

        this.souls = Array(numSouls);
        this.realms = Array(13);

        this.background = new Path2D();
        this.background.rect(-this.width / 2, -this.height / 2, this.width, this.height);

        this.maxKarma = 1000;

        this.initialize();
    }

    initialize() {
        this.createRealms();
        for (let i = 0; i < this.souls.length; i++) {
            this.souls[i] = new Soul(this.maxKarma);
            this.realms[this.souls[i].getRealmLevel()].addSoul(this.souls[i]);
        }

    }

    createRealms() {
        /**
         * HELLS
         */
        for (let i = 0; i < 7; i++)
            this.realms[i] = new Realm((7-i)*40 + 75, this.realmheight-1, {x: 0, y: (7-i)*this.realmheight});

        /**
         * MIDDLE WORLD
         */
        this.realms[7] = new Realm(75, this.realmheight-1, {x:0, y:0});

        /**
         * HEAVENS
         */
        let num_heavens = 6;
        let center = Math.floor(num_heavens/2);
        for (let i = 0; i < num_heavens; i++)
            this.realms[8+i] = new Realm(75 + (center-Math.abs(center-i)+1)*40, this.realmheight-1, {x:0, y: -(i+1)*this.realmheight});

        /**
         * LIBERATED REALM
         */
        this.realms[8+num_heavens] = new Realm(75, this.realmheight-1, {x:0, y: -(num_heavens+1)*this.realmheight})
    }

    update() {
    }

    draw() {
        this.context.save();
        this.context.fillStyle = '#081015';
        this.context.fill(this.background);

        this.context.scale(this.resolution, this.resolution);
        if (this.viewState == ViewState.COSMIC) {

        }
        else if (this.viewState == ViewState.LOCAL) {

        }

        this.realms.forEach(realm => realm.draw(this.context));
        this.context.restore();
    }
}