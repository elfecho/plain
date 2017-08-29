function onframe(){
  //循环背景音乐
  /*if(sound.length == 0){
    sound.load(img_list['backmusic']);
    sound.addEventListener(LEvent.COMPLETE,function(){
      sound.play();
    });
  }else{
    sound.play();
  }*/
  /*if(pause){
    sound.stop();
    player1.canmove=false;
    stopLayer.addChild(stopp);
    stopLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
      stopLayer.removeChild(stopp);
      pause=false;
    });
    return false;
  }*/
	back();
	//循环飞机层所有飞机动画
  for (var key in plainLayer.childList) {
    plainLayer.childList[key].onframe();
  };
  //循环子弹层的所有子弹动画
  for (var key in bulletLayer.childList) {
    bulletLayer.childList[key].onframe();
  };
  //循环弹药库
  for(var key in ammoLayer.childList){
  	ammoLayer.childList[key].onframe();
  }
  //循环盾牌库
  for(var key in shieldLayer.childList){
  	shieldLayer.childList[key].onframe();
  }
  
  if(dan){
  	if(ammoindex++>=ammocount){
  		player1.setbulletType(0);
  		ammoindex=0;
  		dan=false;
  	}
  }else{
    ammoindex=0;
  }
  if(inv){
	if(shieldindex++>=180){
		inv=false;
		player1.bitmap.bitmapData.image=img_list['player'];
		shieldindex=0;
	}
}
  show_enemys();
	change_text();
	if(player1.hp<=0){
		game_over();
    sound.stop();
    sound.load(img_list['overmusic']);
    sound.play();
	}
  
  
}