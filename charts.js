
function lineChart(el,xs,S,o={}){const W=640,H=250,m=46,X0=Math.min(...xs),X1=Math.max(...xs),all=S.flatMap(s=>s.y);
let lo=o.ymin??Math.min(...all),hi=o.ymax??Math.max(...all);if(hi==lo)hi=lo+1;
const X=x=>m+(x-X0)/((X1-X0)||1)*(W-m-14),Y=v=>H-34-(v-lo)/(hi-lo)*(H-62);
let g=`<svg viewBox="0 0 ${W} ${H}" width="100%" font-family="DM Mono,monospace" font-size="10.5" fill="#8b7c8d">`;
for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4;g+=`<line x1="${m}" x2="${W-14}" y1="${Y(v)}" y2="${Y(v)}" stroke="#eee6ec"/><text x="${m-6}" y="${Y(v)+3}" text-anchor="end">${o.fmt?o.fmt(v):v.toFixed(2)}</text>`}
const st=o.step||Math.max(1,Math.ceil(xs.length/8));xs.forEach((x,i)=>{if(i%st==0)g+=`<text x="${X(x)}" y="${H-18}" text-anchor="middle">${o.xlabels?o.xlabels[i]:x}</text>`});
g+=`<text x="${(W+m)/2}" y="${H-3}" text-anchor="middle">${o.xlabel||""}</text><text x="${m}" y="12">${o.ylabel||""}</text>`;
if(o.vline!=null)g+=`<line x1="${X(o.vline)}" x2="${X(o.vline)}" y1="20" y2="${H-34}" stroke="#d49aab" stroke-dasharray="3 3"/>`;
S.forEach((s,k)=>{g+=`<polyline fill="none" stroke="${s.c}" stroke-width="2.2" ${s.dash?'stroke-dasharray="5 4"':""} points="${xs.map((x,i)=>X(x)+","+Y(s.y[i])).join(" ")}"/>`;g+=`<text x="${W-16}" y="${26+k*14}" text-anchor="end" fill="${s.c}">${s.name}</text>`});
el.innerHTML=g+"</svg>"}
/* TOC + reading progress */
(function(){const art=document.querySelector("article");if(!art)return;const hs=[...art.querySelectorAll("h2[id]")],t=document.getElementById("toc"),bar=document.getElementById("bar");
if(t)t.innerHTML="<b>Contents</b>"+hs.map(h=>`<a href="#${h.id}">${h.lastChild.textContent}</a>`).join("");
const as=t?[...t.querySelectorAll("a")]:[];
function f(){const d=document.documentElement;bar.style.width=scrollY/(d.scrollHeight-innerHeight)*100+"%";let c=-1;hs.forEach((h,i)=>{if(h.getBoundingClientRect().top<innerHeight*.35)c=i});as.forEach((a,i)=>a.classList.toggle("on",i==c))}
addEventListener("scroll",f,{passive:true});f()})();
