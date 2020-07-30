// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import common from "../modules/common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	// @property(cc.Label)
	// label: cc.Label = null;

	// @property
	// text: string = 'hello';

	//动画播放名称
	private ani_type: number = Math.random() * 7 + 1 << 0;

	//移动速度
	private speed: number = Math.random() * 300 + 200 << 0;

	//缩放比例
	private scale: number = Math.random() * 0.25 + 0.05;

	//是否移动
	private is_moving: Boolean = false;

	// // 720/2=360  540/2=270   360-270=90
	private pos_x: number = 90;
	private pos_y: number = Math.random() * -400;

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {}

	start() {
		(()=>{
			var audio_chip = cc.url.raw('resources/sounds/ad_1.mp3') as unknown as cc.AudioClip;
			var audioID = cc.audioEngine.play(audio_chip, false, 0.5);
		})();

		(() => {
			this.pos_x = (Math.random() - 0.5) * (360 - (1135 * this.scale) / 7);
			cc.log(this.pos_x, this.pos_y);
			this.node.x = this.pos_x;
			this.node.y = this.pos_y;
		})();

		(() => {
			cc.log(`播放: ${this.ani_type} 动画`)
			var anim = this.node.getChildByName('anim');
			var ske = anim.getComponent(sp.Skeleton)
			ske.setAnimation(0, `animation_${this.ani_type}_stop`, true)

			var click = this.node.getChildByName('click');
			click.on(cc.Node.EventType.TOUCH_START, (e: cc.Event) => {
				e.stopPropagationImmediate();
				// 判断 用户点击 圆角处
				// let point = e.getLocation();
				// let retWord = click.getBoundingBoxToWorld();
				// let space = 40;
				// retWord.width -= space;
				// retWord.width = retWord.width <= 0 ? 0 : retWord.width;
				// retWord.height -= space;
				// retWord.height = retWord.height <= 0 ? 0 : retWord.height;
				// if (retWord.contains(point)) {
				//     this.node._touchListener.setSwallowTouches(false);
				// } else {
				//     this.node._touchListener.setSwallowTouches(true);
				// }

				if (this.is_moving == true) {
					cc.log('气球被点击');
					(()=>{
						//播放音效
						var audio_chip = cc.url.raw('resources/sounds/boom_sagalaga.mp3') as unknown as cc.AudioClip;
						var audioID = cc.audioEngine.play(audio_chip, false, 0.5);
						cc.audioEngine.setCurrentTime(audioID, 0);
						cc.log( audioID );
					})();

					(()=>{
						this.is_moving = false;
						ske.setAnimation(0, `animation_${this.ani_type}_click`, false);
						ske.setEndListener(() => {
							cc.log('气球爆炸完毕')
							this.node.removeFromParent()
						})
					})();
				} else {
					cc.log('气球不能被点击')
				}
			}, this)
		})();


		(() => {
			var anim = this.node.getChildByName('in_anim');
			var ske = anim.getComponent(sp.Skeleton)
			ske.setAnimation(0, "animation", false);
		})();


		(() => {
			this.node.scale = 0;
			var actionTo = cc.scaleTo(0.5, this.scale).easing(cc.easeBackOut());
			var func = cc.callFunc(() => {
				cc.log('回调', this.node)
				this.is_moving = true;
			}, this);
			var seq = cc.sequence([actionTo, func]); // 动画队列执行
			this.node.runAction(seq);
		})();

	}

	update(dt) {
		if (this.is_moving === false) {
			return
		}
		var sy = dt * this.speed;
		this.node.y += sy;
		// cc.log(this.node.y);
		if (this.node.y >= 1024) {
			this.node.removeFromParent();
			console.log('气球超出屏幕！')
		}
	}


}