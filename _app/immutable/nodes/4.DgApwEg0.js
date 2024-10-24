import{s as w,f as c,a as k,l as S,g as l,h as x,v as _,c as b,m as j,d as p,j as h,i as C,I as n,z as v}from"../chunks/scheduler.ByKY4Gzs.js";import{S as T,i as G}from"../chunks/index.Cy5lnGO6.js";function H(i){let e,a,f="Gameplay Instructions",m,o,u,d,s,y='<a href="/scoreboard" class="btn btn-primary svelte-jwakvj">Go to Scoreboard</a>';return{c(){e=c("div"),a=c("h1"),a.textContent=f,m=k(),o=c("p"),u=S(i[0]),d=k(),s=c("div"),s.innerHTML=y,this.h()},l(r){e=l(r,"DIV",{class:!0});var t=x(e);a=l(t,"H1",{class:!0,"data-svelte-h":!0}),_(a)!=="svelte-yp2jat"&&(a.textContent=f),m=b(t),o=l(t,"P",{class:!0});var g=x(o);u=j(g,i[0]),g.forEach(p),d=b(t),s=l(t,"DIV",{class:!0,"data-svelte-h":!0}),_(s)!=="svelte-1rg80si"&&(s.innerHTML=y),t.forEach(p),this.h()},h(){h(a,"class","text-3xl font-bold text-center mb-4"),h(o,"class","text-lg whitespace-pre-line text-center"),h(s,"class","text-center mt-10"),h(e,"class","container mx-auto py-10 svelte-jwakvj")},m(r,t){C(r,e,t),n(e,a),n(e,m),n(e,o),n(o,u),n(e,d),n(e,s)},p:v,i:v,o:v,d(r){r&&p(e)}}}function I(i){return[`
        Welcome to the GNSS Timed Scavenger Hunt!

        Time is Running Out!

        A timer has been started, and is beginning to tick down!
        You have to to visit physical locations marked on the map and pick up items.
        These items will add more time to the timer

        Once you are within 10 meters of an item, you will pick it up and add to the timer.
        The more markers you reach, the higher your score!

        If the time runs out, the game is over!

        You can track your progress in the scoreboard. Use your device's GNSS chip to help you
        navigate to the markers.

        How to Play:
        1. Look at the map and identify the markers.
        2. Pick up the items by walking towards them.
        3. When you're within 10 meters of a item, it will automatically be counted.
        4. Make sure the timer doesn't run out
        5. Check your score on the scoreboard page.

        Good luck and have fun!
    `]}class M extends T{constructor(e){super(),G(this,e,I,H,w,{})}}export{M as component};
