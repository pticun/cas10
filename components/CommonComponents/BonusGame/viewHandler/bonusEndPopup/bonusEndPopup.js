import ViewCanvasHandler from "../../../../../bower_components/html5-game-kernel/views/interfaces/ViewCanvasHandler.es6.js";

import particleConfig from "./particleConfig";
import numbersSpriteSheet from "../elements/numbersSpriteSheet";
import config from './config';

export default class BonusEndPopup extends ViewCanvasHandler {

    constructor (config, alias) {
        super ({alias});

        this.initHandler ();
    }

    initHandler() {

        this._container = new Container({
            width: this.getLayout().width,
            height: this.getLayout().height,
        });

        this.initChildrenContainer(this._container, config.children);
    }

    counterEffect (target, start, end, onCountEndCallback) {
        target.text = (Number(start).toFixed(2)).toString();
        target.value = start;
        target.scaleX = target.scaleY = 0.5;

        target.regX = target.getBounds().width/2;
        target.regY = target.getBounds().height/2;

        let dif = (end - start),
            step = dif / 95,
            currentValue = start,
            finished = false,
            lastInterval = 180,
            tween = createjs.Tween
                .get(target)
                .to ({value: end, scaleX: 1.15, scaleY: 1.15}, 850)
                .call(() => {
                    if (typeof onCountEndCallback === "function") {
                        onCountEndCallback();
                    }
                })
                .to ({scaleX: 1, scaleY: 1}, lastInterval)
                .addEventListener("change", (ev) => {
                    if (target.value - currentValue > step) {

                        currentValue = target.value;
                        target.text = (Number(target.value).toFixed(2)).toString();

                        target.regX = target.getBounds().width/2;
                        target.regY = target.getBounds().height/2;

                    } else if (ev.target.position > ev.target.duration-lastInterval && !finished) {
                        target.text = (Number(target.value).toFixed(2)).toString();

                        target.regX = target.getBounds().width/2;
                        target.regY = target.getBounds().height/2;
                        finished = true;
                    }
                });
    }

    startAnimation (success = false) {
        this._successState = undefined;
        let totalWinPosition = {x: 640, y: 400};

        if (success) {
            totalWinPosition = {x: 760, y: 400};
        }

        let data = this.getService("BonusService").getBonusContext();
        this._screenshot = this.getStageScreenshot();
        this._container.addChildAt (this._screenshot, 0);

        let finalText = new Text ({
                text: success ? "bonus_success_text" : "bonus_lose_text",
                font: "bold 35pt Arial",
                textAlign: "center",
                color: "#FFDE98",
                lineWidth: 500,
                textBaseline: "bottom",
                stroke: {
                    outline: 3,
                    color: "#342C1A",
                    offsetY: 3
                }
            }),
            finalTRec = finalText.getBounds();

        finalText.name = "finalText";
        finalText.x = 640;
        finalText.y = 300;

        finalText.cache(finalTRec.x, finalTRec.y, finalTRec.width, finalTRec.height);
        finalText.regY = finalText.cacheCanvas.height;
        let princessContainer = new Container();
        princessContainer.name = "princessContainer";
        princessContainer.x = 360;
        princessContainer.alpha = 0;

        let princess = new Bitmap ("princess_big", this.alias);
        princess.name = "princess";
        princessContainer.addChild(princess);

        let princessEye = new Bitmap ("princess_eye", this.alias);
        princessEye.name = "princessEye";
        princessEye.x = 143;
        princessEye.y = 88;
        princessEye.alpha = 0;
        princessContainer.addChild(princessEye);

        let winCounter = new BitmapText({
            text: "0",
            spriteSheet: numbersSpriteSheet
        }, this.alias);
        winCounter.name = "winCounter";
        winCounter.x = totalWinPosition.x;
        winCounter.y = totalWinPosition.y;

        let shape = new Bitmap ("shape", this.alias);
        shape.x = totalWinPosition.x;
        shape.y = totalWinPosition.y;
        shape.regX = shape.width/2;
        shape.regY = shape.height/2;
        shape.scaleX = shape.scaleY = 3;
        // shape.alpha = 0;

        let shape2 = new Bitmap ("shape", this.alias);
        shape2.x = totalWinPosition.x;
        shape2.y = totalWinPosition.y;
        shape2.regX = shape2.width/2;
        shape2.regY = shape2.height/2;
        shape2.scaleX = shape2.scaleY = 3;
        // shape2.alpha = 0;

        let target = new Sprite ({spriteSheet: {
            "images": [
                "star_particle"
            ],
            "frames": [
                [1, 1, 50, 50, 0, 0, 0]
            ],
            "animations": {
                "star_particle_anim": {"frames": [0]}
            }
        }}, this.alias);
        target.gotoAndPlay ("star_particle_anim");
        target.regX = 25;
        target.regY = 25;

        this._finalEmitter = new ProtonEmitter ({
            left: totalWinPosition.x,
            top: totalWinPosition.y,
            target:target,
            emitterConfig: particleConfig

        }, this.alias);

        this._finalEmitter.emitter.rate.timePan.a = 0;
        this._finalEmitter.emitter.rate.timePan.b = 0;

        setTimeout (() => {

            this._finalEmitter.emitter.rate.numPan.a = 0;
            this._finalEmitter.emitter.rate.numPan.b = 0;

        },200);

        const showCircleParticles = () => {
            this._finalEmitter.emitter.rate.numPan.a = 20;
            this._finalEmitter.emitter.rate.numPan.b = 30;

            this._finalEmitter.emitter.initializes.forEach( function (beh) {
                var name = beh.constructor.name;

                if (name === 'Velocity') {
                    beh.rPan.a = 3;
                    beh.rPan.b = 4;
                }
            });

            setTimeout(() => {
                this._finalEmitter.emitter.rate.numPan.a = 0;
                this._finalEmitter.emitter.rate.numPan.b = 0;
            }, 80);
        };

        let totalWin = data.total_win/100;

        if (success) {
            this._container.addChild(princessContainer);
            this._container.setChildBottom(princessContainer, 0);
        }
        this._container.addChild(shape);
        this._container.addChild(shape2);
        this._container.addChild(this._finalEmitter);
        this._container.addChild(winCounter);
        this._container.addChild(finalText);
        this._finalPrincess = princessContainer;
        this._finalText = finalText;
        this._finalWinCounter = winCounter;
        this._shape = shape;
        this._shape2 = shape2;

        this._container.getChildByName('black').alpha = 0;
        this._finalPrincess.alpha = 1;
        this._finalText.alpha = 1;
        this._finalWinCounter.alpha = 1;
        this._finalEmitter.alpha = 1;
        this._shape.alpha = 0;
        this._shape2.alpha = 0;
        this._container.alpha = 1;

        this._finalText.scaleX = this._finalText.scaleY = .4;

        return new Promise ((resolve, reject) => {
            createjs.Tween
                .get(this._container.getChildByName('black'))
                .to ({alpha: 0}, 0)
                .to({alpha: .7}, 300)
                .to ({alpha: .7}, 700)
                .call (() => {
                    resolve();
                });

            if (success) {

                this._successState = true;

                createjs.Tween
                    .get (princessEye)
                    .wait (1000)
                    .to ({alpha: 1}, 100)
                    .wait (30)
                    .to ({alpha: 0}, 200);

                createjs.Tween
                    .get(princessContainer, {override: true})
                    .to ({alpha: 1, x: 200}, 400)
                    .to ({x: 160, rotation: 0.5},20000)
                    .to ({x: 200, rotation: 0},20000);
            }

            createjs.Tween
                .get(shape, {loop:true})
                .to ({rotation: -360}, 10000);
            createjs.Tween
                .get(shape2, {loop:true})
                .to ({rotation: 360}, 15000);
            createjs.Tween
                .get(shape)
                .to ({alpha: .4}, 500);
            createjs.Tween
                .get(shape2)
                .to ({alpha: .4}, 500);

            createjs.Tween
                .get( this._finalText)
                .to ({scaleX: 1.15, scaleY: 1.15}, 160)
                .to ({scaleX: 1, scaleY: 1}, 100)
                .to ({scaleX: 1.25, scaleY: 1.25}, 4000);

            this.counterEffect (winCounter, 0, totalWin, showCircleParticles );
            this._finalEmitter.emitter.emit();
        });
    }

    endAnimation () {
        if(this._screenshot){
            this._screenshot.parent.removeChild (this._screenshot);
            delete this._screenshot;
        }
        this._container.removeChild(this._finalPrincess);
        delete this._finalPrincess;
        this._container.removeChild(this._finalText);
        delete this._finalText;
        this._container.removeChild(this._finalWinCounter);
        delete this._finalWinCounter;

        this._container.removeChild(this._finalEmitter);
        delete this._finalEmitter;
        this._container.removeChild(this._shape);
        delete this._shape;
        this._container.removeChild(this._shape2);
        delete this._shape2;
    }

    show (success) {

        this.enableModalMode();

        this._popupContainer = this.getHandler("popup").querySelector("gameBlockPopup");
        this._popupContainer.addChild (this._container);

        return this.startAnimation(success);
    }

    hide () {
        return new Promise ((resolve, reject) => {
            this.makeBlack(resolve);
        });
    }

    makeBlack(resolve){
        createjs.Tween
            .get(this._container.getChildByName('black'))
            .to ({alpha: 1}, 500)
            .call(
                ()=>{
                    resolve();
                    this._container.removeChild(this._screenshot);
                    delete this._screenshot;
                }
            )
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._finalPrincess)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._finalText)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._finalWinCounter)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._finalEmitter)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._shape)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);

        if(this._successState){

            this._successState = undefined;

            createjs.Tween.removeTweens(this._finalPrincess);

            createjs.Tween
                .get(this._finalPrincess)
                .to ({alpha: 0}, 500)
                .call(()=>{
                    this._container.removeChild(this._finalPrincess);
                });
        }

        createjs.Tween
            .get(this._shape2)
            .to ({alpha: 0}, 500)
            .to ({alpha: 0}, 500);
        createjs.Tween
            .get(this._container )
            .to({alpha: 1}, 500)
            .call(()=>{
                this._screenshot.parent.removeChild (this._screenshot);
                delete this._screenshot;
            })
            .to({alpha: 1}, 500)
            .call(() => {
                this._container.parent.removeChild (this._container);
                this.endAnimation();
                this.disableModalMode();
            });
    }

    getLayout (alias = this.alias) {
        return super.getLayout (alias);
    }

}
