const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require('node:path').join(__dirname,'..','PikPak_Enhancement_Master.user.js'),'utf8');
const start = code.indexOf('function findFullySelectedDupGroups(ids) {');
const end = code.indexOf('\nUI.btnDel.onclick = async () => {', start);
assert(start > 0 && end > start, 'full-group warning functions must exist before delete');
const text = code.slice(start,end);
assert(text.includes('pk-full-group-jump'),'each full group has jump link');
assert(text.includes('close(false);'),'jump cancels deletion');
assert(text.includes('getItemScrollTopByIndex(idx)'),'jump scrolls to group');
assert(code.includes('findFullySelectedDupGroups(toDeleteIds)'),'check only eligible deletion candidates');
assert(code.includes('if (fullDupGroups.length && !await confirmFullySelectedDupGroups(fullDupGroups)) return;'),'abort delete on warning cancel');
const S = {
  dupMode:true,
  dupItemMap:new Map(['a','b','c','d','e'].map(id=>[id,{id}])),
  dupBuckets:{all:[{ids:['a','b']},{ids:['c','d','e']},{ids:['a','missing']}]}
};
S.itemMap = S.dupItemMap;
const ctx = {S,showModal:()=>null};
vm.createContext(ctx);
vm.runInContext(text,ctx);
function scan(ids){ return Array.from(ctx.findFullySelectedDupGroups(ids),g=>g.ids.join(',')); }
assert.deepEqual(scan(['a','b']),['a,b']);
assert.deepEqual(scan(['a']),[]);
assert.deepEqual(scan(['a','b','c','d']),['a,b']);
assert.deepEqual(scan(['a','b','c','d','e']),['a,b','c,d,e']);
S.dupMode=false;
assert.deepEqual(scan(['a','b']),[]);
console.log('PASS: entire-group deletion warning, safe path and jump guard');
