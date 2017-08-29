var data_list = [
{path:'images/gameback.png',type:'img',name:'gameback'},
{path:'images/game_name.png',type:'img',name:'game_name'},
{path:'images/bullet1.png',type:'img',name:'bullet1'},
{path:'images/bullet2.png',type:'img',name:'bullet2'},
{path:'images/bullet3.png',type:'img',name:'bullet3'},
{path:'images/enemy1.png',type:'img',name:'enemy1'},
{path:'images/enemy2.png',type:'img',name:'enemy2'},
{path:'images/enemy3.png',type:'img',name:'enemy3'},
{path:'images/enemy4.png',type:'img',name:'enemy4'},
{path:'images/player.png',type:'img',name:'player'},
{path:'images/player_protect.png',type:'img',name:'player_protect'},
{path:'images/boom.png',type:'img',name:'boom'},
{path:'images/ufo1.png',type:'img',name:'ufo1'},
{path:'images/ufo2.png',type:'img',name:'ufo2'},
{path:'images/restart.png',type:'img',name:'restart'},
{path:'images/shield.png',type:'img',name:'shield'},
{path:'images/stop.png',type:'img',name:'stop'},
{path:'music/bgmusic.mp3',name:'backmusic'},
{path:'music/ammo.mp3',name:'ammomusic'},
{path:'music/dun.mp3',name:'dunmusic'},
{path:'music/gameover.mp3',name:'overmusic'},
];
var bullet_list=[
{startAngle:-90,angle:0,speed:10,step:6,count:1,fy:false},//正方向一发0
{startAngle:-105,angle:15,speed:10,step:6,count:3,fy:false},//正方向三发1
{startAngle:-90,angle:0,speed:10,step:5,count:3,fy:true},//正方向花式旋转2
{startAngle:90,angle:0,speed:4,step:180,count:1,fy:false},//敌军反方向一发3
{startAngle:95,angle:-10,speed:4,step:60,count:2,fy:false},//敌军反方向双发4
{startAngle:20,angle:0,speed:4,step:5,count:1,fy:false},//敌军花式旋转发5
];
var backLayer,img_list,plainLayer,bulletLayer,hp_text,score_text,maxScore,ammoLayer,shieldLayer,sound,achieve,stopLayer,stopp;
var score=0;//初始分数
var max_score=0;//最大分数
var framesindex=0;//游戏计时器
var enemyindex=0;//敌机计时器
var fll=true;
var inv=false;//是否进入无敌状态
var dan=false;//是否吃到弹药
var pause=false;
var ammoindex=0;var ammocount=600;//弹药持续时间
var shieldindex=0;var shieldcount=180;//盾牌持续时间
var listindex=0;var listcount=300;
var ammogrow=800;//弹药隔多长时间出现
var dungrow=900;//盾牌隔多长时间出现
var enemy_list=new Array();
var enemyspeed=1;
var score1=5000;
var score2=8000;
var score3=12000;
var score4=20000;
var score5=50000;
function list(speed){
	for(var i=0;i<listcount;i++){
		var x_1=Math.floor(Math.random()*286);
		var x_2=Math.floor(Math.random()*210);
		var x_3=Math.floor(Math.random()*274);
		enemy_list.push({frame:60+40*i,bullet:3,img:'enemy1',x:x_1,y:-24,move:[0,speed+0.2],hp:3,isboss:false});
		//中型飞机
		if(i%10==0 && i!=0){
			enemy_list.push({frame:63+40*i,bullet:4,img:'enemy2',x:x_2,y:-60,move:[0,speed-0.3],hp:20,isboss:false});
		}
		//大型敌机
		if(i%40==0 && i!=0){
			enemy_list.push({frame:65+40*i,bullet:5,img:'enemy3',x:x_2,y:-164,move:[0,speed-0.5],hp:50,isboss:true});
		}
	}
}
function add_list(){
	enemyspeed=1;
	if(score<score1){
		list(enemyspeed);
	}else if(score>=score1 && score<=score2){
		enemy_list.splice(0,enemy_list.length);//清空数组 
		enemyspeed+=0.2;
		list(enemyspeed);
		bullet_list[3].speed=4;
		bullet_list[3].step=120;
		bullet_list[4].speed=4;
		bullet_list[5].speed=4;
		shieldcount=200;
	}else if(score>=score2 && score<=score3){
		enemy_list.splice(0,enemy_list.length);//清空数组 
		enemyspeed+=0.4;
		list(enemyspeed);
		bullet_list[3].speed=5;
		bullet_list[3].step=120;
		bullet_list[4].speed=5;
		bullet_list[5].speed=5;
		shieldcount=220;
	}else if(score>=score3 && score<=score4){
		enemy_list.splice(0,enemy_list.length);//清空数组 
		enemyspeed+=0.8;
		listcount=500;
		list(enemyspeed);
		bullet_list[3].speed=6;
		bullet_list[3].step=120;
		bullet_list[4].speed=6;
		bullet_list[5].speed=6;
		shieldcount=250;
	}else if(score>=score4 && score<=score5){
		enemy_list.splice(0,enemy_list.length);//清空数组 
		enemyspeed+=1;
		listcount=700;
		list(enemyspeed);
		bullet_list[3].speed=7;
		bullet_list[3].step=120;
		bullet_list[4].speed=7;
		bullet_list[5].speed=7;
		shieldcount=280;
	}else if(score>=score5){
		enemy_list.splice(0,enemy_list.length);//清空数组 
		enemyspeed+=1.5;
		listcount=900;
		list(enemyspeed);
		bullet_list[3].count=0;
		bullet_list[4].count=0;
		bullet_list[5].count=0;
		shieldcount=300;
	}
}
add_list();