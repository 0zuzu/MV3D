import mv3d from './mv3d.js';

const gameMap_parallaxOx = Game_Map.prototype.parallaxOx;
Game_Map.prototype.parallaxOx = function() {
	let ox = gameMap_parallaxOx.apply(this,arguments);
	if (mv3d.mapDisabled){ return ox; }
	if(this._parallaxLoopX){
		return ox - mv3d.blendCameraYaw.currentValue()*816/90;
	}
	return ox;
};
const gameMap_parallaxOy = Game_Map.prototype.parallaxOy;
Game_Map.prototype.parallaxOy = function() {
	let oy = gameMap_parallaxOy.apply(this,arguments);
	if (mv3d.mapDisabled){ return oy; }
	if(this._parallaxLoopY){
		return oy - mv3d.blendCameraPitch.currentValue()*816/90;
	}
    return oy;
};

['setDisplayPos','scrollUp','scrollDown','scrollLeft','scrollRight'].forEach(method=>{
	const _oldMethod=Game_Map.prototype[method];
	Game_Map.prototype[method]=function(){
		if (mv3d.isDisabled()){ _oldMethod.apply(this,arguments); }
	}
});
const _updateScroll = Game_Map.prototype.updateScroll;
Game_Map.prototype.updateScroll = function() {
	if (mv3d.mapDisabled){ return _updateScroll.apply(this,arguments); }
    this._displayX = -mv3d.blendCameraYaw.currentValue()*816/3600;
    this._displayY = -mv3d.blendCameraPitch.currentValue()*816/3600;
};

Game_CharacterBase.prototype.isNearTheScreen = function() {
	return Math.abs(this.x - mv3d.cameraStick.x)<=mv3d.RENDER_DIST
	&& Math.abs(this.y - mv3d.cameraStick.y)<=mv3d.RENDER_DIST;
};
