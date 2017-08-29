//公共飞机类
function plain(x,y,shootx,shooty,bitmapdata,hp){
	base(this,LSprite,[]);
	var self = this;
	//自身的x,y坐标
	self.x=x;
	self.y=y;
	//枪口的x,y坐标
	self.shootx=shootx;
	self.shooty=shooty;
	self.bitmap=new LBitmap(bitmapdata);
	self.hp=hp;
	//所属阵营
	self.belong='enemy';
	//添加图片
	self.addChild(self.bitmap);
	//自动移动
	self.move=[0,0];//x轴、y轴的移动速度
	self.bulletbitmap=new LBitmapData(img_list['bullet1']);
   	self.bulletindex=0;
}
plain.prototype.setbulletType=function(index){
      this.bulletType=index;
  } 
plain.prototype.shoot=function(){
	var self=this;
  //获得当前子弹的类型
bullet_list[5].startAngle++;
  var self_bullet=bullet_list[self.bulletType];
  //设置发射子弹的间隔
  if(self.bulletindex++<self_bullet.step){
    return false;
  }
  //重新清0子弹间隔计数器
  self.bulletindex=0;
  if(!self_bullet.fy){
  	for (var i = 0; i < self_bullet.count; i++) {
      //子弹的初始位置x
        var x=self.x+self.getWidth()/2;
      //子弹的初始位置y
        var y=self.y;
        if(self.bulletType==3){
    	y=self.y+self.getHeight();
    	}
        if(self.bulletType==4){
    	y=self.y+self.getHeight()-5;
    	}
        if(self.bulletType==5){
    	y=self.y+self.getHeight()-10;
    	}
      //子弹发射的角度  
        var deg=self_bullet.startAngle+i*self_bullet.angle;
      //根据角度算出子弹x方向的速度  
        var xspeed=self_bullet.speed*Math.cos(deg*Math.PI/180);
      //根据角度算出子弹y方向的速度  
        var yspeed=self_bullet.speed*Math.sin(deg*Math.PI/180);
      //子弹所属阵营等于当前飞机阵营  
        var belong=self.belong;
      //当前飞机的子弹图片  
        var bitmapdata=self.bulletbitmap;
        var params={
           x:x,
           y:y,
           xspeed:xspeed,
           yspeed:yspeed,
           belong:belong,
           bitmapdata:bitmapdata,
        };
        //实例化子弹对象
        var bullet1=new bullet(params);
        //添加到子弹层
        bulletLayer.addChild(bullet1);
    };
  }else{
  	var x=self.x+self.getWidth()/2-40;
  	for (var i = 0; i < self_bullet.count; i++) {
   	 //子弹的初始位置x
  	if(x<=self.x+self.getWidth()/2-40 || x>=self.x+self.getWidth()/2+40){
  		var y=self.y+20;
  		//子弹发射的角度  
        var deg=self_bullet.startAngle+i*self_bullet.angle;
  		var xspeed=(self_bullet.speed-1)*Math.cos(deg*Math.PI/180);
  		var yspeed=(self_bullet.speed-1)*Math.sin(deg*Math.PI/180);
  		var belong=self.belong;
  	}else if(x==self.x+self.getWidth()/2){
        var y=self.y;
        var deg=self_bullet.startAngle+i*self_bullet.angle;
        var xspeed=self_bullet.speed*Math.cos(deg*Math.PI/180);
        var yspeed=self_bullet.speed*Math.sin(deg*Math.PI/180);
        var belong=self.belong;
      	self.bulletbitmap=new LBitmapData(img_list['bullet3']);
  	}
  	if(x<=self.x+self.getWidth()/2-40){
  		self.bulletbitmap=new LBitmapData(img_list['bullet2']);
  	}
  	var bitmapdata=self.bulletbitmap;
      self.bulletbitmap=new LBitmapData(img_list['bullet2']);
      var params={
         x:x,
         y:y,
         xspeed:xspeed,
         yspeed:yspeed,
         belong:belong,
         bitmapdata:bitmapdata,
      };
      //实例化子弹对象
      var bullet1=new bullet(params);
      //添加到子弹层
      bulletLayer.addChild(bullet1);
      x+=40;
  };
  }
}
//我方飞机
function player(x,y,shootx,shooty,bitmapdata,hp){
	base(this,plain,[x,y,shootx,shooty,bitmapdata,hp]);//继承公共飞机类
	var self=this;
	self.belong='player';
	//我机子弹图片
	self.bulletbitmap=new LBitmapData(img_list['bullet2']);
}
player.prototype.onframe=function(){
  var self=this;
  if(self.canshoot){
    self.shoot();
  }
}
//敌机类
function enemy(x,y,shootx,shooty,bitmapdata,hp){
	base(this,plain,[x,y,shootx,shooty,bitmapdata,hp]);//继承公共飞机类
	var self=this;
	self.belong='enemy';
	self.canshoot=true;
}
//拓展敌机的循环方法
enemy.prototype.onframe = function(){
	var self = this;
	self.x+=self.move[0];
	self.y+=self.move[1];
	if(self.canshoot){
		self.shoot();
	}
	if(self.x<-self.getWidth() || self.y<-self.getHeight() || self.x>LGlobal.width || self.y>LGlobal.height){
		self.move.splice(0,2);
		if(self.move.length==0){
			plainLayer.removeChild(self);
		}
	}
	if(LGlobal.hitTestArc(self,player1)){
		if(!inv){
			player1.hp=0;
			self.hp=0;
		}else{
			self.hp-=5;
		}
    }
  if(self.hp<=0){
  	// console.log(self.bulletType)
  	if(self.bulletType==3){
  		score+=100;
  	}else if(self.bulletType==4){
  		score+=200;
  	}else if(self.bulletType==5){
  		score+=500;
  		if(player1.hp<3){
  			player1.hp++;
  		}
  	}
  	if(score>=score1 && score<=score2){
  		add_list()
  	}else if(score>=score2 && score<=score3){
  		add_list()
  	}else if(score>=score3 && score<=score4){
  		add_list()
  	}else if(score>=score4 && score<=score5){
  		add_list()
  	}else if(score>=score5){
  		add_list()
  	}
  	if(score>max_score){
  		max_score=score;
  	}
    plainLayer.removeChild(self);
    change_text();
  } 
}
function show_enemys(){
	if(enemyindex>enemy_list.length-1){
		return false;
	}
  //循环炸药库的动画
	if(framesindex%ammogrow==0){
      var index=Math.ceil(Math.random()*2);
      var imgindex=index>1?1:2;
      var bitmapdata=new LBitmapData(img_list['ufo'+imgindex]);
      var x=Math.floor(Math.random()*(LGlobal.width-bitmapdata.width));
     	var ammo1=new ammo(x,-bitmapdata.height,0,1.5,index,bitmapdata);
      ammoLayer.addChild(ammo1);
  }
  //循环盾牌库的动画
  if(framesindex%dungrow==0 && framesindex!=0){
	var bitmapdata=new LBitmapData(img_list['shield']);
      var x=Math.floor(Math.random()*(LGlobal.width-bitmapdata.width));
     	var dun1=new dun(x,-bitmapdata.height,0,1.5,bitmapdata);
     	shieldLayer.addChild(dun1)
	}
if(framesindex++ == enemy_list[enemyindex].frame){
	var current_enemy=enemy_list[enemyindex];
	enemyindex++;
	if(current_enemy.isboss){
		var bitmapdata=new LBitmapData(img_list[current_enemy.img]);
  	var new_enemy=new boss(current_enemy.x,current_enemy.y,0,bitmapdata.height*0.5,bitmapdata,current_enemy.hp);
	}else{
		var bitmapdata=new LBitmapData(img_list[current_enemy.img]);
		var new_enemy=new enemy(current_enemy.x,current_enemy.y,0,bitmapdata.height*0.5,bitmapdata,current_enemy.hp);
	}
	new_enemy.move=current_enemy.move;
	new_enemy.setbulletType(current_enemy.bullet);
	plainLayer.addChild(new_enemy);
}
}