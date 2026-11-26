/* Batana Production Showcase v2 — Interactive Curtain, Dynamic Schematics & Live Mode Studio */
(function (global) {
  "use strict";

  /* ── 1. HERO CURTAIN SAMPLES ───────────────────────────────────────────── */
  const CURTAIN_SAMPLES = [
    {
      tab: "تشكيل كامل",
      file: "arabic_tashkeel_book.docx",
      mode: "تلقائي ذكي",
      batanaHTML: `
        <div>
          <div class="page-ruler"><span class="ok-tag">Word (.docx) · طبقة نصية أصلية</span><span class="ltr">Content Integrity A+</span></div>
          <div class="doc-h">فِي البَدْءِ كَانَتِ الكَلِمَةُ المَضْبُوطَةُ</div>
          <div class="doc-p">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — إِنَّ دِقَّةَ التَّشْكِيلِ العَرَبِيِّ تَحْفَظُ المَعْنَى وَالإِعْرَابَ وَسَلَامَةَ القِرَاءَةِ الصَّحِيحَةِ.</div>
          <div class="doc-p">كُلُّ حَرْفٍ وَحَرَكَةٍ قَابِلٌ لِلتَّعْدِيلِ وَالبَحْثِ مُبَاشَرَةً دَاخِلَ مُسْتَنَدِ Word.</div>
        </div>
        <div class="page-footer-meta"><span>الخط: Amiri · RTL سليم 100%</span><span>بدون OCR</span></div>
      `,
      legacyHTML: `
        <div>
          <div class="page-ruler"><span class="err-tag">محوّل تقليدي · تقطّع وضياع تشكيل</span><span>أخطاء فادحة</span></div>
          <div class="doc-h corrupt">ة ط و ب ض م ل ا  ة م ل ك ل ا  ت ن ا ك</div>
          <div class="doc-p corrupt">ي ب ر ع ل ا  ل ي ك ش ت ل ا  ة ق د  ن إ — م ي ح ر ل ا  ن م ح ر ل ا  ه ل ل ا  م س ب</div>
          <div class="doc-p corrupt">سقوط علامات الشدّة والتنوين، تباعد الحروف المتصلة، وفشل البحث في النص.</div>
        </div>
        <div class="page-footer-meta"><span>يتطلب إعادة كتابة يدوية كاملة</span><span>فشل التشكيل</span></div>
      `,
    },
    {
      tab: "ثنائي اللغة Bidi",
      file: "bilingual_architecture.docx",
      mode: "تلقائي ذكي",
      batanaHTML: `
        <div>
          <div class="page-ruler"><span class="ok-tag">Word (.docx) · توازن RTL + LTR</span><span class="ltr">Bidi Order 100%</span></div>
          <div class="doc-h" style="font-family:var(--font-ui);font-size:21px;">تكامل الأنظمة الحديثة <span class="ltr">(System Integration)</span></div>
          <div class="doc-p" style="font-family:var(--font-ui);font-size:15.5px;">يدعم الإصدار <span class="ltr">5.2</span> معالجة مستندات <span class="ltr">(UTF-8 / OpenXML)</span> بسلاسة تامة مع ثبات الأقواس والأرقام في موضعها المنطقي.</div>
          <div class="doc-p" style="font-family:var(--font-ui);font-size:15.5px;">تعديل أي كلمة عربية أو إنجليزية لا يُسبّب قفزاً أو انقلاباً في بقية السطر.</div>
        </div>
        <div class="page-footer-meta"><span>عزل ثنائي الاتجاه سليم</span><span>فقرات أصلية</span></div>
      `,
      legacyHTML: `
        <div>
          <div class="page-ruler"><span class="err-tag">انقلاب الأقواس والمصطلحات اللاتينية</span><span>تشوّه Bidi</span></div>
          <div class="doc-h corrupt">)System Integration( ةثيدحلا ةمظنلأا لماكت</div>
          <div class="doc-p corrupt">)OpenXML / UTF-8( تادنتسم ةجلاعم 2.5 رادصلإا معدي</div>
          <div class="doc-p corrupt">تداخل مربعات نص منفصلة، انقلاب قوس البداية والنهاية، وقفز المؤشر عند التعديل.</div>
        </div>
        <div class="page-footer-meta"><span>اتجاه الفقرات معكوس</span><span>صعب التحرير</span></div>
      `,
    },
    {
      tab: "جداول منظّمة",
      file: "quarterly_report.docx",
      mode: "تطابق البنية",
      batanaHTML: `
        <div>
          <div class="page-ruler"><span class="ok-tag">Word (.docx) · جدول أصلي قابل للتعديل</span><span>هيكل 1:1</span></div>
          <div class="doc-h" style="font-family:var(--font-ui);font-size:19px;">ملخص مؤشرات الجودة والتحويل المحلي</div>
          <table class="doc-table-mini">
            <thead><tr><th>المعيار</th><th>الحالة</th><th>النتيجة</th></tr></thead>
            <tbody>
              <tr><td>سلامة النص المستخرج</td><td>متحقق</td><td><strong class="ltr">100%</strong></td></tr>
              <tr><td>توافق بنية الجداول والحواشي</td><td>ناجح</td><td><strong class="ltr">10 / 10</strong></td></tr>
            </tbody>
          </table>
        </div>
        <div class="page-footer-meta"><span>خلايا حقيقية قابلة للفرز والتحرير</span><span>اتجاه RTL</span></div>
      `,
      legacyHTML: `
        <div>
          <div class="page-ruler"><span class="err-tag">انهيار الجدول إلى مربعات عائمة</span><span>فقدان البنية</span></div>
          <div class="doc-h corrupt">يلحملا ليوحتلاو ةدوجلا تارشؤم صخلم</div>
          <div class="doc-p corrupt">[المعيار]   [الحالة]   [النتيجة]<br/>100% &nbsp;&nbsp;&nbsp; ققحتم &nbsp;&nbsp;&nbsp; ص ن ل ا  ة م ا ل س<br/>تبعثر الصفوف وتداخل الحدود كخطوط مرسومة غير مرتبطة بالخلايا.</div>
        </div>
        <div class="page-footer-meta"><span>لا يمكن تعديل الأعمدة</span><span>بنية محطّمة</span></div>
      `,
    },
    {
      tab: "رسم عثماني",
      file: "uthmani_manuscript.docx",
      mode: "مصحف / عثماني",
      batanaHTML: `
        <div>
          <div class="page-ruler"><span class="ok-tag">Word (.docx) · حماية صارمة للرموز</span><span>صفر تطبيع مخلّ</span></div>
          <div class="doc-h" style="font-family:'Scheherazade New',serif;font-size:28px;">﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴾</div>
          <div class="doc-p" style="font-family:'Scheherazade New',serif;font-size:19px;">حفظ كامل لعلامات الوقف، الألف الخنجرية، ورسم المصحف بدقة الرمز دون أي استبدال تلقائي.</div>
        </div>
        <div class="page-footer-meta"><span>الخط: Scheherazade New</span><span>تطابق رموز 100%</span></div>
      `,
      legacyHTML: `
        <div>
          <div class="page-ruler"><span class="err-tag">سقوط رموز الوقف وتحوّلها لمربعات</span><span>تطبيع قسري</span></div>
          <div class="doc-h corrupt">اقرا باسم ربك الذي خلق □ خلق الانسان من علق</div>
          <div class="doc-p corrupt">حذف الألف الخنجرية وعلامات الضبط العثمانية وتحويل رموز الآيات إلى علامات استفهام أو مربعات فارغة □□.</div>
        </div>
        <div class="page-footer-meta"><span>إخلال بنص تراثي حساس</span><span>غير صالح للنشر</span></div>
      `,
    },
  ];

  /* ── 2. FIVE PROGRAM JOURNEY STEPS + LIVE ARCHITECTURAL SCHEMATICS ─────── */
  const JOURNEY_STEPS = [
    {
      num: "01",
      short: "التحليل المباشر بدون OCR",
      phase: "المرحلة 01 · التأسيس",
      title: "رفضنا الـ OCR — وقرأنا طبقة المستند الأصلية مباشرة",
      summary:
        "بدلاً من تحويل صفحات PDF إلى صور ثم محاولة تخمين الحروف ضوئياً، بنينا نواة تقرأ العناصر النصية والهندسية الحقيقية مباشرةً من داخل المستند الرقمي؛ فتحافظ على دقة الحرف واللون والموقع من اللحظة الأولى.",
      lesson: "معظم أخطاء العربية في المحوّلات ليست بسبب غياب النص، بل بسبب تدميره بالتحويل الصوري.",
      impact: "سرعة عالية ونص نقي بلا أخطاء تخمين ضوئي أو سقوط للحركات.",
      schematic: `
        <svg viewBox="0 0 380 220" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="20" width="106" height="178" rx="14" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="67" y="48" text-anchor="middle" fill="#1d1d1f" font-size="12" font-weight="700" font-family="IBM Plex Sans Arabic">ملف PDF رقمي</text>
          <rect x="28" y="64" width="78" height="12" rx="4" fill="#0066cc" fill-opacity="0.22"/>
          <rect x="28" y="84" width="64" height="10" rx="4" fill="#1d1d1f" fill-opacity="0.16"/>
          <rect x="28" y="102" width="74" height="10" rx="4" fill="#1d1d1f" fill-opacity="0.16"/>
          <rect x="28" y="122" width="78" height="44" rx="8" fill="#ffffff" stroke="#d2d2d7"/>
          <text x="67" y="148" text-anchor="middle" fill="#0066cc" font-size="11" font-weight="600" font-family="IBM Plex Sans Arabic">طبقة نصية حقيقية</text>

          <path d="M132 108 H172" stroke="#0066cc" stroke-width="2.5" stroke-dasharray="4 4"/>
          <polygon points="174,108 166,103 166,113" fill="#0066cc"/>

          <rect x="184" y="54" width="182" height="110" rx="16" fill="#141417"/>
          <text x="275" y="88" text-anchor="middle" fill="#2997ff" font-size="11" font-weight="600" font-family="IBM Plex Sans Arabic">نواة القراءة الهندسية</text>
          <text x="275" y="114" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700" font-family="IBM Plex Sans Arabic">استخراج السطور والخطوط</text>
          <text x="275" y="138" text-anchor="middle" fill="#a1a1a6" font-size="11.5" font-family="IBM Plex Sans Arabic">صفر صور · صفر OCR · محلي 100%</text>
        </svg>
      `,
    },
    {
      num: "02",
      short: "هندسة العربية والـ Bidi",
      phase: "المرحلة 02 · اللغة والاتجاه",
      title: "إعادة بناء الترتيب المنطقي للعربية والتشكيل وثنائية اللغة",
      summary:
        "عالجنا أصعب تحدٍ في النشر العربي: تحويل الترتيب البصري المعكوس داخل ملفات PDF إلى فقرات عربية منطقية سليمة الاتصال، مع حفظ الحركات وتثبيت اتجاه الأرقام والأقواس والمصطلحات الإنجليزية داخل السطر الواحد.",
      lesson: "المحاذاة لليمين وحدها لا تكفي؛ كل فقرة ومقطع يحتاج خصائص اتجاه منطقية دقيقة.",
      impact: "تحرير وبحث ونسخ ولصق طبيعي 100% داخل Word كأن الملف كُتب فيه أصلاً.",
      schematic: `
        <svg viewBox="0 0 380 220" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="24" width="340" height="58" rx="12" fill="#fff2f1" stroke="#ffc6c2"/>
          <text x="342" y="47" text-anchor="end" fill="#c9342b" font-size="11" font-weight="700" font-family="IBM Plex Sans Arabic">تدفق الرسم الخام (بصري معكوس)</text>
          <text x="190" y="69" text-anchor="middle" fill="#6e6e73" font-size="13" font-family="monospace">)UTF-8(  ت ا م ل ك  ة ع ط ق م</text>

          <path d="M190 90 V122" stroke="#0066cc" stroke-width="2.5"/>
          <polygon points="190,126 184,117 196,117" fill="#0066cc"/>

          <rect x="20" y="132" width="340" height="66" rx="12" fill="#f0f7ff" stroke="#b3d7ff"/>
          <text x="342" y="156" text-anchor="end" fill="#0066cc" font-size="11" font-weight="700" font-family="IBM Plex Sans Arabic">إعادة البناء المنطقي في «بتانة» (RTL + Bidi)</text>
          <text x="190" y="182" text-anchor="middle" fill="#1d1d1f" font-size="16" font-weight="700" font-family="IBM Plex Sans Arabic">كلمات متصلة سليمة (UTF-8)</text>
        </svg>
      `,
    },
    {
      num: "03",
      short: "الأوضاع الأربعة التخصصية",
      phase: "المرحلة 03 · التوجيه الذكي",
      title: "مسارات متخصصة للكتب والجداول والشعر والرسم العثماني",
      summary:
        "بدلاً من إجبار كل المستندات على قالب جامد، صمّمنا موجّهاً ذكياً يميّز بين الكتاب العربي الممتد (فصول، حواشي، فهرس، شعر)، والتقرير الإداري ذي الجداول والأعمدة، والمصحف ذي علامات الوقف الدقيقة.",
      lesson: "التخصص المنظّم ينتج ملفات Word أنظف بكثير من محاولة توحيد كل التخطيطات في مسار واحد.",
      impact: "اختيار واحد تلقائي أو يدوي يضمن مخرجاً مهيّأً لطبيعة مستندك بدقة.",
      schematic: `
        <svg viewBox="0 0 380 220" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="122" y="16" width="136" height="40" rx="20" fill="#0066cc"/>
          <text x="190" y="41" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700" font-family="IBM Plex Sans Arabic">الموجّه الذكي للبنية</text>
          <path d="M190 56 V84 M60 84 H320 M60 84 V110 M146 84 V110 M234 84 V110 M320 84 V110" stroke="#c7c7cc" stroke-width="2"/>
          <rect x="20" y="114" width="80" height="82" rx="12" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="60" y="152" text-anchor="middle" fill="#1d1d1f" font-size="11.5" font-weight="700" font-family="IBM Plex Sans Arabic">تلقائي 1:1</text>
          <text x="60" y="172" text-anchor="middle" fill="#6e6e73" font-size="10" font-family="IBM Plex Sans Arabic">كشف آلي</text>

          <rect x="108" y="114" width="80" height="82" rx="12" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="148" y="152" text-anchor="middle" fill="#1d1d1f" font-size="11.5" font-weight="700" font-family="IBM Plex Sans Arabic">جداول</text>
          <text x="148" y="172" text-anchor="middle" fill="#6e6e73" font-size="10" font-family="IBM Plex Sans Arabic">وأعمدة</text>

          <rect x="196" y="114" width="80" height="82" rx="12" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="236" y="152" text-anchor="middle" fill="#1d1d1f" font-size="11.5" font-weight="700" font-family="IBM Plex Sans Arabic">كتب وشعر</text>
          <text x="236" y="172" text-anchor="middle" fill="#6e6e73" font-size="10" font-family="IBM Plex Sans Arabic">فهرس وحواشٍ</text>

          <rect x="284" y="114" width="80" height="82" rx="12" fill="#f0f7ff" stroke="#0066cc"/>
          <text x="324" y="152" text-anchor="middle" fill="#0066cc" font-size="11.5" font-weight="700" font-family="IBM Plex Sans Arabic">عثماني</text>
          <text x="324" y="172" text-anchor="middle" fill="#0066cc" font-size="10" font-family="IBM Plex Sans Arabic">حماية رموز</text>
        </svg>
      `,
    },
    {
      num: "04",
      short: "القياس الصادق والتدقيق",
      phase: "المرحلة 04 · الشفافية",
      title: "بوابة تدقيق مستقلة تفصل بين النص والبنية والمظهر",
      summary:
        "بنينا منظومة فحص آلية تتحقق من سلامة حزمة Word وبنية الجداول والحواشي واتجاه القراءة، وتُقارن النص بمرجع استخراج مستقل. والأهم: لا نمنح درجة «تطابق بصري» في وضع موحّد — الشفافية أولاً.",
      lesson: "القياس الصادق الذي ينبّهك لموضع خلل واحد أثمن من رقم تجميلي مرتفع يخفيه.",
      impact: "شهادة محلية واضحة تعمل بدون إنترنت تخبرك بدقة ما تم التحقق منه.",
      schematic: `
        <svg viewBox="0 0 380 220" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="24" width="104" height="170" rx="14" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="72" y="64" text-anchor="middle" fill="#0066cc" font-size="22" font-weight="700" font-family="IBM Plex Sans Arabic">99.4%</text>
          <text x="72" y="96" text-anchor="middle" fill="#1d1d1f" font-size="12" font-weight="700" font-family="IBM Plex Sans Arabic">سلامة النص</text>
          <text x="72" y="120" text-anchor="middle" fill="#6e6e73" font-size="10.5" font-family="IBM Plex Sans Arabic">مرجع مستقل</text>

          <rect x="138" y="24" width="104" height="170" rx="14" fill="#f5f5f7" stroke="#d2d2d7"/>
          <text x="190" y="64" text-anchor="middle" fill="#1d1d1f" font-size="22" font-weight="700" font-family="IBM Plex Sans Arabic">10/10</text>
          <text x="190" y="96" text-anchor="middle" fill="#1d1d1f" font-size="12" font-weight="700" font-family="IBM Plex Sans Arabic">سلامة البنية</text>
          <text x="190" y="120" text-anchor="middle" fill="#6e6e73" font-size="10.5" font-family="IBM Plex Sans Arabic">فحص OpenXML</text>

          <rect x="256" y="24" width="104" height="170" rx="14" fill="#141417"/>
          <text x="308" y="64" text-anchor="middle" fill="#2997ff" font-size="14" font-weight="700" font-family="IBM Plex Sans Arabic">منفصل</text>
          <text x="308" y="96" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" font-family="IBM Plex Sans Arabic">التقييم البصري</text>
          <text x="308" y="120" text-anchor="middle" fill="#a1a1a6" font-size="10" font-family="IBM Plex Sans Arabic">لا يُخلط بالدرجة</text>
        </svg>
      `,
    },
    {
      num: "05",
      short: "استوديو سطح المكتب",
      phase: "المرحلة 05 · الإنتاجية المحلية",
      title: "تطبيق محلي كامل للتحويل الفردي والدفعات والمكتبة",
      summary:
        "جمعنا كل ذلك داخل تجربة سطح مكتب سريعة تعمل دون اتصال بالإنترنت: سحب وإفلات فوري، تحويل دفعات مجلدات بالتوازي، مكتبة منظمة لملفاتك المحوّلة، ومعرض خطوط عربية مع تقارير تشخيص آمنة.",
      lesson: "التميز الهندسي لا يكتمل إلا بتجربة يومية سريعة وموثوقة تحترم وقت المستخدم.",
      impact: "أداة عمل يومية تحوّل كتاباً واحداً أو مكتبة كاملة بخصوصية محلية مطلقة.",
      schematic: `
        <svg viewBox="0 0 380 220" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="18" width="344" height="184" rx="14" fill="#141417"/>
          <circle cx="38" cy="34" r="4" fill="#ff5f57"/>
          <circle cx="52" cy="34" r="4" fill="#febc2e"/>
          <circle cx="66" cy="34" r="4" fill="#28c840"/>
          <rect x="276" y="50" width="72" height="136" rx="8" fill="#1e1e24"/>
          <rect x="286" y="62" width="52" height="14" rx="5" fill="#0066cc"/>
          <rect x="286" y="84" width="52" height="12" rx="4" fill="#2e2e36"/>
          <rect x="286" y="104" width="52" height="12" rx="4" fill="#2e2e36"/>
          <rect x="286" y="124" width="52" height="12" rx="4" fill="#2e2e36"/>
          <rect x="34" y="50" width="230" height="82" rx="10" fill="#1e1e24" stroke="#2997ff" stroke-dasharray="4 4"/>
          <text x="149" y="96" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="600" font-family="IBM Plex Sans Arabic">اسحب ملف PDF أو مجلد دفعة</text>
          <rect x="34" y="144" width="230" height="42" rx="10" fill="#1e1e24"/>
          <rect x="48" y="160" width="146" height="8" rx="4" fill="#30d158"/>
          <text x="248" y="169" text-anchor="end" fill="#a1a1a6" font-size="11" font-family="IBM Plex Sans Arabic">محلي 100%</text>
        </svg>
      `,
    },
  ];

  /* ── 3. LIVE PLAYGROUND MODES (EVERY CLICK DRIVES REAL PREVIEW!) ───────── */
  const PLAYGROUND_MODES = [
    {
      key: "auto",
      title: "تلقائي ذكي",
      tag: "موصى به",
      target: "للمستندات اليومية والمتنوعة",
      desc: "يحلّل بنية كل صفحة تلقائياً ويميّز اللغة، الجداول، والعناوين ليختار مسار البناء الأمثل بدون أي إعداد يدوي.",
      rules: ["✓ اكتشاف تلقائي لـ RTL / LTR", "✓ توازن ذكي للفقرات والعناوين", "✓ شهادة Content Integrity فورية"],
      previewHTML: `
        <div style="font-size:12px;color:var(--blue);font-weight:600;margin-bottom:8px;">معاينة تلقائية · مستند عربي–لاتيني مختلط</div>
        <div style="font-weight:700;font-size:17px;margin-bottom:6px;">مذكرة فنية — مراجعة الأداء</div>
        <p style="font-size:14px;color:var(--ink-secondary);line-height:1.75;margin-bottom:8px;">تم التعرّف تلقائياً على الاتجاه العربي السائد مع عزل المصطلح <span class="ltr" style="background:var(--parchment);padding:1px 6px;border-radius:5px;font-weight:600;">OpenXML 1.0</span> والحفاظ على الترقيم والتشكيل.</p>
        <div style="display:flex;gap:8px;font-size:12px;color:var(--ink-muted);"><span>● خط متناسق</span><span>● هوامش متوازنة</span></div>
      `,
    },
    {
      key: "exact",
      title: "تطابق البنية",
      tag: "جداول وأعمدة",
      target: "للتقارير والأوراق العلمية والبيانات",
      desc: "يركّز على إعادة بناء الجداول متعددة الأعمدة، الترويسات، والكتل المتجاورة في كل اللغات مع الحفاظ على علاقة الأعمدة والصفوف.",
      rules: ["✓ خلايا جدول حقيقية قابلة للتعديل", "✓ حفظ الترويسات والأعمدة المتعددة", "✓ توافق تام مع ثنائية اللغة"],
      previewHTML: `
        <div style="font-size:12px;color:var(--blue);font-weight:600;margin-bottom:8px;">معاينة بنية جدولية منظّمة</div>
        <table class="doc-table-mini" style="margin-top:0;">
          <thead><tr><th>القسم</th><th>الصفحات</th><th>حالة الفحص</th></tr></thead>
          <tbody>
            <tr><td>الملخص التنفيذي</td><td>1–4</td><td style="color:var(--blue);font-weight:600;">متطابق ✓</td></tr>
            <tr><td>جداول البيانات المقارنة</td><td>5–18</td><td style="color:var(--blue);font-weight:600;">متطابق ✓</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      key: "book",
      title: "كتاب عربي وشعر",
      tag: "للكتب والدواوين",
      target: "للكتب الأدبية والمؤلفات الممتدة",
      desc: "مخصّص للمؤلفات العربية الطويلة: ينظّم الفصول والعناوين للفهرس الآلي، ويضبط الحواشي السفلية، وينسّق أبيات الشعر العربي بشطريها المتناظرين.",
      rules: ["✓ شطرا البيت الشعري متناظران", "✓ حواشٍ سفلية مرتبطة تلقائياً", "✓ فهرس محتويات جاهز في Word"],
      previewHTML: `
        <div style="font-size:12px;color:var(--blue);font-weight:600;margin-bottom:10px;">معاينة ديوان شعر وحاشية سفلية</div>
        <div style="font-family:var(--font-book);font-size:18px;display:grid;grid-template-columns:1fr 1fr;gap:14px;text-align:center;margin-bottom:12px;">
          <div>وَمَا نَيْلُ المَطَالِبِ بِالتَّمَنِّي</div>
          <div>وَلَكِنْ تُؤْخَذُ الدُّنْيَا غِلَابَا¹</div>
        </div>
        <div style="border-top:1px solid var(--rim-light);padding-top:8px;font-size:12px;color:var(--ink-muted);">¹ حاشية سفلية حقيقية مرتبطة تلقائياً بنهاية الصفحة داخل Word.</div>
      `,
    },
    {
      key: "uthmani",
      title: "مصحف / عثماني",
      tag: "حماية الرموز",
      target: "للنصوص القرآنية والتراثية الدقيقة",
      desc: "يُفعّل أعلى درجات الصرامة في حفظ الرموز الدقيقة وعلامات الوقف والرسم العثماني، ويمنع أي تطبيع تلقائي قد يغيّر حرفاً أو علامة ضبط.",
      rules: ["✓ صفر تطبيع تلقائي للحروف", "✓ حماية الألف الخنجرية وعلامات الوقف", "✓ تدقيق صارم على مستوى الرمز"],
      previewHTML: `
        <div style="font-size:12px;color:var(--blue);font-weight:600;margin-bottom:8px;">معاينة وضع الحماية الصارمة للرسم العثماني</div>
        <div style="font-family:'Scheherazade New',serif;font-size:24px;text-align:center;line-height:1.9;color:var(--ink);">
          ﴿ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴾
        </div>
        <div style="text-align:center;font-size:12px;color:var(--ink-muted);margin-top:6px;">قفل الرموز مفعّل · جميع علامات الضبط محفوظة بأصلها</div>
      `,
    },
  ];

  /* ── 4. FONTS LAB ──────────────────────────────────────────────────────── */
  const FONTS = [
    { name: "IBM Plex Sans Arabic", family: "'IBM Plex Sans Arabic', sans-serif", role: "خط الواجهة الحديث — وضوح هندسي فائق للويب والتقارير" },
    { name: "Amiri", family: "'Amiri', serif", role: "خط نسخ طباعي فاخر للكتب الأدبية والدواوين والتشكيل" },
    { name: "Noto Naskh Arabic", family: "'Noto Naskh Arabic', serif", role: "خط نسخ متوازن للأبحاث الأكاديمية والمستندات ثنائية اللغة" },
    { name: "Scheherazade New", family: "'Scheherazade New', serif", role: "تغطية شاملة لعلامات الوقف والرسم العثماني والتشكيل التراثي" },
  ];

  const FONT_PRESETS = [
    { label: "تشكيل كلاسيكي", text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ" },
    { label: "عربي وتقني", text: "محوّل «بتانة» يحفظ التشكيل واتجاه القراءة (RTL / LTR) بدون OCR." },
    { label: "رسم عثماني", text: "﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴾" },
    { label: "بيت شعر", text: "وَمَا نَيْلُ المَطَالِبِ بِالتَّمَنِّي  —  وَلَكِنْ تُؤْخَذُ الدُّنْيَا غِلَابَا" },
  ];

  const state = {
    curtainIdx: 0,
    curtainPct: 50,
    stepIdx: 0,
    modeKey: "auto",
    certMode: "normalized",
    fontSize: 22,
  };

  /* ── CURTAIN SLIDER LOGIC (Mouse + Touch + Keyboard) ───────────────────── */
  const stage = document.getElementById("curtainStage");
  const legacyLayer = document.getElementById("legacyLayer");
  const divider = document.getElementById("curtainDivider");

  function setCurtain(pct) {
    const clamped = Math.max(8, Math.min(92, pct));
    state.curtainPct = clamped;
    legacyLayer.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    divider.style.left = clamped + "%";
    stage.setAttribute("aria-valuenow", String(Math.round(clamped)));
  }

  function pointerToPct(clientX) {
    const rect = stage.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  let dragging = false;
  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    stage.setPointerCapture(e.pointerId);
    setCurtain(pointerToPct(e.clientX));
  });
  stage.addEventListener("pointermove", (e) => {
    if (dragging) setCurtain(pointerToPct(e.clientX));
  });
  stage.addEventListener("pointerup", () => { dragging = false; });
  stage.addEventListener("pointercancel", () => { dragging = false; });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setCurtain(state.curtainPct - 6);
    if (e.key === "ArrowRight") setCurtain(state.curtainPct + 6);
  });

  function renderCurtainSample(idx) {
    state.curtainIdx = idx;
    const s = CURTAIN_SAMPLES[idx];
    document.getElementById("deviceDocName").textContent = s.file;
    document.getElementById("deviceDocMode").textContent = s.mode;
    document.getElementById("batanaPageContent").innerHTML = s.batanaHTML;
    document.getElementById("legacyPageContent").innerHTML = s.legacyHTML;
    document.getElementById("sampleTabs").innerHTML = CURTAIN_SAMPLES.map(
      (item, i) => `<button class="sample-tab ${i === idx ? "active" : ""}" onclick="BatanaSite.pickSample(${i})">${item.tab}</button>`
    ).join("");
  }

  /* ── JOURNEY STEPPER ───────────────────────────────────────────────────── */
  function renderJourney(idx) {
    state.stepIdx = idx;
    document.getElementById("stepperTrack").innerHTML = JOURNEY_STEPS.map(
      (st, i) => `
      <button class="step-pill-btn ${i === idx ? "active" : ""}" role="tab" aria-selected="${i === idx}" onclick="BatanaSite.pickStep(${i})">
        <span class="step-n">الخطوة ${st.num}</span>
        <span class="step-lbl">${st.short}</span>
      </button>
    `
    ).join("");
    const cur = JOURNEY_STEPS[idx];
    document.getElementById("jPhase").textContent = cur.phase;
    document.getElementById("jTitle").textContent = cur.title;
    document.getElementById("jSummary").textContent = cur.summary;
    document.getElementById("jLesson").textContent = cur.lesson;
    document.getElementById("jImpact").textContent = cur.impact;
    document.getElementById("jSchematic").innerHTML = cur.schematic;
  }

  /* ── LIVE PLAYGROUND MODES ─────────────────────────────────────────────── */
  function renderPlayground(key) {
    state.modeKey = key;
    document.getElementById("modeStack").innerHTML = PLAYGROUND_MODES.map(
      (m) => `
      <button class="mode-option ${m.key === key ? "selected" : ""}" onclick="BatanaSite.pickMode('${m.key}')">
        <div>
          <h4>${m.title}</h4>
          <p>${m.desc}</p>
        </div>
        <span class="mode-chip-badge">${m.tag}</span>
      </button>
    `
    ).join("");

    const m = PLAYGROUND_MODES.find((x) => x.key === key) || PLAYGROUND_MODES[0];
    document.getElementById("pvTag").textContent = m.tag;
    document.getElementById("pvTitle").textContent = m.title;
    document.getElementById("pvTarget").textContent = m.target;
    document.getElementById("pvDesc").textContent = m.desc;
    document.getElementById("pvPaper").innerHTML = m.previewHTML;
    document.getElementById("pvRule1").textContent = m.rules[0];
    document.getElementById("pvRule2").textContent = m.rules[1];
    document.getElementById("pvRule3").textContent = m.rules[2];
  }

  /* ── HONEST CERT TOGGLE ────────────────────────────────────────────────── */
  function setCert(mode) {
    state.certMode = mode;
    const isF = mode === "faithful";
    document.getElementById("cBtnNorm").classList.toggle("active", !isF);
    document.getElementById("cBtnFaith").classList.toggle("active", isF);
    document.getElementById("certHeading").innerHTML = isF
      ? 'وضع المطابقة الأصلية (<span class="ltr">faithful</span>) — شهادة <span class="ltr">Fidelity</span>'
      : 'الوضع الموحّد (<span class="ltr">normalized</span>) — سلامة المحتوى فقط';
    document.getElementById("certNote").textContent = isF
      ? "في وضع المطابقة الأصلية يحتفظ المستند بخطوطه ومقاييسه الأصلية، فتُفعّل الشارة الثالثة لقياس تداخل الحبر وإزاحة السطور وتكافؤ الالتفاف بشفافية."
      : "في الوضع الموحّد الافتراضي يُركّز التحويل على سلامة النص والبنية ليكون مستند Word سهل التحرير؛ لذا تُعلَّم الشارة البصرية صراحةً كغير مقيّمة دون أي تجميل.";
    const numEl = document.getElementById("certVisNum");
    const copyEl = document.getElementById("certVisCopy");
    if (isF) {
      numEl.innerHTML = '<span class="ltr">مُفعّل · A</span>';
      numEl.style.color = "var(--blue)";
      numEl.style.fontSize = "28px";
      copyEl.textContent = "تقييم هندسي متكامل لتداخل الحبر، إزاحة السطور، وعرضها مقارنة بالأصل.";
    } else {
      numEl.textContent = "غير مقيّم";
      numEl.style.color = "var(--ink-muted)";
      numEl.style.fontSize = "22px";
      copyEl.innerHTML = '<span class="ltr">Visual fidelity: not assessed in normalized mode</span>';
    }
  }

  /* ── FONTS LAB ─────────────────────────────────────────────────────────── */
  function renderFonts() {
    const text = document.getElementById("fontInput").value || FONT_PRESETS[0].text;
    document.getElementById("fontsGrid").innerHTML = FONTS.map(
      (f) => `
      <article class="font-card">
        <div class="font-card-head">
          <div>
            <strong class="ltr" style="font-size:16px;color:var(--ink);">${f.name}</strong>
            <div style="font-size:12.5px;color:var(--ink-muted);">${f.role}</div>
          </div>
          <span class="kicker-pill ltr" style="font-size:11px;padding:3px 10px;">SIL OFL 1.1</span>
        </div>
        <div class="font-specimen" style="font-family:${f.family};font-size:${state.fontSize}px;">${text}</div>
      </article>
    `
    ).join("");
  }

  function renderPresets(activeIdx) {
    document.getElementById("fontPresets").innerHTML = FONT_PRESETS.map(
      (p, i) => `<button class="preset-btn ${i === activeIdx ? "active" : ""}" onclick="BatanaSite.applyPreset(${i})">${p.label}</button>`
    ).join("");
  }

  function applyPreset(i) {
    document.getElementById("fontInput").value = FONT_PRESETS[i].text;
    renderPresets(i);
    renderFonts();
  }

  function setSize(px, btn) {
    state.fontSize = px;
    document.querySelectorAll("[data-sz]").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderFonts();
  }

  /* ── ADAPTIVE HEADER THEME + SCROLL PROGRESS + REVEAL ──────────────────── */
  const header = document.getElementById("topHeader");
  const progressBar = document.getElementById("scrollProgress");
  const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
  const navTargets = navAnchors.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const themedSections = Array.from(document.querySelectorAll("[data-nav]"));

  function onScroll() {
    const sy = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.width = Math.min(100, (sy / maxScroll) * 100) + "%";

    // Adaptive light/dark frosted header matching section directly beneath the 54px bar
    const probe = sy + 64;
    let darkNow = false;
    for (const sec of themedSections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (probe >= top && probe < bottom) {
        darkNow = sec.dataset.nav === "dark";
        break;
      }
    }
    header.classList.toggle("is-dark", darkNow);

    // Active nav indicator
    let activeHref = "#top";
    for (const sec of navTargets) {
      if (sec.offsetTop <= sy + 160) activeHref = "#" + sec.id;
    }
    navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === activeHref));
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal observer
  const revEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revEls.forEach((el) => io.observe(el));
  } else {
    revEls.forEach((el) => el.classList.add("in"));
  }

  // Mobile menu
  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", () => {
    const next = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", next);
    mobileMenu.setAttribute("aria-hidden", String(!next));
    burger.setAttribute("aria-expanded", String(next));
  });

  document.getElementById("fontInput").addEventListener("input", renderFonts);

  // Boot all interactive modules
  renderCurtainSample(0);
  setCurtain(50);
  renderJourney(0);
  renderPlayground("auto");
  setCert("normalized");
  renderPresets(0);
  renderFonts();
  onScroll();

  global.BatanaSite = {
    pickSample: renderCurtainSample,
    pickStep: renderJourney,
    pickMode: renderPlayground,
    setCert,
    applyPreset,
    setSize,
    closeMenu,
  };
})(window);
