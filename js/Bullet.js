//子弹类
function bullet(params){
  base(this,LSprite,[]);
  var self=this;
  self.x=params.x;
  self.y=params.y;
  self.xspeed=params.xspeed;
  self.yspeed=params.yspeed;
  self.belong=params.belong;
  self.bitmap=new LBitmap(params.bitmapdata);
  self.addChild(self.bitmap);
}
//子弹的循环运动
bullet.prototype.onframe=function(){
  var self=this;
  self.x+=self.xspeed;
  self.y+=self.yspeed;
  if(self.x<0 || self.y<0 || self.x>LGlobal.width || self.y>LGlobal.height){
    bulletLayer.removeChild(self);
  }
  if(self.isdie){
    self.slowout();
    return false;
  }
  //当我方子弹碰到敌机
    if(self.belong==player1.belong){
    	//遍历飞机层
    	for(var key in plainLayer.childList){
    		if(player1==plainLayer.childList[key]){
    			continue;
    		}
    		//如果子弹与敌机进行碰撞,敌机生命-1.子弹消失
    		if(LGlobal.hitTestArc(self,plainLayer.childList[key])){
    			// bulletLayer.removeChild(self);
    			self.bitmap.bitmapData=new LBitmapData(img_list['boom']);
            self.bitmap.scaleX=0.1;
            self.bitmap.scaleY=0.1;           
            self.bitmap.x=-self.getWidth()*0.5;
            self.bitmap.y=-self.getHeight()*0.5;
            self.isdie=true;
      		plainLayer.childList[key].hp--;
    		}
    	}
    }else{
    	if(LGlobal.hitTestArc(self,player1)){
    		self.bitmap.bitmapData=new LBitmapData(img_list['boom']);
        self.bitmap.scaleX=0.1;
        self.bitmap.scaleY=0.1;           
        self.bitmap.x=-self.getWidth()*0.5;
        self.bitmap.y=-self.getHeight()*0.5;
        self.isdie=true;
        if(!inv){
        	player1.hp--;
        } 
    	}
    }
}
bullet.prototype.slowout=function(){
  var self=this;
  if(self.alpha<=0){
    bulletLayer.removeChild(self);
  }
  self.bitmap.scaleX+=0.2;
  self.bitmap.scaleY+=0.2;
  self.bitmap.x=-self.getWidth()*0.5;
  self.bitmap.y=-self.getHeight()*0.5;
  self.alpha-=0.2;
}