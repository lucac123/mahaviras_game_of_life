import {GameState, ViewState} from './state.js';
import Realm from './realm.js';
import Soul from './soul.js';
import Path from './path.js';

export default class Universe {
    gameState;
    viewState;

    realms;
    souls;

    context;
    width;
    height;

    realmheight = 50;
    realmwidth = 150;

    deltaTime = 0;
    interval;

    maxKarma;

    offset = 0;
    zoom = 0;

    paths = [];

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

        this.interval = setInterval(this.update.bind(this), this.deltaTime);
    }

    initialize() {
        this.createRealms();
        for (let i = 0; i < this.souls.length; i++) {
            this.souls[i] = new Soul(this.maxKarma);
            this.addSoulToRealm(this.souls[i], 0.2, true);
        }

    }

    createRealms() {
        /**
         * HELLS
         */
        for (let i = 0; i < 7; i++)
            this.realms[i] = new Realm((7-i)*Math.round(this.realmwidth * 0.4) + this.realmwidth, this.realmheight-1, {x: 0, y: (7-i)*this.realmheight});

        /**
         * MIDDLE WORLD
         */
        this.realms[7] = new Realm(this.realmwidth, this.realmheight-1, {x:0, y:0});

        /**
         * HEAVENS
         */
        let num_heavens = 6;
        let center = Math.floor(num_heavens/2);
        for (let i = 0; i < num_heavens; i++)
            this.realms[8+i] = new Realm(this.realmwidth + (center-Math.abs(center-i)+1)*Math.round(this.realmwidth * 0.4), this.realmheight-1, {x:0, y: -(i+1)*this.realmheight});

        /**
         * LIBERATED REALM
         */
        this.realms[8+num_heavens] = new Realm(this.realmwidth, this.realmheight-1, {x:0, y: -(num_heavens+1)*this.realmheight})
    }

    addSoulToRealm(soul, capacityFactor=0.5, initial = false) {
        let realmIdx = soul.getRealmLevel();
        if (!soul)
            console.log(soul);
        while (!this.realms[realmIdx].addSoul(soul, capacityFactor)) {
            let sign = Math.sign(realmIdx - 7);
            if (sign == 0)
                sign++;
            realmIdx += sign;
        }
        if (!initial)
            this.realms[realmIdx].newsouls.push(soul);
        return realmIdx;
    }

    update() {
        this.paths = [];
        for (let realmIdx = 0; realmIdx < this.realms.length; realmIdx++) {
            const realm = this.realms[realmIdx];
            const removedSouls = realm.update();
            for (let i = 0; i < removedSouls.length; i++) {
                const startSoulPos = {...removedSouls[i].position};
                const startRealm = this.realms[realmIdx];

                const endSoul = removedSouls[i];
                const endRealm = this.realms[this.addSoulToRealm(endSoul)];

                this.paths.push(new Path(startSoulPos, endSoul, startRealm, endRealm));

                // const startRealm = this.realms[realmIdx];
                // const startPos = {x: startRealm.position.x - startRealm.width/2 + removedSouls[i].position.x,
                //                     y: startRealm.position.y - startRealm.height/2 + removedSouls[i].position.y};
                // const endIdx = this.addSoulToRealm(removedSouls[i]);
                // const endRealm = this.realms[endIdx];

                // const endPos = {x: endRealm.position.x - endRealm.width/2 + removedSouls[i].position.x,
                // y: endRealm.position.y - endRealm.height/2 + removedSouls[i].position.y};

                // this.paths.push(new Path(startPos, endPos))
            }
        }
    }

    draw() {
        this.context.save();
        this.context.fillStyle = '#081015';
        this.context.fill(this.background);

        this.context.scale(Math.exp(this.zoom), Math.exp(this.zoom));
        this.context.translate(0, this.offset);

        this.context.scale(this.resolution, this.resolution);

        this.realms.forEach(realm => realm.draw(this.context));

        // this.paths.forEach(path => path.draw(this.context));

        this.context.restore();

    }
}