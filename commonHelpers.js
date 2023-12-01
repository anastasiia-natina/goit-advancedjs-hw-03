import{a as h,S as f,i as d}from"./assets/vendor-fdf40887.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const u="live_jJ5aLGn50ZkM07nMxodxDW7fSjdGGLoPRReFN6eyXEoTBwtctXneqCxESjN80VWx",y="https://api.thecatapi.com/v1",p=h.create({baseURL:y,headers:{"x-api-key":u,"Content-Type":"application/json"}});function m(){return p.get("/breeds").then(e=>e.data).catch(e=>(console.error(`Error fetching breeds: ${e}`),Promise.resolve([])))}function g(e){return p.get(`/images/search?breed_ids=${e}&api_key${u}`).then(r=>r.data).catch(r=>{throw new Error(r.response.statusText)})}const s=document.querySelector(".breed-select"),c=document.querySelector(".cat-info"),l=document.querySelector(".loader");function v(e){return e.map(r=>{const{name:o,id:n}=r;return`<option value="${n}">${o}</option>`}).join("")}function b(e){const{url:r,breeds:{0:{description:o,temperament:n,name:t}}}=e[0];return`<h2>${t}</h2>
  <div class="info-container">
  <img width="500" src="${r}" class="cat-image">
  <div class="text-container">
  <p class="cat-p">${o}</p>
  <p class="cat-p">
  <span class="bold">Temperament: </span>${n}</p>
  </div>
  </div>`}m().then(e=>{Array.isArray(e)&&e.length>0?(s.innerHTML='<option data-placeholder="true"></option>'+v(e),l.style.visibility="hidden"):s.innerHTML=""}).then(()=>{new f({select:"#single",settings:{placeholderText:"Select a cat"},events:{afterChange:()=>{c.style.visibility="hidden",l.style.visibility="visible",g(s.value).then(e=>{if(l.style.visibility="hidden",c.style.visibility="visible",c.innerHTML=b(e),e.length===0){s.innerHTML="",d.error({title:"Error!",message:"Oops! Something went wrong while loading breeds.",position:"topRight"});return}}).catch(e=>{l.style.visibility="hidden",c.style.visibility="hidden",console.error(`Error occurred: ${e}`),d.error({title:"Error!",message:"Oops! Something went wrong while loading the cat.",position:"topRight"})})}}})});
//# sourceMappingURL=commonHelpers.js.map