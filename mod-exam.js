// mod-exam.js - Phòng Luyện Đề Thi Thử B2 (Mini Mock Test)
(function () {
    const EXAM_QUESTIONS = [
        {
            id: 1,
            part: 'Sprachbausteine',
            question: 'Trotz ___ schlechten Wetters haben wir den Ausflug nicht abgesagt.',
            options: ['des', 'dem', 'den', 'der'],
            correct: 0,
            explanation: 'Giới từ "trotz" đi với cách Genitiv. "das Wetter" (giống trung) ở Genitiv là "des schlechten Wetters".'
        },
        {
            id: 2,
            part: 'Nomen-Verb',
            question: 'Die Firma hat beschlossen, neue Maßnahmen zum Umweltschutz ___ .',
            options: ['zu machen', 'zu ergreifen', 'zu stellen', 'zu geben'],
            correct: 1,
            explanation: 'Cụm cố định B2: "Maßnahmen ergreifen" = thực hiện/áp dụng các biện pháp.'
        },
        {
            id: 3,
            part: 'Konjunktiv II',
            question: 'Wenn ich damals mehr gelernt ___, ___ ich die Prüfung sofort bestanden.',
            options: ['wäre / hätte', 'hätte / wäre', 'hätte / hätte', 'würde / hätte'],
            correct: 2,
            explanation: 'Cả "lernen" và "bestehen" đều chia với trợ động từ "haben", nên ở Konjunktiv II quá khứ dùng "hätte / hätte".'
        },
        {
            id: 4,
            part: 'Konnektoren',
            question: '___ mehr man sich mit der Sprache beschäftigt, ___ leichter fällt das Sprechen.',
            options: ['Sowohl / als auch', 'Zwar / aber', 'Je / desto', 'Entweder / oder'],
            correct: 2,
            explanation: 'Cấu trúc so sánh "càng... càng...": Je + so sánh hơn, desto + so sánh hơn.'
        },
        {
            id: 5,
            part: 'Passiversatz',
            question: 'Dieses Formular ___ bis spätestens Freitag vollständig ___ .',
            options: ['ist / auszufüllen', 'hat / auszufüllen', 'lässt / ausfüllen', 'wird / auszufüllen'],
            correct: 0,
            explanation: 'Cấu trúc "sein + zu + Infinitiv" mang nghĩa bị động bắt buộc (= muss ausgefüllt werden).'
        },
        {
            id: 6,
            part: 'Wortschatz B2',
            question: 'Viele Experten ___ davor, die Risiken der künstlichen Intelligenz zu unterschätzen.',
            options: ['warnen', 'hoffen', 'bitten', 'erlauben'],
            correct: 0,
            explanation: 'Động từ đi với giới từ: "warnen vor + Dativ" = cảnh báo về điều gì.'
        },
        {
            id: 7,
            part: 'Partizip als Adjektiv',
            question: 'Die ständig ___ Mieten stellen für Studenten ein großes Problem dar.',
            options: ['gestiegenen', 'steigenden', 'steigende', 'gestiegene'],
            correct: 1,
            explanation: 'Giá thuê nhà "đang tăng" (chủ động, đang diễn ra) dùng Partizip I (steigend). Sau mạo từ xác định số nhiều "Die" thêm đuôi "-en" -> steigenden.'
        },
        {
            id: 8,
            part: 'Präpositionen',
            question: 'Die Entscheidung hängt stark ___ ab, wie viel Budget zur Verfügung steht.',
            options: ['damit', 'dafür', 'davon', 'darüber'],
            correct: 2,
            explanation: '"abhängen von + Dativ" (phụ thuộc vào). Khi nối với mệnh đề phụ "wie...", dùng đại từ phó từ "davon".'
        },
        {
            id: 9,
            part: 'Redemittel',
            question: '___ man die Vor- und Nachteile vergleicht, überwiegen eindeutig die Vorteile.',
            options: ['Obwohl', 'Wenn', 'Trotzdem', 'Deshalb'],
            correct: 1,
            explanation: '"Wenn" (nếu/khi) mở đầu mệnh đề điều kiện, đẩy động từ "vergleicht" xuống cuối câu.'
        },
        {
            id: 10,
            part: 'Wortschatz B2',
            question: 'Um das Projekt erfolgreich abzuschließen, müssen alle Abteilungen eng ___ .',
            options: ['zusammenarbeiten', 'mitnehmen', 'aufgeben', 'absagen'],
            correct: 0,
            explanation: '"eng zusammenarbeiten" = hợp tác chặt chẽ.'
        }
    ];

    let state = 'intro'; // 'intro' | 'running' | 'result'
    let currentIdx = 0;
    let userAnswers = {};
    let secondsLeft = 600; // 10 phút
    let timerInterval = null;
    let bestScore = parseInt(localStorage.getItem('ds_exam_best') || '0', 10);

    function formatTime(sec) {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    function startExam() {
        state = 'running';
        currentIdx = 0;
        userAnswers = {};
        secondsLeft = 600;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            secondsLeft--;
            const el = document.getElementById('exam-timer');
            if (el) el.textContent = formatTime(secondsLeft);
            if (secondsLeft <= 0) {
                submitExam();
            }
        }, 1000);
        renderExam();
    }

    function selectOption(qId, optIdx) {
        userAnswers[qId] = optIdx;
        renderExam();
    }

    function goToQuestion(idx) {
        if (idx >= 0 && idx < EXAM_QUESTIONS.length) {
            currentIdx = idx;
            renderExam();
        }
    }

    function submitExam() {
        clearInterval(timerInterval);
        timerInterval = null;
        state = 'result';

        let score = 0;
        EXAM_QUESTIONS.forEach(q => {
            if (userAnswers[q.id] === q.correct) score++;
        });

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('ds_exam_best', String(bestScore));
        }
        renderExam();
    }

    function renderExam() {
        const container = document.getElementById('exam-container');
        if (!container) return;

        if (state === 'intro') {
            container.innerHTML = `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
                    <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center text-3xl">
                        <i class="fa-solid fa-file-signature"></i>
                    </div>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-extrabold">Đề thi thử Mini B2 (Goethe / telc)</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Kiểm tra nhanh kiến thức Sprachbausteine, Ngữ pháp và Từ vựng trọng tâm B2.
                        </p>
                    </div>

                    <div class="grid grid-cols-3 gap-3 text-center">
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50">
                            <div class="text-lg font-extrabold text-indigo-500">${EXAM_QUESTIONS.length}</div>
                            <div class="text-xs text-slate-500">Câu hỏi</div>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50">
                            <div class="text-lg font-extrabold text-amber-500">10:00</div>
                            <div class="text-xs text-slate-500">Thời gian</div>
                        </div>
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50">
                            <div class="text-lg font-extrabold text-emerald-500">${bestScore}/${EXAM_QUESTIONS.length}</div>
                            <div class="text-xs text-slate-500">Điểm cao nhất</div>
                        </div>
                    </div>

                    <button onclick="window.__dsExam.start()" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-500/25">
                        <i class="fa-solid fa-play mr-2"></i>Bắt đầu làm bài
                    </button>
                </div>
            `;
            return;
        }

        if (state === 'running') {
            const q = EXAM_QUESTIONS[currentIdx];
            const answeredCount = Object.keys(userAnswers).length;

            container.innerHTML = `
                <div class="space-y-5 max-w-3xl mx-auto">
                    <!-- Thanh trạng thái & đồng hồ -->
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <span class="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-500 text-xs font-bold">Câu ${currentIdx + 1}/${EXAM_QUESTIONS.length}</span>
                            <span class="text-xs text-slate-500">Đã chọn: <strong>${answeredCount}/${EXAM_QUESTIONS.length}</strong></span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span id="exam-timer" class="font-mono text-sm font-extrabold px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500">
                                ${formatTime(secondsLeft)}
                            </span>
                            <button onclick="window.__dsExam.submit()" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">
                                Nộp bài
                            </button>
                        </div>
                    </div>

                    <!-- Bảng điều hướng số câu -->
                    <div class="flex flex-wrap gap-2">
                        ${EXAM_QUESTIONS.map((item, idx) => {
                            const isCurrent = idx === currentIdx;
                            const isAnswered = userAnswers[item.id] !== undefined;
                            let cls = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500';
                            if (isCurrent) cls = 'bg-indigo-600 text-white border-indigo-600 shadow-sm';
                            else if (isAnswered) cls = 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40 font-bold';
                            return `<button onclick="window.__dsExam.goTo(${idx})" class="w-9 h-9 rounded-xl border text-xs transition ${cls}">${idx + 1}</button>`;
                        }).join('')}
                    </div>

                    <!-- Khung câu hỏi -->
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
                        <div>
                            <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-500">${q.part}</span>
                            <h4 class="text-base sm:text-lg font-bold mt-3 leading-relaxed">${q.question}</h4>
                        </div>

                        <div class="space-y-2.5">
                            ${q.options.map((opt, idx) => {
                                const selected = userAnswers[q.id] === idx;
                                const letter = String.fromCharCode(65 + idx);
                                return `
                                    <button onclick="window.__dsExam.select(${q.id}, ${idx})" class="w-full p-3.5 rounded-xl border text-left flex items-center gap-3 text-sm transition ${
                                        selected
                                            ? 'bg-indigo-500/15 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-semibold'
                                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                    }">
                                        <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                            selected ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600'
                                        }">${letter}</span>
                                        <span>${opt}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>

                        <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                            <button onclick="window.__dsExam.goTo(${currentIdx - 1})" ${currentIdx === 0 ? 'disabled' : ''} class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition">
                                <i class="fa-solid fa-arrow-left mr-1.5"></i>Câu trước
                            </button>
                            ${currentIdx < EXAM_QUESTIONS.length - 1 ? `
                                <button onclick="window.__dsExam.goTo(${currentIdx + 1})" class="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition">
                                    Câu tiếp<i class="fa-solid fa-arrow-right ml-1.5"></i>
                                </button>
                            ` : `
                                <button onclick="window.__dsExam.submit()" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition">
                                    Hoàn thành & Chấm điểm
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Màn hình kết quả
        let score = 0;
        EXAM_QUESTIONS.forEach(q => {
            if (userAnswers[q.id] === q.correct) score++;
        });
        const percent = Math.round((score / EXAM_QUESTIONS.length) * 100);
        const passed = percent >= 60;

        container.innerHTML = `
            <div class="space-y-5 max-w-3xl mx-auto">
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-4">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold ${
                        passed ? 'bg-emerald-500/15 text-emerald-500' : 'bg-rose-500/15 text-rose-500'
                    }">
                        <i class="fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                        ${passed ? 'ĐẠT CHUẨN B2 (>= 60%)' : 'CHƯA ĐẠT (< 60%) - CỐ GẮNG THÊM NHÉ!'}
                    </div>
                    <div class="text-4xl font-black ${passed ? 'text-emerald-500' : 'text-rose-500'}">${score} / ${EXAM_QUESTIONS.length} <span class="text-xl font-bold">(${percent}%)</span></div>
                    <p class="text-xs text-slate-500">Điểm cao nhất đã lưu: <strong>${bestScore}/${EXAM_QUESTIONS.length}</strong></p>
                    <button onclick="window.__dsExam.start()" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
                        <i class="fa-solid fa-rotate-right mr-1.5"></i>Làm lại đề thi
                    </button>
                </div>

                <!-- Xem lại chi tiết từng câu -->
                <div class="space-y-3">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Chi tiết đáp án & Giải thích</h4>
                    ${EXAM_QUESTIONS.map((q, idx) => {
                        const ans = userAnswers[q.id];
                        const isRight = ans === q.correct;
                        return `
                            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border ${isRight ? 'border-emerald-500/40' : 'border-rose-500/40'} space-y-2">
                                <div class="flex items-start justify-between gap-3">
                                    <p class="text-sm font-bold">Câu ${idx + 1}: ${q.question}</p>
                                    <span class="shrink-0 text-xs font-bold ${isRight ? 'text-emerald-500' : 'text-rose-500'}">
                                        ${isRight ? 'Đúng' : 'Sai'}
                                    </span>
                                </div>
                                <div class="text-xs space-y-1">
                                    <p>Bạn chọn: <strong class="${isRight ? 'text-emerald-500' : 'text-rose-500'}">${ans !== undefined ? q.options[ans] : '(Bỏ trống)'}</strong></p>
                                    ${!isRight ? `<p>Đáp án đúng: <strong class="text-emerald-500">${q.options[q.correct]}</strong></p>` : ''}
                                    <p class="text-slate-500 dark:text-slate-400 pt-1"><i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i>${q.explanation}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    window.__dsExam = {
        start: startExam,
        select: selectOption,
        goTo: goToQuestion,
        submit: submitExam
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderExam);
    } else {
        renderExam();
    }
})();
