// ==UserScript==
// @name               PikPak 增强大师
// @name:zh-CN         PikPak 增强大师
// @name:zh-TW         PikPak 增強大師
// @name:en            PikPak Enhancement Master
// @name:ko            PikPak Enhancement Master
// @name:ja            PikPak Enhancement Master
// @name:id            PikPak Enhancement Master
// @name:ms            PikPak Enhancement Master
// @namespace          https://github.com/digbug82/
// @version            4.6.22
// @author             digbug82
// @license            AGPL-3.0-or-later
// @description        PikPak 网盘增强：集成 Aria2/Gopeed/ABDM/IDM 下载、下载加速、下载过滤、分享链接解析、文件/文件夹查重、批量重命名、资源清理、批量解压、PotPlayer 直达、M3U 导出、排序与搜索增强、TXT 磁链提取、云归档、数据迁移、目录树导出、以图搜图、视音频播放增强等。
// @description:zh-CN  PikPak 网盘增强：集成 Aria2/Gopeed/ABDM/IDM 下载、下载加速、下载过滤、分享链接解析、文件/文件夹查重、批量重命名、资源清理、批量解压、PotPlayer 直达、M3U 导出、排序与搜索增强、TXT 磁链提取、云归档、数据迁移、目录树导出、以图搜图、视音频播放增强等。
// @description:zh-TW  PikPak 網盤增強：整合 Aria2/Gopeed/ABDM/IDM 下載、下載加速、下載過濾、分享連結解析、檔案/資料夾查重、批次重命名、資源清理、批次解壓、PotPlayer 直達、M3U 匯出、排序與搜尋增強、TXT 磁連提取、雲封存、資料遷移、目錄樹匯出、以圖搜圖、視音訊播放增強等。
// @description:en     PikPak cloud drive enhancement: integrates Aria2/Gopeed/ABDM/IDM downloads, download acceleration, download filtering, share-link parsing, file/folder deduplication, batch renaming, resource cleanup, batch extraction, PotPlayer direct open, M3U export, sorting and search enhancements, TXT magnet extraction, cloud archive, data migration, directory tree export, reverse image search, and enhanced audio/video playback.
// @description:ko     PikPak 클라우드 드라이브 강화: Aria2/Gopeed/ABDM/IDM 다운로드, 다운로드 가속, 다운로드 필터링, 공유 링크 파싱, 파일/폴더 중복 검사, 일괄 이름 변경, 리소스 정리, 일괄 압축 해제, PotPlayer 바로 열기, M3U 내보내기, 정렬 및 검색 강화, TXT 마그넷 추출, 클라우드 아카이브, 데이터 마이그레이션, 디렉터리 트리 내보내기, 이미지 역검색, 오디오/비디오 재생 강화 등을 통합합니다.
// @description:ja     PikPak クラウドドライブ強化：Aria2/Gopeed/ABDM/IDM ダウンロード、ダウンロード高速化、ダウンロードフィルター、共有リンク解析、ファイル/フォルダ重複チェック、一括リネーム、リソース整理、一括解凍、PotPlayer 直接起動、M3U エクスポート、並び替えと検索の強化、TXT マグネット抽出、クラウドアーカイブ、データ移行、ディレクトリツリー出力、画像逆検索、音声/動画再生強化などを統合します。
// @description:id     Peningkatan cloud drive PikPak: mengintegrasikan unduhan Aria2/Gopeed/ABDM/IDM, akselerasi unduhan, filter unduhan, parsing tautan berbagi, deduplikasi file/folder, ganti nama massal, pembersihan sumber daya, ekstraksi massal, buka langsung dengan PotPlayer, ekspor M3U, peningkatan penyortiran dan pencarian, ekstraksi magnet dari TXT, arsip cloud, migrasi data, ekspor pohon direktori, pencarian gambar terbalik, serta peningkatan pemutaran audio/video.
// @description:ms     Penambahbaikan pemacu awan PikPak: mengintegrasikan muat turun Aria2/Gopeed/ABDM/IDM, pecutan muat turun, penapisan muat turun, penghuraian pautan perkongsian, deduplikasi fail/folder, penamaan semula pukal, pembersihan sumber, nyahmampat pukal, buka terus dengan PotPlayer, eksport M3U, peningkatan susunan dan carian, pengekstrakan magnet TXT, arkib awan, migrasi data, eksport pepohon direktori, carian imej songsang serta peningkatan main balik audio/video.
// @match              https://mypikpak.com/drive/*
// @match              https://app.mypikpak.com/*
// @match              https://drive.mypikpak.com/*
// @icon               https://cdn.jsdelivr.net/gh/digbug82/PikPak_Enhancement_Master@main/img/logo.svg
// @homepage           https://github.com/masakacj/pikpak-enhancement-online
// @supportURL         https://github.com/masakacj/pikpak-enhancement-online/issues
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_deleteValue
// @grant              GM_listValues
// @grant              GM_info
// @grant              unsafeWindow
// @grant              GM_xmlhttpRequest
// @connect            catbox.moe
// @connect            litterbox.catbox.moe
// @connect            uguu.se
// @connect            mypikpak.com
// @connect            upload.pikpak.site
// @connect            *.upload.pikpak.site
// @connect            web-vod-xdrive.mypikpak.com
// @connect            whatslink.info
// @connect            localhost
// @connect            127.0.0.1
// @run-at             document-start
// @require            https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js
// @require            https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @downloadURL        https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.user.js
// @updateURL          https://raw.githubusercontent.com/masakacj/pikpak-enhancement-online/main/PikPak_Enhancement_Master.meta.js
// ==/UserScript==
