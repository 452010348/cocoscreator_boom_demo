// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import common from "./modules/common"
const { ccclass, property } = cc._decorator;

@ccclass
export default class Gmae_scene extends cc.Component {

  // @property(cc.Label)
  // label: cc.Label = null;

  // @property
  // text: string = 'hello';

  @property({
    type: cc.Prefab,
    tooltip: "加载resources/prefabs/balloon预制体"
  })
  balloon_prefab = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    cc.log("背景音乐ID：", common.audio_clip_bg);
    var time = Math.random() * 0.5 + 1;

    this.schedule(() => {
      var balloon = cc.instantiate(this.balloon_prefab);
      balloon.active = true;
      this.node.addChild(balloon);
    }, time);
  }

  on_btn_back_home(e) {
    cc.log('点击开始', "Home_scene", e)
    cc.director.loadScene('Home_scene');
  }
  // update (dt) {}
}
