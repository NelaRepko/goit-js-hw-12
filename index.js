import{a as f,i,S as v}from"./assets/vendor-D-hiYp1V.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&l(e)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();f.defaults.baseURL="https://pixabay.com/api/";let L=15;async function h(s,t=1){try{const l=(await f.get("",{params:{key:"54641961-e96e5217be963f5aab39f9ddc",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:L,page:t}})).data;return l.hits.length===0&&i.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",timeout:5e3}),l}catch(n){throw i.error({title:"Error",message:n.message,position:"center",timeout:5e3}),n}}const m=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function g(s){const t=document.querySelector(".gallery"),n=s.map(e=>`
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
  `).join("");t.innerHTML=n,t.style.display="flex",t.style.flexWrap="wrap",t.style.gap="24px",t.style.justifyContent="center",t.style.alignItems="center",t.style.listStyle="none",t.style.maxWidth="1200px",t.style.margin="0 auto",t.querySelectorAll("li").forEach(e=>{e.style.flex="1 1 360px",e.style.height="200px",e.style.border="1px solid #808080",e.style.overflow="hidden",e.style.width="360px",e.style.display="flex",e.style.flexDirection="column"}),t.querySelectorAll("img").forEach(e=>{e.style.width="100%",e.style.height="160px",e.style.objectFit="cover",e.style.display="block"}),t.querySelectorAll(".info").forEach(e=>{e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.padding="4px",e.style.fontSize="12px";const c=e.querySelector(".info-titles"),u=e.querySelector(".info-values");c.style.display="flex",c.style.justifyContent="space-around",c.style.width="100%",c.style.fontWeight="bold",u.style.display="flex",u.style.justifyContent="space-around",u.style.width="100%"}),m.refresh()}function b(){const s=document.querySelector(".gallery");s.innerHTML="",m.refresh()}function x(){document.getElementById("loader").classList.remove("is-hidden")}function S(){document.getElementById("loader").classList.add("is-hidden")}function q(){document.querySelector(".load-more").classList.remove("is-hidden")}function p(){document.querySelector(".load-more").classList.add("is-hidden")}const w=document.querySelector(".form"),I=w.querySelector('input[name="search-text"]'),C=document.querySelector(".load-more");let y="",a=1,d=0;function E(){a*15>=d?(p(),a>1&&i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3})):q()}w.addEventListener("submit",async s=>{s.preventDefault();const t=I.value.trim();if(!t){i.warning({title:"Warning",message:"Please enter a search query!",position:"center"});return}y=t,a=1,b(),p(),x();try{const n=await h(y,a),l=n.hits;if(d=n.totalHits,!l||l.length===0){i.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3});return}g(l),d>l.length&&q()}catch(n){console.error("Error fetching images:",n)}finally{S()}});C.addEventListener("click",async()=>{a+=1,x();try{const t=(await h(y,a)).hits;if(!t||t.length===0){p();return}const l=[...document.querySelector(".gallery").querySelectorAll("li")].map(r=>({webformatURL:r.querySelector("img").src,largeImageURL:r.querySelector("a").href,likes:parseInt(r.querySelector(".info-values p:nth-child(1)").textContent),views:parseInt(r.querySelector(".info-values p:nth-child(2)").textContent),comments:parseInt(r.querySelector(".info-values p:nth-child(3)").textContent),downloads:parseInt(r.querySelector(".info-values p:nth-child(4)").textContent),tags:r.querySelector("img").alt}));g([...l,...t]);const o=document.querySelector(".gallery li");if(o){const{height:r}=o.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}E()}catch(s){console.error("Error fetching more images:",s)}finally{S()}});
//# sourceMappingURL=index.js.map
