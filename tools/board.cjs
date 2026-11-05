const fs=require('fs'),vm=require('vm');
const base=require('path').resolve(__dirname,'..')+'/';
function board(n){
 const els={}; function el(){return {style:{},value:'',innerHTML:'',appendChild(){},setAttribute(){}};}
 const c=vm.createContext({console,document:{getElementById(id){return els[id] || (els[id]=el());}},localStorage:{getItem(){return 'danda-si';}}});
 for(const f of ['show','sim','level'+n]) vm.runInContext(fs.readFileSync(base+'net_practice/js/'+f+'.js','utf8'),c);
 vm.runInContext(`g_my_login='danda-si'; g_rand_prev=level+hash_login(g_my_login); hosts.forEach(h=>{routes.filter(r=>r.hid==h.id).forEach(r=>{r.h=h;r.route=random_repl(r.route);r.gate=random_repl(r.gate);});}); ifs.forEach(i=>{i.ip=random_repl(i.ip);i.mask=random_repl(i.mask);i.h=hosts.find(h=>h.id==i.hid);}); links.forEach(l=>{l.e1=ifs.find(i=>i.if==l.if1);l.e2=ifs.find(i=>i.if==l.if2);l.h1=l.e1.h;l.h2=l.e2.h;}); goals.forEach(prep_goals);`,c);
 for(const i of c.ifs){c.document.getElementById('ip_'+i.if).value=i.ip;c.document.getElementById('mask_'+i.if).value=i.mask;}
 for(const r of c.routes){c.document.getElementById('route_'+r.rid).value=r.route;c.document.getElementById('gate_'+r.rid).value=r.gate;}
 return c;
}
module.exports={board,base};
if(require.main===module)for(let n=1;n<=10;n++){const c=board(n); console.log(JSON.stringify({level:n,hosts:c.hosts.map(h=>[h.id,h.type]),ifs:c.ifs.map(({h,...i})=>i),routes:c.routes.map(({h,...r})=>r),links:c.links.map(l=>[l.if1,l.if2]),goals:c.goals.map(g=>[g.src,g.dst])}));}
