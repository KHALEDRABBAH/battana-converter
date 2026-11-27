/* ==========================================================================
   BATANA (بتانة) — Production Web Converter, Rating Flow & Curtain Showcase
   ========================================================================== */

(function () {
  'use strict';

  const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB
  const DIRECT_UPLOAD_LIMIT = 3.8 * 1024 * 1024; // 3.8 MB direct; > 3.8 MB uses private Vercel Blob

  const MODE_HINTS = {
    auto: 'يتعرّف تلقائياً على طبيعة المستند ويختار أفضل معالجة.',
    exact_layout: 'مثالي للتقارير الأكاديمية والجداول والأعمدة والترويسات.',
    book_flow: 'مخصص للكتب العربية الطويلة والفصول والحواشي والأبيات الشعرية.',
    quran_uthmani: 'حماية صارمة للرسم العثماني وعلامات الوقف والضبط دون أي تعديل.',
  };

  const STAR_LABELS = {
    1: '1 / 5 — سيئة جداً (يرجى ذكر المشكلة لنصلحها)',
    2: '2 / 5 — ضعيفة (يرجى ذكر المشكلة لنصلحها)',
    3: '3 / 5 — مقبولة مع أخطاء (أخبرنا بالتفاصيل)',
    4: '4 / 5 — جيدة جداً (هل توجد ملاحظة بسيطة؟)',
    5: '5 / 5 — ممتازة! نتيجة مطابقة ورائعة',
  };

  const CURTAIN_SAMPLES = [
    {
      id: 'tashkeel',
      label: 'تشكيل كامل',
      fileName: 'arabic_tashkeel.docx',
      modeLabel: 'تلقائي ذكي',
      batanaHtml: `
        <div class="wp-title">الفَصْلُ الأَوَّلُ: بَلاغَةُ العَرَبِيَّةِ وَبِنْيَةُ النَّصِّ</div>
        <p class="wp-body serif">
          إنَّ الحِفاظَ على الحَرَكاتِ وَالتَّشْكِيلِ فِي النُّصُوصِ العَرَبِيَّةِ لَيْسَ زِينَةً شَكْلِيَّةً، بَلْ هُوَ جَوْهَرُ المَعْنَى وَدِقَّةُ القِراءَةِ؛ فَكَلِمَةُ «عِلْمٌ» تُفَارِقُ «عَلَمٌ» بِحَرَكَةٍ وَاحِدَةٍ تَصْنَعُ الفَارِقَ كُلَّهُ.
        </p>
      `,
      legacyHtml: `
        <div class="wp-title" style="color:#7f1d1d;">لاوألا لصفلا: ةيبرعلا ةغالب</div>
        <p class="wp-broken-text">
          ن إ ظافحلا ىلع تاكرحلاو ليكشتلا يف صوصنلا ةيبرعلا سيل ةنيز ةيلكش ، لب وه رهوج ىنعملا ةقدو ةءارقلا ؛ ةملكف »ملع« قرافت »ملع« ةكرحب ةدحاو عنصت قرافلا هلك .
        </p>
      `,
    },
    {
      id: 'bidi',
      label: 'ثنائي اللغة',
      fileName: 'bilingual_report.docx',
      modeLabel: 'تلقائي ذكي',
      batanaHtml: `
        <div class="wp-title">تقرير الأداء الهندسي — الإصدار 5.2 (UTF-8)</div>
        <p class="wp-body">
          تم اختبار المعالجة على معيار <span class="ltr">ISO/IEC 29500 (OOXML)</span> بنسبة نجاح بلغت <strong>99.4%</strong> عبر 44 مستنداً، مع ضبط اتجاه الفقرات <span class="ltr">RTL / LTR</span> والأقواس والأرقام بدقة كاملة.
        </p>
      `,
      legacyHtml: `
        <div class="wp-title" style="color:#7f1d1d;">)UTF-8( 2.5 رادصلإا — يسدنهلا ءادلأا ريرقت</div>
        <p class="wp-broken-text">
          مت رابتخا ةجلاعملا ىلع رايعم )OOXML( 29500 ISO/IEC ةبسنب حاجن تغلب %4.99 ربع 44 ادنتسم ، عم طبض هاجتا تارقفلا LTR / RTL ساوقلأاو ماقرلأاو .
        </p>
      `,
    },
    {
      id: 'tables',
      label: 'جداول منظّمة',
      fileName: 'structured_table.docx',
      modeLabel: 'جداول وتقارير',
      batanaHtml: `
        <div class="wp-title">ملخص بنود التقييم الشهري</div>
        <table class="wp-table">
          <thead>
            <tr><th>البند</th><th>الحالة</th><th>النتيجة</th></tr>
          </thead>
          <tbody>
            <tr><td>استقامة الخلايا والحدود</td><td>مطابق</td><td>100%</td></tr>
            <tr><td>قابلية التعديل في Word</td><td>جدول حقيقي</td><td>جاهز</td></tr>
            <tr><td>الأرقام والتواريخ العربية</td><td>سليمة</td><td>2026/11</td></tr>
          </tbody>
        </table>
      `,
      legacyHtml: `
        <div class="wp-title" style="color:#7f1d1d;">يرهشلا مييقتلا دونب صخلم</div>
        <p class="wp-broken-text">
          دنبلا      ةلاحلا      ةجيتنلا<br/>
          %100   قباطم   دودحلاو ايلاخلا ةماقتسا<br/>
          زهاج   يقيقح لودج   Word يف ليدعتلا ةيلباق<br/>
          11/2026   ةميلس   ةيبرعلا خيراوتلاو ماقرلأا
        </p>
      `,
    },
    {
      id: 'uthmani',
      label: 'رسم عثماني',
      fileName: 'uthmani_protected.docx',
      modeLabel: 'رسم عثماني',
      batanaHtml: `
        <div class="wp-title" style="text-align:center;">حماية صارمة للرسم العثماني</div>
        <p class="wp-body uthmani">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ۝<br/>
          ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ ۝
        </p>
      `,
      legacyHtml: `
        <div class="wp-title" style="text-align:center;color:#7f1d1d;">ينامثعلا مسرلا هاشت</div>
        <p class="wp-broken-text" style="text-align:center;">
          ميحرلا نمحرلا هلل□ مسب □<br/>
          قلخ يذلا كبر مساب أرقا □
        </p>
      `,
    },
  ];

  // ── Application State ──
  const state = {
    selectedFile: null,
    mode: 'auto',
    consent: false,
    converting: false,
    lastJob: null, // { jobId, filename, outputName, pages, durationMs, mode, blobUrl }
    selectedRating: 0,
    hoverRating: 0,
    selectedCategories: new Set(),
    feedbackSubmitted: false,
    timerHandle: null,
    stageHandle: null,
    curtainPct: 50,
    activeSampleId: 'tashkeel',
  };

  // ── DOM References ──
  const els = {
    topHeader: document.getElementById('topHeader'),
    scrollProgress: document.getElementById('scrollProgress'),
    burgerBtn: document.getElementById('burgerBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    navHealthPill: document.getElementById('navHealthPill'),
    navHealthText: document.getElementById('navHealthText'),
    navUploadBtn: document.getElementById('navUploadBtn'),
    bottomUploadBtn: document.getElementById('bottomUploadBtn'),

    pdfFileInput: document.getElementById('pdfFileInput'),
    viewUpload: document.getElementById('viewUpload'),
    viewProgress: document.getElementById('viewProgress'),
    viewResult: document.getElementById('viewResult'),
    viewError: document.getElementById('viewError'),

    dropzone: document.getElementById('dropzone'),
    pickFileBtn: document.getElementById('pickFileBtn'),
    selectedFileCard: document.getElementById('selectedFileCard'),
    selectedFileName: document.getElementById('selectedFileName'),
    selectedFileSize: document.getElementById('selectedFileSize'),
    changeFileBtn: document.getElementById('changeFileBtn'),
    removeFileBtn: document.getElementById('removeFileBtn'),

    modePills: document.getElementById('modePills'),
    modeHintText: document.getElementById('modeHintText'),
    consentCheckbox: document.getElementById('consentCheckbox'),
    uploadAlert: document.getElementById('uploadAlert'),
    convertBtn: document.getElementById('convertBtn'),

    progressStageTitle: document.getElementById('progressStageTitle'),
    progressFileMeta: document.getElementById('progressFileMeta'),
    progressBarFill: document.getElementById('progressBarFill'),
    pStep1: document.getElementById('pStep1'),
    pStep2: document.getElementById('pStep2'),
    pStep3: document.getElementById('pStep3'),
    progressTimer: document.getElementById('progressTimer'),

    resultMetaLine: document.getElementById('resultMetaLine'),
    resultJobId: document.getElementById('resultJobId'),
    downloadDocxBtn: document.getElementById('downloadDocxBtn'),
    convertAnotherBtn: document.getElementById('convertAnotherBtn'),

    starsRow: document.getElementById('starsRow'),
    starCaption: document.getElementById('starCaption'),
    issuePanel: document.getElementById('issuePanel'),
    issueChips: document.getElementById('issueChips'),
    issueCommentInput: document.getElementById('issueCommentInput'),
    fiveStarNote: document.getElementById('fiveStarNote'),
    feedbackAlert: document.getElementById('feedbackAlert'),
    ratingSubmitWrap: document.getElementById('ratingSubmitWrap'),
    submitRatingBtn: document.getElementById('submitRatingBtn'),
    ratingThanks: document.getElementById('ratingThanks'),
    ratingThanksMsg: document.getElementById('ratingThanksMsg'),

    errorMessageText: document.getElementById('errorMessageText'),
    retryBtn: document.getElementById('retryBtn'),
    errorResetBtn: document.getElementById('errorResetBtn'),

    curtainStage: document.getElementById('curtainStage'),
    legacyLayer: document.getElementById('legacyLayer'),
    curtainDivider: document.getElementById('curtainDivider'),
    batanaPageContent: document.getElementById('batanaPageContent'),
    legacyPageContent: document.getElementById('legacyPageContent'),
    deviceDocName: document.getElementById('deviceDocName'),
    deviceDocMode: document.getElementById('deviceDocMode'),
    sampleTabs: document.getElementById('sampleTabs'),
  };

  // ── Utilities ──
  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} كيلوبايت`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} ميجابايت`;
  }

  function showView(viewName) {
    els.viewUpload.hidden = viewName !== 'upload';
    els.viewProgress.hidden = viewName !== 'progress';
    els.viewResult.hidden = viewName !== 'result';
    els.viewError.hidden = viewName !== 'error';
  }

  function setAlert(el, msg) {
    if (!msg) {
      el.hidden = true;
      el.textContent = '';
      return;
    }
    el.textContent = msg;
    el.hidden = false;
  }

  function updateConvertButtonState() {
    const ready = Boolean(state.selectedFile && state.consent && !state.converting);
    els.convertBtn.disabled = !ready;
  }

  function revokeLastBlob() {
    if (state.lastJob && state.lastJob.blobUrl) {
      try { URL.revokeObjectURL(state.lastJob.blobUrl); } catch (_) { }
    }
  }

  // ── File Handling ──
  function handleFilePicked(file) {
    setAlert(els.uploadAlert, '');
    if (!file) return;

    const name = file.name || 'document.pdf';
    const isPdfExt = name.toLowerCase().endsWith('.pdf');
    const isPdfMime = !file.type || file.type === 'application/pdf' || file.type === 'application/octet-stream';

    if (!isPdfExt && !isPdfMime) {
      setAlert(els.uploadAlert, 'يرجى اختيار ملف بصيغة PDF فقط.');
      return;
    }
    if (file.size <= 0) {
      setAlert(els.uploadAlert, 'الملف المختار فارغ. يرجى اختيار ملف PDF صالح.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setAlert(els.uploadAlert, 'حجم الملف يتجاوز 50 ميجابايت. يرجى اختيار ملف أصغر.');
      return;
    }

    state.selectedFile = file;
    els.selectedFileName.textContent = name;
    els.selectedFileSize.textContent = `${formatBytes(file.size)} · جاهز للتحويل`;
    els.dropzone.hidden = true;
    els.selectedFileCard.hidden = false;
    updateConvertButtonState();
  }

  function clearSelectedFile() {
    state.selectedFile = null;
    els.pdfFileInput.value = '';
    els.selectedFileCard.hidden = true;
    els.dropzone.hidden = false;
    setAlert(els.uploadAlert, '');
    updateConvertButtonState();
  }

  function triggerFilePicker() {
    if (state.converting) return;
    document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showView('upload');
    setTimeout(() => els.pdfFileInput.click(), 180);
  }

  // ── Progress Visual Helpers ──
  function startProgressUI(file) {
    showView('progress');
    els.progressFileMeta.textContent = `${file.name} · ${formatBytes(file.size)}`;
    setProgressStage(1, 'جاري رفع الملف بأمان...', 22);

    const startMs = Date.now();
    els.progressTimer.textContent = '00:00';
    clearInterval(state.timerHandle);
    clearTimeout(state.stageHandle);

    state.timerHandle = setInterval(() => {
      const secs = Math.floor((Date.now() - startMs) / 1000);
      const mm = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss = String(secs % 60).padStart(2, '0');
      els.progressTimer.textContent = `${mm}:${ss}`;
    }, 500);
  }

  function setProgressStage(stepNum, title, pct) {
    els.progressStageTitle.textContent = title;
    els.progressBarFill.style.width = `${pct}%`;

    const steps = [els.pStep1, els.pStep2, els.pStep3];
    steps.forEach((el, idx) => {
      const n = idx + 1;
      el.classList.remove('active', 'done');
      if (n < stepNum) el.classList.add('done');
      else if (n === stepNum) el.classList.add('active');
    });
  }

  function stopProgressUI() {
    clearInterval(state.timerHandle);
    clearTimeout(state.stageHandle);
    state.timerHandle = null;
    state.stageHandle = null;
  }

  // ── Large File (> 3.8 MB) Private Vercel Blob Upload ──
  async function uploadLargePdfToBlob(file) {
    const mod = await import('https://esm.sh/@vercel/blob@2.9.0/client?bundle');
    const cleanName = (file.name || 'document.pdf').replace(/[^\w.\-\u0600-\u06FF]+/g, '_');
    const uploaded = await mod.upload(`uploads/${cleanName}`, file, {
      access: 'private',
      handleUploadUrl: '/api/blob-upload',
      contentType: 'application/pdf',
      clientPayload: JSON.stringify({
        consent: true,
        mode: state.mode,
      }),
    });
    return uploaded.url;
  }

  // ── Download Trigger ──
  function triggerDocxDownload(blobUrl, outputName) {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = outputName || 'batana_output.docx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ── Core Real Conversion Request ──
  async function runConversion() {
    if (!state.selectedFile) {
      setAlert(els.uploadAlert, 'يرجى اختيار ملف PDF أولاً.');
      return;
    }
    if (!state.consent) {
      setAlert(els.uploadAlert, 'يرجى تفعيل خانة الموافقة قبل بدء التحويل.');
      return;
    }

    const file = state.selectedFile;
    state.converting = true;
    updateConvertButtonState();
    setAlert(els.uploadAlert, '');
    startProgressUI(file);

    try {
      let response;

      if (file.size > DIRECT_UPLOAD_LIMIT) {
        setProgressStage(1, 'جاري رفع الملف الكبير بأمان...', 26);
        const blobUrl = await uploadLargePdfToBlob(file);
        setProgressStage(2, 'جاري تحليل البنية وإعادة بناء النص العربي...', 58);

        state.stageHandle = setTimeout(() => {
          setProgressStage(3, 'جاري تجهيز ملف Word (.docx)...', 84);
        }, 3200);

        response = await fetch('/api/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blob_url: blobUrl,
            filename: file.name,
            mode: state.mode,
            consent: true,
          }),
        });
      } else {
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('mode', state.mode);
        fd.append('consent', 'true');

        state.stageHandle = setTimeout(() => {
          setProgressStage(2, 'جاري تحليل البنية وإعادة بناء النص العربي...', 62);
        }, 900);

        response = await fetch('/api/convert', {
          method: 'POST',
          body: fd,
        });
      }

      if (!response.ok) {
        let msg = 'تعذّر تحويل هذا الملف. يرجى التحقق من الملف وإعادة المحاولة.';
        try {
          const errJson = await response.json();
          if (errJson && errJson.detail) msg = errJson.detail;
        } catch (_) { }
        throw new Error(msg);
      }

      setProgressStage(3, 'جاري تجهيز ملف Word للتحميل...', 95);

      const docxBlob = await response.blob();
      const jobId = response.headers.get('X-Batana-Job-Id') || `BTN-${Date.now()}`;
      const pages = parseInt(response.headers.get('X-Batana-Pages') || '0', 10) || 0;
      const durationMs = parseInt(response.headers.get('X-Batana-Duration-Ms') || '0', 10) || 0;
      const encodedOutName = response.headers.get('X-Batana-Output-Name') || '';
      const fallbackOutName = file.name.replace(/\.pdf$/i, '') + '.docx';
      let outputName = fallbackOutName;
      if (encodedOutName) {
        try { outputName = decodeURIComponent(encodedOutName); } catch (_) { }
      }

      revokeLastBlob();
      const blobUrl = URL.createObjectURL(docxBlob);

      state.lastJob = {
        jobId,
        filename: file.name,
        outputName,
        pages,
        durationMs,
        mode: state.mode,
        blobUrl,
      };

      stopProgressUI();
      renderResultAndRatingView();
      triggerDocxDownload(blobUrl, outputName);
    } catch (err) {
      stopProgressUI();
      els.errorMessageText.textContent =
        (err && err.message) ? err.message : 'حدث خطأ غير متوقع أثناء التحويل. يرجى المحاولة مجدداً.';
      showView('error');
    } finally {
      state.converting = false;
      updateConvertButtonState();
    }
  }

  // ── Result & Post-Use Rating UI ──
  function resetRatingState() {
    state.selectedRating = 0;
    state.hoverRating = 0;
    state.selectedCategories.clear();
    state.feedbackSubmitted = false;

    els.issueCommentInput.value = '';
    els.issuePanel.hidden = true;
    els.fiveStarNote.hidden = true;
    els.ratingSubmitWrap.hidden = true;
    els.ratingThanks.hidden = true;
    els.starsRow.hidden = false;
    els.starCaption.hidden = false;
    els.starCaption.textContent = 'اختر عدد النجوم لتقييم النتيجة';
    setAlert(els.feedbackAlert, '');

    els.issueChips.querySelectorAll('.issue-chip').forEach((chip) => {
      chip.classList.remove('selected');
    });
    paintStars(0);
  }

  function renderResultAndRatingView() {
    const job = state.lastJob;
    if (!job) return;

    const secsText = job.durationMs > 0 ? `${(job.durationMs / 1000).toFixed(1)} ثانية` : 'تحويل سريع';
    const pagesText = job.pages > 0 ? `${job.pages} صفحة` : 'مستند نصي';
    els.resultMetaLine.textContent = '';
    const nameSpan = document.createElement('span');
    nameSpan.dir = 'auto';
    nameSpan.style.unicodeBidi = 'isolate';
    nameSpan.style.fontWeight = '600';
    nameSpan.textContent = job.outputName;
    els.resultMetaLine.appendChild(nameSpan);
    els.resultMetaLine.appendChild(document.createTextNode(` · ${pagesText} · ${secsText}`));
    els.resultJobId.textContent = job.jobId;

    resetRatingState();
    showView('result');
  }

  function paintStars(count) {
    els.starsRow.querySelectorAll('.star-btn').forEach((btn) => {
      const val = Number(btn.dataset.star);
      btn.classList.toggle('lit', val <= count);
    });
  }

  function selectStarRating(val) {
    if (state.feedbackSubmitted) return;
    state.selectedRating = val;
    paintStars(val);
    els.starCaption.textContent = STAR_LABELS[val] || '';
    setAlert(els.feedbackAlert, '');

    if (val < 5) {
      els.fiveStarNote.hidden = true;
      els.issuePanel.hidden = false;
      els.submitRatingBtn.textContent = 'إرسال التقييم والملاحظة';
      setTimeout(() => els.issueCommentInput.focus(), 120);
    } else {
      els.issuePanel.hidden = true;
      els.fiveStarNote.hidden = false;
      els.submitRatingBtn.textContent = 'تأكيد التقييم (5 / 5)';
    }
    els.ratingSubmitWrap.hidden = false;
  }

  async function submitFeedback() {
    if (!state.lastJob || state.selectedRating < 1 || state.selectedRating > 5) {
      setAlert(els.feedbackAlert, 'يرجى اختيار التقييم بالنجوم أولاً.');
      return;
    }

    els.submitRatingBtn.disabled = true;
    setAlert(els.feedbackAlert, '');

    const payload = {
      job_id: state.lastJob.jobId,
      rating: state.selectedRating,
      categories: state.selectedRating < 5 ? Array.from(state.selectedCategories) : [],
      comment: state.selectedRating < 5 ? els.issueCommentInput.value.trim() : '',
      filename: state.lastJob.filename,
      mode: state.lastJob.mode,
      pages: state.lastJob.pages,
    };

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'تعذّر إرسال التقييم حالياً.');
      }

      state.feedbackSubmitted = true;
      els.starsRow.hidden = true;
      els.starCaption.hidden = true;
      els.issuePanel.hidden = true;
      els.fiveStarNote.hidden = true;
      els.ratingSubmitWrap.hidden = true;
      els.ratingThanksMsg.textContent =
        state.selectedRating < 5
          ? `تم تسجيل تقييمك (${state.selectedRating}/5) وملاحظتك مع الملف بنجاح ليراجعها فريقنا الهندسي.`
          : 'شكراً لتقييمك بـ 5 نجوم! يسعدنا أن جودة التحويل نالت رضاك.';
      els.ratingThanks.hidden = false;
    } catch (err) {
      setAlert(els.feedbackAlert, err.message || 'تعذّر إرسال التقييم. يرجى المحاولة مرة أخرى.');
    } finally {
      els.submitRatingBtn.disabled = false;
    }
  }

  // ── Live Health Check ──
  async function checkServiceHealth() {
    try {
      const res = await fetch('/api/health', { method: 'GET' });
      if (!res.ok) throw new Error('degraded');
      const data = await res.json();
      if (data && data.status === 'ok' && data.engine_reachable) {
        els.navHealthPill.classList.remove('degraded');
        els.navHealthText.textContent = 'جاهز';
      } else {
        els.navHealthPill.classList.add('degraded');
        els.navHealthText.textContent = 'تحديث جاري';
      }
    } catch (_) {
      els.navHealthPill.classList.add('degraded');
      els.navHealthText.textContent = 'جاري التهيئة';
    }
  }

  // ── Curtain Comparison Slider ──
  function setCurtainPosition(pct) {
    const clamped = Math.max(8, Math.min(92, pct));
    state.curtainPct = clamped;
    els.legacyLayer.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    els.curtainDivider.style.left = `${clamped}%`;
    els.curtainStage.setAttribute('aria-valuenow', String(Math.round(clamped)));
  }

  function renderCurtainSample(sampleId) {
    const sample = CURTAIN_SAMPLES.find((s) => s.id === sampleId) || CURTAIN_SAMPLES[0];
    state.activeSampleId = sample.id;
    els.batanaPageContent.innerHTML = sample.batanaHtml;
    els.legacyPageContent.innerHTML = sample.legacyHtml;
    els.deviceDocName.textContent = sample.fileName;
    els.deviceDocMode.textContent = sample.modeLabel;

    els.sampleTabs.querySelectorAll('.sample-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.sample === sample.id);
    });
  }

  function initCurtain() {
    els.sampleTabs.innerHTML = CURTAIN_SAMPLES.map(
      (s) =>
        `<button type="button" class="sample-tab${s.id === state.activeSampleId ? ' active' : ''}" data-sample="${s.id}">${s.label}</button>`
    ).join('');

    els.sampleTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.sample-tab');
      if (btn) renderCurtainSample(btn.dataset.sample);
    });

    let dragging = false;
    function updateFromClientX(clientX) {
      const rect = els.curtainStage.getBoundingClientRect();
      if (!rect.width) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setCurtainPosition(pct);
    }

    els.curtainStage.addEventListener('pointerdown', (e) => {
      dragging = true;
      els.curtainStage.setPointerCapture(e.pointerId);
      updateFromClientX(e.clientX);
    });
    els.curtainStage.addEventListener('pointermove', (e) => {
      if (dragging) updateFromClientX(e.clientX);
    });
    els.curtainStage.addEventListener('pointerup', () => { dragging = false; });
    els.curtainStage.addEventListener('pointercancel', () => { dragging = false; });

    els.curtainStage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setCurtainPosition(state.curtainPct - 5); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setCurtainPosition(state.curtainPct + 5); }
    });

    renderCurtainSample(state.activeSampleId);
    setCurtainPosition(50);
  }

  // ── Adaptive Header, Scroll Progress & Reveal ──
  function initScrollAndNav() {
    const sections = Array.from(document.querySelectorAll('section[data-nav]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

    function onScroll() {
      const sy = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      els.scrollProgress.style.width = `${Math.min(100, (sy / maxScroll) * 100)}%`;

      const probe = sy + 64;
      let activeSec = sections[0];
      for (const sec of sections) {
        if (sec.offsetTop <= probe) activeSec = sec;
      }

      if (activeSec) {
        els.topHeader.classList.toggle('is-dark', activeSec.dataset.nav === 'dark');
        const id = activeSec.id;
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Menu
    els.burgerBtn.addEventListener('click', () => {
      const open = els.mobileMenu.classList.toggle('open');
      els.burgerBtn.setAttribute('aria-expanded', String(open));
      els.mobileMenu.setAttribute('aria-hidden', String(!open));
    });

    // Reveal Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // ── Bind Converter & Rating Events ──
  function bindConverterEvents() {
    els.pickFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      els.pdfFileInput.click();
    });

    els.dropzone.addEventListener('click', () => els.pdfFileInput.click());
    els.dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        els.pdfFileInput.click();
      }
    });

    ['dragenter', 'dragover'].forEach((ev) => {
      els.dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        els.dropzone.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach((ev) => {
      els.dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        els.dropzone.classList.remove('drag-over');
      });
    });
    els.dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) handleFilePicked(file);
    });

    els.pdfFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) handleFilePicked(file);
    });

    els.changeFileBtn.addEventListener('click', () => els.pdfFileInput.click());
    els.removeFileBtn.addEventListener('click', clearSelectedFile);

    els.modePills.addEventListener('click', (e) => {
      const pill = e.target.closest('.mode-pill');
      if (!pill) return;
      state.mode = pill.dataset.mode;
      els.modePills.querySelectorAll('.mode-pill').forEach((p) => {
        const active = p === pill;
        p.classList.toggle('active', active);
        p.setAttribute('aria-checked', String(active));
      });
      els.modeHintText.textContent = MODE_HINTS[state.mode] || MODE_HINTS.auto;
    });

    els.consentCheckbox.addEventListener('change', () => {
      state.consent = els.consentCheckbox.checked;
      els.consentCheckbox.closest('.consent-box')?.classList.toggle('checked', state.consent);
      setAlert(els.uploadAlert, '');
      updateConvertButtonState();
    });

    els.convertBtn.addEventListener('click', runConversion);

    els.downloadDocxBtn.addEventListener('click', () => {
      if (state.lastJob) {
        triggerDocxDownload(state.lastJob.blobUrl, state.lastJob.outputName);
      }
    });

    els.convertAnotherBtn.addEventListener('click', () => {
      clearSelectedFile();
      showView('upload');
    });

    els.retryBtn.addEventListener('click', () => {
      if (state.selectedFile) runConversion();
      else showView('upload');
    });

    els.errorResetBtn.addEventListener('click', () => {
      clearSelectedFile();
      showView('upload');
    });

    // Stars interaction
    els.starsRow.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.star-btn');
      if (!btn || state.feedbackSubmitted) return;
      const val = Number(btn.dataset.star);
      paintStars(val);
      els.starCaption.textContent = STAR_LABELS[val] || '';
    });

    els.starsRow.addEventListener('mouseleave', () => {
      if (state.feedbackSubmitted) return;
      paintStars(state.selectedRating);
      els.starCaption.textContent = state.selectedRating
        ? STAR_LABELS[state.selectedRating]
        : 'اختر عدد النجوم لتقييم النتيجة';
    });

    els.starsRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.star-btn');
      if (btn) selectStarRating(Number(btn.dataset.star));
    });

    // Issue category chips
    els.issueChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.issue-chip');
      if (!chip) return;
      const cat = chip.dataset.cat;
      if (state.selectedCategories.has(cat)) {
        state.selectedCategories.delete(cat);
        chip.classList.remove('selected');
      } else {
        state.selectedCategories.add(cat);
        chip.classList.add('selected');
      }
    });

    els.submitRatingBtn.addEventListener('click', submitFeedback);
    els.navUploadBtn.addEventListener('click', triggerFilePicker);
    els.bottomUploadBtn.addEventListener('click', triggerFilePicker);
  }

  // Expose minimal public helper for mobile menu close
  window.BatanaApp = {
    closeMenu() {
      els.mobileMenu.classList.remove('open');
      els.burgerBtn.setAttribute('aria-expanded', 'false');
      els.mobileMenu.setAttribute('aria-hidden', 'true');
    },
  };

  // Init
  bindConverterEvents();
  initCurtain();
  initScrollAndNav();
  checkServiceHealth();
})();
