// Runs the original simulator with a minimal DOM adapter; does not modify it.
const {board,base}=require('./board.cjs'),fs=require('fs');
let total=0;
for(let n=1;n<=10;n++){
 const c=board(n),config=JSON.parse(fs.readFileSync(base+'level'+n+'.json','utf8'));
 for(const [group,items,idKey,fields] of [['ifs',c.ifs,'if',['ip','mask']],['routes',c.routes,'rid',['route','gate']]]){
  const entries=config[group];
  if(!entries || Object.keys(entries).length!==items.length)throw Error('Invalid entry count, level '+n);
  for(const item of items){
   const entry=entries[item[idKey]];
   if(!entry)throw Error('Missing '+item[idKey]);
   const expected=fields.filter(f=>item[f+'_edit']==='true').sort();
   if(JSON.stringify(Object.keys(entry).sort())!==JSON.stringify(expected))throw Error('Invalid editable fields: '+item[idKey]);
   for(const f of expected){if(typeof entry[f]!=='string')throw Error('Expected string');c.document.getElementById(f+'_'+item[idKey]).value=entry[f];}
  }
 }
 const results=c.goals.map(g=>c.sim_goal(g));
 if(results.some(r=>r.status!==1)){console.error(c.g_sim_logs);process.exit(1);}
 total+=results.length;
 console.log('Level '+n+': '+results.length+' objectives OK');
}
console.log('PASS: '+total+' objectives for danda-si (NetPractice 1.9).');
