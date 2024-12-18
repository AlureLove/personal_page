const translations = {
    en: {
        name: "Jethro Liu",
        title: "iOS Developer",
        "experience.title": "Work Experience",
        "skills.title": "Languages, Skills and Technologies",
        "education.title": "Education",
        "contact.title": "Contact",
        "honors.title": "Honors & Awards",
        "location.japan": "Japan",
        "location.china": "China",
        "footer.credits": "Hosted on GitHub Pages — Theme inspired by",
        "job.desoul.title": "iOS Application Development Engineer (Part Time, Remote), 2024.5 - Present",
        "job.desoul.location": "Tokyo, Japan",
        "job.desoul.detail1": `Independently developed the <strong>DODOFLASH</strong> <a href="https://apps.apple.com/jp/app/dodoflash/id1575172812" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> application`,
        "job.desoul.detail2": "Responsible for page refactoring, feature iterations, and performance optimization",
        "job.exawizards.title": "Full-stack Application Development Engineer (Summer Intern), 2024.8 – 2024.9",
        "job.exawizards.location": "Tokyo, Japan",
        "job.exawizards.detail1": "Full stack development with Kotlin + WASM for frontend and Ktor framework for backend",
        "job.exawizards.detail2": "R&D app development using Kotlin, TypeScript, and Python",
        "job.alibaba.title": "Software Development Engineer, Taobao Department, 2021 – 2023",
        "job.alibaba.location": "Hangzhou, China",
        "job.alibaba.overview": "Responsible for live streaming and short video related development in Taote app, as well as part of performance optimization.",
        "job.alibaba.seller.title": "Taote Seller App:",
        "job.alibaba.seller.detail1": "Led the development of the iOS section of the live streaming's start-up feature, transitioning from mini-program to native&Flutter.",
        "job.alibaba.seller.detail2": "Implemented core functionalities such as beautification and noise reduction, optimizing streaming modes which doubled the daily broadcasting frequency.",
        "job.alibaba.seller.detail3": "Pioneered the use of Flutter in the live streaming segment, developing critical features such as the commodity pocket and beauty tools. Established foundational broadcasting capabilities including a Flutter video streaming component and native channel capabilities.",
        "job.alibaba.buyer.title": `<strong>Taote Buyer App</strong> <a href="https://apps.apple.com/cn/app/%E6%B7%98%E5%AE%9D%E7%89%B9%E4%BB%B7%E7%89%88/id1340376323" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a>:`,
        "job.alibaba.buyer.detail1": "Managed daily business iterations under the \"Watch Videos\" tab, including the implementation of the comments panel, voting systems, and multimedia integration.",
        "job.alibaba.buyer.detail2": "Developed the content community's media publishing capabilities, enhancing the multimedia functionalities from scratch and improving UGC publication pathways.",
        "job.alibaba.buyer.detail3": "Served as the project manager for engineering excellence, responsible for coding standards and testing across the team. Established a complete workflow for each iteration, including build, test, review, and integration.",
        "job.alibaba.daraz.title": `<strong>Daraz Seller App</strong> <a href="https://apps.apple.com/us/app/daraz-seller-center/id1466211050" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> (International Digital Business Department):`,
        "job.alibaba.daraz.detail1": "Primarily responsible for the development of seller functionalities including product listings, merchant onboarding, and coupon management.",
        "job.tplink.title": "Software Development Engineer, 2020 – 2021",
        "job.tplink.location": "Hangzhou, China",
        "job.tplink.detail1": `Responsible for developing related features of <strong>TP-LINK IoT products</strong> <a href="https://apps.apple.com/jp/app/tp-link%E7%89%A9%E8%81%94/id1095523835" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a>, such as security testers and battery doorbells.`,
        "job.tplink.detail2": "Debugging of embedded devices and Jenkins configuration management",
        "education.waseda": "Waseda University",
        "education.waseda.degree": "Master of Engineering in Computer Science",
        "education.waseda.period": "2024 - 2026",
        "education.waseda.honor": "Monbukagakusho Honor's Scholarship (2024)",
        "education.csu": "Central South University",
        "education.csu.degree": "Bachelor of Engineering in The Internet of Things Engineering",
        "education.csu.period": "2016 - 2020",
        "education.csu.honor1": "Second Prize of the 12th \"Sublimation Cup\" Student Entrepreneurship Competition",
        "education.csu.honor2": "Third Prize of the Second Intelligent Interconnection Competition",
        "education.csu.honor3": "Lenovo Intelligent Eco College Innovation Competition Central China Top Ten",
        "skills.programming": "Programming Languages",
        "skills.frameworks": "Frameworks & Tools",
        "skills.languages": "Languages",
        "skills.languages.value": "English (Fluent), Japanese (Beginner), Mandarin (Native)",
        "copyright": "All rights reserved.",
        "job.desoul.company": "Desoul Inc",
        "job.exawizards.company": "ExaWizards Inc",
        "job.alibaba.company": "Alibaba Group",
        "job.tplink.company": "TP-LINK",
        "skills.programming.title": "Programming Languages",
        "skills.programming.content": "Swift, Objective-C, C/C++, Python, SQL, Kotlin",
        
        "skills.frameworks.title": "Frameworks & Tools",
        "skills.frameworks.content": "UIKit, SwiftUI, Flutter, Ktor, Jenkins",
        
        "skills.languages.title": "Languages",
        "skills.languages.content": "English (Fluent), Japanese (Beginner), Mandarin (Native)",
    },
    zh: {
        name: "Jethro Liu",
        title: "iOS 开发工程师",
        "experience.title": "工作经历",
        "skills.title": "技术栈与语言能力",
        "education.title": "教育经历",
        "contact.title": "联系方式",
        "honors.title": "荣誉奖项",
        "location.japan": "日本",
        "location.china": "中国",
        "footer.credits": "托管于 GitHub Pages — 主题灵感来自",
        "job.desoul.title": "iOS 应用开发工程师（兼职，远程），2024.5 - 至今",
        "job.desoul.location": "东京，日本",
        "job.desoul.detail1": `独立开发 <strong>DODOFLASH</strong> <a href="https://apps.apple.com/jp/app/dodoflash/id1575172812" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> 应用`,
        "job.desoul.detail2": "负责页面重构、功能迭代和性能优化",
        "job.exawizards.title": "全栈应用开发工程师（暑期实习），2024.8 – 2024.9",
        "job.exawizards.location": "东京，日本",
        "job.exawizards.detail1": "使用 Kotlin + WASM 进行前端开发，后端使用 Ktor 框架",
        "job.exawizards.detail2": "使用 Kotlin、TypeScript 和 Python 进行研发应用开发",
        "job.alibaba.title": "软件开发工程师，淘宝部门，2021 – 2023",
        "job.alibaba.location": "杭州，中国",
        "job.alibaba.overview": "负责淘特 App 直播和短视频相关开发，以及部分性能优化工作。",
        "job.alibaba.seller.title": "淘特卖家端：",
        "job.alibaba.seller.detail1": "主导开发直播启动功能的 iOS 部分，将小程序迁移至原生及 Flutter。",
        "job.alibaba.seller.detail2": "实现美颜、降噪等核心功能，优化直播模式使日均开播频次翻倍。",
        "job.alibaba.seller.detail3": "在直播板块率先使用 Flutter，开发商品口袋、美颜工具等关键功能。建立包括 Flutter 视频流组件和原生通道能力在内的基础直播能力。",
        "job.alibaba.buyer.title": `<strong>淘宝特价版</strong> <a href="https://apps.apple.com/cn/app/%E6%B7%98%E5%AE%9D%E7%89%B9%E4%BB%B7%E7%89%88/id1340376323" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a>：`,
        "job.alibaba.buyer.detail1": "管理'看视频'标签下的日常业务迭代，包括评论面板、投票系统和多媒体集成的实现。",
        "job.alibaba.buyer.detail2": "开发内容社区的媒体发布能力，从零提升多媒体功能并改进 UGC 发布路径。",
        "job.alibaba.buyer.detail3": "担任工程效能项目经理，负责团队的编码规范和测试。为每次迭代建立完整的工作流程，包括构建、测试、审查和集成。",
        "job.alibaba.daraz.title": `<strong>Daraz 卖家端</strong> <a href="https://apps.apple.com/us/app/daraz-seller-center/id1466211050" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a>（国际数字业务部）：`,
        "job.alibaba.daraz.detail1": "主要负责商品上架、商家入驻、优惠券管理等卖家功能的开发。",
        "job.tplink.title": "软件开发工程师，2020 – 2021",
        "job.tplink.location": "杭州，中国",
        "job.tplink.detail1": `负责开发<strong>TP-LINK物联</strong> <a href="https://apps.apple.com/jp/app/tp-link%E7%89%A9%E8%81%94/id1095523835" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> 中安防测试仪和电池门铃等相关功能`,
        "job.tplink.detail2": "嵌入式设备调试和 Jenkins 配置管理",
        "education.waseda": "早稻田大学",
        "education.waseda.degree": "计算机科学工学硕士",
        "education.waseda.period": "2024 - 2026",
        "education.waseda.honor": "文部科学省荣誉奖学金 (2024)",
        "education.csu": "中南大学",
        "education.csu.degree": "物联网工程学士",
        "education.csu.period": "2016 - 2020",
        "education.csu.honor1": "第十二届升华杯大学生创业大赛二等奖",
        "education.csu.honor2": "第二届智能互联大赛三等奖",
        "education.csu.honor3": "联想智能生态院校创新大赛华中区十强",
        "skills.programming": "编程语言",
        "skills.frameworks": "框架与工具",
        "skills.languages": "语言能力",
        "skills.languages.value": "英语（流利），日语（初级），中文（母语）",
        "copyright": "版权所有。",
        "job.desoul.company": "Desoul株式会社",
        "job.exawizards.company": "ExaWizards株式会社",
        "job.alibaba.company": "阿里巴巴集团",
        "job.tplink.company": "普联技术",
        "skills.programming.title": "Programming Languages",
        "skills.programming.content": "Swift, Objective-C, C/C++, Python, SQL, Kotlin",
        
        "skills.frameworks.title": "Frameworks & Tools",
        "skills.frameworks.content": "UIKit, SwiftUI, Flutter, Ktor, Jenkins",
        
        "skills.languages.title": "Languages",
        "skills.languages.content": "英语 (流利), 日语 (初级), 普通话 (母语)",
    },
    ja: {
        name: "ジェスロ リュウ",
        title: "iOS デベロッパー",
        "experience.title": "職歴",
        "skills.title": "言語・スキル・技術",
        "education.title": "学歴",
        "contact.title": "連絡先",
        "honors.title": "表彰",
        "location.japan": "日本",
        "location.china": "中国",
        "footer.credits": "GitHub Pages でホスト — テーマ参考元：",
        "job.desoul.title": "iOS アプリケーション開発エンジニア（パートタイム，リモート），2024.5 - 現在",
        "job.desoul.location": "東京，日本",
        "job.desoul.detail1": `<strong>DODOFLASH</strong> <a href="https://apps.apple.com/jp/app/dodoflash/id1575172812" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> アプリケーションの独自開発`,
        "job.desoul.detail2": "ページのリファクタリング、機能の改善、パフォーマンスの最適化を担当",
        "job.exawizards.title": "フルスタック アプリケーション開発エンジニア（サマーインターン），2024.8 – 2024.9",
        "job.exawizards.location": "東京，日本",
        "job.exawizards.detail1": "Kotlin + WASM によるフロントエンド開発、Ktor フレームワークによるバックエンド開発",
        "job.exawizards.detail2": "Kotlin、TypeScript、Python を使用した研究開発アプリケーションの開発",
        "job.alibaba.title": "ソフトウェア開発エンジニア，タオバオ部門，2021 – 2023",
        "job.alibaba.location": "杭州，中国",
        "job.alibaba.overview": "淘特アプリのライブ配信と短編動画関連の開発、およびパフォーマンス最適化を担当。",
        "job.alibaba.seller.title": "淘特セラーアプリ：",
        "job.alibaba.seller.detail1": "ライブ配信開始機能のiOS部分の開発をリード、ミニプログラムからネイティブとFlutterへの移行。",
        "job.alibaba.seller.detail2": "美顔・ノイズ低減などの主要機能を実装、配信モードを最適化し日次配信頻度を倍増。",
        "job.alibaba.seller.detail3": "ライブ配信セグメントでFlutterを先駆的に採用、商品ポケットや美顔ツールなどの重要機能を開発。Flutterビデオストリーミングコンポーネントとネイティブチャネル機能を含む基盤的な配信機能を確立。",
        "job.alibaba.buyer.title": `<strong>タオバオ特価版</strong> <a href="https://apps.apple.com/cn/app/%E6%B7%98%E5%AE%9D%E7%89%B9%E4%BB%B7%E7%89%88/id1340376323" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> :`,
        "job.alibaba.buyer.detail1": "「動画を見る」タブの日常的なビジネス改善を管理、コメントパネル、投票システム、マルチメディア統合の実装を含む。",
        "job.alibaba.buyer.detail2": "コンテンツコミュニティのメディア公開機能を開発、マルチメディア機能を一から強化しUGC公開パスを改善。",
        "job.alibaba.buyer.detail3": "エンジニアリング効率化のプロジェクトマネージャーとして、チーム全体のコーディング基準とテストを担当。ビルド、テスト、レビュー、統合を含む各イテレーションの完全なワークフローを確立。",
        "job.alibaba.daraz.title": `<strong>Darazセラーアプリ</strong> <a href="https://apps.apple.com/us/app/daraz-seller-center/id1466211050" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a>（国際デジタルビジネス部門）：`,
        "job.alibaba.daraz.detail1": "商品リスト、出店者オンボーディング、クーポン管理などのセラー機能の開発を主に担当。",
        "job.tplink.title": "ソフトウェア開発エンジニア，2020 – 2021",
        "job.tplink.location": "杭州，中国",
        "job.tplink.detail1": `<strong>TP-LINK物联</strong> <a href="https://apps.apple.com/jp/app/tp-link%E7%89%A9%E8%81%94/id1095523835" target="_blank" rel="noopener" class="app-store-link" aria-label="Download on App Store"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/></svg></a> におけるセキュリティテスターやバッテリードアベルなどの関連機能の開発を担当しました。`,
        "job.tplink.detail2": "組み込みデバイスのデバッグと Jenkins の設定管理",
        "education.waseda": "早稲田大学",
        "education.waseda.degree": "コンピュータサイエンス修士（工学）",
        "education.waseda.period": "2024 - 2026",
        "education.waseda.honor": "文部科学省奨学金 (2024)",
        "education.csu": "中南大学",
        "education.csu.degree": "モノのインターネット工学学士",
        "education.csu.period": "2016 - 2020",
        "education.csu.honor1": "第12回「昇華カップ」学生起業コンペティション 準優勝",
        "education.csu.honor2": "第2回スマートインターコネクトコンペティション 第3位",
        "education.csu.honor3": "レノボスマートエコカレッジイノベーションコンペティション 華中地区トップ10",
        "skills.programming": "プログラミング言語",
        "skills.frameworks": "フレームワーク・ツール",
        "skills.languages": "言語能力",
        "skills.languages.value": "英語（流暢），日本語（初級），中国語（ネイティブ）",
        "copyright": "すべての権利を保有。",
        "job.desoul.company": "Desoul株式会社",
        "job.exawizards.company": "ExaWizards株式会社",
        "job.alibaba.company": "アリババグループ",
        "job.tplink.company": "TP-LINK",
        "skills.programming.title": "プログラミング言語",
        "skills.programming.content": "Swift, Objective-C, C/C++, Python, SQL, Kotlin",
        
        "skills.frameworks.title": "フレームワークとツール",
        "skills.frameworks.content": "UIKit, SwiftUI, Flutter, Ktor, Jenkins",
        
        "skills.languages.title": "言語",
        "skills.languages.content": "英語（流暢）、日本語（初級）、中国語（ネイティブ）",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-switcher button');
    
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = ['en', 'zh', 'ja'].includes(browserLang) ? browserLang : 'en';
    updateLanguage(defaultLang);
    
    const updateActiveButton = (lang) => {
        languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    };
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            updateLanguage(lang);
            updateActiveButton(lang);
        });
    });
    
    updateActiveButton(defaultLang);
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
}