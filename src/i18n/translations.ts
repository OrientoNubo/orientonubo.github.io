// UI Translations for trilingual support (EN / 简体中文 / 繁體中文)

export type Language = 'en' | 'zh-Hans' | 'zh-Hant';

export const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      publications: 'Publications',
      projects: 'Projects',
      experience: 'Experience',
      awards: 'Awards',
      blog: 'Blog',
      cv: 'CV',
    },

    // Hero Section
    hero: {
      title: 'PhD Candidate @ NTU',
      greeting: "Hi, I'm",
      description: 'PhD Candidate at National Taiwan University, researching 3D Reconstruction, Geometric Foundation Models, and Visual Relocalization.',
      viewPublications: 'View Publications',
      exploreProjects: 'Explore Projects',
      scroll: 'Scroll',
    },

    // About Section
    about: {
      title: 'About Me',
      content: 'I am currently pursuing my Ph.D. at CMLab AIMM Group, National Taiwan University, advised by Prof. Wen-Huang Cheng. I also work closely with Prof. Yung-Yao Chen at National Taiwan University of Science and Technology. My main research directions include 3D Reconstruction, Geometric Foundation Models, Visual Relocalization, Physical AI, and Generative Models. I also explore related areas such as Computer Vision (CV), Machine Learning (ML), Autonomous Vehicles (AV), Human-Computer Interaction (HCI), and Robotics/Automation. Please feel free to contact me if you are interested in my research or any of these topics.',
      researchInterests: 'Research Interests',
      publications: 'Publications',
      reviews: 'Reviews',
      projects: 'Projects',
      awards: 'Awards',
    },

    // Publications Section
    publications: {
      title: 'Publications',
      subtitle: 'Selected research papers.',
      firstAuthor: '1st Author',
      corresponding: 'Corresponding',
      coAuthor: 'Co-Author',
      pdf: 'PDF',
      code: 'Code',
      project: 'Project',
      video: 'Video',
      arxiv: 'arXiv',
      bibtex: 'BibTeX',
      emptyState: 'No publications yet. Check back soon!',
      viewAll: 'View All Publications',
    },

    // Projects Section
    projects: {
      title: 'Projects',
      subtitle: 'Projects and research implementations.',
      featured: 'Featured',
      github: 'GitHub',
      demo: 'Demo',
      emptyState: 'No projects yet. Check back soon!',
      viewAll: 'View All Projects',
      status: {
        active: 'Active',
        completed: 'Completed',
        archived: 'Archived',
      },
    },

    // Experience Section
    experience: {
      title: 'Experience',
      subtitle: 'Work experience, internships, and industry-academia collaborations.',
      fullTime: 'Full-time',
      internship: 'Internship',
      collaboration: 'Collaboration',
      featured: 'Featured',
      present: 'Present',
      visit: 'Visit',
      viewAll: 'View All Experience',
    },

    // Services Section
    services: {
      title: 'Services',
      subtitle: 'Academic services and community contributions.',
      viewAll: 'View All Services',
    },

    // Awards Section
    awards: {
      title: 'Awards',
      subtitle: 'Honors and recognition for research contributions.',
      viewAll: 'View All Awards',
    },

    // Certificates Section
    certificates: {
      title: 'Certificates',
      subtitle: 'Professional certifications, certificates, and courses.',
      viewCertificate: 'View Certificate',
      viewAll: 'View All Certificates',
    },

    // CV Page
    cv: {
      title: 'Curriculum Vitae',
      subtitle: 'Academic background, research experience, and skills.',
      downloadCV: 'Download CV',
      education: 'Education',
      skills: 'Skills',
      programming: 'Programming',
      researchAreas: 'Research Areas',
      tools: 'Tools',
      // Education items
      phdInProgress: 'Ph.D. (in progress)',
      msc: 'M.Sc.',
      bsc: 'B.Sc.',
      ntu: 'National Taiwan University',
      ntust: 'National Taiwan University of Science and Technology',
      csie: 'Department of Computer Science and Information Engineering',
      ece: 'Department of Electronic and Computer Engineering',
    },

    // Blog Page
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts on research, and research life.',
      emptyState: 'No blog posts yet. Check back soon!',
      minRead: 'min read',
    },

    // Footer
    footer: {
      copyright: 'All rights reserved.',
      builtWith: 'Built with',
    },

    // Language Switcher
    langSwitcher: {
      language: 'Language',
      english: 'English',
      zhHans: '简体中文',
      zhHant: '繁體中文',
    },
  },

  'zh-Hant': {
    // Navigation
    nav: {
      about: '關於',
      publications: '發表成果',
      projects: '專案',
      experience: '經歷',
      awards: '獎項',
      blog: '部落格',
      cv: '履歷',
    },

    // Hero Section
    hero: {
      title: '博士候選人@台灣大學',
      greeting: '嗨，這裏是',
      description: '台灣大學資工所博士候選人，主要研究方向為：三維重建、幾何基石模型，以及視覺定位',
      viewPublications: '發表成果',
      exploreProjects: '探索專案',
      scroll: '向下滾動',
    },

    // About Section
    about: {
      title: '關於我',
      content: '我目前正於 CMLab AIMM Group, National Taiwan University 攻讀博士學位，指導教授為 Wen-Huang Cheng. 同時，我也與 National Taiwan University of Science and Technology 的 Yung-Yao Chen 緊密合作。我的主要研究方向包括 三維重建, 幾何基石模型/大模型, 視覺定位, 物理AI, 生成式模型. 同時我也探索相關領域，如電腦視覺 (CV)、機器學習 (ML)、自動駕駛 (AV)、人機互動 (HCI) 和機器人/自動化。如果您對我的研究或這些主題感興趣，歡迎與我聯繫。',
      researchInterests: '研究興趣',
      publications: '發表',
      reviews: '審稿',
      projects: '專案',
      awards: '獎項',
    },

    // Publications Section
    publications: {
      title: '發表成果',
      subtitle: '相關研究論文。',
      firstAuthor: '第一作者',
      corresponding: '通訊作者',
      coAuthor: '共同作者',
      pdf: 'PDF',
      code: '程式碼',
      project: '專案',
      video: '影片',
      arxiv: 'arXiv',
      bibtex: 'BibTeX',
      emptyState: '尚無發表，敬請期待！',
      viewAll: '查看所有發表',
    },

    // Projects Section
    projects: {
      title: '專案',
      subtitle: '專案及研究實作',
      featured: '精選',
      github: 'GitHub',
      demo: '展示',
      emptyState: '尚無專案，敬請期待！',
      viewAll: '查看所有專案',
      status: {
        active: '進行中',
        completed: '已完成',
        archived: '已封存',
      },
    },

    // Experience Section
    experience: {
      title: '經歷',
      subtitle: '工作經歷、實習，以及產學合作等。',
      fullTime: '全職',
      internship: '實習',
      collaboration: '合作',
      featured: '精選',
      present: '至今',
      visit: '訪問',
      viewAll: '查看所有經歷',
    },

    // Services Section
    services: {
      title: '服務',
      subtitle: '學術服務與社群貢獻。',
      viewAll: '查看所有服務',
    },

    // Awards Section
    awards: {
      title: '獎項',
      subtitle: '研究榮譽與獎項。',
      viewAll: '查看所有獎項',
    },

    // Certificates Section
    certificates: {
      title: '證照',
      subtitle: '專業認證、證書，以及課程',
      viewCertificate: '查看證照',
      viewAll: '查看所有證照',
    },

    // CV Page
    cv: {
      title: '履歷',
      subtitle: '學術背景、研究經歷，以及專業能力',
      downloadCV: '下載簡歷',
      education: '教育經歷',
      skills: '專業能力',
      programming: '程式設計',
      researchAreas: '研究領域',
      tools: '常用工具',
      // Education items
      phdInProgress: '博士在讀',
      msc: '工學碩士',
      bsc: '工學學士',
      ntu: '台灣大學',
      ntust: '台灣科技大學',
      csie: '資訊工程所',
      ece: '電子工程系/所',
    },

    // Blog Page
    blog: {
      title: '部落格',
      subtitle: '關於研究及對其生活的思考。',
      emptyState: '尚無文章，敬請期待！',
      minRead: '分鐘閱讀',
    },

    // Footer
    footer: {
      copyright: '版權所有。',
      builtWith: '使用',
    },

    // Language Switcher
    langSwitcher: {
      language: '語言',
      english: 'English',
      zhHans: '简体中文',
      zhHant: '繁體中文',
    },
  },

  'zh-Hans': {
    // Navigation
    nav: {
      about: '关于',
      publications: '发表成果',
      projects: '项目',
      experience: '经历',
      awards: '奖项',
      blog: '博客',
      cv: '履历',
    },

    // Hero Section
    hero: {
      title: '博士候选人@台湾大学',
      greeting: '嗨，这里是',
      description: '台湾大学资工所博士候选人，主要研究方向为：三维重建、几何基石模型，以及视觉定位',
      viewPublications: '发表成果',
      exploreProjects: '探索项目',
      scroll: '向下滚动',
    },

    // About Section
    about: {
      title: '关于我',
      content: '我目前正于 CMLab AIMM Group, National Taiwan University 攻读博士学位，指导教授为 Wen-Huang Cheng. 同时，我也与 National Taiwan University of Science and Technology 的 Yung-Yao Chen 紧密合作。我的主要研究方向包括 三维重建, 几何基石模型/大模型, 视觉定位, 物理AI, 生成式模型. 同时我也探索相关领域，如计算机视觉 (CV)、机器学习 (ML)、自动驾驶 (AV)、人机交互 (HCI) 和机器人/自动化。如果您对我的研究或这些主题感兴趣，欢迎与我联系。',
      researchInterests: '研究兴趣',
      publications: '发表',
      reviews: '审稿',
      projects: '项目',
      awards: '奖项',
    },

    // Publications Section
    publications: {
      title: '发表成果',
      subtitle: '相关研究论文。',
      firstAuthor: '第一作者',
      corresponding: '通讯作者',
      coAuthor: '共同作者',
      pdf: 'PDF',
      code: '代码',
      project: '项目',
      video: '视频',
      arxiv: 'arXiv',
      bibtex: 'BibTeX',
      emptyState: '尚无发表，敬请期待！',
      viewAll: '查看所有发表',
    },

    // Projects Section
    projects: {
      title: '项目',
      subtitle: '项目及研究实现',
      featured: '精选',
      github: 'GitHub',
      demo: '演示',
      emptyState: '尚无项目，敬请期待！',
      viewAll: '查看所有项目',
      status: {
        active: '进行中',
        completed: '已完成',
        archived: '已归档',
      },
    },

    // Experience Section
    experience: {
      title: '经历',
      subtitle: '工作经历、实习，以及产学合作等。',
      fullTime: '全职',
      internship: '实习',
      collaboration: '合作',
      featured: '精选',
      present: '至今',
      visit: '访问',
      viewAll: '查看所有经历',
    },

    // Services Section
    services: {
      title: '服务',
      subtitle: '学术服务与社群贡献。',
      viewAll: '查看所有服务',
    },

    // Awards Section
    awards: {
      title: '奖项',
      subtitle: '研究荣誉与奖项。',
      viewAll: '查看所有奖项',
    },

    // Certificates Section
    certificates: {
      title: '证书',
      subtitle: '专业认证、证书，以及课程',
      viewCertificate: '查看证书',
      viewAll: '查看所有证书',
    },

    // CV Page
    cv: {
      title: '履历',
      subtitle: '学术背景、研究经历，以及专业能力',
      downloadCV: '下载简历',
      education: '教育经历',
      skills: '专业能力',
      programming: '程序设计',
      researchAreas: '研究领域',
      tools: '常用工具',
      // Education items
      phdInProgress: '博士在读',
      msc: '工学硕士',
      bsc: '工学学士',
      ntu: '台湾大学',
      ntust: '台湾科技大学',
      csie: '信息工程所',
      ece: '电子工程系/所',
    },

    // Blog Page
    blog: {
      title: '博客',
      subtitle: '关于研究及对其生活的思考。',
      emptyState: '尚无文章，敬请期待！',
      minRead: '分钟阅读',
    },

    // Footer
    footer: {
      copyright: '版权所有。',
      builtWith: '使用',
    },

    // Language Switcher
    langSwitcher: {
      language: '语言',
      english: 'English',
      zhHans: '简体中文',
      zhHant: '繁體中文',
    },
  },
} as const;

export type Translations = typeof translations.en;
