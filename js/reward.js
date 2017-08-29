//弹药类
function ammo(x,y,xspeed,yspeed,index,bitmapdata){
	base(this,LSprite,[]);
	var self=this;
	self.x=x;
	self.y=y;
	self.xspeed=xspeed;
	self.yspeed=yspeed;
	self.bulletindex=index;
	self.bitmap=new LBitmap(bitmapdata);
	self.addChild(self.bitmap);
}
ammo.prototype.onframe=function(){
	var self=this;
	self.x+=self.xspeed;
	self.y+=self.yspeed;
	if(self.x<-self.getWidth()||self.y<-self.getHeight()||self.x>LGlobal.width||self.y>LGlobal.height){
		ammoLayer.removeChild(self);
	}
	if(LGlobal.hitTestRect(self,player1)){
		ammoLayer.removeChild(self);
		player1.setbulletType(self.bulletindex);
		dan=true;
		achieve.load(img_list['ammomusic']);
		achieve.play();
	}
}
//盾牌类
function dun(x,y,xspeed,yspeed,bitmapdata){
	base(this,LSprite,[]);
	var self=this;
	self.x=x;
	self.y=y;
	self.xspeed=xspeed;
	self.yspeed=yspeed;
	self.bitmap=new LBitmap(bitmapdata);
	self.addChild(self.bitmap);
}
dun.prototype.onframe=function(){
	var self=this;
	self.x+=self.xspeed;
	self.y+=self.yspeed;
	if(self.x<-self.getWidth()||self.y<-self.getHeight()||self.x>LGlobal.width||self.y>LGlobal.height){
		shieldLayer.removeChild(self);
	}
	if(LGlobal.hitTestRect(self,player1)){
		shieldLayer.removeChild(self);
		player1.bitmap.bitmapData.image=img_list['player_protect'];
		inv=true;
		achieve.load(img_list['dunmusic']);
		achieve.play();
	}
	
}