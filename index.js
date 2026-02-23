import{a as h,i as c,S as q}from"./assets/vendor-D-hiYp1V.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const e of l.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&i(e)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();h.defaults.baseURL="https://pixabay.com/api/";let E=15;async function f(s,t=1){try{const i=(await h.get("",{params:{key:"54641961-e96e5217be963f5aab39f9ddc",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E,page:t}})).data;return i.hits.length===0&&c.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",timeout:5e3}),i}catch(r){throw c.error({title:"Error",message:r.message,position:"center",timeout:5e3}),r}}const g=new q(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function L(s){const t=document.querySelector(".gallery"),r=s.map(e=>`
<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img 
      class="gallery-image" 
      src="${e.webformatURL}" 
      alt="${e.tags}"
    />
  </a>
  <div class="info">
    <div class="info-titles">
      <p>Likes</p>
      <p>Views</p>
      <p>Comments</p>
      <p>Downloads</p>
    </div>
    <div class="info-values">
      <p>${e.likes}</p>
      <p>${e.views}</p>
      <p>${e.comments}</p>
      <p>${e.downloads}</p>
    </div>
  </div>
</li>
  `).join("");t.innerHTML=r,t.style.display="flex",t.style.flexWrap="wrap",t.style.gap="24px",t.style.justifyContent="center",t.style.alignItems="center",t.style.listStyle="none",t.style.maxWidth="1200px",t.style.margin="0 auto",t.querySelectorAll("li").forEach(e=>{e.style.flex="1 1 360px",e.style.height="200px",e.style.border="1px solid #808080",e.style.overflow="hidden",e.style.width="360px",e.style.display="flex",e.style.flexDirection="column"}),t.querySelectorAll("img").forEach(e=>{e.style.width="100%",e.style.height="160px",e.style.objectFit="cover",e.style.display="block"}),t.querySelectorAll(".info").forEach(e=>{e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.padding="4px",e.style.fontSize="12px";const d=e.querySelector(".info-titles"),y=e.querySelector(".info-values");d.style.display="flex",d.style.justifyContent="space-around",d.style.width="100%",d.style.fontWeight="bold",y.style.display="flex",y.style.justifyContent="space-around",y.style.width="100%"}),g.refresh()}function C(){const s=document.querySelector(".gallery");s.innerHTML="",g.refresh()}function v(){document.getElementById("loader").classList.remove("is-hidden")}function x(){document.getElementById("loader").classList.add("is-hidden")}function B(){document.querySelector(".load-more").classList.remove("is-hidden")}function p(){document.querySelector(".load-more").classList.add("is-hidden")}const w=document.querySelector(".form"),I=w.querySelector('input[name="search-text"]'),$=document.querySelector(".load-more");let n=document.querySelector(".end-message");n||(n=document.createElement("div"),n.className="end-message is-hidden",n.textContent="We're sorry, but you've reached the end of search results.",document.querySelector("main").appendChild(n));let m="",u=1,b=0,a=[];function S(){a.length>=b?(p(),n.classList.remove("is-hidden")):(B(),n.classList.add("is-hidden"))}w.addEventListener("submit",async s=>{s.preventDefault();const t=I.value.trim();if(!t){c.warning({title:"Warning",message:"Please enter a search query!",position:"center"});return}m=t,u=1,a=[],C(),p(),n.classList.add("is-hidden"),v();try{const r=await f(m,u),i=r.hits;if(b=r.totalHits,!i||i.length===0){n.textContent="Sorry, there are no images matching your search query.",n.classList.remove("is-hidden");return}a=[...i],L(a),S()}catch(r){c.error({title:"Error",message:`Failed to fetch images: ${r.message}`,position:"topRight",timeout:5e3}),console.error("Error fetching images:",r)}finally{x()}});$.addEventListener("click",async()=>{u+=1,p(),n.classList.add("is-hidden"),v();try{const t=(await f(m,u)).hits;if(!t||t.length===0){n.classList.remove("is-hidden");return}a.push(...t),L(a);const r=document.querySelector(".gallery li");if(r){const{height:i}=r.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}S()}catch(s){c.error({title:"Error",message:`Failed to load more images: ${s.message}`,position:"topRight",timeout:5e3}),console.error("Error fetching more images:",s)}finally{x()}});
//# sourceMappingURL=index.js.map
