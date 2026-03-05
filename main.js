let win=0;
let winingindex=[];
const geo=new geometry(1,2);
const canvas=document.querySelector(".canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let pole=[0,0];
let rot=[1,0,0,0];
let vert=[];
function segmentate(v,arr){
    const res=[];
    for(let k=0; k<arr.length; ++k){
        res.push(...geo.geodesic(v[arr[k][0]-1],v[arr[k][1]-1],1,true));
    }
    return res;
}
function instantiate(V){
    const res=[];
    for(const v of V){
        res.push(v[0],v[1],v[2]);
    }
    return res;
}
let obj=[];
const ev=new easyViz(canvas,new geometry(0,2));
function honeycomb(p,q){
    ev.geo.curvature=geo.honeycombcurvature(p,q);
    obj=geo.honeycomb(p,q,5);
    ev.pastelpaint(obj);
    ev.clipRadius=3;
    ev.lineQuality=16;
    //念押し
    obj=removeduplication(obj);
    for(const o of obj){
        o.owner=0;
    }
}
function removeduplication(obj){
    const res=[];
    for(const o of obj){
        if(res.findIndex(e=>ev.geo.length(geo.translate(e.center,vectorneg(o.center)))<0.001)==-1){
            o.id=res.length;
            res.push(o);
        }
    }
    return res;
}
honeycomb(3,4);
function frame(){
    ev.canvas.width=window.innerWidth;
    ev.canvas.height=window.innerHeight;
    ev.clear();
    ev.strokeStruct(obj);
    for(const o of obj){
        if(o.owner==-1){
            ev.ctx.strokeStyle="#ff0000";
            ev.line(o.vertex[0],o.center);
            ev.line(o.vertex[1],o.center);
            ev.line(o.vertex[2],o.center);
        }
        if(o.owner==1){
            ev.ctx.strokeStyle="#1900ff";
            ev.arcStroke(o.center,0.5,16);
        }
        if(o.owner==0){
            const c=ev.clip(o.center);
            ev.ctx.font = "bold 12px serif";
            ev.ctx.fillText(o.id+1,c[0],c[1]);
        }
    }
    if(win!=0){
        let name="Red";
        if(win==1){
            name="Blue";
        }
        const c=ev.clip(obj[0].center);
        ev.ctx.font = "bold 48px serif";
        if(win==-2){
            ev.ctx.fillText(`Try again!`,c[0],c[1]);
        }else{
        ev.ctx.fillText(`${name} win!`,c[0],c[1]);
        //lines
        ev.ctx.strokeStyle="#45ce1fc3";
        for(let k=0; k<4; ++k){
            ev.line(obj[winingindex[k]].center,obj[winingindex[(k+1)%4]].center);
        }
    }
    }
    requestAnimationFrame(frame);
}
frame();