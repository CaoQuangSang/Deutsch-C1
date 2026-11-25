// mod-grammar.js - Module Ngữ Pháp B2 Tương Tác & Bài Tập Thực Hành
(function () {
    const GRAMMAR_DATA = [
        {
            id: 'g1',
            title: 'Konjunktiv II (Thể giả định lịch sự & không có thật)',
            tag: 'Trọng tâm B2',
            summary: 'Dùng để đưa ra lời khuyên, yêu cầu lịch sự hoặc giả định điều không có thật ở hiện tại và quá khứ.',
            rules: [
                'Hiện tại: würden + Infinitiv (hoặc dạng riêng của động từ: wären, hätten, könnten, müssten...).',
                'Quá khứ (tiếc nuối/giả định ngược quá khứ): wären / hätten + Partizip II.',
                'Với Modalverb ở quá khứ: hätten + Infinitiv + Modalverb (Infinitiv).'
            ],
            examples: [
                { de: 'Wenn ich mehr Zeit hätte, würde ich jeden Tag Deutsch sprechen.', vi: 'Nếu tôi có nhiều thời gian hơn, tôi sẽ nói tiếng Đức mỗi ngày.' },
                { de: 'Hätte ich das früher gewusst, wäre ich nicht gekommen.', vi: 'Giá như tôi biết điều đó sớm hơn, tôi đã không đến.' }
            ],
            quiz: {
                question: 'Chọn đáp án đúng cho câu giả định quá khứ: "Wenn er früher losgefahren ___, ___ er den Zug nicht verpasst."',
                options: [
                    'wäre / hätte',
                    'hätte / wäre',
                    'würde / hätte',
                    'war / hat'
                ],
                correct: 0,
                explanation: '"losfahren" là động từ di chuyển nên đi với "sein" (wäre); "verpassen" đi với "haben" (hätte).'
            }
        },
        {
            id: 'g2',
            title: 'Passiv & Passiversatzformen (Câu bị động & Các dạng thay thế)',
            tag: 'Hay ra thi',
            summary: 'Cực kỳ phổ biến trong văn viết học thuật, báo chí và phần Lesen/Sprachbausteine B2.',
            rules: [
                'Vorgangspassiv (Bị động hành động): werden + Partizip II (Hiện tại: wird gemacht; Quá khứ: wurde gemacht).',
                'Zustandspassiv (Bị động trạng thái): sein + Partizip II (Das Fenster ist geöffnet).',
                'Thay thế bị động mang nghĩa "có thể": sich lassen + Infinitiv, sein + zu + Infinitiv, hoặc tính từ đuôi -bar/-lich.'
            ],
            examples: [
                { de: 'Das Problem lässt sich schnell lösen.', vi: 'Vấn đề này có thể được giải quyết nhanh chóng. (= kann gelöst werden)' },
                { de: 'Die Regeln sind unbedingt zu beachten.', vi: 'Các quy tắc bắt buộc phải được tuân thủ. (= müssen beachtet werden)' }
            ],
            quiz: {
                question: 'Câu nào sau đây đồng nghĩa với "Dieser Text kann leicht verstanden werden"?',
                options: [
                    'Dieser Text ist leicht zu verstehen.',
                    'Dieser Text hat leicht verstanden.',
                    'Dieser Text lässt leicht verstehen.',
                    'Dieser Text wird leicht verstehen.'
                ],
                correct: 0,
                explanation: 'Cấu trúc "sein + zu + Infinitiv" mang nghĩa bị động có thể/phải làm gì (= kann verstanden werden). Câu C sai vì thiếu "sich".'
            }
        },
        {
            id: 'g3',
            title: 'Nomen-Verb-Verbindungen (Cụm danh - động từ cố định)',
            tag: 'Ăn điểm Schreiben',
            summary: 'Giúp bài viết (Schreiben) và bài nói (Sprechen) mang văn phong trang trọng, chuẩn trình độ B2.',
            rules: [
                'eine Entscheidung treffen = entscheiden (đưa ra quyết định).',
                'einen Beitrag leisten (zu + D) = beitragen (đóng góp vào).',
                'in Betracht ziehen = überlegen (cân nhắc, xem xét).',
                'zur Verfügung stehen / stellen = có sẵn / cung cấp.'
            ],
            examples: [
                { de: 'Jeder kann einen wichtigen Beitrag zum Umweltschutz leisten.', vi: 'Mỗi người đều có thể đóng góp một phần quan trọng vào việc bảo vệ môi trường.' },
                { de: 'Wir müssen alle Möglichkeiten in Betracht ziehen.', vi: 'Chúng ta phải cân nhắc tất cả các khả năng.' }
            ],
            quiz: {
                question: 'Điền động từ đúng: "Für weitere Fragen ___ ich Ihnen jederzeit gerne zur Verfügung."',
                options: [
                    'stelle',
                    'stehe',
                    'treffe',
                    'nehme'
                ],
                correct: 1,
                explanation: '"jemandem zur Verfügung stehen" nghĩa là sẵn sàng hỗ trợ ai đó (chủ ngữ là bản thân mình).'
            }
        },
        {
            id: 'g4',
            title: 'Zweiteilige Konnektoren (Liên từ kép)',
            tag: 'Lập luận B2',
            summary: 'Kết nối ý mạch lạc khi tranh luận ưu/nhược điểm trong bài thi nói và viết.',
            rules: [
                'sowohl ... als auch: không những ... mà còn (cả hai).',
                'weder ... noch: không ... cũng không (phủ định cả hai).',
                'entweder ... oder: hoặc ... hoặc (chọn một trong hai).',
                'zwar ..., aber: tuy là ..., nhưng mà.',
                'je + so sánh hơn ..., desto + so sánh hơn ...: càng ..., càng ...'
            ],
            examples: [
                { de: 'Je mehr man übt, desto sicherer spricht man Deutsch.', vi: 'Càng luyện tập nhiều, người ta càng nói tiếng Đức tự tin hơn.' },
                { de: 'Homeoffice spart zwar Zeit, aber man hat weniger Kontakt zu Kollegen.', vi: 'Làm việc tại nhà tuy tiết kiệm thời gian, nhưng lại ít tiếp xúc với đồng nghiệp hơn.' }
            ],
            quiz: {
                question: 'Hoàn thiện câu: "___ länger ich in Deutschland lebe, ___ besser verstehe ich die Kultur."',
                options: [
                    'Sowohl / als auch',
                    'Zwar / aber',
                    'Je / desto',
                    'Weder / noch'
                ],
                correct: 2,
                explanation: 'Cấu trúc so sánh càng... càng... luôn đi cặp "Je + so sánh hơn (động từ cuối câu), desto + so sánh hơn (động từ đứng ngay sau tính từ)".'
            }
        },
        {
            id: 'g5',
            title: 'Partizip I & II als Adjektiv (Phân từ làm tính từ)',
            tag: 'Đọc hiểu B2',
            summary: 'Rút gọn mệnh đề quan hệ thành tính từ đứng trước danh từ, rất hay gặp trong bài đọc B2.',
            rules: [
                'Partizip I (Infinitiv + d): mang nghĩa CHỦ ĐỘNG, đang diễn ra (ví dụ: das lachende Kind = đứa trẻ đang cười).',
                'Partizip II: mang nghĩa BỊ ĐỘNG hoặc đã hoàn thành (ví dụ: das reparierte Auto = chiếc xe đã được sửa).',
                'Chia đuôi tính từ (Adjektivdeklination) bình thường theo giống, cách và mạo từ của danh từ.'
            ],
            examples: [
                { de: 'Die steigenden Preise belasten viele Familien.', vi: 'Giá cả đang tăng cao gây áp lực lên nhiều gia đình.' },
                { de: 'Der gestern geschriebene Brief liegt auf dem Tisch.', vi: 'Bức thư được viết hôm qua đang nằm trên bàn.' }
            ],
            quiz: {
                question: 'Chọn dạng đúng: "Das ist ein sehr gut ___ Buch." (Một cuốn sách được viết rất hay)',
                options: [
                    'schreibendes',
                    'geschriebenes',
                    'geschriebene',
                    'schreibende'
                ],
                correct: 1,
                explanation: 'Cuốn sách "được viết" (bị động) nên dùng Partizip II (geschrieben). Đi với "ein ... Buch" (giống trung, Nominativ) nên thêm đuôi "-es" -> geschriebenes.'
            }
        }
    ];

    let openId = 'g1';
    let completedIds = new Set(JSON.parse(localStorage.getItem('ds_completed_grammar') || '[]'));
    let quizAnswers = {};

    function speakText(text, event) {
        if (event) event.stopPropagation();
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    function toggleLesson(id) {
        openId = openId === id ? null : id;
        renderGrammar();
    }

    function toggleComplete(id, event) {
        if (event) event.stopPropagation();
        if (completedIds.has(id)) completedIds.delete(id);
        else completedIds.add(id);
        localStorage.setItem('ds_completed_grammar', JSON.stringify([...completedIds]));
        renderGrammar();
    }

    function selectAnswer(lessonId, optionIdx) {
        quizAnswers[lessonId] = optionIdx;
        renderGrammar();
    }

    function renderGrammar() {
        const container = document.getElementById('grammar-container');
        if (!container) return;

        const completedCount = completedIds.size;
        const total = GRAMMAR_DATA.length;

        container.innerHTML = `
            <!-- Thanh tiến độ ngữ pháp -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-lg">
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div>
                        <div class="text-sm font-bold">Tiến độ chuyên đề Ngữ pháp B2</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400">Đã hoàn thành ${completedCount}/${total} chuyên đề cốt lõi</div>
                    </div>
                </div>
                <div class="w-full sm:w-48 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width: ${Math.round((completedCount / total) * 100)}%"></div>
                </div>
            </div>

            <!-- Danh sách chuyên đề -->
            <div class="space-y-3">
                ${GRAMMAR_DATA.map((item, index) => {
                    const isOpen = openId === item.id;
                    const isDone = completedIds.has(item.id);
                    const userAns = quizAnswers[item.id];
                    const hasAnswered = userAns !== undefined;

                    return `
                        <div class="rounded-2xl bg-white dark:bg-slate-900 border ${isDone ? 'border-emerald-500/40' : 'border-slate-200 dark:border-slate-800'} overflow-hidden transition-all shadow-sm">
                            <!-- Tiêu đề Accordion -->
                            <button onclick="window.__dsGrammar.toggle('${item.id}')" class="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <div class="flex items-center gap-3.5 min-w-0">
                                    <span class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isDone ? 'bg-emerald-500 text-white' : 'bg-indigo-500/15 text-indigo-500'}">
                                        ${isDone ? '<i class="fa-solid fa-check"></i>' : (index + 1)}
                                    </span>
                                    <div class="min-w-0">
                                        <div class="flex flex-wrap items-center gap-2 mb-0.5">
                                            <h4 class="font-bold text-base truncate">${item.title}</h4>
                                            <span class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/15 text-amber-500">${item.tag}</span>
                                        </div>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${item.summary}</p>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-500' : ''}"></i>
                            </button>

                            <!-- Nội dung chi tiết -->
                            ${isOpen ? `
                                <div class="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-5">
                                    <!-- Công thức & Quy tắc -->
                                    <div>
                                        <h5 class="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
                                            <i class="fa-solid fa-list-check mr-1.5"></i>Quy tắc cần nhớ
                                        </h5>
                                        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                            ${item.rules.map(r => `
                                                <li class="flex items-start gap-2">
                                                    <span class="text-indigo-500 mt-1">•</span>
                                                    <span>${r}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>

                                    <!-- Ví dụ kèm phát âm -->
                                    <div>
                                        <h5 class="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
                                            <i class="fa-solid fa-quote-left mr-1.5"></i>Ví dụ chuẩn B2
                                        </h5>
                                        <div class="space-y-2">
                                            ${item.examples.map(ex => `
                                                <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 flex items-start justify-between gap-3">
                                                    <div>
                                                        <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">${ex.de}</p>
                                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ex.vi}</p>
                                                    </div>
                                                    <button onclick="window.__dsGrammar.speak('${ex.de.replace(/'/g, "\\'")}', event)" title="Nghe phát âm"
                                                        class="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 hover:bg-indigo-600 hover:text-white text-indigo-500 flex items-center justify-center transition">
                                                        <i class="fa-solid fa-volume-high text-xs"></i>
                                                    </button>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <!-- Bài tập nhanh -->
                                    <div class="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3">
                                        <h5 class="text-xs font-bold uppercase tracking-wider text-indigo-500">
                                            <i class="fa-solid fa-bolt mr-1.5"></i>Thực hành nhanh
                                        </h5>
                                        <p class="text-sm font-medium">${item.quiz.question}</p>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            ${item.quiz.options.map((opt, idx) => {
                                                let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-500';
                                                if (hasAnswered) {
                                                    if (idx === item.quiz.correct) {
                                                        btnClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold';
                                                    } else if (idx === userAns) {
                                                        btnClass = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400';
                                                    } else {
                                                        btnClass = 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60';
                                                    }
                                                }
                                                return `
                                                    <button onclick="window.__dsGrammar.answer('${item.id}', ${idx})" 
                                                        class="px-3.5 py-2.5 rounded-xl border text-left text-sm transition ${btnClass}">
                                                        ${opt}
                                                    </button>
                                                `;
                                            }).join('')}
                                        </div>
                                        ${hasAnswered ? `
                                            <div class="text-xs p-3 rounded-lg ${userAns === item.quiz.correct ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}">
                                                <strong>${userAns === item.quiz.correct ? 'Chính xác!' : 'Chưa đúng rồi!'}</strong> ${item.quiz.explanation}
                                            </div>
                                        ` : ''}
                                    </div>

                                    <!-- Nút đánh dấu hoàn thành -->
                                    <div class="flex justify-end pt-1">
                                        <button onclick="window.__dsGrammar.complete('${item.id}', event)"
                                            class="px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                                                isDone
                                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white'
                                            }">
                                            <i class="fa-solid fa-check-double"></i>
                                            ${isDone ? 'Đã hoàn thành chuyên đề' : 'Đánh dấu đã học xong'}
                                        </button>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    window.__dsGrammar = {
        toggle: toggleLesson,
        complete: toggleComplete,
        answer: selectAnswer,
        speak: speakText
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderGrammar);
    } else {
        renderGrammar();
    }
})();
