import{s as tt,f as c,a as L,l as h,g as d,h as b,v as B,c as Y,m as u,d as _,j as m,i as Z,I as e,z as G,U as et}from"../chunks/scheduler.ByKY4Gzs.js";import{e as Q}from"../chunks/each.CU_ZqBWM.js";import{S as st,i as lt}from"../chunks/index.Cy5lnGO6.js";function R(i,t,o){const v=i.slice();return v[2]=t[o].label,v[3]=t[o].status,v}function W(i){let t,o=i[2]+"",v,g,a,y=i[3]+"",k;return{c(){t=c("li"),v=h(o),g=h(": "),a=c("span"),k=h(y),this.h()},l(x){t=d(x,"LI",{});var f=b(t);v=u(f,o),g=u(f,": "),a=d(f,"SPAN",{class:!0});var S=b(a);k=u(S,y),S.forEach(_),f.forEach(_),this.h()},h(){m(a,"class",i[3]==="Visited"?"text-green-500":"text-red-500")},m(x,f){Z(x,t,f),e(t,v),e(t,g),e(t,a),e(a,k)},p:G,d(x){x&&_(t)}}}function at(i){let t,o,v="Scoreboard",g,a,y,k,x,f,S,N,V,P,C,A,T,U,p,E,J="Marker Status:",$,M,j,I,K='<a href="/" class="btn btn-primary svelte-it1eq5">Go Back to Home</a>',D=Q(i[1]),r=[];for(let l=0;l<D.length;l+=1)r[l]=W(R(i,D,l));return{c(){t=c("div"),o=c("h1"),o.textContent=v,g=L(),a=c("div"),y=h("You have visited "),k=h(F),x=h(" out of "),f=h(X),S=h(" markers."),N=L(),V=c("div"),P=h("Your current score is: "),C=c("span"),A=h(i[0]),T=h(" points"),U=L(),p=c("div"),E=c("h2"),E.textContent=J,$=L(),M=c("ul");for(let l=0;l<r.length;l+=1)r[l].c();j=L(),I=c("div"),I.innerHTML=K,this.h()},l(l){t=d(l,"DIV",{class:!0});var n=b(t);o=d(n,"H1",{class:!0,"data-svelte-h":!0}),B(o)!=="svelte-vw8y7s"&&(o.textContent=v),g=Y(n),a=d(n,"DIV",{class:!0});var s=b(a);y=u(s,"You have visited "),k=u(s,F),x=u(s," out of "),f=u(s,X),S=u(s," markers."),s.forEach(_),N=Y(n),V=d(n,"DIV",{class:!0});var H=b(V);P=u(H,"Your current score is: "),C=d(H,"SPAN",{class:!0});var w=b(C);A=u(w,i[0]),T=u(w," points"),w.forEach(_),H.forEach(_),U=Y(n),p=d(n,"DIV",{class:!0});var q=b(p);E=d(q,"H2",{class:!0,"data-svelte-h":!0}),B(E)!=="svelte-1h80edo"&&(E.textContent=J),$=Y(q),M=d(q,"UL",{class:!0});var O=b(M);for(let z=0;z<r.length;z+=1)r[z].l(O);O.forEach(_),q.forEach(_),j=Y(n),I=d(n,"DIV",{class:!0,"data-svelte-h":!0}),B(I)!=="svelte-1hb7eui"&&(I.innerHTML=K),n.forEach(_),this.h()},h(){m(o,"class","text-3xl font-bold text-center mb-6"),m(a,"class","text-xl font-semibold text-center mb-4"),m(C,"class","text-blue-500"),m(V,"class","text-xl font-semibold text-center mb-4"),m(E,"class","text-2xl font-semibold mb-2"),m(M,"class","list-disc list-inside"),m(p,"class","text-lg text-center mb-4"),m(I,"class","text-center mt-10"),m(t,"class","container mx-auto py-10 svelte-it1eq5")},m(l,n){Z(l,t,n),e(t,o),e(t,g),e(t,a),e(a,y),e(a,k),e(a,x),e(a,f),e(a,S),e(t,N),e(t,V),e(V,P),e(V,C),e(C,A),e(C,T),e(t,U),e(t,p),e(p,E),e(p,$),e(p,M);for(let s=0;s<r.length;s+=1)r[s]&&r[s].m(M,null);e(t,j),e(t,I)},p(l,[n]){if(n&2){D=Q(l[1]);let s;for(s=0;s<D.length;s+=1){const H=R(l,D,s);r[s]?r[s].p(H,n):(r[s]=W(H),r[s].c(),r[s].m(M,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=D.length}},i:G,o:G,d(l){l&&_(t),et(r,l)}}}let F=0,X=3;function rt(i){return[F*10,[{label:"Marker 1",status:"Visited"},{label:"Marker 2",status:"Not Visited"},{label:"Marker 3",status:"Visited"}]]}class ct extends st{constructor(t){super(),lt(this,t,rt,at,tt,{})}}export{ct as component};