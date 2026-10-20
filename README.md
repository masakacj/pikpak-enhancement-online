# PikPak 增强大师 · 自定义在线版

基于 [digbug82/PikPak_Enhancement_Master](https://github.com/digbug82/PikPak_Enhancement_Master) 的个人维护版本，保留原作者署名及 AGPL-3.0-or-later 许可证。

## 在线安装和自动更新

**[点击安装 PikPak 增强大师（4.6.63）](https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.user.js)**

1. 浏览器安装并启用 [Tampermonkey](https://www.tampermonkey.net/)。
2. 点击上述 `.user.js` 安装链接，在 Tampermonkey 确认安装或更新。
3. 此后按 Tampermonkey 自身的检查周期，从本仓库自动检查更新；也可在 Tampermonkey 已安装脚本页面使用「检查更新」。

发布地址保持稳定：

- 完整脚本：[`PikPak_Enhancement_Master.user.js`](https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.user.js)
- 更新元数据：[`PikPak_Enhancement_Master.meta.js`](https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.meta.js)
- 版本清单：[`version.json`](https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/version.json)

安装后 Tampermonkey 使用脚本的 `@updateURL` / `@downloadURL`，不再从原作者的更新服务覆盖定制功能。`@name` 和 `@namespace` 保持与旧版一致，便于已有自定义 4.6.20 的用户迁移；**如果已安装原作者最新版，应在油猴中核对是否覆盖了原脚本，避免同时运行两份相同功能的脚本**。

## 4.6.63 更新（保留 4.6.62 完整功能）

- 重复匹配结果新增右键「选择此路径中相同的文件」「选择其他路径中相同的文件」，仅勾选跨路径重复组，不触发删除。
- 文件夹统计视图与视觉查重统一展示本轮重复文件数/文件总数（例如 `50/100`）。
- 保留 4.6.62 缩略图刷新修复、4.6.43 的 CSV 大小明细导出与 GCID 精确验证 CSV 回收站导入。
- 在线更新仍使用本仓库，先发布完整脚本与清单，最后发布 `.meta.js`。

## 4.6.43 功能整合说明

此版本以用户提供的 **4.6.42 水印与自定义视频帧**完整版为基线，保留其视觉查重、水印标记、自定义帧及其他原有功能。只移植个人定制的目录大小明细 CSV 导出、经本地 GCID 验证的 CSV 回收站导入，以及独立 GitHub 在线更新地址，避免较旧 4.6.23 覆盖新功能。原有导出“目录树”和“目录列表”也保留。

导入步骤：增强大师 → **导出目录** → **导入验证 CSV 删除**；选择已验证 CSV，查看条数与大小，输入 `TRASH N` 并二次确认。脚本在回收站操作前逐条重新检查云端 ID、父目录、文件名、字节大小和 GCID；绝不将未经本地 GCID 确认的条目作为删除依据。仅移入回收站，不永久删除。

发布验证：完整脚本语法检查、CSV 解析、未验证行拒绝、云端元数据校验、更新头部一致性。真实登录 PikPak 的操作型验收（特别是批量移入回收站）尚未执行，以免产生实际删除。

## 本版功能

**版本：4.6.63**

- 包含 4.6.20 的「导出目录 → 大小明细（CSV）」，方便把 PikPak 文件清单与 mcphome 上的 Everything 索引做粗匹配。
- CSV 提供 `cloud_path`, `filename`, `size_bytes`, `file_id`, `parent_id`, `mime_type`, `cloud_hash`, `modified_time`。
- `size_bytes` 是原始字节数；未知大小留空，文件夹不作为文件导出。
- 目录遍历失败时取消 CSV 导出，避免把不完整清单误认为全量结果。
- 新增固定在线版本发布渠道，并将脚本内“检查新版本”指向本仓库。

**文件名 + 字节大小一致仅代表疑似重复。** 只能先列出云端清理候选，不自动删除云端或本地文件；后续需要校验内容和可访问性。

## GCID 精确验证 CSV 导入回收站（4.6.43）

在 **导出目录 → 导入验证 CSV 删除** 中选择 `pikpak_delete_verified.csv`。只有 `verification_status=GCID_VERIFIED`、`cloud_hash` 与本地 `local_gcid` 一致且有完整云端 ID / 父目录 / 文件名 / 字节大小信息的行才可导入。导入不执行删除；需手动输入 `TRASH N` 并二次确认。处理前脚本逐条查询 PikPak 实时元数据重新核对，仅将通过校验的文件移入回收站；若文件 ID 返回“文件不存在”，重新查询 CSV 记录的父目录；确认该文件确实不在目录后跳过，并继续处理其他记录。遇到授权、网络、父目录复查失败或其他 API 错误则停止后续操作。**从不调用永久删除 API**。

原始云端 CSV 与 Everything 的“同名同大小”结果不能直接当作可执行删除清单。PikPak 的 `cloud_hash` 是 GCID（分块 SHA-1 的组合哈希），不是普通 SHA-1。本地执行 `pikpak_verify_gcid.py` 验证可读取的文件后生成严格删除清单；不通的映射盘或哈希未验证记录写入独立 `pikpak_delete_unverified.csv`，**不可导入删除**。云端移入回收站后仍需检查结果。

## 开发、验证和发布

```sh
node --check PikPak_Enhancement_Master.user.js
node tests/export-size-csv.test.cjs
node tests/update-channel.test.cjs
node tests/import-verified-csv.test.cjs
node tests/dup-context-path.test.cjs
```

新版本应同时同步 `.user.js`、`.meta.js` 与 `version.json` 的版本号和更新地址，并通过以上测试。正式发布时先更新完整脚本与版本清单、**最后更新 `.meta.js`**，避免 Tampermonkey 提前发现版本号而下载到旧脚本。GitHub Raw/CDN 可能有短暂缓存，更新不是即时推送。

目前仅完成代码级回归测试；真实 PikPak 登录页面上的完整目录导出仍需浏览器实测。

## 许可证与原作者

上游：https://github.com/digbug82/PikPak_Enhancement_Master

原作者：digbug82。在线版本维护者：masakacj。此仓库不是上游官方发布。

[AGPL-3.0-or-later](LICENSE) · [第三方声明](THIRD_PARTY_NOTICES.md)
