// mod-skills.js - Module Luyện 4 Kỹ Năng B2 (Lesen, Hören, Schreiben, Sprechen)
(function () {
    let activeSkill = 'lesen';
    let showLesenTrans = false;
    let lesenAnswers = {};
    let showHoerenTranscript = false;
    let hoerenRate = 0.95;
    let hoerenAnswers = {};
    let showModelEssay = false;
    let essayText = localStorage.getItem('ds_b2_essay') || '';
    let speakTimer = null;
    let speakSecondsLeft = 180; // 3 phút thuyết trình B2

    const LESEN_DATA = {
        title: 'Homeoffice: Freiheit oder neue Belastung?',
        textDe: `Seit einigen Jahren gehört das Arbeiten von zu Hause für viele Beschäftigte zum Alltag. Befürworter schätzen vor allem die Zeitersparnis, da der tägliche Arbeitsweg entfällt. Dadurch lassen sich Beruf und Familie oft besser vereinbaren. Kritiker weisen jedoch darauf hin, dass die Grenzen zwischen Arbeit und Freizeit immer stärker verschwimmen. Viele Arbeitnehmer fühlen sich verpflichtet, auch am späten Abend noch E-Mails zu beantworten. Zudem fehlt im Homeoffice häufig der persönliche Austausch mit den Kollegen, was langfristig das Teamgefühl schwächen kann.`,
        textVi: `Từ vài năm nay, làm việc tại nhà đã trở thành thói quen hàng ngày của nhiều nhân viên. Những người ủng hộ đặc biệt đánh giá cao việc tiết kiệm thời gian vì không còn phải di chuyển đi làm mỗi ngày. Nhờ đó, công việc và gia đình thường dễ cân bằng hơn. Tuy nhiên, những người chỉ trích chỉ ra rằng ranh giới giữa công việc và thời gian rảnh ngày càng mờ nhạt. Nhiều nhân viên cảm thấy có nghĩa vụ phải trả lời email ngay cả vào tối muộn. Ngoài ra, khi làm việc tại nhà thường thiếu sự trao đổi trực tiếp với đồng nghiệp, điều này về lâu dài có thể làm suy yếu tinh thần đồng đội.`,
        questions: [
            {
                id: 'lq1',
                q: '1. Im Homeoffice fällt es vielen Menschen leichter, Familie und Beruf unter einen Hut zu bringen.',
                correct: true,
                exp: 'Đúng (Richtig): Bài viết có nêu "Dadurch lassen sich Beruf und Familie oft besser vereinbaren."'
            },
            {
                id: 'lq2',
                q: '2. Durch das Homeoffice arbeiten die Menschen abends überhaupt nicht mehr.',
                correct: false,
                exp: 'Sai (Falsch): Ngược lại, nhiều người vẫn cảm thấy phải trả lời email vào tối muộn ("auch am späten Abend noch E-Mails zu beantworten").'
            }
        ]
    };

    const HOEREN_DATA = {
        title: 'Radio-Beitrag: Nachhaltig reisen in Europa',
        transcript: `Immer mehr junge Menschen in Europa achten beim Reisen auf ihren ökologischen Fußabdruck. Statt für einen Wochenendtrip das Flugzeug zu nehmen, entscheiden sich viele bewusst für den Nachtzug. Zwar dauert die Fahrt oft länger und die Tickets sind manchmal teurer als Billigflüge, doch die Reisenden genießen die entspannte Atmosphäre und kommen direkt im Stadtzentrum an. Experten gehen davon aus, dass der Bahnverkehr in den nächsten zehn Jahren weiter ausgebaut wird.`,
        questions: [
            {
                id: 'hq1',
                q: '1. Warum wählen viele junge Europäer den Nachtzug?',
                options: [
                    'Weil Zugtickets immer billiger als Flüge sind.',
                    'Weil sie umweltbewusster reisen möchten.',
                    'Weil es keine Flüge mehr gibt.'
                ],
                correct: 1,
                exp: 'Họ quan tâm đến dấu chân sinh thái ("ökologischen Fußabdruck") nên chọn tàu đêm để bảo vệ môi trường.'
            },
            {
                id: 'hq2',
                q: '2. Welcher Vorteil des Zuges wird im Text genannt?',
                options: [
                    'Man kommt direkt im Stadtzentrum an.',
                    'Die Fahrt ist immer kürzer als ein Flug.',
                    'Das Essen im Zug ist kostenlos.'
                ],
                correct: 0,
                exp: 'Đoạn nghe nêu rõ: "...und kommen direkt im Stadtzentrum an."'
            }
        ]
    };

    const SCHREIBEN_DATA = {
        prompt: 'Forumsbeitrag B2: Immer mehr Menschen kaufen heute fast alles im Internet statt in lokalen Geschäften. Äußern Sie Ihre Meinung dazu, nennen Sie Gründe für diese Entwicklung, erläutern Sie Vor- und Nachteile und nennen Sie Alternativen. (Khoảng 150 từ)',
        redemittel: [
            'Meiner Meinung nach ist das Thema ... sehr aktuell.',
            'Ein wichtiger Grund dafür ist, dass ...',
            'Einerseits bietet Online-Shopping den Vorteil, dass ...',
            'Andererseits sollte man nicht vergessen, dass ...',
            'Als Alternative könnte man ...',
            'Zusammenfassend lässt sich sagen, dass ...'
        ],
        model: `Meiner Meinung nach ist das Thema Online-Shopping heute sehr aktuell, da immer mehr Menschen ihre Einkäufe bequem von zu Hause aus erledigen. Ein wichtiger Grund dafür ist der Zeitmangel im Alltag sowie die riesige Auswahl im Internet.\n\nEinerseits bietet das Einkaufen im Netz den großen Vorteil, dass man rund um die Uhr bestellen und Preise leicht vergleichen kann. Andererseits führt diese Entwicklung dazu, dass viele kleine Geschäfte in den Innenstädten schließen müssen. Außerdem entsteht durch die vielen Pakete enorm viel Verpackungsmüll.\n\nAls sinnvolle Alternative könnte man lokale Läden unterstützen, indem man zumindest Lebensmittel und Kleidung vor Ort kauft. Zusammenfassend lässt sich sagen, dass eine gesunde Mischung aus Online- und Offline-Einkauf am besten ist.`
    };

    const SPRECHEN_DATA = {
        topic: 'Vortrag B2 (3 phút): "Sollten Smartphones in der Schule komplett verboten werden?"',
        steps: [
            {
                part: '1. Einleitung (Mở bài)',
                phrase: 'Ich möchte heute über das Thema Smartphone-Verbot in der Schule sprechen, da es sehr kontrovers diskutiert wird.'
            },
            {
                part: '2. Vorteile (Ưu điểm của lệnh cấm)',
                phrase: 'Ein klares Argument für ein Verbot ist, dass sich die Schüler besser auf den Unterricht konzentrieren können.'
            },
            {
                part: '3. Nachteile (Nhược điểm)',
                phrase: 'Auf der anderen Seite können Smartphones im Unterricht auch sinnvoll für Recherchen genutzt werden.'
            },
            {
                part: '4. Eigene Meinung & Schluss (Quan điểm & Kết)',
                phrase: 'Meiner Ansicht nach sollte man statt eines strengen Verbots lieber den verantwortungsvollen Umgang lernen. Vielen Dank für Ihre Aufmerksamkeit!'
            }
        ]
    };

    function speakText(text, rate = 0.9) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'de-DE';
        u.rate = rate;
        window.speechSynthesis.speak(u);
    }

    function stopSpeech() {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    function switchSkill(skill) {
        stopSpeech();
        activeSkill = skill;
        renderSkills();
    }

    function insertRedemittel(phrase) {
        const ta = document.getElementById('b2-essay-input');
        if (!ta) return;
        const prefix = ta.value && !ta.value.endsWith(' ') && !ta.value.endsWith('\n') ? ' ' : '';
        ta.value = ta.value + prefix + phrase + ' ';
        essayText = ta.value;
        localStorage.setItem('ds_b2_essay', essayText);
        updateWordCount();
        ta.focus();
    }

    function updateWordCount() {
        const counter = document.getElementById('essay-word-count');
        if (!counter) return;
        const words = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
        counter.textContent = `${words} / 150 từ`;
        counter.className = words >= 150
            ? 'text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-500'
            : 'text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500';
    }

    function toggleSpeakTimer() {
        if (speakTimer) {
            clearInterval(speakTimer);
            speakTimer = null;
            renderSkills();
            return;
        }
        if (speakSecondsLeft <= 0) speakSecondsLeft = 180;
        speakTimer = setInterval(() => {
            speakSecondsLeft--;
            const el = document.getElementById('speak-timer-display');
            if (el) el.textContent = formatTime(speakSecondsLeft);
            if (speakSecondsLeft <= 0) {
                clearInterval(speakTimer);
                speakTimer = null;
                renderSkills();
            }
        }, 1000);
        renderSkills();
    }

    function resetSpeakTimer() {
        if (speakTimer) {
            clearInterval(speakTimer);
            speakTimer = null;
        }
        speakSecondsLeft = 180;
        renderSkills();
    }

    function formatTime(sec) {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    function renderSkills() {
        const container = document.getElementById('skills-container');
        if (!container) return;
        container.className = 'space-y-5';

        const tabs = [
            { id: 'lesen', label: 'Lesen (Đọc)', icon: 'fa-book-open-reader' },
            { id: 'hoeren', label: 'Hören (Nghe)', icon: 'fa-headphones' },
            { id: 'schreiben', label: 'Schreiben (Viết)', icon: 'fa-pen-nib' },
            { id: 'sprechen', label: 'Sprechen (Nói)', icon: 'fa-microphone' }
        ];

        let contentHtml = '';

        if (activeSkill === 'lesen') {
            contentHtml = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                        <h4 class="text-lg font-bold text-indigo-500">${LESEN_DATA.title}</h4>
                        <div class="flex gap-2">
                            <button onclick="window.__dsSkills.speakLesen()" class="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition">
                                <i class="fa-solid fa-volume-high mr-1"></i>Đọc bài
                            </button>
                            <button onclick="window.__dsSkills.toggleLesenTrans()" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <i class="fa-solid fa-language mr-1"></i>${showLesenTrans ? 'Ẩn dịch' : 'Xem dịch'}
                            </button>
                        </div>
                    </div>

                    <p class="text-sm lg:text-base leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700/50">
                        ${LESEN_DATA.textDe}
                    </p>

                    ${showLesenTrans ? `
                        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic bg-indigo-50/50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200/50 dark:border-indigo-800/40">
                            ${LESEN_DATA.textVi}
                        </p>
                    ` : ''}

                    <div class="space-y-3 pt-2">
                        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">Câu hỏi đọc hiểu (Richtig / Falsch)</h5>
                        ${LESEN_DATA.questions.map(item => {
                            const ans = lesenAnswers[item.id];
                            const answered = ans !== undefined;
                            return `
                                <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                                    <p class="text-sm font-medium">${item.q}</p>
                                    <div class="flex gap-2">
                                        <button onclick="window.__dsSkills.ansLesen('${item.id}', true)" class="px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                            answered && ans === true
                                                ? (item.correct === true ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-rose-500 text-white border-rose-500')
                                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500'
                                        }">Richtig (Đúng)</button>
                                        <button onclick="window.__dsSkills.ansLesen('${item.id}', false)" class="px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                            answered && ans === false
                                                ? (item.correct === false ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-rose-500 text-white border-rose-500')
                                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500'
                                        }">Falsch (Sai)</button>
                                    </div>
                                    ${answered ? `<p class="text-xs ${ans === item.correct ? 'text-emerald-500' : 'text-rose-500'}">${item.exp}</p>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else if (activeSkill === 'hoeren') {
            contentHtml = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                    <div>
                        <h4 class="text-lg font-bold text-amber-500 mb-1">${HOEREN_DATA.title}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Nghe đoạn hội thoại 1–2 lần trước khi mở Transcript để luyện phản xạ.</p>
                    </div>

                    <!-- Trình phát âm thanh TTS -->
                    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <button onclick="window.__dsSkills.playHoeren()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20">
                                <i class="fa-solid fa-play mr-1.5"></i>Phát bài nghe
                            </button>
                            <button onclick="window.__dsSkills.stopSpeech()" class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-rose-500 hover:text-white text-xs font-semibold transition">
                                <i class="fa-solid fa-stop mr-1"></i>Dừng
                            </button>
                        </div>
                        <div class="flex items-center gap-2 text-xs">
                            <span class="text-slate-500">Tốc độ:</span>
                            <button onclick="window.__dsSkills.setRate(0.75)" class="px-2.5 py-1 rounded-lg font-semibold ${hoerenRate === 0.75 ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600'}">0.75x</button>
                            <button onclick="window.__dsSkills.setRate(0.95)" class="px-2.5 py-1 rounded-lg font-semibold ${hoerenRate === 0.95 ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600'}">1.0x</button>
                            <button onclick="window.__dsSkills.toggleTranscript()" class="ml-2 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-500 font-semibold hover:bg-amber-500 hover:text-white transition">
                                ${showHoerenTranscript ? 'Ẩn Transcript' : 'Hiện Transcript'}
                            </button>
                        </div>
                    </div>

                    ${showHoerenTranscript ? `
                        <div class="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-sm leading-relaxed">
                            <div class="text-xs font-bold text-amber-500 uppercase mb-1">Transcript</div>
                            ${HOEREN_DATA.transcript}
                        </div>
                    ` : ''}

                    <div class="space-y-3">
                        ${HOEREN_DATA.questions.map(item => {
                            const ans = hoerenAnswers[item.id];
                            const answered = ans !== undefined;
                            return `
                                <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                                    <p class="text-sm font-medium">${item.q}</p>
                                    <div class="space-y-2">
                                        ${item.options.map((opt, idx) => {
                                            let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500';
                                            if (answered) {
                                                if (idx === item.correct) cls = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold';
                                                else if (idx === ans) cls = 'bg-rose-500/15 border-rose-500 text-rose-500';
                                            }
                                            return `<button onclick="window.__dsSkills.ansHoeren('${item.id}', ${idx})" class="w-full text-left px-3.5 py-2 rounded-xl border text-xs sm:text-sm transition ${cls}">${opt}</button>`;
                                        }).join('')}
                                    </div>
                                    ${answered ? `<p class="text-xs ${ans === item.correct ? 'text-emerald-500' : 'text-rose-500'}">${item.exp}</p>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else if (activeSkill === 'schreiben') {
            contentHtml = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                    <div class="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40">
                        <span class="text-xs font-bold uppercase text-indigo-500">Đề bài luyện viết B2</span>
                        <p class="text-sm font-medium mt-1">${SCHREIBEN_DATA.prompt}</p>
                    </div>

                    <!-- Cụm từ ăn điểm (bấm để chèn) -->
                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-2">Bấm vào Redemittel bên dưới để chèn nhanh vào bài viết:</p>
                        <div class="flex flex-wrap gap-2">
                            ${SCHREIBEN_DATA.redemittel.map(r => `
                                <button onclick="window.__dsSkills.insert('${r.replace(/'/g, "\\'")}')" class="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs transition text-left">
                                    + ${r}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Khung viết bài -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <label class="text-xs font-bold uppercase text-slate-400">Bài viết của bạn (Tự động lưu)</label>
                            <span id="essay-word-count" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500">0 / 150 từ</span>
                        </div>
                        <textarea id="b2-essay-input" rows="8" placeholder="Viết bài của bạn bằng tiếng Đức tại đây..."
                            class="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:outline-none text-sm leading-relaxed">${essayText}</textarea>
                    </div>

                    <div class="flex justify-end">
                        <button onclick="window.__dsSkills.toggleModel()" class="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-white text-xs font-bold transition">
                            <i class="fa-solid fa-eye mr-1.5"></i>${showModelEssay ? 'Ẩn bài mẫu B2' : 'Xem bài mẫu B2 tham khảo'}
                        </button>
                    </div>

                    ${showModelEssay ? `
                        <div class="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                            <div class="text-xs font-bold text-emerald-500 uppercase">Bài mẫu chuẩn B2</div>
                            <p class="text-sm whitespace-pre-line leading-relaxed">${SCHREIBEN_DATA.model}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        } else if (activeSkill === 'sprechen') {
            contentHtml = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <div>
                            <span class="text-xs font-bold uppercase text-rose-500">Chủ đề thuyết trình</span>
                            <h4 class="text-base font-bold mt-0.5">${SPRECHEN_DATA.topic}</h4>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span id="speak-timer-display" class="font-mono text-xl font-extrabold text-rose-500 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-rose-500/30">${formatTime(speakSecondsLeft)}</span>
                            <button onclick="window.__dsSkills.toggleTimer()" class="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition">
                                ${speakTimer ? 'Tạm dừng' : 'Bấm giờ'}
                            </button>
                            <button onclick="window.__dsSkills.resetTimer()" class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                                <i class="fa-solid fa-rotate-left"></i>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">Khung dàn ý & Câu mẫu (Bấm loa để nghe phát âm)</h5>
                        ${SPRECHEN_DATA.steps.map(s => `
                            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50 flex items-start justify-between gap-3">
                                <div>
                                    <div class="text-xs font-bold text-indigo-500 mb-1">${s.part}</div>
                                    <p class="text-sm font-medium">${s.phrase}</p>
                                </div>
                                <button onclick="window.__dsSkills.speakPhrase('${s.phrase.replace(/'/g, "\\'")}')" class="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 hover:bg-indigo-600 hover:text-white text-indigo-500 flex items-center justify-center transition">
                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <!-- Thanh chọn 4 kỹ năng -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                ${tabs.map(t => `
                    <button onclick="window.__dsSkills.switchSkill('${t.id}')" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition ${
                        activeSkill === t.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    }">
                        <i class="fa-solid ${t.icon}"></i>
                        <span>${t.label}</span>
                    </button>
                `).join('')}
            </div>

            ${contentHtml}
        `;

        // Gắn sự kiện đếm từ cho tab Schreiben
        const ta = document.getElementById('b2-essay-input');
        if (ta) {
            updateWordCount();
            ta.addEventListener('input', (e) => {
                essayText = e.target.value;
                localStorage.setItem('ds_b2_essay', essayText);
                updateWordCount();
            });
        }
    }

    window.__dsSkills = {
        switchSkill,
        speakLesen: () => speakText(LESEN_DATA.textDe, 0.9),
        toggleLesenTrans: () => { showLesenTrans = !showLesenTrans; renderSkills(); },
        ansLesen: (id, val) => { lesenAnswers[id] = val; renderSkills(); },
        playHoeren: () => speakText(HOEREN_DATA.transcript, hoerenRate),
        stopSpeech,
        setRate: (r) => { hoerenRate = r; renderSkills(); },
        toggleTranscript: () => { showHoerenTranscript = !showHoerenTranscript; renderSkills(); },
        ansHoeren: (id, idx) => { hoerenAnswers[id] = idx; renderSkills(); },
        insert: insertRedemittel,
        toggleModel: () => { showModelEssay = !showModelEssay; renderSkills(); },
        toggleTimer: toggleSpeakTimer,
        resetTimer: resetSpeakTimer,
        speakPhrase: (p) => speakText(p, 0.9)
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSkills);
    } else {
        renderSkills();
    }
})();
