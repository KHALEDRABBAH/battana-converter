/* Batana Showcase Interactive Controller (Zero external dependencies) */
(function (global) {
  "use strict";

  const SAMPLES = [
    {
      label: "كتاب عربي مشكّل بالكامل",
      meta: "نص رقمي أصلي · تشكيل كامل وتناسق سطور",
      font: "Amiri",
      lang: "عربي RTL",
      srcTitle: "فِي البَدْءِ كَانَ الكَلِمَةُ المَضْبُوطَةُ",
      srcLines: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — إِنَّ دِقَّةَ التَّشْكِيلِ العَرَبِيِّ",
        "تَحْفَظُ المَعْنَى وَالإِعْرَابَ وَسَلَامَةَ القِرَاءَةِ الصَّحِيحَةِ.",
      ],
      batanaLines: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — إِنَّ دِقَّةَ التَّشْكِيلِ العَرَبِيِّ",
        "تَحْفَظُ المَعْنَى وَالإِعْرَابَ وَسَلَامَةَ القِرَاءَةِ الصَّحِيحَةِ.",
      ],
      legacyTitle: "ة ط و ب ض م ل ا  ة م ل ك ل ا  ن ا ك",
      legacyLines: [
        "ي ب ر ع ل ا  ل ي ك ش ت ل ا  ة ق د  ن إ — م ي ح ر ل ا  ن م ح ر ل ا",
        "تقطّع الحروف وضياع الحركات وانعكاس ترتيب الكلمات.",
      ],
      grade: "Content Integrity A+",
    },
    {
      label: "نص عربي–إنجليزي متداخل (Bidi)",
      meta: "فقرات ثنائية اللغة بأرقام وأقواس ومصطلحات تقنية",
      font: "Cairo · Sans",
      lang: "ثنائي اللغة RTL/LTR",
      srcTitle: "تكامل الأنظمة الحديثة (System Architecture)",
      srcLines: [
        "يدعم الإصدار 5.2 معالجة ملفات (UTF-8 / OpenXML) بدقة متكاملة.",
        "يحافظ على ترتيب الأقواس والأرقام دون انقلاب داخل الفقرة العربية.",
      ],
      batanaLines: [
        "يدعم الإصدار 5.2 معالجة ملفات (UTF-8 / OpenXML) بدقة متكاملة.",
        "يحافظ على ترتيب الأقواس والأرقام دون انقلاب داخل الفقرة العربية.",
      ],
      legacyTitle: ")System Architecture( ةثيدحلا ةمظنلأا لماكت",
      legacyLines: [
        ")OpenXML / UTF-8( تافلم ةجلاعم 2.5 رادصلإا معدي",
        "انقلاب الأقواس واختلال موضع الكلمات اللاتينية داخل السطر.",
      ],
      grade: "Content Integrity A+",
    },
    {
      label: "تقرير تقني وجداول متعددة الأعمدة",
      meta: "عناوين، جداول منظمة، وهيكلة قابلة للتحرير",
      font: "Noto Naskh Arabic",
      lang: "جداول وتخطيط 1:1",
      srcTitle: "ملخص الأداء والجودة — التقرير الربع سنوي",
      srcLines: [
        "المعيار الأول: سلامة النص 100% · المعيار الثاني: تطابق البنية.",
        "الجدول (2–1): مقارنة زمن المعالجة المحلي على ملفات متعددة الصفحات.",
      ],
      batanaLines: [
        "المعيار الأول: سلامة النص 100% · المعيار الثاني: تطابق البنية.",
        "الجدول (2–1): مقارنة زمن المعالجة المحلي على ملفات متعددة الصفحات.",
      ],
      legacyTitle: "يونس ع برلا ريرقتلا — ةدوجلاو ءادلأا صخلم",
      legacyLines: [
        "انهيار خلايا الجدول وتحولها إلى مربعات نصية متداخلة غير قابلة للتعديل.",
        "تشتت الأعمدة وتكرار الفواصل السطرية في كل خلية.",
      ],
      grade: "Content Integrity A+",
    },
    {
      label: "نص تراثي برسم عثماني وعلامات وقف",
      meta: "حماية صارمة للرموز الدقيقة دون تطبيع مخلّ",
      font: "Scheherazade New",
      lang: "رسم عثماني محمي",
      srcTitle: "﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴾",
      srcLines: [
        "حماية دقيقة للرسم العثماني وعلامات الوقف والألف الخنجرية.",
        "فحص صارم على مستوى الرموز لضمان عدم استبدال أي علامة.",
      ],
      batanaLines: [
        "حماية دقيقة للرسم العثماني وعلامات الوقف والألف الخنجرية.",
        "فحص صارم على مستوى الرموز لضمان عدم استبدال أي علامة.",
      ],
      legacyTitle: "اقرا باسم ربك الذي خلق (حذف الرموز)",
      legacyLines: [
        "سقوط علامات الضبط والوقف وتحوّل الرموز الخاصة إلى مربعات فارغة □□.",
        "تطبيع تلقائي غير مرغوب يُغيّر أصل النص التراثي.",
      ],
      grade: "حماية الرموز 100%",
    },
  ];

  const PROGRAM_STEPS = [
    {
      num: "01",
      short: "التحليل المباشر بدون OCR",
      phase: "المرحلة 01 · التأسيس",
      title: "التحليل الهندسي المباشر للطبقة النصية",
      summary:
        "كانت نقطة الانطلاق رفض فكرة تحويل ملفات PDF الرقمية إلى صور لتخمينها بـ OCR. صمّمنا نواة تقرأ بنية المستند الرقمي مباشرةً، فتستوعب حدود الأسطر والفقرات والألوان والخطوط من المصدر الأصلي دون فقدان.",
      learned:
        "أغلب مشاكل تشوّه المستندات العربية ليست بسبب غياب النص في الـ PDF، بل بسبب التعامل السطحي مع ترتيب الرسم البصري.",
      outcome:
        "نص عربي نقي وسريع المعالجة دون أخطاء التعرّف الضوئي الشائعة، مع الحفاظ الكامل على الحركات والرموز.",
    },
    {
      num: "02",
      short: "هندسة العربية والـ Bidi",
      phase: "المرحلة 02 · اللغة والاتجاه",
      title: "إعادة بناء القراءة المنطقية للعربية وثنائية اللغة",
      summary:
        "ركّزنا على أعقد تحدٍ في المستندات العربية: استعادة تسلسل القراءة الطبيعي عند تداخل العربية مع الإنجليزية والأرقام والأقواس والتشكيل الكامل، وضبط خصائص الاتجاه داخل مستند Word ليصبح التحرير سلساً كأنك كتبته من الصفر.",
      learned:
        "دعم العربية الحقيقي يتطلب احترام تفاصيل الاتجاه الثنائي في كل فقرة وكل مقطع نصي، لا مجرد محاذاة يمينية شكلية.",
      outcome:
        "تعديل الكلمات والنسخ واللصق والبحث داخل ملف Word الناتج يعمل بسلاسة تامة دون انقلاب أقواس أو تقطّع حروف.",
    },
    {
      num: "03",
      short: "الأوضاع الأربعة التخصصية",
      phase: "المرحلة 03 · التخطيط والمرونة",
      title: "تخصيص مسارات مستقلة للكتب والجداول والرسم العثماني",
      summary:
        "أدركنا أن الكتاب الأدبي ذا الفصول والحواشي والشعر يحتاج معاملة مختلفة عن التقرير الإداري ذي الجداول والأعمدة، أو النص التراثي ذي علامات الوقف. فبنينا أربعة أوضاع واضحة مع وضع تلقائي ذكي يختار الأنسب تلقائياً.",
      learned:
        "المرونة المنظّمة بأوضاع واضحة تمنح نتائج أدق بكثير من محاولة إجبار كل المستندات على قالب واحد.",
      outcome:
        "مخرجات نظيفة ومتناسقة سواء كان الملف كتاباً عربياً طويلاً، ديوان شعر، جدول بيانات، أو نصاً تراثياً حساساً.",
    },
    {
      num: "04",
      short: "القياس الصادق والتدقيق",
      phase: "المرحلة 04 · الشفافية والجودة",
      title: "منظومة تحقق مستقلة وشهادات قياس لا تُجامِل",
      summary:
        "أضفنا بوابة تدقيق آلية تتحقق من سلامة حزمة Word وبنية الفقرات والجداول والحواشي، وتُقارن النص بمرجع استخراج مستقل. والأهم: فصلنا بوضوح بين سلامة المحتوى (Content Integrity) والمطابقة البصرية حتى لا تُخدع العين بأرقام مضلّلة.",
      learned:
        "الأرقام الصادقة التي تكشف الموضع الدقيق لأي خلل أهم ألف مرة من درجة مجمّلة مرتفعة تخفي المشاكل.",
      outcome:
        "تقرير واضح وشهادة محلية غير متصلة بالإنترنت تبيّن للمستخدم بالضبط ما تم التحقق منه وما يستحق المراجعة.",
    },
    {
      num: "05",
      short: "استوديو سطح المكتب المحلي",
      phase: "المرحلة 05 · تجربة الاستخدام",
      title: "تطبيق محلي كامل للإنتاجية والخصوصية",
      summary:
        "جمعنا كل هذه القدرات داخل واجهة سطح مكتب عربية محلية بالكامل تدعم السحب والإفلات، تحويل دفعات مجلدات بالتوازي، مكتبة منظمة للملفات المحوّلة، معرض خطوط تفاعلي، واختصارات لوحة مفاتيح سريعة.",
      learned:
        "القوة الهندسية تكتمل فقط حين تصل للمستخدم بواجهة هادئة وواضحة تمنحه الثقة والسرعة من أول دقيقة.",
      outcome:
        "أداة إنتاجية يومية تعمل دون إنترنت وتُنجز ملفاً واحداً أو مكتبة كاملة بخصوصية مطلقة.",
    },
  ];

  const MODES = [
    {
      key: "auto",
      title: "تلقائي ذكي",
      tag: "موصى به",
      desc: "يكتشف لغة وبنية المستند تلقائياً ويوجّهه إلى مسار التحويل الأنسب دون أي ضبط يدوي.",
    },
    {
      key: "exact",
      title: "تطابق البنية",
      tag: "جداول وأعمدة",
      desc: "يحافظ على الجداول، الترويسات، الأعمدة المتعددة، والتخطيط العام للمستندات التقنية وثنائية اللغة.",
    },
    {
      key: "book",
      title: "كتاب عربي وشعر",
      tag: "للكتب والشعر",
      desc: "مخصّص للكتب الممتدة مع تنظيم الفصول، الفهارس، الحواشي السفلية، وتنسيق أبيات الشعر.",
    },
    {
      key: "uthmani",
      title: "مصحف / عثماني",
      tag: "حماية الرموز",
      desc: "حماية صارمة للرسم العثماني وعلامات الوقف مع تحقق دقيق يمنع أي تطبيع تلقائي للرموز.",
    },
  ];

  const FONTS = [
    {
      name: "Amiri",
      family: "'Amiri', serif",
      role: "خط نسخ طباعي فاخر للكتب الأدبية والدواوين والتشكيل الكامل",
      license: "SIL OFL 1.1",
    },
    {
      name: "Cairo",
      family: "'Cairo', sans-serif",
      role: "خط هندسي معاصر واضح للواجهات والتقارير والعروض الحديثة",
      license: "SIL OFL 1.1",
    },
    {
      name: "Noto Naskh Arabic",
      family: "'Noto Naskh Arabic', serif",
      role: "خط نسخ متوازن مثالي للمستندات الأكاديمية وثنائية اللغة",
      license: "SIL OFL 1.1",
    },
    {
      name: "Scheherazade New",
      family: "'Scheherazade New', serif",
      role: "تغطية شاملة لعلامات الوقف والتشكيل التراثي والرسم العثماني",
      license: "SIL OFL 1.1",
    },
  ];

  const FONT_PRESETS = {
    "تشكيل كلاسيكي": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ | ١٢٣٤٥",
    "عربي + تقني": "محوّل «بتانة» يحفظ التشكيل واتجاه القراءة (RTL / LTR) بدون OCR.",
    "نص قرآني": "﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴾",
    "بيت شعر": "وَمَا نَيْلُ المَطَالِبِ بِالتَّمَنِّي  ***  وَلَكِنْ تُؤْخَذُ الدُّنْيَا غِلَابَا",
  };

  const state = {
    sampleIdx: 0,
    compareMode: "batana",
    stepIdx: 0,
    selectedMode: "auto",
    certMode: "normalized",
    fontSize: 24,
  };

  function renderPedestal() {
    const s = SAMPLES[state.sampleIdx];
    const isBatana = state.compareMode === "batana";
    document.getElementById("sampleLabel").textContent = s.label;
    document.getElementById("sampleMeta").textContent = s.meta;
    document.getElementById("srcTitle").textContent = s.srcTitle;
    document.getElementById("srcL1").textContent = s.srcLines[0];
    document.getElementById("srcL2").textContent = s.srcLines[1];
    document.getElementById("srcFont").textContent = s.font;
    document.getElementById("srcLang").textContent = s.lang;

    const outSheet = document.getElementById("outSheet");
    outSheet.className = "doc-sheet " + (isBatana ? "target-batana" : "target-broken");

    document.getElementById("outHeadLeft").innerHTML = isBatana
      ? 'الناتج · <span class="ltr">Word (.docx)</span>'
      : "محوّل تقليدي / <span class='ltr'>OCR</span>";
    document.getElementById("outHeadLeft").className = isBatana ? "accent" : "";
    document.getElementById("outHeadRight").textContent = isBatana ? s.grade : "تلف في البنية والنص";

    const outTitle = document.getElementById("outTitle");
    const outL1 = document.getElementById("outL1");
    const outL2 = document.getElementById("outL2");

    outTitle.textContent = isBatana ? s.srcTitle : s.legacyTitle;
    outL1.textContent = isBatana ? s.batanaLines[0] : s.legacyLines[0];
    outL2.textContent = isBatana ? s.batanaLines[1] : s.legacyLines[1];
    outL1.className = isBatana ? "sheet-line" : "sheet-line broken-sample";

    document.getElementById("outFootLeft").textContent = isBatana ? "طبقة نصية قابلة للتحرير 100%" : "يحتاج إعادة كتابة يدوية";
    document.getElementById("outFootRight").textContent = isBatana ? "اتجاه RTL/Bidi سليم" : "أخطاء تشكيل واتجاه";

    document.getElementById("btnViewBatana").classList.toggle("active", isBatana);
    document.getElementById("btnViewBatana").classList.toggle("blue", isBatana);
    document.getElementById("btnViewLegacy").classList.toggle("active", !isBatana);

    document.getElementById("sampleDots").innerHTML = SAMPLES.map(
      (_, i) =>
        `<button class="dot-pip ${i === state.sampleIdx ? "active" : ""}" onclick="BatanaSite.goSample(${i})" aria-label="عيّنة ${i + 1}"></button>`
    ).join("");
  }

  function stepSample(delta) {
    state.sampleIdx = (state.sampleIdx + delta + SAMPLES.length) % SAMPLES.length;
    renderPedestal();
  }

  function goSample(idx) {
    state.sampleIdx = idx;
    renderPedestal();
  }

  function setCompareMode(m) {
    state.compareMode = m;
    renderPedestal();
  }

  function renderTimeline() {
    document.getElementById("timelineNav").innerHTML = PROGRAM_STEPS.map(
      (st, i) => `
      <button class="step-btn ${i === state.stepIdx ? "active" : ""}" role="tab" aria-selected="${i === state.stepIdx}" onclick="BatanaSite.selectStep(${i})">
        <span class="step-idx">${st.num}</span>
        <div>
          <div style="font-size:15px;font-weight:600;">${st.short}</div>
        </div>
      </button>
    `
    ).join("");

    const cur = PROGRAM_STEPS[state.stepIdx];
    document.getElementById("stepPhaseTag").textContent = cur.phase;
    document.getElementById("stepTitle").textContent = cur.title;
    document.getElementById("stepSummary").textContent = cur.summary;
    document.getElementById("stepLearned").textContent = cur.learned;
    document.getElementById("stepOutcome").textContent = cur.outcome;
  }

  function selectStep(i) {
    state.stepIdx = i;
    renderTimeline();
  }

  function renderModes() {
    document.getElementById("modeChips").innerHTML = MODES.map(
      (m) => `
      <button class="mode-chip ${state.selectedMode === m.key ? "selected" : ""}" onclick="BatanaSite.selectMode('${m.key}')">
        <div class="mode-chip-top">
          <span class="mode-chip-title">${m.title}</span>
          <span class="mode-chip-tag">${m.tag}</span>
        </div>
        <div class="mode-chip-desc">${m.desc}</div>
      </button>
    `
    ).join("");
  }

  function selectMode(k) {
    state.selectedMode = k;
    renderModes();
  }

  function setCertMode(mode) {
    state.certMode = mode;
    const isFaith = mode === "faithful";
    document.getElementById("certBtnNorm").classList.toggle("active", !isFaith);
    document.getElementById("certBtnNorm").classList.toggle("blue", !isFaith);
    document.getElementById("certBtnFaith").classList.toggle("active", isFaith);
    document.getElementById("certBtnFaith").classList.toggle("blue", isFaith);

    document.getElementById("certModeHeading").innerHTML = isFaith
      ? 'وضع المطابقة الأصلية (<span class="ltr">faithful</span>) — شهادة <span class="ltr">Fidelity</span>'
      : 'الوضع الموحّد (<span class="ltr">normalized</span>) — شهادة <span class="ltr">Content Integrity</span>';

    document.getElementById("certExplain").textContent = isFaith
      ? "في وضع المطابقة الأصلية يحتفظ المستند بخطوطه ومقاييسه الأصلية، فتُفعّل الشارة الثالثة لقياس التطابق الهندسي وتداخل الحبر والتفاف السطور بصدق."
      : "في الوضع الموحّد الافتراضي يركّز التحويل على سلامة النص والبنية لإنتاج مستند Word سهل التحرير؛ ولذلك لا تُخلط الدرجة البصرية بالنتيجة وتُعلَّم صراحةً كغير مقيّمة.";

    const visVal = document.getElementById("certVisVal");
    const visDesc = document.getElementById("certVisDesc");
    if (isFaith) {
      visVal.innerHTML = '<span class="ltr">مُفعّل · A</span>';
      visVal.style.color = "var(--primary)";
      visDesc.textContent = "قياس مركّب متوازن لتداخل الحبر، إزاحة السطور، عرض السطر، وتكافؤ التفاف الأسطر.";
    } else {
      visVal.textContent = "غير مقيّم";
      visVal.style.color = "var(--ink-48)";
      visDesc.innerHTML = '<span class="ltr">Visual fidelity: not assessed in normalized mode</span>';
    }
  }

  function renderFonts() {
    const val = document.getElementById("fontInput").value || FONT_PRESETS["تشكيل كلاسيكي"];
    document.getElementById("fontGrid").innerHTML = FONTS.map(
      (f) => `
      <article class="font-specimen-card">
        <div class="font-specimen-meta">
          <div>
            <strong style="font-size:18px;color:var(--ink);" class="ltr">${f.name}</strong>
            <div style="font-size:13px;color:var(--ink-48);margin-top:2px;">${f.role}</div>
          </div>
          <span class="sub-tag ltr">${f.license}</span>
        </div>
        <div class="font-sample-out" style="font-family:${f.family};font-size:${state.fontSize}px;">${val}</div>
      </article>
    `
    ).join("");
  }

  function renderFontPresets() {
    document.getElementById("fontPresets").innerHTML = Object.entries(FONT_PRESETS)
      .map(
        ([label, text]) =>
          `<button class="btn-pearl" onclick="BatanaSite.applyPreset(${JSON.stringify(text)})">${label}</button>`
      )
      .join("");
  }

  function applyPreset(text) {
    document.getElementById("fontInput").value = text;
    renderFonts();
  }

  function setFontSize(px, btn) {
    state.fontSize = px;
    document.querySelectorAll("[data-fsize]").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderFonts();
  }

  // Mobile drawer & scroll-spy
  const burger = document.getElementById("burgerBtn");
  const drawer = document.getElementById("mobileDrawer");
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", () => {
    const open = !drawer.classList.contains("open");
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
  });

  document.getElementById("fontInput").addEventListener("input", renderFonts);

  const navLinks = Array.from(document.querySelectorAll(".gnav-link"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY + 140;
      let activeId = "";
      for (const sec of sections) {
        if (sec.offsetTop <= y) activeId = "#" + sec.id;
      }
      if (activeId) {
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === activeId));
      }
    },
    { passive: true }
  );

  // Initial renders
  renderPedestal();
  renderTimeline();
  renderModes();
  setCertMode("normalized");
  renderFontPresets();
  renderFonts();

  global.BatanaSite = {
    stepSample,
    goSample,
    setCompareMode,
    selectStep,
    selectMode,
    setCertMode,
    applyPreset,
    setFontSize,
    closeDrawer,
  };
})(window);
