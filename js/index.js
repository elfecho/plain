LInit(1000/60,'lufylegend',480,852,main);
function main(){
	 LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LGlobal.screen(LStage.FULL_SCREEN);
	backLayer = new LSprite();
	addChild(backLayer);
	//加载进度条
	loadLayer = new LoadingSample5();
	backLayer.addChild(loadLayer);
	//加载图片
	LLoadManage.load(data_list,function(per){
		loadLayer.setProgress(per);
	},gameInit);
}
function gameInit(result){
	img_list=result;
	backLayer.removeChild(loadLayer);
	//游戏开始背景
	backLayer.addChild(new LBitmap(new LBitmapData(img_list['gameback'])));
	var game_name = new LBitmap(new LBitmapData(img_list['game_name']));
	game_name.x=(LGlobal.width-game_name.getWidth())/2;
	game_name.y=70;
	backLayer.addChild(game_name);
	var start_text=new LTextField();
	start_text.text = "开始游戏";
	start_text.color = "#8f9293";
	start_text.size = 35;
	start_text.weight='bold';
	start_text.x=(LGlobal.width-start_text.getWidth())/2;
	start_text.y=450;
	backLayer.addChild(start_text);
	start_text.addEventListener(LMouseEvent.MOUSE_DOWN,game_start);
}
function game_start(){
	backLayer.die();
	backLayer.removeAllChild();
	framesindex=0;
	enemyindex=0;
	score=0;
	//添加背景层
	bgLayer = new LSprite();
	backLayer.addChild(bgLayer);
	add_back();
	//添加飞机层
	plainLayer=new LSprite();
	backLayer.addChild(plainLayer);
	//添加子弹层
	bulletLayer=new LSprite();
	backLayer.addChild(bulletLayer);
	//添加盾牌层
	shieldLayer=new LSprite();
	backLayer.addChild(shieldLayer);
	//添加弹药层
	ammoLayer=new LSprite();
	backLayer.addChild(ammoLayer);
	//背景音乐
	sound = new LSound();
	backLayer.addChild(sound);
	//其他音乐
	achieve = new LSound();
	backLayer.addChild(achieve);

	stopLayer = new LSprite();
    backLayer.addChild(stopLayer);
    stopp = new LBitmap(new LBitmapData(img_list['stop']));
    stopp.x=(LGlobal.width-stopp.getWidth())/2;
    stopp.y=(LGlobal.height-stopp.getHeight())/2;
    
    
	var player1bitmapdata = new LBitmapData(img_list['player']);
	player1=new player((LGlobal.width-player1bitmapdata.width)/2,LGlobal.height-player1bitmapdata.height,player1bitmapdata.width,player1bitmapdata.height/2,player1bitmapdata,3);
	show_text();//显示血量,分数
  	player1.setbulletType(0);//设置子弹类型
	plainLayer.addChild(player1);
	//移动事件
	player1.addEventListener(LMouseEvent.MOUSE_DOWN, onMouseDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, onMouseMove);
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}
//事件层
function onMouseDown(){
	if(fll==true){
		player1.canmove=true;
		player1.canshoot=true;
		fll=false;
	}else{
		player1.canmove=false;
		player1.canshoot=false;
		fll=true;
		pause=true;
	}
}
/*function onMouseUp(event) {  
  player1.canmove=false;
  player1.canshoot=false;
}*/ 
function onMouseMove(event){
	if(player1.canmove==true){
		player1.x=event.offsetX-player1.getWidth()/2;
		player1.y=event.offsetY-player1.getHeight()/2;
		if(event.offsetX-player1.getWidth()/2<0){
			player1.x=0;
		}
		if(event.offsetX-player1.getWidth()/2>LGlobal.width-player1.getWidth()){
			player1.x=LGlobal.width-player1.getWidth();
		}
		if(event.offsetY-player1.getHeight()/2<0){
			player1.y=0;
		}
		if(event.offsetY-player1.getHeight()/2>LGlobal.height-player1.getHeight()){
			player1.y=LGlobal.height-player1.getHeight();
		}
		LTweenLite.to(player1,0.05,{x:player1.x,y:player1.y,ease:LEasing.Quad.easeInOut});
	}
}