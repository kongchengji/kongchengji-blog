import{i as ie,Z as le,$ as ce,_ as C,m as P,h as w,l as _,P as X,o as r,c,a as h,N as s,Q as I,y as f,v as b,r as k,F as O,E as x,B as T,b as v,I as F,J as ue,g as ne,w as E,d as W,Y as oe,C as pe,D as de,f as z,a0 as me,j as ve,n as ae,u as ge,K as he,L as fe,a1 as _e,H as be,a2 as j,T as ke}from"./app.44e72aae.js";import{r as ye,L as re,u as Le,C as Ne}from"./index.6a799181.js";import{P as Be,a as Ce,t as Pe,b as Ae}from"./Pagation.45b7baf0.js";const Se={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},we=({docsRepo:e,docsBranch:t,docsDir:a,path:p,editLinkPattern:o})=>{const l=ye(e);let i;if(o?i=o:l!==null&&(i=Se[l]),!i)return null;const n=p.replace(/\.html$/,".md");return i.replace(/:repo/,ie(e)?e:`https://github.com/${e}`).replace(/:branch/,t).replace(/:path/,le(`${ce(a)}/${n}`))};function H(){const e=["#e15b64","#f47e60","#f8b26a","#abbd81","#849b87","#e15b64","#f47e60","#f8b26a","#f26d6d","#67cc86","#fb9b5f","#3498db"],t=Math.floor(Math.random()*e.length);return e[t]}let G=null,V=null;const Ie={wait:()=>G,pending:()=>{G=new Promise(e=>V=e)},resolve:()=>{V==null||V(),G=null,V=null}},$e=()=>Ie,Oe={class:"hero-content"},xe=["src"],Ee={key:1},Ue={key:2},Ve=P({__name:"Banner",setup(e){const t=w(),a=_(()=>{var l,i,n,u;return(i=(l=t.value)==null?void 0:l.banner)!=null&&i.heroImage?X((u=(n=t.value)==null?void 0:n.banner)==null?void 0:u.heroImage):null}),p=_(()=>t.value.banner.heroImageStyle||{}),o=_(()=>{var u;const{bgImageStyle:l,bgImage:i}=((u=t.value)==null?void 0:u.banner)||{},n=i?{textAlign:"center",overflow:"hidden",background:`url(${X(i)}) center/cover no-repeat`}:{};return l?{...n,...l}:n});return(l,i)=>{var n,u,m,d,g,L,N,y;return r(),c("section",{class:"banner-wrapper",style:I({...s(o)})},[h("div",Oe,[s(a)?(r(),c("img",{key:0,src:s(a),style:I({heroImageStyle:s(p)}),alt:"heroImage"},null,12,xe)):f("",!0),(u=(n=s(t))==null?void 0:n.banner)!=null&&u.heroText?(r(),c("h1",Ee,b((d=(m=s(t))==null?void 0:m.banner)==null?void 0:d.heroText),1)):f("",!0),(L=(g=s(t))==null?void 0:g.banner)!=null&&L.tagline?(r(),c("p",Ue,b((y=(N=s(t))==null?void 0:N.banner)==null?void 0:y.tagline),1)):f("",!0)])],4)}}});var Fe=C(Ve,[["__file","Banner.vue"]]);const ze={class:"hero-content"},Xe=["src"],je={class:"hero-text"},Ge={key:0},Me={key:1},Te={key:2,class:"btn-group"},We={key:3,class:"social-links"},He=P({__name:"BannerBrand",setup(e){const t=w(),a=_(()=>{var n,u,m,d;return(u=(n=t.value)==null?void 0:n.bannerBrand)!=null&&u.heroImage?X((d=(m=t.value)==null?void 0:m.bannerBrand)==null?void 0:d.heroImage):null}),p=_(()=>{var n,u;return((u=(n=t.value)==null?void 0:n.bannerBrand)==null?void 0:u.buttons)||[]}),o=_(()=>{var n,u;return(((u=(n=t.value)==null?void 0:n.bannerBrand)==null?void 0:u.socialLinks)||[]).map(m=>(m.color||(m.color=H()),m))}),l=_(()=>t.value.bannerBrand.heroImageStyle||{}),i=_(()=>{var d;const{bgImageStyle:n,bgImage:u}=((d=t.value)==null?void 0:d.bannerBrand)||{},m=u?{overflow:"hidden",background:`url(${X(u)}) center/cover no-repeat`}:{};return n?{...m,...n}:m});return(n,u)=>{var d,g,L,N,y,A,S,U;const m=k("Xicons");return r(),c("section",{class:"banner-brand-wrapper",style:I({...s(i)})},[h("div",ze,[s(a)?(r(),c("img",{key:0,src:s(a),style:I({heroImageStyle:s(l)}),alt:"heroImage"},null,12,Xe)):f("",!0),h("div",je,[(g=(d=s(t))==null?void 0:d.bannerBrand)!=null&&g.heroText?(r(),c("h1",Ge,b((N=(L=s(t))==null?void 0:L.bannerBrand)==null?void 0:N.heroText),1)):f("",!0),(A=(y=s(t))==null?void 0:y.bannerBrand)!=null&&A.tagline?(r(),c("p",Me,b((U=(S=s(t))==null?void 0:S.bannerBrand)==null?void 0:U.tagline),1)):f("",!0),s(p).length>0?(r(),c("ul",Te,[(r(!0),c(O,null,x(s(p),(B,$)=>(r(),c("li",{class:T(B.type),key:$},[v(m,{icon:B.icon,text:B.text,link:B.link,"icon-size":"20","text-size":"14"},null,8,["icon","text","link"])],2))),128))])):f("",!0),s(o).length>0?(r(),c("ul",We,[(r(!0),c(O,null,x(s(o),(B,$)=>(r(),c("li",{class:"social-item",key:$},[v(m,{icon:B.icon,link:B.link,style:I({color:B.color}),target:"_blank"},null,8,["icon","link","style"])]))),128))])):f("",!0)])])],4)}}});var Re=C(He,[["__file","BannerBrand.vue"]]);const De=P({setup(e,t){const a=F(),p=w(),o=_(()=>{var l,i;return(((i=(l=p.value)==null?void 0:l.blog)==null?void 0:i.socialLinks)||[]).map(n=>(n.color||(n.color=H()),n))});return{themeLocal:a,socialLinks:o}}}),Qe={class:"personal-info-wrapper"},Ye=["src"],qe={key:1,class:"name"},Je={class:"social-links"},Ke=h("hr",null,null,-1);function Ze(e,t,a,p,o,l){const i=k("Xicons");return r(),c("div",Qe,[e.themeLocal.authorAvatar?(r(),c("img",{key:0,class:"personal-img",src:e.$withBase(e.themeLocal.authorAvatar),alt:"author-avatar"},null,8,Ye)):f("",!0),e.themeLocal.author?(r(),c("p",qe,b(e.themeLocal.author),1)):f("",!0),h("ul",Je,[(r(!0),c(O,null,x(e.socialLinks,(n,u)=>(r(),c("li",{class:"social-item",key:u},[v(i,{icon:n.icon,link:n.link,style:I({color:n.color}),target:"_blank"},null,8,["icon","link","style"])]))),128))]),Ke])}var et=C(De,[["render",Ze],["__file","PersonalInfo.vue"]]);const tt={class:"home-blog-content"},nt={class:"blog-list"},st={class:"info-wrapper"},ot={class:"module-title"},at={class:"category-wrapper"},rt={class:"text"},it={class:"num"},lt={class:"module-title"},ct={class:"tag-wrapper"},ut=P({__name:"Blog",setup(e){const{posts:t,classificationSummary:a}=ue(),p=ne(1),o=ne(0),l=10,i=_(()=>{var d,g;return((g=(d=a.value)==null?void 0:d.categories)==null?void 0:g.items)||[]}),n=_(()=>{var d,g;return((g=(d=a.value)==null?void 0:d.tags)==null?void 0:g.items)||[]}),u=_(()=>{const d=(p.value-1)*l,g=p.value*l;return(t.value||[]).slice(d,g)});let m=d=>{};return m=d=>{if(p.value=d,o.value===0){const g=document.querySelector(".home-blog-content");g&&(o.value=g.getBoundingClientRect().top)}setTimeout(()=>{window.scrollTo({left:0,top:-o.value,behavior:"smooth"})},100)},(d,g)=>{const L=k("Xicons"),N=k("router-link");return r(),c("section",tt,[h("section",nt,[v(Be,{data:s(u),total:s(t).length,"page-size":10,"current-page":p.value},null,8,["data","total","current-page"]),v(Ce,{currentPage:p.value,total:s(t).length,onChange:s(m)},null,8,["currentPage","total","onChange"])]),h("section",st,[v(et),h("h4",ot,[v(L,{icon:"Folder",text:"Categories"})]),h("ul",at,[(r(!0),c(O,null,x(s(i),(y,A,S)=>(r(),c("li",{class:"category-item",key:S},[v(N,{class:"category-link",to:`/categories/${A}/1/`},{default:E(()=>[h("span",rt,b(y.label),1),h("span",it,b(y.length),1)]),_:2},1032,["to"])]))),128))]),h("h4",lt,[v(L,{icon:"Tag",text:"Tags"})]),h("ul",ct,[(r(!0),c(O,null,x(s(n),(y,A,S)=>(r(),c("li",{class:"tag-item",key:S,style:I({borderColor:s(H)()})},[v(N,{class:"tag-link",to:`/tags/${A}/1/`},{default:E(()=>[W(b(y.label),1)]),_:2},1032,["to"])],4))),128))])])])}}});var pt=C(ut,[["__file","Blog.vue"]]);const dt={},mt={class:"theme-reco-default-content"};function vt(e,t){const a=k("Content");return r(),c("section",mt,[v(a)])}var gt=C(dt,[["render",vt],["__file","MdContent.vue"]]),ht="data:image/png;base64,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";const ft="vuepress-theme-reco",_t="2.0.0-beta.33",bt="> TODO: description",kt="https://github.com/recoluan/vuepress-theme-reco#readme",yt={url:"https://github.com/recoluan/vuepress-theme-reco/issues"},Lt={type:"git",url:"git+https://github.com/recoluan/vuepress-theme-reco.git"},Nt="MIT",Bt="reco_luan <recoluan@qq.com>",Ct="lib/node/index.js",Pt="lib/node/index.d.ts",At={lib:"lib",test:"__tests__"},St=["lib","templates"],wt={access:"public"},It={"@vicons/tabler":"^0.12.0","@vicons/fa":"^0.12.0","@vuepress-reco/shared":"2.0.0-beta.33","@vuepress-reco/tailwindcss-config":"2.0.0-beta.33","@vuepress-reco/vuepress-plugin-bulletin-popover":"2.0.0-beta.33","@vuepress-reco/vuepress-plugin-comments":"2.0.0-beta.33","@vuepress-reco/vuepress-plugin-page":"2.0.0-beta.33","@vuepress-reco/vuepress-plugin-code-copy":"2.0.0-beta.33","@vuepress-reco/vuepress-plugin-vue-preview":"2.0.0-beta.33","@vuepress/bundler-vite":"2.0.0-beta.48","@vuepress/bundler-webpack":"2.0.0-beta.48","@vuepress/client":"2.0.0-beta.48","@vuepress/core":"2.0.0-beta.48","@vuepress/plugin-active-header-links":"2.0.0-beta.48","@vuepress/plugin-back-to-top":"^2.0.0-beta.48","@vuepress/plugin-container":"2.0.0-beta.48","@vuepress/plugin-external-link-icon":"2.0.0-beta.48","@vuepress/plugin-git":"2.0.0-beta.48","@vuepress/plugin-nprogress":"2.0.0-beta.48","@vuepress/plugin-palette":"2.0.0-beta.48","@vuepress/plugin-prismjs":"2.0.0-beta.48","@vuepress/plugin-register-components":"2.0.0-beta.48","@vuepress/plugin-search":"2.0.0-beta.48","@vuepress/plugin-theme-data":"2.0.0-beta.48","@vuepress/shared":"2.0.0-beta.48","@vuepress/utils":"2.0.0-beta.48",autoprefixer:"10.4.7",md5:"2.3.0",postcss:"8.4.14","postcss-each":"1.1.0","postcss-import":"14.0.2",tailwindcss:"3.1.6",vue:"^3.2.36","vue-router":"^4.0.16"},$t={"eslint-config-vuepress":"3.2.1","eslint-config-vuepress-typescript":"2.2.1",prettier:"2.2.1","sort-package-json":"1.44.0"},Ot={test:'echo "Error: run tests from root" && exit 1',build:"tsc --build tsconfig.build.json","build:watch":"tsc --build -w tsconfig.build.json",clean:"rimraf lib *.tsbuildinfo",copy:'cpx "src/**/*.{d.ts,vue,scss,css,svg,png,jpg}" lib'};var xt={name:ft,version:_t,description:bt,homepage:kt,bugs:yt,repository:Lt,license:Nt,author:Bt,main:Ct,types:Pt,directories:At,files:St,publishConfig:wt,dependencies:It,devDependencies:$t,scripts:Ot};const Et={class:"footer-wrapper"},Ut={key:0},Vt={key:0},Ft=W("\xA0\xA0 "),zt={key:1},Xt={key:1,class:"cyber-security"},jt=h("img",{src:ht,alt:""},null,-1),Gt=["href"],Mt={__name:"Footer",setup(e){const t=F(),a=w(),{solution:p,options:o}=oe(),{version:l}=xt,i=_(()=>p.value!=="valine"?!1:o.value.visitor!=!1);return(n,u)=>{var L,N,y,A,S,U,B,$,R,D,Q,Y;const m=k("Xicons"),d=k("ValineViews"),g=k("Comments");return r(),c("div",Et,[h("span",null,[v(m,{icon:"Palette",link:"http://v2.vuepress-reco.recoluan.com",target:"_blank",text:`vuepress-theme-reco@${s(l)}`},null,8,["text"])]),(N=(L=s(a))==null?void 0:L.footer)!=null&&N.record?(r(),c("span",Ut,[v(m,{icon:"ShieldCheck",link:((A=(y=s(a))==null?void 0:y.footer)==null?void 0:A.recordLink)||"#",text:(U=(S=s(a))==null?void 0:S.footer)==null?void 0:U.record,target:"_blank"},null,8,["link","text"])])):f("",!0),h("span",null,[v(m,{icon:"Copyright"},{default:E(()=>{var q,J,K,Z,ee,te;return[s(t).author?(r(),c("a",Vt,b(s(t).author),1)):f("",!0),Ft,((J=(q=s(a))==null?void 0:q.footer)==null?void 0:J.startYear)&&((Z=(K=s(a))==null?void 0:K.footer)==null?void 0:Z.startYear)!=new Date().getFullYear()?(r(),c("a",zt,b((te=(ee=s(a))==null?void 0:ee.footer)==null?void 0:te.startYear)+" - ",1)):f("",!0),W(" "+b(new Date().getFullYear()),1)]}),_:1})]),pe(h("span",null,[v(m,{icon:"Eye"},{default:E(()=>[v(d,{idVal:"/",numStyle:{}})]),_:1})],512),[[de,s(i)]]),($=(B=s(a))==null?void 0:B.footer)!=null&&$.cyberSecurityRecord?(r(),c("p",Xt,[jt,h("a",{href:((D=(R=s(a))==null?void 0:R.footer)==null?void 0:D.cyberSecurityLink)||"#"},b((Y=(Q=s(a))==null?void 0:Q.footer)==null?void 0:Y.cyberSecurityRecord),9,Gt)])):f("",!0),v(g,{"hide-comments":!0})])}}};var Tt=C(Mt,[["__file","Footer.vue"]]);const Wt={class:"home-wrapper"},Ht=P({name:"HomeWrapper",components:{Banner:Fe,BannerBrand:Re,Blog:pt,MdContent:gt,Footer:Tt}}),Rt=P({...Ht,setup(e){const t=w();return(a,p)=>(r(),c("div",Wt,[(r(!0),c(O,null,x(s(t).modules||["Banner","Blog","Footer"],o=>(r(),z(me(o),{key:o}))),128))]))}});var Dt=C(Rt,[["__file","index.vue"]]);const se=e=>e===!1?null:he(e)?fe(e):_e(e)?e:!1,M=(e,t,a)=>{const p=e.findIndex(o=>o.link===t);if(p!==-1){const o=e[p+a];return o!=null&&o.link?o:null}for(const o of e)if(o.children){const l=M(o.children,t,a);if(l)return l}return null},Qt=P({name:"PageNav",components:{Link:re},setup(){const e=w(),t=ve(),a=ae(),p=ge(),o=_(()=>{const n=se(e.value.prev);return n!==!1?n:M(t.value,a.path,-1)}),l=_(()=>{const n=se(e.value.next);return n!==!1?n:M(t.value,a.path,1)});return{prevNavLink:o,nextNavLink:l,go:n=>{p.push(n)}}}}),Yt={key:0,class:"page-nav"};function qt(e,t,a,p,o,l){return e.prevNavLink||e.nextNavLink?(r(),c("nav",Yt,[h("p",{class:T(["inner",{hasPrev:!!e.prevNavLink,hasNext:!!e.nextNavLink}])},[e.prevNavLink?(r(),c("span",{key:0,class:"page-nav-item prev",onClick:t[0]||(t[0]=i=>e.go(e.prevNavLink.link))}," \u2190 "+b(e.prevNavLink.text),1)):f("",!0),e.nextNavLink?(r(),c("span",{key:1,class:"page-nav-item next",onClick:t[1]||(t[1]=i=>e.go(e.nextNavLink.link))},b(e.nextNavLink.text)+" \u2192 ",1)):f("",!0)],2)])):f("",!0)}var Jt=C(Qt,[["render",qt],["__file","PageNav.vue"]]);const Kt=()=>{const e=F(),t=j(),a=w();return _(()=>{var d,g;if(!((g=(d=a.value.editLink)!=null?d:e.value.editLink)!=null?g:!0))return null;const{repo:o,docsRepo:l=o,docsBranch:i="main",docsDir:n="",editLinkText:u}=e.value;if(!l)return null;const m=we({docsRepo:l,docsBranch:i,docsDir:n,path:t.value.filePathRelative,editLinkPattern:e.value.editLinkPattern});return m?{text:u!=null?u:"Edit this page",link:m,icon:"Edit",hideExternalLinkIcon:!0}:null})},Zt=()=>{be();const e=F(),t=j(),a=w();return _(()=>{var l,i,n,u;if(!((i=(l=a.value.lastUpdated)!=null?l:e.value.lastUpdated)!=null?i:!0)||!((n=t.value.git)!=null&&n.updatedTime))return null;const o=new Date((u=t.value.git)==null?void 0:u.updatedTime);return Pe(o)})},en=P({name:"PageMeta",components:{Link:re},setup(){const e=F(),t=Kt(),a=Zt();return{themeLocal:e,editNavLink:t,lastUpdated:a}}}),tn={class:"page-meta"},nn={key:0,class:"meta-item edit-link"},sn={key:1,class:"meta-item last-updated"};function on(e,t,a,p,o,l){const i=k("Xicons");return r(),c("footer",tn,[e.editNavLink?(r(),c("div",nn,[v(i,{class:"meta-item-label",icon:e.editNavLink.icon,text:e.editNavLink.text,link:e.editNavLink.link,target:"_blank","icon-size":"20","text-size":"14"},null,8,["icon","text","link"])])):f("",!0),e.lastUpdated?(r(),c("div",sn,[v(i,{class:"meta-item-label",icon:"CalendarTime",text:`${e.themeLocal.lastUpdatedText||"Last Updated"} ${e.lastUpdated}`,"icon-size":"20","text-size":"14"},null,8,["text"])])):f("",!0)])}var an=C(en,[["render",on],["__file","PageMeta.vue"]]);const rn=P({name:"Page",components:{PageInfo:Ae,PageNav:Jt,PageMeta:an},setup(){const e=j(),{options:t}=oe();ae();const a=_(()=>{var o,l,i;return((l=(o=e==null?void 0:e.value)==null?void 0:o.frontmatter)==null?void 0:l.title)||((i=e==null?void 0:e.value)==null?void 0:i.title)||""}),p=_(()=>{var i;const{hideComments:o}=(i=e==null?void 0:e.value)==null?void 0:i.frontmatter,{hideComments:l}=t.value;return o===!0||o!==!1&&l===!0});return{title:a,pageData:e,shouldHideComments:p}}}),ln={class:"page-container"},cn={key:0,class:"page-title"},un={class:"theme-reco-default-content"};function pn(e,t,a,p,o,l){const i=k("PageInfo"),n=k("Content"),u=k("PageMeta"),m=k("PageNav"),d=k("Comments");return r(),c("main",ln,[e.title?(r(),c("h1",cn,b(e.title),1)):f("",!0),v(i,{"page-data":e.pageData},null,8,["page-data"]),h("div",un,[v(n)]),v(u),v(m),v(d,{"hide-comments":e.shouldHideComments},null,8,["hide-comments"])])}var dn=C(rn,[["render",pn],["__file","Page.vue"]]);const mn={class:"theme-container"},vn=P({__name:"Layout",setup(e){const t=j(),a=w(),{isShowSidebar:p,isShowCatalog:o}=Le(),l=$e(),i=l.resolve,n=l.pending;return(u,m)=>(r(),c("div",mn,[v(Ne,null,{default:E(()=>[s(a).home===!0?(r(),z(Dt,{key:0})):(r(),z(ke,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:s(i),onBeforeLeave:s(n)},{default:E(()=>[(r(),z(dn,{key:s(t).path,class:T({"show-series":s(p),"show-catalog":s(o)})},null,8,["class"]))]),_:1},8,["onBeforeEnter","onBeforeLeave"]))]),_:1})]))}});var _n=C(vn,[["__file","Layout.vue"]]);export{_n as default};
