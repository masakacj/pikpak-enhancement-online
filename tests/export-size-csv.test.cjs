const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const current = fs.readFileSync(path.join(root, 'PikPak_Enhancement_Master.user.js'), 'utf8');
const begin = current.indexOf('const buildCloudFileDetailsCsv = ');
const end = current.indexOf('\nif (UI.btnExport) {', begin);
assert(begin > 0 && end > begin, 'CSV export helper present');
const buildCsv = vm.runInNewContext(current.slice(begin, end) + '\nbuildCloudFileDetailsCsv;', {});
const tree = new Map([
    ['', [
        { kind: 'drive#file', name: '零字节.bin', id: 'zero', size: 0 },
        { kind: 'drive#file', name: 'a,b"c.mp4', id: 'video', size: '12345678901', mime_type: 'video/mp4' },
        { kind: 'drive#folder', name: '子目录', id: 'folder', size: '999' }
    ]],
    ['folder', [
        { kind: 'drive#file', name: '=1+1.mkv', id: 'formula', parent_id: 'folder', size: 1234 },
        { kind: 'drive#file', name: '未知大小.avi', id: 'unknown' },
        { kind: 'drive#file', name: '无效大小.mp4', id: 'invalid', size: '2 MB' }
    ]]
]);
const sorter = items => items.sort((a,b) =>
    a.kind === 'drive#folder' ? -1 : b.kind === 'drive#folder' ? 1 : a.name.localeCompare(b.name));
const csv = buildCsv(tree, '', '主页/视频', sorter);
const rows = csv.slice(1).trim().split('\r\n');
assert(csv.startsWith('\uFEFFcloud_path,filename,size_bytes,file_id,parent_id,mime_type,cloud_hash,modified_time\r\n'));
assert.equal(rows.length, 6, 'header plus exactly five files');
assert(rows.some(r => r.includes('"主页/视频/a,b""c.mp4","a,b""c.mp4","12345678901","video"')));
assert(rows.some(r => r.includes('"主页/视频/零字节.bin","零字节.bin","0","zero"')));
assert(rows.some(r => r.includes('"主页/视频/子目录/=1+1.mkv","\'=1+1.mkv","1234","formula","folder"')));
assert(rows.some(r => r.includes('"主页/视频/子目录/未知大小.avi","未知大小.avi","","unknown"')));
assert(rows.some(r => r.includes('"主页/视频/子目录/无效大小.mp4","无效大小.mp4","","invalid"')));
assert(!csv.includes('"999"'), 'folder size must not be treated as file size');
assert.equal((current.match(/data-fmt="csv"/g) || []).length, 1, 'CSV option added once');
assert(current.includes("maxRetries: format === 'csv' ? 3 : Infinity"), 'CSV retries bounded');
assert(current.includes("throw new Error((L.msg_export_detail_incomplete"), 'CSV aborts on partial traversal');
assert(current.includes("// @version            4.6.21"));
assert(current.includes("// @downloadURL        https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.user.js"));
assert(current.includes("// @license            AGPL-3.0-or-later"));
console.log('PASS: PikPak CSV export regression assertions');
