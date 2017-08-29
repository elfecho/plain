function show_text(){
	hp_text=new LTextField();
	hp_text.x=5;
	hp_text.y=5;
	hp_text.color='red';
	hp_text.size=30;
	score_text=new LTextField();
	score_text.color='#000';
	score_text.size=20;
	score_text.x=LGlobal.width-130;
	score_text.y=5;
	maxScore=new LTextField();
	maxScore.color='#000';
	maxScore.size=20;
	maxScore.x=LGlobal.width-130;
	maxScore.y=30;
	backLayer.addChild(hp_text);
	backLayer.addChild(score_text);
	backLayer.addChild(maxScore);
	change_text();
}
function change_text(){
	hp_text.text='';
	score_text.text='SCORE:'+score;
	maxScore.text='MAX:'+max_score;
	for(var i=0;i<player1.hp;i++){
		hp_text.text+="♥ ";
	}
}
//boss
function boss(x,y,shootx,shooty,bitmapdata,hp){
	base(this,enemy,[x,y,shootx,shooty,bitmapdata,hp]);
	var self=this;
	self.shootindex=0;
}