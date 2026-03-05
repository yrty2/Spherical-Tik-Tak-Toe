let turn=0;
const keys={
    w:false,
    a:false,
    s:false,
    d:false,
    pointer:false
};
function keyframe(){
    let mv=[0,0,0];
    if(keys.w){
        mv[2]++;
    }
    if(keys.a){
        mv[0]--;
    }
    if(keys.s){
        mv[2]--;
    }
    if(keys.d){
        mv[0]++;
    }
    if(keys.shiftl){
        mv[1]--;
    }
    if(keys.space){
        mv[1]++;
    }
    const s=vectorlength(mv);
    if(s>0){
    }
    requestAnimationFrame(keyframe);
}
keyframe();
window.addEventListener("keydown",e=>{
    if(e.code=="KeyW"){
        keys.w=true;
    }
    if(e.code=="KeyA"){
        keys.a=true;
    }
    if(e.code=="KeyS"){
        keys.s=true;
    }
    if(e.code=="KeyD"){
        keys.d=true;
    }
    if(e.code=="Space"){
        keys.space=true;
    }
    if(e.code=="ShiftLeft"){
        keys.shiftl=true;
    }
});
window.addEventListener("keyup",e=>{
    if(e.code=="KeyW"){
        keys.w=false;
    }
    if(e.code=="KeyA"){
        keys.a=false;
    }
    if(e.code=="KeyS"){
        keys.s=false;
    }
    if(e.code=="KeyD"){
        keys.d=false;
    }
    if(e.code=="Space"){
        keys.space=false;
    }
    if(e.code=="ShiftLeft"){
        keys.shiftl=false;
    }
});
canvas.addEventListener("pointerdown",e=>{
    if(e.button==0){
    keys.pointer=true;
    }
});
canvas.addEventListener("pointerup",e=>{
    if(e.button==0){
    keys.pointer=false;
    }
});
canvas.addEventListener("pointermove",e=>{
    const dv=vectormul([e.movementX,e.movementY],1.5/ev.scaler);
    if(keys.pointer){
        pole=ev.geo.translate(pole,dv);
        for(const o of obj){
            o.center=ev.geo.translate(o.center,dv);
            for(let k=0; k<o.vertex.length; ++k){
                let v=o.vertex[k];
                o.vertex[k]=ev.geo.translate(v,dv);
            }
        }
    }
});
canvas.addEventListener("contextmenu",e=>{
  e.preventDefault();
});
canvas.addEventListener("pointerup",e=>{
    if(e.button==2){
        const pos=vectormul([(canvas.width/canvas.height)*(2*e.offsetX/canvas.width-1),-(2*e.offsetY/canvas.height-1)],ev.clipRadius);
        const id=select(pos);
        if(obj[id].owner==0 && win==0){
        obj[id].owner=2*(turn%2)-1;
        turn++;
        check();
        }
    }
});
function select(pos){
    //距離から推測(最も近いところにする)
    let dist=99999999999999999;
    let res=-1;
    for(let k=0; k<obj.length; ++k){
        const d=geo.distance(pos,obj[k].center);
        if(d<dist){
            dist=d;
            res=k;
        }
    }
    return res;
}
function pattern(a,b,c,d){
    if(obj[a].owner==1 && obj[b].owner==1 && obj[c].owner==1 && obj[d].owner==1){
        win=1;
        winingindex=[a,b,c,d]
    }
    if(obj[a].owner==-1 && obj[b].owner==-1 && obj[c].owner==-1 && obj[d].owner==-1){
        win=-1;
        winingindex=[a,b,c,d];
    }
}
function check(){
    /*pattern(0,1,3,5);
    pattern(0,1,4,2);
    pattern(0,2,3,6);

    pattern(1,5,4,7);
    pattern(2,4,6,7);
    pattern(3,5,6,7);*/
    //特殊
    pattern(0,1,7,6);
    pattern(0,3,7,4);
    pattern(0,2,7,5);

    pattern(1,4,3,6);
    pattern(1,5,2,6);
    pattern(2,3,4,5);
    for(const o of obj){
        if(o.owner==0){
            return;
        }
    }
    if(win==0){
        win=-2;
    }
}