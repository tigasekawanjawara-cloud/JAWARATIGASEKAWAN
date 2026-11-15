const K='rmwms_v3',$=s=>document.querySelector(s);let S,U=null,tab='dash';
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>new Date().toISOString().slice(0,10),now=()=>new Date().toLocaleString('id-ID');
const NAV={dash:'Dashboard',items:'Barang',in:'Barang Masuk',out:'Barang Keluar',req:'Permintaan',led:'Kartu Stok',sup:'Supplier',scan:'Pindai QR',users:'Pengguna'};
const ACC={Admin:Object.keys(NAV),'Staff Gudang':['dash','items','in','out','req','led','sup','scan'],Produksi:['dash','items','req','led','scan']};
const mgr=()=>U.r!=='Produksi';
const mkSup=()=>'ABCDEFGHIJKL'.split('').map(l=>({id:'SUP-'+l,n:'PT '+l,k:'',pic:'',tel:'',em:'',al:'',lt:0,a:true}));
async function H(p){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('rmwms:'+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function toast(m,t){const e=$('#toast');e.textContent=m;e.className=t||'';e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',3200);return null}
async function load(){try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S){S={users:[],items:[],led:[],reqs:[],seq:1};
for(const[u,n,r,p]of[['admin','Administrator','Admin','admin123'],['staff','Staff Gudang','Staff Gudang','staff123'],['produksi','PPIC Produksi','Produksi','prod123']])S.users.push({u,n,r,a:true,h:await H(p)});
DATA.forEach(([c,n,k,x])=>S.items.push({c,n,k,x,u:PCS.has(k)?'pcs':'meter',s:0,m:0}));save()}
if(!S.sups){S.sups=mkSup();save()}}
function post(c,d,ty,ref,x){const i=S.items.find(i=>i.c===c);i.s+=d;S.led.unshift(Object.assign({t:now(),id:'TX'+(S.seq++),c,n:i.n,ty,ref,d,b:i.s,by:U?U.n:''},x||{}))}
const bd=i=>i.s===0&&i.m===0?'<span class="b">KOSONG</span>':i.s===0?'<span class="b er">HABIS</span>':i.s<=i.m?'<span class="b wa">MENIPIS</span>':'<span class="b ok">NORMAL</span>';
