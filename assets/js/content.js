// All visitor-facing copy for both languages. Every figure here traces to the CV, the existing
// portfolio, or a product screenshot shipped in assets/projects. Do not add numbers that cannot
// be pointed at.

export const PERSON = {
  name: 'ZHANG Zilong',
  alias: 'Zonlic',
  email: 'zonlic0925@gmail.com',
  phone: '(852) 8495-7302',
  phoneHref: '+85284957302',
  linkedin: 'https://linkedin.com/in/zonlic6',
  linkedinLabel: 'linkedin.com/in/zonlic6',
  github: 'https://github.com/zonlic0925-boop',
  githubLabel: 'github.com/zonlic0925-boop',
  zonkeyRepo: 'https://github.com/zonlic0925-boop/ZonKey',
  zonkeyReleases: 'https://github.com/zonlic0925-boop/ZonKey/releases',
  zonkeyWeb: 'https://zonkey.pages.dev',
}

export const SHEET = {
  drawingNo: 'ZL-2026-01',
  date: '2026.09',
  sheet: '1 / 1',
}

export const content = {
  en: {
    lang: 'en',
    title: 'Zonlic (ZHANG Zilong) - Portfolio',
    description:
      'Portfolio of ZHANG Zilong (Zonlic): chemistry MSc at City University of Hong Kong, certification engineer at Midea Group, and solo developer of ZonKey and Dragon Balloon.',

    ui: {
      skip: 'Skip to the record',
      language: 'Language',
      theme: 'Switch the sheet to night mode',
      themeShort: 'Night',
      dayShort: 'Day',
      menu: 'Zones',
      close: 'Close',
      play: 'Play demonstration',
      playShort: 'Play',
      playing: 'Playing',
      figure: 'FIG.',
      table: 'Table',
      view: 'View',
      balloonHint: 'Balloon numbers index this record. Select one to jump to the entry it points at.',
      traced: 'Traced',
      source: 'Open source',
      external: 'Opens in a new tab',
    },

    // The title block, top of sheet.
    titleBlock: {
      drawingTitle: 'Personal portfolio',
      role: 'Chemistry MSc, City University of Hong Kong. Certification engineer. Solo product developer.',
      location: 'Hong Kong',
      fields: { name: 'Name', location: 'Location', drawingNo: 'Drawing no.', date: 'Date', sheet: 'Sheet' },
      cta: 'Email Zonlic',
    },

    zones: {
      a: 'General view',
      b: 'Inspection record',
      c: 'Project views',
      d: 'Revision history',
      e: 'Notes',
      f: 'Sign-off',
    },

    // Zone A - the part itself.
    general: {
      nameLines: ['ZHANG', 'Zilong'],
      alias: 'Zonlic',
      caption: 'DETAIL A',
    },

    // Zone B - the characteristic table.
    inspection: {
      heading: 'Inspection record',
      columns: { item: 'Item', characteristic: 'Characteristic', method: 'Inspection method', evidence: 'Evidence', ref: 'Reference' },
      rows: [
        {
          balloon: '01',
          characteristic: 'Product certification and compliance',
          method: 'Reviewed prototypes and technical documentation against North American requirements. Monitored regulatory updates and drove internal implementation. Liaised with SGS, Intertek and UL.',
          evidence: 'North American certification for Midea microwave ovens, 20 models delivered on schedule.',
          ref: 'REV B',
          target: 'rev-b',
        },
        {
          balloon: '02',
          characteristic: 'AI-assisted product engineering',
          method: 'Solo delivery from requirements and architecture to release, using Cursor and Codex. Owns interface, engine and packaging.',
          evidence: 'Two products shipped and installable: ZonKey and Dragon Balloon.',
          ref: 'VIEW 1, VIEW 2',
          target: 'view-zonkey',
        },
        {
          balloon: '03',
          characteristic: 'Laboratory research and instrument analysis',
          method: 'Designed experiments and ran precision testing with HPLC, GC-MS and UV-Vis spectrophotometers. Interpreted data for publication.',
          evidence: 'Two SCI-indexed papers: MOF-TiO2 photocatalysis and Cu(I) luminescent piezochromism.',
          ref: 'REV A',
          target: 'rev-a',
        },
        {
          balloon: '04',
          characteristic: 'Leadership and cross-border communication',
          method: 'Elected student representative for the Department of Chemistry. Organised Sino-Vietnamese coordination meetings. Presented in Mandarin, Cantonese and English.',
          evidence: 'Eight cross-border meetings and a Letter of Appreciation from the CityU Vice-President.',
          ref: 'REV B, REV C',
          target: 'rev-c',
        },
        {
          balloon: '05',
          characteristic: 'Reporting and workflow automation',
          method: 'Structured reporting in Word and Excel. Workflow automation in Power Automate. Dashboards in Power BI. Scripted OCR and PDF pipelines in Python.',
          evidence: 'Certification document packs at Midea and research data handling at Wuyi University.',
          ref: 'REV B',
          target: 'rev-b',
        },
      ],
    },

    // Zone C - the project views.
    views: {
      heading: 'Project views',
      demosHeading: 'Feature demonstrations',
      figuresHeading: 'Figures',
      attachmentsHeading: 'Attachments',
      devNote:
        'The clip shows the current state of the capability. Bubble placement from drawing geometry is being optimised and is not yet part of a release.',
      highlightsLabel: 'Ballooned notes',
      views: [
        {
          id: 'view-zonkey',
          trace: '02',
          label: 'View 1',
          name: 'ZonKey',
          category: 'Open source, independent project',
          period: 'Aug 2026 to present',
          place: 'Hong Kong',
          description:
            'Solo-built offline desktop toolbox. It redacts confidential marks from engineering PDFs and office documents, and bundles local tools for PDF, PPT, images, media and text. Shipped as a Windows installer, a portable build and a browser edition.',
          highlights: [
            'Shipped end to end alone: Windows setup and portable builds, macOS CI builds, and a browser edition. Files stay on the device.',
            'Three-tier architecture: React and TypeScript interface, Python FastAPI engine, PyWebView desktop shell, with fallback to browser-only engines when the backend is absent.',
            'Redaction fuses vector, OCR and vision channels and erases strictly inside drawing frames. Original files are never modified.',
          ],
          figures: [
            { file: 'zonkey/shot-home.webp', w: 1280, h: 720, alt: 'ZonKey home screen listing eight tool centres and 94 offline tools', caption: 'Eight tool centres and 94 offline tools on one workbench, with the rules centre and audit trail one click away.' },
            { file: 'zonkey/shot-redact.webp', w: 1280, h: 720, alt: 'ZonKey detecting CONFIDENTIAL marks inside an engineering drawing', caption: 'Confidentiality marks detected inside the drawing frame, leaving dimensions and tolerances untouched.' },
            { file: 'zonkey/shot-word.webp', w: 1280, h: 720, alt: 'ZonKey listing personal-data matches inside a Word document', caption: 'Word documents scanned against PII rules: phone numbers, identity numbers, passports and email addresses highlighted line by line.' },
            { file: 'zonkey/shot-pdf.webp', w: 1280, h: 720, alt: 'ZonKey PDF workshop listing 29 local PDF tools', caption: 'Twenty-nine local PDF tools, including merge, split, conversion, OCR export, compression, watermarking and certificate signing.' },
            { file: 'zonkey/shot-rules.webp', w: 1280, h: 720, alt: 'ZonKey rules centre showing drawing dictionaries, PII patterns and Word replacement rules', caption: 'Rules centre: drawing confidentiality dictionary, eleven PII patterns, Word replacement rules and seal detection, editable in plain language.' },
            { file: 'zonkey/shot-audit.webp', w: 1280, h: 720, alt: 'ZonKey audit trail listing redaction runs with file, time and entity counts', caption: 'Every redaction leaves a local trace: file, time, entities erased, run ID and output path.' },
          ],
          links: [
            { label: 'Repository', href: PERSON.zonkeyRepo },
            { label: 'Download', href: PERSON.zonkeyReleases },
            { label: 'Web edition', href: PERSON.zonkeyWeb },
          ],
          qr: { file: 'zonkey/qr-zonkey-web.png', alt: 'QR code linking to the ZonKey web edition', caption: 'Scan for the browser edition. Files are processed on the device.' },
        },
        {
          id: 'view-dragon-balloon',
          trace: '02',
          label: 'View 2',
          name: 'Dragon Balloon',
          category: 'Independent project',
          period: 'Jun 2026 to present',
          place: 'Hong Kong',
          description:
            'Solo-built offline FAI ballooning application for engineering PDFs, delivered from product design to production deployment for a manufacturing quality team.',
          highlights: [
            'Reduced manual drawing inspection from about 30 minutes to about 3 minutes per sheet for a manufacturing QA team.',
            'Geometry-first bubble detection, tolerance classification and FA report export, all offline.',
            'Owned the whole stack alone: requirements, interaction design, architecture, assisted development, quality gates and rollout.',
          ],
          demos: [
            { file: 'dragon-balloon/01-interface-intro.mp4', poster: 'dragon-balloon/01-interface-intro.jpg', title: 'Interface overview', description: 'Workspace layout, toolbar and the PDF review flow.', status: '' },
            { file: 'dragon-balloon/03-manual-detect.mp4', poster: 'dragon-balloon/03-manual-detect.jpg', title: 'Manual detection', description: 'Precise manual marking for edge cases and overrides.', status: '' },
            { file: 'dragon-balloon/04-bubble-customize.mp4', poster: 'dragon-balloon/04-bubble-customize.jpg', title: 'Bubble customisation', description: 'Bubble size, style and numbering.', status: '' },
            { file: 'dragon-balloon/05-thickness-check.mp4', poster: 'dragon-balloon/05-thickness-check.jpg', title: 'Thickness check', description: 'Wall thickness validated against the drawing specification.', status: '' },
            { file: 'dragon-balloon/06-tolerance-rules.mp4', poster: 'dragon-balloon/06-tolerance-rules.jpg', title: 'Tolerance rules', description: 'Tolerance classification rules, configured once.', status: '' },
            { file: 'dragon-balloon/07-export-fa-report.mp4', poster: 'dragon-balloon/07-export-fa-report.jpg', title: 'FA report export', description: 'FA report and balloon map exported in one step.', status: '' },
            { file: 'dragon-balloon/02-auto-detect.mp4', poster: 'dragon-balloon/02-auto-detect.jpg', title: 'One-click detection', description: 'Bubble placement from drawing geometry, generated automatically.', status: 'In development' },
          ],
        },
        {
          id: 'view-vietnam',
          trace: '04',
          label: 'View 3',
          name: 'China to Vietnam production transfer',
          category: 'Midea Group, cross-border project',
          period: 'Mar 2025 to Jul 2025',
          place: 'China and Vietnam',
          description:
            'Led the North American microwave oven production transfer from China to Vietnam, holding every certification and shipment milestone.',
          stops: [
            { measure: '8 meetings', label: 'Coordination' },
            { measure: 'Dossier', label: 'Documents' },
            { measure: '20 models', label: 'Certification' },
          ],
          stopsHeading: 'Route',
          highlights: [
            'Organised eight cross-border Sino-Vietnamese coordination meetings and ran them in English.',
            'Managed Vietnamese certification document submission and completed feasibility analysis with the authorities.',
            'Finalised certification for twenty high-demand models on time, protecting the North American shipment schedule.',
          ],
        },
        {
          id: 'view-wuyi',
          trace: '03',
          label: 'View 4',
          name: 'Laboratory research, Wuyi University',
          category: 'Research, two SCI papers',
          period: 'May 2021 to Mar 2024',
          place: 'Jiang Men',
          description:
            'Ran chemical experiments and precision testing, operating the analytical instruments behind two SCI-indexed publications.',
          papers: [
            {
              title: 'MOF-TiO2 photocatalyst for the synthesis of acetals and ketals',
              body: 'Photocatalysis. Contribution: experimental design, testing procedures and data interpretation.',
            },
            {
              title: 'Cu(I) complex luminescent piezochromism via guest encapsulation',
              body: 'Luminescent materials. Contribution: experimental design, testing procedures and data interpretation.',
            },
          ],
          instruments: ['HPLC', 'GC-MS', 'UV-Vis spectrophotometry'],
          highlights: [
            'Contributed experimental design, testing procedures and data interpretation to both publications.',
            'Ran precision testing for reproducible data across three years of laboratory work.',
            'Kept instruments calibrated and results repeatable alongside full-time coursework.',
          ],
        },
      ],
    },

    // Zone D - the record of standing.
    revisions: {
      heading: 'Revision history',
      columns: { rev: 'Rev', period: 'Period', entry: 'Entry', place: 'Place' },
      rows: [
        {
          id: 'rev-c',
          trace: '04',
          rev: 'C',
          period: 'Sep 2025 to Jun 2026',
          entry: 'Master of Chemistry, City University of Hong Kong',
          place: 'Hong Kong',
          details: [
            'cGPA 3.51 of 4.30, graduated with Distinction.',
            'Elected student representative for the Department of Chemistry.',
            'Research on redox-active molecules for electrochemical carbon capture.',
            'Student ambassador, Digital Health Asia 2025. Letter of Appreciation from the CityU Vice-President.',
          ],
          media: [
            { file: 'cityu-campus/dha-appreciation-letter.png', w: 847, h: 1024, alt: 'CityU letter of appreciation for the Digital Health Asia 2025 student ambassador', caption: 'Letter of Appreciation, Digital Health Asia 2025.' },
            { file: 'cityu-campus/gelato-team.png', w: 1024, h: 768, alt: 'CityU students promoting CityUHK yogurt gelato on campus', caption: 'Department outreach on campus.' },
            { file: 'cityu-gelato/press-wenweipo.png', w: 471, h: 1024, alt: 'Wen Wei Po coverage of the CityU yogurt gelato launch', caption: 'Wen Wei Po.' },
            { file: 'cityu-gelato/press-mingpao.png', w: 471, h: 1024, alt: 'Ming Pao coverage of the CityU yogurt gelato launch', caption: 'Ming Pao.' },
          ],
        },
        {
          id: 'rev-b',
          trace: '01',
          rev: 'B',
          period: 'Jul 2024 to Jul 2025',
          entry: 'Certification engineer, Midea Group, full time',
          place: 'Shun De',
          details: [
            'Led end-to-end North American certification for microwave ovens against FDA, UL, CSA and FCC requirements.',
            'Reviewed prototypes and technical documentation, identified non-compliance gaps and proposed corrective actions to R&D and manufacturing.',
            'Partnered with R&D, manufacturing and third-party laboratories SGS, Intertek and UL to align design and production with certification standards.',
          ],
        },
        {
          id: 'rev-a',
          trace: '03',
          rev: 'A',
          period: 'Oct 2020 to Jun 2024',
          entry: 'BEng Chemical Engineering and Process, Wuyi University',
          place: 'Jiang Men',
          details: [
            'Outstanding Graduate of Wuyi University.',
            'Two SCI-indexed papers on photocatalysis and luminescent piezochromic materials.',
            'Class monitor, 2020 to 2023.',
          ],
        },
      ],
    },

    // Zone E - the notes block.
    notes: {
      heading: 'Notes',
      items: [
        { label: 'Languages', text: 'Native Mandarin and Cantonese. Competent English, IELTS 6.5 and TOEIC 815. Basic French.' },
        { label: 'Qualifications', text: 'Driver licence.' },
        { label: 'Software', text: 'AI-native development in Cursor and Codex. Prompt engineering. Python. OCR and PDF automation. Power Automate. Power BI. Microsoft Office, Word, Excel, PowerPoint and Outlook.' },
        { label: 'Basis of figures', text: 'Every figure on this sheet is taken from the certification record, the laboratory record, or the shipped build.' },
      ],
    },

    // Zone F - sign-off.
    signoff: {
      heading: 'Sign-off',
      drawnBy: 'Drawn by',
      fields: { email: 'Email', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub' },
      cta: 'Email Zonlic',
      note: 'Sheet ZL-2026-01, revision 2026.09.',
    },
  },

  zh: {
    lang: 'zh-HK',
    title: 'Zonlic（張子龍）- 個人履歷',
    description:
      '張子龍（Zonlic）個人履歷：香港城市大學化學碩士、美的集團認證工程師、ZonKey 與 Dragon Balloon 獨立開發者。',

    ui: {
      skip: '跳到記錄內容',
      language: '語言',
      theme: '切換為夜間圖紙',
      themeShort: '夜間',
      dayShort: '日間',
      menu: '分區',
      close: '關閉',
      play: '播放演示',
      playShort: '播放',
      playing: '播放中',
      figure: '圖',
      table: '表',
      view: '視圖',
      balloonHint: '氣泡編號即本表的項次。點選可跳至它指向的條目。',
      traced: '已對應',
      source: '開源',
      external: '在新分頁開啟',
    },

    titleBlock: {
      drawingTitle: '個人履歷',
      role: '香港城市大學化學碩士。認證工程師。獨立產品開發者。',
      location: '香港',
      fields: { name: '姓名', location: '地點', drawingNo: '圖號', date: '日期', sheet: '張次' },
      cta: '寄信給我',
    },

    zones: {
      a: '總視圖',
      b: '檢驗記錄',
      c: '項目視圖',
      d: '修訂記錄',
      e: '附註',
      f: '簽署',
    },

    general: {
      nameLines: ['張子龍'],
      alias: 'Zonlic',
      caption: '詳圖 A',
    },

    inspection: {
      heading: '檢驗記錄',
      columns: { item: '項次', characteristic: '特性', method: '檢驗方法', evidence: '證據', ref: '對應' },
      rows: [
        {
          balloon: '01',
          characteristic: '產品認證與合規',
          method: '依北美要求審查原型與技術文件，追蹤法規更新並推動內部落實，與 SGS、Intertek、UL 協作。',
          evidence: '美的微波爐北美認證，20 款型號按期交付。',
          ref: '修訂 B',
          target: 'rev-b',
        },
        {
          balloon: '02',
          characteristic: 'AI 輔助產品工程',
          method: '以 Cursor 與 Codex 獨立完成從需求、架構到發佈的全流程，負責界面、引擎與打包。',
          evidence: '兩款已發佈可安裝的產品：ZonKey 與 Dragon Balloon。',
          ref: '視圖 1、視圖 2',
          target: 'view-zonkey',
        },
        {
          balloon: '03',
          characteristic: '科研與儀器分析',
          method: '設計實驗並以 HPLC、GC-MS、紫外可見分光光度計進行精密測試，解讀數據並用於論文。',
          evidence: '兩篇 SCI 論文：MOF-TiO2 光催化、Cu(I) 發光壓致變色。',
          ref: '修訂 A',
          target: 'rev-a',
        },
        {
          balloon: '04',
          characteristic: '領導力與跨境溝通',
          method: '當選化學系學生代表，組織中越協調會議，以普通話、廣東話、英語匯報。',
          evidence: '8 次跨境會議，並獲城大副校長簽發的致謝信。',
          ref: '修訂 B、修訂 C',
          target: 'rev-c',
        },
        {
          balloon: '05',
          characteristic: '報告與流程自動化',
          method: '以 Word、Excel 撰寫結構化報告，以 Power Automate 自動化流程，以 Power BI 搭建看板，以 Python 編寫 OCR 與 PDF 管線。',
          evidence: '美的認證文件包與五邑大學科研數據整理。',
          ref: '修訂 B',
          target: 'rev-b',
        },
      ],
    },

    views: {
      heading: '項目視圖',
      demosHeading: '功能演示',
      figuresHeading: '圖示',
      attachmentsHeading: '附件',
      devNote: '片段為該功能的當前狀態。基於圖紙幾何的自動氣泡標註仍在優化，尚未納入正式版本。',
      highlightsLabel: '氣泡註記',
      views: [
        {
          id: 'view-zonkey',
          trace: '02',
          label: '視圖 1',
          name: 'ZonKey',
          category: '開源 · 獨立項目',
          period: '2026 年 8 月至今',
          place: '香港',
          description:
            '獨立開發的離線桌面百寶箱：為工程圖紙與辦公文檔抹除機密標記，並集成 PDF、PPT、圖像、音視頻、文本等本地工具。已交付 Windows 安裝版、便攜版與瀏覽器版。',
          highlights: [
            '一人端到端交付：Windows 安裝版與便攜版、macOS 自動構建、瀏覽器版。檔案全程留在本機。',
            '三層架構：React 與 TypeScript 界面、Python FastAPI 引擎、PyWebView 桌面殼；後端缺席時自動降級為純瀏覽器引擎。',
            '脫敏融合矢量、OCR 與視覺三通道，嚴格在圖框內抹除，原始檔案永不改動。',
          ],
          figures: [
            { file: 'zonkey/shot-home.webp', w: 1280, h: 720, alt: 'ZonKey 主頁，列出八大工具中心與 94 項離線工具', caption: '八大工具中心、94 項離線工具匯聚於同一工作台，規則中心與審計日誌一鍵直達。' },
            { file: 'zonkey/shot-redact.webp', w: 1280, h: 720, alt: 'ZonKey 在工程圖紙圖框內識別機密標記', caption: '於圖框內識別機密標記並抹除，不觸及尺寸與公差。' },
            { file: 'zonkey/shot-word.webp', w: 1280, h: 720, alt: 'ZonKey 列出 Word 文件中的個人隱私命中', caption: 'Word 文件逐行比對隱私規則：手機、身份證、護照與郵箱逐條高亮。' },
            { file: 'zonkey/shot-pdf.webp', w: 1280, h: 720, alt: 'ZonKey PDF 工坊，列出 29 項本地 PDF 工具', caption: '29 項本地 PDF 工具：合併、拆分、轉換、OCR 導出、壓縮、水印與證書簽名。' },
            { file: 'zonkey/shot-rules.webp', w: 1280, h: 720, alt: 'ZonKey 規則中心：圖紙密級詞庫、隱私規則與替換規則', caption: '規則中心：圖紙密級詞庫、11 條隱私規則、Word 替換規則與印章檢測，按日常說法填寫即可。' },
            { file: 'zonkey/shot-audit.webp', w: 1280, h: 720, alt: 'ZonKey 審計日誌，逐條記錄檔案、時間與抹除數量', caption: '每次脫敏都本地留痕：檔案、時間、抹除數量、追蹤 ID 與輸出路徑。' },
          ],
          links: [
            { label: '程式倉庫', href: PERSON.zonkeyRepo },
            { label: '下載桌面版', href: PERSON.zonkeyReleases },
            { label: '瀏覽器版', href: PERSON.zonkeyWeb },
          ],
          qr: { file: 'zonkey/qr-zonkey-web.png', alt: '指向 ZonKey 瀏覽器版的二維碼', caption: '掃碼開啟瀏覽器版，檔案在本機處理。' },
        },
        {
          id: 'view-dragon-balloon',
          trace: '02',
          label: '視圖 2',
          name: 'Dragon Balloon',
          category: '獨立項目',
          period: '2026 年 6 月至今',
          place: '香港',
          description:
            '獨立開發的離線 FAI 氣泡標註應用，面向工程 PDF，已交付製造業品質團隊並投入生產使用。',
          highlights: [
            '將該製造企業品質部門的人工圖紙檢驗時間由每張約 30 分鐘縮短至約 3 分鐘。',
            '幾何優先的氣泡檢測、公差分類與 FA 報告導出，全流程離線。',
            '獨力承擔全棧：需求、交互、架構、輔助開發、質量門檻與上線推廣。',
          ],
          demos: [
            { file: 'dragon-balloon/01-interface-intro.mp4', poster: 'dragon-balloon/01-interface-intro.jpg', title: '軟件界面介紹', description: '主界面佈局、工具欄與 PDF 審閱流程。', status: '' },
            { file: 'dragon-balloon/03-manual-detect.mp4', poster: 'dragon-balloon/03-manual-detect.jpg', title: '手動識別', description: '特殊情況與覆蓋處理的精確手動標記。', status: '' },
            { file: 'dragon-balloon/04-bubble-customize.mp4', poster: 'dragon-balloon/04-bubble-customize.jpg', title: '氣泡自定義', description: '氣泡大小、樣式與編號。', status: '' },
            { file: 'dragon-balloon/05-thickness-check.mp4', poster: 'dragon-balloon/05-thickness-check.jpg', title: '厚度檢查', description: '依圖紙規格驗證壁厚。', status: '' },
            { file: 'dragon-balloon/06-tolerance-rules.mp4', poster: 'dragon-balloon/06-tolerance-rules.jpg', title: '公差規則', description: '一次配置公差分類規則。', status: '' },
            { file: 'dragon-balloon/07-export-fa-report.mp4', poster: 'dragon-balloon/07-export-fa-report.jpg', title: '導出 FA 報告', description: '一步導出 FA 報告與氣泡圖。', status: '' },
            { file: 'dragon-balloon/02-auto-detect.mp4', poster: 'dragon-balloon/02-auto-detect.jpg', title: '一鍵識別', description: '依圖紙幾何自動生成氣泡標註。', status: '開發中' },
          ],
        },
        {
          id: 'view-vietnam',
          trace: '04',
          label: '視圖 3',
          name: '中越產線轉移',
          category: '美的集團 · 跨境項目',
          period: '2025 年 3 月至 2025 年 7 月',
          place: '中國與越南',
          description: '主導北美微波爐產線由中國向越南轉移，守住每一項認證與出貨節點。',
          stops: [
            { measure: '8 次會議', label: '協調' },
            { measure: '文件包', label: '文件' },
            { measure: '20 款型號', label: '認證' },
          ],
          stopsHeading: '路徑',
          highlights: [
            '組織 8 次中越跨境協調會議，並以英語主持。',
            '管理越南認證文件提交，與主管機關完成可行性分析。',
            '按時完成 20 款熱銷型號認證，保障北美出貨排程。',
          ],
        },
        {
          id: 'view-wuyi',
          trace: '03',
          label: '視圖 4',
          name: '五邑大學實驗室研究',
          category: '科研 · 兩篇 SCI',
          period: '2021 年 5 月至 2024 年 3 月',
          place: '江門',
          description: '執行化學實驗與精密測試，操作兩篇 SCI 論文背後的分析儀器。',
          papers: [
            {
              title: 'MOF-TiO2 光催化合成縮醛與縮酮',
              body: '光催化方向。負責實驗設計、測試流程與數據解讀。',
            },
            {
              title: 'Cu(I) 配合物客體封裝的發光壓致變色',
              body: '發光材料方向。負責實驗設計、測試流程與數據解讀。',
            },
          ],
          instruments: ['HPLC', 'GC-MS', '紫外可見分光光度計'],
          highlights: [
            '為兩篇論文提供實驗設計、測試流程與數據解讀。',
            '三年實驗室工作中持續產出可重現的精密測試數據。',
            '在課程壓力下維持儀器校正與結果可重複。',
          ],
        },
      ],
    },

    revisions: {
      heading: '修訂記錄',
      columns: { rev: '版次', period: '期間', entry: '條目', place: '地點' },
      rows: [
        {
          id: 'rev-c',
          trace: '04',
          rev: 'C',
          period: '2025 年 9 月至 2026 年 6 月',
          entry: '香港城市大學化學碩士',
          place: '香港',
          details: [
            'cGPA 3.51 / 4.30，以 Distinction 優等畢業。',
            '當選化學系學生代表。',
            '研究電化學碳捕集用的氧化還原活性分子。',
            'Digital Health Asia 2025 學生大使，獲城大副校長簽發致謝信。',
          ],
          media: [
            { file: 'cityu-campus/dha-appreciation-letter.png', w: 847, h: 1024, alt: '城大 Digital Health Asia 2025 學生大使致謝信', caption: 'Digital Health Asia 2025 致謝信。' },
            { file: 'cityu-campus/gelato-team.png', w: 1024, h: 768, alt: '城大學生在校園推廣乳酪雪糕', caption: '學系校園推廣活動。' },
            { file: 'cityu-gelato/press-wenweipo.png', w: 471, h: 1024, alt: '文匯報報導城大乳酪雪糕', caption: '文匯報。' },
            { file: 'cityu-gelato/press-mingpao.png', w: 471, h: 1024, alt: '明報報導城大乳酪雪糕', caption: '明報。' },
          ],
        },
        {
          id: 'rev-b',
          trace: '01',
          rev: 'B',
          period: '2024 年 7 月至 2025 年 7 月',
          entry: '美的集團認證工程師（全職）',
          place: '順德',
          details: [
            '主導微波爐北美認證全流程，對接 FDA、UL、CSA、FCC 要求。',
            '審查原型與技術文件，找出不合規差距並向研發與製造提出整改方案。',
            '與研發、製造及第三方實驗室 SGS、Intertek、UL 協作，使設計與生產對齊認證標準。',
          ],
        },
        {
          id: 'rev-a',
          trace: '03',
          rev: 'A',
          period: '2020 年 10 月至 2024 年 6 月',
          entry: '五邑大學化學工程與工藝學士',
          place: '江門',
          details: [
            '五邑大學優秀畢業生。',
            '兩篇 SCI 論文：光催化與發光壓致變色材料。',
            '2020 至 2023 年擔任班長。',
          ],
        },
      ],
    },

    notes: {
      heading: '附註',
      items: [
        { label: '語言', text: '普通話與廣東話為母語。英語可流利工作，IELTS 6.5、TOEIC 815。法語基礎。' },
        { label: '資質', text: '駕駛執照。' },
        { label: '軟件', text: 'Cursor 與 Codex 的 AI 輔助開發、提示工程、Python、OCR 與 PDF 自動化、Power Automate、Power BI、Microsoft Office（Word、Excel、PowerPoint、Outlook）。' },
        { label: '數據來源', text: '本圖所有數字取自認證記錄、實驗記錄或已發佈的產品。' },
      ],
    },

    signoff: {
      heading: '簽署',
      drawnBy: '繪製',
      fields: { email: '電郵', phone: '電話', linkedin: 'LinkedIn', github: 'GitHub' },
      cta: '寄信給我',
      note: '圖號 ZL-2026-01，版次 2026.09。',
    },
  },
}
