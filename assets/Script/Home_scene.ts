// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import common from "./modules/common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_scene extends cc.Component {

	@property(cc.Label)
	label: cc.Label = null;

	@property
	text: string = 'hello';

	// LIFE-CYCLE CALLBACKS:

	onLoad () {

	}

	start() {
		cc.log("打印一段话")
		cc.log(this.text);

		(() => {
			var boom = cc.find("Canvas/boom_1") as cc.Node;
			var actionTo_max = cc.scaleTo(1.5, 1.1);
			var actionTo_min = cc.scaleTo(1.5, 0.9);
			var seq = cc.sequence([actionTo_max, actionTo_min]);
			var rf = cc.repeatForever(seq);
			boom.runAction(rf);
		})();

		(() => {
			var boom = cc.find("Canvas/boom_2") as cc.Node;
			var actionTo_max = cc.scaleTo(2.5, 1.1);
			var actionTo_min = cc.scaleTo(2.5, 0.9);
			var seq = cc.sequence([actionTo_max, actionTo_min]);
			var rf = cc.repeatForever(seq);
			boom.runAction(rf);
		})();

		(() => {
			var boom = cc.find("Canvas/boom_3") as cc.Node;
			var actionTo_max = cc.scaleTo(2.5, 0.9);
			var actionTo_min = cc.scaleTo(2.5, 1.2);
			var seq = cc.sequence([actionTo_max, actionTo_min]);
			var rf = cc.repeatForever(seq);
			boom.runAction(rf);
		})();

		(()=>{
			var start_button = cc.find("Canvas/ui_star");
			var actionBy = cc.rotateBy(1.2,360).easing(cc.easeCircleActionInOut());
			var rf = cc.repeatForever(actionBy);
			start_button.runAction(rf)
		})();

		(() => {
			// 加上背景音乐
			cc.log("背景音乐ID：", common.audio_clip_bg);
			if( common.audio_clip_bg == null){
				cc.loader.loadRes("sounds/bg.mp3", cc.AudioClip, (err, clip)=>{
					cc.log("背景音乐加载完毕", clip);
					common.audio_clip_bg = clip;
					common.audio_id = cc.audioEngine.play(clip, true, 0.5);
					cc.log("背景音乐ID：", common.audio_clip_bg);
				});
			}else{
				cc.log('背景音乐已经已被加载过')
			}
		})();
	}

	// update (dt) {}


	on_start(e){
		cc.log('点击开始',"Scene/helloworl",e)
		// cc.director.loadScene('helloworld')
		var ui_star = this.node.getChildByName('ui_star').getComponent(cc.Button);
		ui_star.interactable = false;
		
    cc.loader.loadResArray(["sounds/boom_sagalaga.mp3","sounds/ad_1.mp3"], cc.AudioClip,(err, clip) =>{
			console.log("音效加载完毕", clip );
			ui_star.interactable = true;
			common.audio_clip = clip;
      cc.director.loadScene('Game_scene');
    });
	}
}
