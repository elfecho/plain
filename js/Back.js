function add_back(){
	bg0 = new LBitmap(new LBitmapData(img_list['gameback']));
	bg1 = new LBitmap(new LBitmapData(img_list['gameback']));
	bgLayer.addChild(bg0);
}
function back(){
	bg0.y++;
	bg1.y++;
	if(bg0.y>0){
		bgLayer.removeChild(bg1);
		bg1.y=bg0.y-LGlobal.height;
		bgLayer.addChild(bg1);
	}
	if(bg0.y>=LGlobal.height){
		bgLayer.removeChild(bg0);
		bgLayer.addChild(bg0);
		bg0.y=0;
	}
}
function game_stop(){
	//暂停
    
    
}