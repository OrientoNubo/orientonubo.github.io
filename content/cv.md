---
# =============================================================================
# cv.md — CV-only data that isn't already a homepage collection.
# The CV PDFs (EN + ZH) are generated from the SAME content the site uses:
#   summary + education (here) · publications/awards/certificates/experience/
#   services (their content/ collections) · contact (here).
# Edit each item in ONE place; homepage + both PDFs stay in sync.
# =============================================================================
pdf:
  en: assets/CV-SIYU-EN.pdf
  zh: assets/CV-SIYU-ZH.pdf

# Contact block — shown in the CV PDF header (same for both languages).
contact:
  email: siyu@cmlab.csie.ntu.edu.tw
  phone: "+886 966556458"
  address: No. 1, Sec. 4, Roosevelt Rd., Taipei
  website: orientonubo.github.io

# Summary — italic intro paragraph at the top of each CV PDF.
summary: >-
  Ph.D. candidate in Computer Science at National Taiwan University, advised by
  Prof. Wen-Huang Cheng (CMLab AIMM Group). Research focuses on 3D
  reconstruction, visual geometric foundation models, and visual relocalization,
  with applications to autonomous vehicles and autonomous mobile robots. Broader
  research interests span 2D/3D computer vision, deep learning, multimodal
  understanding, robotic perception and navigation, and generative AI.
summaryZh: >-
  臺灣大學資訊工程學系博士候選人，指導教授為鄭文皇教授（CMLab AIMM
  Group）。研究聚焦於三維重建、視覺幾何基礎模型與視覺重定位，並應用於自駕車與自主移動機器人。研究興趣涵蓋二維／三維電腦視覺、深度學習、多模態理解、機器人感知與導航，以及生成式
  AI。

# Education — shown on the homepage AND in both CV PDFs. Bilingual (*Zh fields).
education:
  - degree: Ph.D. (in progress)
    degreeZh: 博士（ing.）
    school: National Taiwan University
    schoolZh: 國立臺灣大學
    department: Department of Computer Science and Information Engineering
    departmentZh: 資訊工程學系
    detail: 'Advisor: Wen-Huang Cheng'
    gpa: 'GPA: 4.20'
    gpaZh: 'GPA：4.20'
    period: Sep 2022 - Now
    periodZh: 2022.09 至今
  - degree: Master of Science
    degreeZh: 碩士
    school: National Taiwan University of Science and Technology
    schoolZh: 臺灣科技大學
    department: Department of Electronic and Computer Engineering
    departmentZh: 電子工程系
    detail: 'Advisor: Yung-Yao Chen'
    gpa: 'Final GPA: 3.96'
    gpaZh: 'GPA：3.96'
    period: Sep 2020 - Aug 2022
    periodZh: 2020.09～2022.08
  - degree: Bachelor of Science
    degreeZh: 學士
    school: National Taiwan University of Science and Technology
    schoolZh: 臺灣科技大學
    department: Department of Electronic and Computer Engineering
    departmentZh: 電子工程系
    gpa: 'Final GPA: 3.63'
    gpaZh: 'GPA：3.63'
    period: Sep 2018 - Jun 2020
    periodZh: 2018.09～2020.06
---

Curriculum Vitae of Si-Yu Lu. Summary, education and contact live in the
frontmatter here; the rest of the CV is assembled from the homepage collections
(publications, awards, certificates, experience, services). Two PDFs are
generated at build time: `assets/CV-SIYU-EN.pdf` and `assets/CV-SIYU-ZH.pdf`.
