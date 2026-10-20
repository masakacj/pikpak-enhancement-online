const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const code = fs.readFileSync(path.join(__dirname, '..', 'PikPak_Enhancement_Master.user.js'), 'utf8');
const start = code.indexOf('// Select only members of cross-path duplicate groups;');
const end = code.indexOf('\nfunction annotateDupFolderMeta(', start);
assert(start > 0 && end > start, 'context path helper integrated');
const helper = code.slice(start, end);
assert(!/files:batch(?:Trash|Delete)/.test(helper), 'context selection cannot delete');
const files = [
  { id: 'a', kind: 'drive#file', _dupFullPath: 'Root/A' },
  { id: 'b', kind: 'drive#file', _dupFullPath: 'Root/B' },
  { id: 'c', kind: 'drive#file', _dupFullPath: 'Root/A' },
  { id: 'd', kind: 'drive#file', _dupFullPath: 'Root/A/sub' },
  { id: 'e', kind: 'drive#file', _dupFullPath: 'Root/B' },
  { id: 'f', kind: 'drive#file', _dupFullPath: 'Root/C' }
];
const groups = [{ ids:['a','b'] }, { ids:['c','d'] }, { ids:['e','f'] }];
function run(scope, inside, folderMode = false) {
  const S = {
    dupMode: true,
    dupGroupView: folderMode ? 'folders' : 'files',
    items: files,
    dupItemMap: new Map(files.map(f => [f.id,f])),
    dupBuckets: { all: groups },
    display: folderMode ? [
      { _dupFolderStatsRow:true, _dupFolderStatsPath:'Root/A', _dupFolderStatsFileIds:['a','c','d'] },
      { _dupFolderStatsRow:true, _dupFolderStatsPath:'Root/B', _dupFolderStatsFileIds:['b','e'] },
      { _dupFolderStatsRow:true, _dupFolderStatsPath:'Root/C', _dupFolderStatsFileIds:['f'] }
    ] : files,
    setExplicitSelection(ids) { this.selected = ids; }
  };
  const messages = [];
  const ctx = { S, showToast: msg => messages.push(msg), renderVisible: () => {}, updateStat: () => {} };
  vm.createContext(ctx);
  vm.runInContext(helper, ctx);
  ctx.selectDupFilesByContextPath(scope, inside);
  return { ids: Array.from(S.selected || []).sort(), messages };
}
assert.deepEqual(run('Root/A',true).ids,['a'], 'select only overlapping files inside A');
assert.deepEqual(run('Root/A',false).ids,['b'], 'select only overlapping files outside A');
assert.deepEqual(run('Root/B',true).ids,['b','e'], 'select both overlapping groups inside B');
assert.deepEqual(run('Root/B',false).ids,['a','f'], 'select other paths for B');
assert.deepEqual(run('Root/A',true,true).ids,['a'], 'folder stats mode selects original file ids');
assert.equal(run('Root/Z',true).ids.length,0,'unmatched path does not modify selection');
assert(code.includes("dupPathInside.textContent = '选择此路径中相同的文件'"));
assert(code.includes("dupPathOutside.textContent = '选择其他路径中相同的文件'"));
assert(code.includes('_dupFolderDuplicateCount: visualDuplicateCount'));
assert(code.includes('_dupFolderTotalCount: visualTotalCount'));
assert(code.includes('displayFolderCount = (d._dupFolderStatsRow && d._dupFolderDuplicateCount != null'));
console.log('PASS: path right-click selection, folder counts, non-deleting actions');
