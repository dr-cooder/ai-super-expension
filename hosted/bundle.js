(()=>{var e={867:e=>{let t,n,o,a=!1;const i=e=>{const o={};let a,i;return"touchmove"===e.type?(a=e.touches[0].pageX,i=e.touches[0].pageY):"mousemove"===e.type&&(a=e.pageX,i=e.pageY),o.x=(a-n.offsetLeft)*(t.width/n.offsetWidth),o.y=(i-n.offsetTop)*(t.height/n.offsetHeight),o},r=e=>{a=!0;const{x:t,y:n}=i(e);o.beginPath(),o.moveTo(t,n),o.lineTo(t,n),o.stroke()},s=e=>{if(!a)return;const{x:t,y:n}=i(e);o.lineTo(t,n),o.stroke()},c=()=>{a=!1,o.closePath()};e.exports={init:()=>(t=document.querySelector("#drawingBoard"),n=document.querySelector("#drawingBoardOuter"),!!(t.getContext&&t.getContext("2d")&&t.toDataURL&&t.toDataURL())&&(o=t.getContext("2d"),n.onmousedown=r,n.onmousemove=s,n.onmouseup=c,n.onmouseout=c,n.ontouchstart=r,n.ontouchend=c,n.ontouchmove=s,n.ontouchcancel=c,o.lineWidth=3,o.strokeStyle="black",o.lineCap="round",o.lineJoin="round",!0)),toDataURL:()=>t.toDataURL(),drawImage:async e=>{const t=await(e=>new Promise(((t,n)=>{const o=new Image;o.crossOrigin="Anonymous",o.src=e,o.onload=()=>{t(o)},o.onerror=e=>{n(e)}})))(e);o.drawImage(t,0,0)},clear:()=>{const e=o.fillStyle;o.fillStyle="white",o.fillRect(0,0,t.width,t.height),o.fillStyle=e}}},454:e=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",n=t.length;e.exports={makeNewCode:e=>{let o;do{o="";for(let e=0;e<3;e++)o+=t[Math.floor(Math.random()*n)]}while(e&&e[o]);return o},validateCode:(e,n,o)=>{if(!e)return{message:"No game code specified.",id:"noGameCode"};const a=e.length;for(let n=0;n<a;n++){const o=e[n];if(!t.includes(o))return{message:"Invalid game code character(s).",id:"invalidGameCodeChars"}}if(3!==a)return{message:"Invalid game code length.",id:"invalidGameCodeLength"};if(n){if(!n[e])return{message:"No game with this code has been created.",id:"noGameWithCode"};if(o&&0!==n[e].state)return{message:"That game is already in progress.",id:"gameAlreadyInProgress"}}return null}}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{const e=n(454),t=n(867);let o={},a={};const i=(e,t)=>{const n=t||(e=>e),o={};for(let t=0;t<e.length;t++){const a=e[t];o[a]=document.querySelector(`#${n(a)}`)}return o},r=e=>{o[e]&&Object.keys(o).forEach((t=>{o[t].classList.toggle("activeScreen",t===e)}))},s=async e=>{try{return await e.json()}catch(e){return}},c=async(e,t)=>{const n=await fetch(`/getGame?code=${e}`,{method:"get",headers:{Accept:"application/json"}}),o=await s(n)||{};return o&&200===n.status&&o.state===t?o:new Promise((n=>{setTimeout((()=>n(c(e,t))),1e3)}))},d=async(e,n,o,i)=>{a.finalScribble.classList.remove("finalDrawingActive"),a.finalExpension.classList.add("finalDrawingActive"),a.finalScribbleOrExpension.checked=!0,a.playAgainCheckbox.checked=!1,a.whyAmIWaiting.innerHTML="Waiting for the other player to make a scribble...",a.whatAmIDrawing.innerHTML="Make a scribble!",t.clear();const s=o===i;a.submitDrawingButton.onclick=async()=>{const o=t.toDataURL();await fetch(`/submitDrawing?code=${e}&round=${n}&which=${s?"scribble":"expension"}`,{method:"post",headers:{Accept:"application/json","Content-Type":"image/png"},body:o}),s&&(a.whyAmIWaiting.innerHTML="Waiting for the other player to make an exPENsion of your scribble...",r("waiting"),await c(e,3));const l=`/getDrawing?code=${e}&round=${n}&which=scribble`,u=`/getDrawing?code=${e}&round=${n}&which=expension`;a.finalScribble.src=l,a.finalExpension.src=u,a.saveDrawingsButton.onclick=()=>{(e=>{const t=n=>{if(n>=e.length)return;const o=e[n],a=document.createElement("a");a.href=o.url,a.target="_parent","download"in a&&(a.download=o.filename),(document.body||document.documentElement).appendChild(a),a.click(),a.remove(),setTimeout((()=>t(n+1)),500)};t(0)})([{url:l,filename:`expensiongame_${e}_round${n+1}_1`},{url:u,filename:`expensiongame_${e}_round${n+1}_2`}])},r("done");const m=await c(e,1);d(e,m.round,m.player1Scribbles,i)},a.playAgainCheckbox.onclick=t=>{fetch(`/readyForNextRound?code=${e}&ready=${t.target.checked?"yes":"no"}&player=${i?"player1":"player2"}`,{method:"post",headers:{Accept:"application/json"}})},r(s?"drawing":"waiting"),s||(await c(e,2),await t.drawImage(`/getDrawing?code=${e}&round=${n}&which=scribble`),a.whatAmIDrawing.innerHTML="It's exPENsion time! Turn this scribble into a coherent drawing!",r("drawing"))};window.onload=()=>{o=i(["start","displayCode","inputCode","waiting","drawing","done","noCanvas"],(e=>`${e}Screen`)),a=i(["newGameButton","newGameError","joinGameButton","codeDisplay","codeInput","submitJoinCodeButton","joinError","whyAmIWaiting","whatAmIDrawing","submitDrawingButton","finalScribble","finalExpension","finalScribbleOrExpension","saveDrawingsButton","playAgainCheckbox"]),t.init()||r("noCanvas");const n=async()=>{a.newGameButton.disabled=!0;const e=await fetch("/newGame",{method:"post",headers:{Accept:"application/json"}}),t=await s(e);if(t){if(201===e.status){const{code:e}=t;a.codeDisplay.innerHTML=e,r("displayCode");const{player1Scribbles:n}=await c(e,1);d(e,0,n,!0)}else a.newGameError.innerHTML=t.message;a.newGameButton.disabled=!1}else n()};a.newGameButton.onclick=n,a.joinGameButton.onclick=()=>r("inputCode");const l=async()=>{a.submitJoinCodeButton.disabled=!0,a.codeInput.disabled=!0;const t=a.codeInput.value.toUpperCase(),n=e.validateCode(t);if(n)return a.submitJoinCodeButton.disabled=!1,a.codeInput.disabled=!1,void(a.joinError.innerHTML=n.message);const o=await fetch(`/joinGame?code=${t}`,{method:"post",headers:{Accept:"application/json"}}),i=await s(o);if(i)if(200===o.status){const{player1Scribbles:e}=i;d(t,0,e,!1)}else a.submitJoinCodeButton.disabled=!1,a.codeInput.disabled=!1,a.joinError.innerHTML=i.message;else l()};a.submitJoinCodeButton.onclick=l,a.codeInput.onkeypress=e=>{"Enter"===(e.code||e.key)&&l()},a.finalScribbleOrExpension.onclick=e=>{const t=e.target.checked;a.finalScribble.classList[t?"remove":"add"]("finalDrawingActive"),a.finalExpension.classList[t?"add":"remove"]("finalDrawingActive")}}})()})();