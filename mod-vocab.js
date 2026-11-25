// mod-vocab.js - Module Kho Từ Vựng B2 Tương Tác
(function () {
    const VOCAB_DATA = [
        // Chủ đề: Arbeit & Beruf (Công việc)
        {
            id: 'v1',
            word: 'die Voraussetzung (-en)',
            article: 'die',
            topic: 'Công việc',
            meaning: 'Điều kiện tiên quyết, yêu cầu bắt buộc',
            exampleDe: 'Gute Deutschkenntnisse sind eine wichtige Voraussetzung für diesen Job.',
            exampleVi: 'Kiến thức tiếng Đức tốt là một điều kiện tiên quyết quan trọng cho công việc này.'
        },
        {
            id: 'v2',
            word: 'sich bewerben um (+ A)',
            article: 'verb',
            topic: 'Công việc',
            meaning: 'Ứng tuyển, nộp đơn xin (việc/học bổng)',
            exampleDe: 'Ich möchte mich um die Stelle als Projektmanager bewerben.',
            exampleVi: 'Tôi muốn ứng tuyển vào vị trí quản lý dự án.'
        },
        {
            id: 'v3',
            word: 'der Lebenslauf (¨-e)',
            article: 'der',
            topic: 'Công việc',
            meaning: 'Sơ yếu lý lịch (CV)',
            exampleDe: 'Bitte fügen Sie Ihrer Bewerbung einen aktuellen Lebenslauf bei.',
            exampleVi: 'Vui lòng đính kèm một bản CV cập nhật vào hồ sơ ứng tuyển của bạn.'
        },
        {
            id: 'v4',
            word: 'die Überstunde (-n)',
            article: 'die',
            topic: 'Công việc',
            meaning: 'Giờ làm thêm (tăng ca)',
            exampleDe: 'In diesem Monat musste ich viele Überstunden machen.',
            exampleVi: 'Tháng này tôi đã phải làm thêm rất nhiều giờ.'
        },

        // Chủ đề: Umwelt & Gesellschaft (Môi trường & Xã hội)
        {
            id: 'v5',
            word: 'die Nachhaltigkeit',
            article: 'die',
            topic: 'Môi trường',
            meaning: 'Sự bền vững',
            exampleDe: 'Nachhaltigkeit spielt beim Einkaufen eine immer größere Rolle.',
            exampleVi: 'Sự bền vững đóng vai trò ngày càng lớn khi mua sắm.'
        },
        {
            id: 'v6',
            word: 'vermeiden (vermied, vermieden)',
            article: 'verb',
            topic: 'Môi trường',
            meaning: 'Tránh, né tránh, hạn chế',
            exampleDe: 'Wir sollten versuchen, unnötigen Plastikmüll zu vermeiden.',
            exampleVi: 'Chúng ta nên cố gắng tránh rác thải nhựa không cần thiết.'
        },
        {
            id: 'v7',
            word: 'das Bewusstsein',
            article: 'das',
            topic: 'Môi trường',
            meaning: 'Nhận thức, ý thức',
            exampleDe: 'Das Bewusstsein für den Klimawandel ist in den letzten Jahren gewachsen.',
            exampleVi: 'Nhận thức về biến đổi khí hậu đã tăng lên trong những năm gần đây.'
        },

        // Chủ đề: Medien & Technik (Công nghệ & Truyền thông)
        {
            id: 'v8',
            word: 'der Datenschutz',
            article: 'der',
            topic: 'Công nghệ',
            meaning: 'Bảo mật dữ liệu cá nhân',
            exampleDe: 'In Deutschland wird der Datenschutz sehr ernst genommen.',
            exampleVi: 'Ở Đức, việc bảo mật dữ liệu cá nhân được xem xét rất nghiêm túc.'
        },
        {
            id: 'v9',
            word: 'die Auswirkung (-en)',
            article: 'die',
            topic: 'Công nghệ',
            meaning: 'Tác động, hệ quả',
            exampleDe: 'Soziale Medien haben große Auswirkungen auf die Kommunikation.',
            exampleVi: 'Mạng xã hội có những tác động lớn đến việc giao tiếp.'
        },
        {
            id: 'v10',
            word: 'zuverlässig',
            article: 'adj',
            topic: 'Công nghệ',
            meaning: 'Đáng tin cậy',
            exampleDe: 'Diese Quelle gilt als besonders zuverlässig und objektiv.',
            exampleVi: 'Nguồn thông tin này được coi là đặc biệt đáng tin cậy và khách quan.'
        },

        // Chủ đề: Alltag & Kommunikation (Giao tiếp & Lập luận B2)
        {
            id: 'v11',
            word: 'der Kompromiss (-e)',
            article: 'der',
            topic: 'Giao tiếp',
            meaning: 'Sự thỏa hiệp',
            exampleDe: 'Nach langer Diskussion haben wir endlich einen Kompromiss gefunden.',
            exampleVi: 'Sau cuộc thảo luận dài, cuối cùng chúng tôi đã tìm được một sự thỏa hiệp.'
        },
        {
            id: 'v12',
            word: 'überzeugen (von + D)',
            article: 'verb',
            topic: 'Giao tiếp',
            meaning: 'Thuyết phục (ai đó về điều gì)',
            exampleDe: 'Seine Argumente konnten mich leider nicht überzeugen.',
            exampleVi: 'Những lập luận của anh ấy tiếc là không thể thuyết phục được tôi.'
        }
    ];

    let currentTopic = 'Tất cả';
    let searchQuery = '';
    let flippedIds = new Set();
    let masteredIds = new Set(JSON.parse(localStorage.getItem('ds_mastered_vocab') || '[]'));

    function getArticleStyle(article) {
        switch (article) {
            case 'der': return 'bg-sky-500/15 text-sky-500 border-sky-500/30';
            case 'die': return 'bg-rose-500/15 text-rose-500 border-rose-500/30';
            case 'das': return 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30';
            default: return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
        }
    }

    function speakGerman(text, event) {
        if (event) event.stopPropagation();
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/\s*\(.*?\)\s*/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    function toggleFlip(id) {
        if (flippedIds.has(id)) flippedIds.delete(id);
        else flippedIds.add(id);
        renderCards();
    }

    function toggleMastered(id, event) {
        if (event) event.stopPropagation();
        if (masteredIds.has(id)) masteredIds.delete(id);
        else masteredIds.add(id);
        localStorage.setItem('ds_mastered_vocab', JSON.stringify([...masteredIds]));
        renderCards();
        updateProgressUI();
    }

    function updateProgressUI() {
        const countEl = document.getElementById('vocab-mastered-count');
        if (countEl) {
            countEl.textContent = `${masteredIds.size}/${VOCAB_DATA.length} từ đã thuộc`;
        }
        // Cập nhật nhẹ thanh tiến độ ở Dashboard nếu có
        const pct = Math.min(100, Math.round((masteredIds.size / VOCAB_DATA.length) * 100));
        const bar = document.getElementById('overall-progress-bar');
        const txt = document.getElementById('overall-progress-text');
        if (bar && txt && masteredIds.size > 0) {
            bar.style.width = `${pct}%`;
            txt.textContent = `${pct}%`;
        }
    }

    function renderVocabModule() {
        const container = document.getElementById('vocab-container');
        if (!container) return;

        // Chuyển layout container sang dạng dọc để chứa thanh lọc + lưới thẻ
        container.className = 'space-y-5';

        const topics = ['Tất cả', ...new Set(VOCAB_DATA.map(v => v.topic))];

        container.innerHTML = `
            <!-- Thanh công cụ: Tìm kiếm + Tiến độ -->
            <div class="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div class="relative flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input id="vocab-search" type="text" placeholder="Tìm từ tiếng Đức hoặc nghĩa tiếng Việt..." 
                        class="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:outline-none text-sm transition" />
                </div>
                <div class="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    <i class="fa-solid fa-circle-check"></i>
                    <span id="vocab-mastered-count">${masteredIds.size}/${VOCAB_DATA.length} từ đã thuộc</span>
                </div>
            </div>

            <!-- Bộ lọc chủ đề -->
            <div id="vocab-topics" class="flex flex-wrap gap-2">
                ${topics.map(t => `
                    <button data-topic="${t}" class="topic-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
                        t === currentTopic
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    }">${t}</button>
                `).join('')}
            </div>

            <!-- Lưới thẻ Flashcard -->
            <div id="vocab-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
        `;

        // Gắn sự kiện tìm kiếm
        document.getElementById('vocab-search').addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderCards();
        });

        // Gắn sự kiện lọc chủ đề
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentTopic = btn.dataset.topic;
                document.querySelectorAll('.topic-btn').forEach(b => {
                    const active = b.dataset.topic === currentTopic;
                    b.className = `topic-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
                        active
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    }`;
                });
                renderCards();
            });
        });

        renderCards();
        updateProgressUI();
    }

    function renderCards() {
        const grid = document.getElementById('vocab-grid');
        if (!grid) return;

        const filtered = VOCAB_DATA.filter(item => {
            const matchTopic = currentTopic === 'Tất cả' || item.topic === currentTopic;
            const matchSearch = !searchQuery ||
                item.word.toLowerCase().includes(searchQuery) ||
                item.meaning.toLowerCase().includes(searchQuery);
            return matchTopic && matchSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500 text-sm">Không tìm thấy từ vựng nào phù hợp.</div>`;
            return;
        }

        grid.innerHTML = filtered.map(item => {
            const isFlipped = flippedIds.has(item.id);
            const isMastered = masteredIds.has(item.id);
            const badgeStyle = getArticleStyle(item.article);

            if (!isFlipped) {
                // MẶT TRƯỚC THẺ
                return `
                    <div onclick="window.__dsVocab.flip('${item.id}')" 
                        class="cursor-pointer group relative min-h-[190px] flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border ${isMastered ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} hover:border-indigo-500/60 shadow-sm hover:shadow-md transition-all">
                        
                        <div class="flex items-center justify-between gap-2">
                            <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-md border ${badgeStyle}">${item.topic}</span>
                            <button onclick="window.__dsVocab.speak('${item.word.replace(/'/g, "\\'")}', event)" title="Nghe phát âm"
                                class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-500 dark:text-slate-300 flex items-center justify-center transition">
                                <i class="fa-solid fa-volume-high text-xs"></i>
                            </button>
                        </div>

                        <div class="my-4 text-center">
                            <h4 class="text-xl font-bold tracking-tight group-hover:text-indigo-500 transition">${item.word}</h4>
                        </div>

                        <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <span><i class="fa-solid fa-rotate mr-1"></i>Bấm để lật xem nghĩa</span>
                            ${isMastered ? '<span class="text-emerald-500 font-semibold"><i class="fa-solid fa-check mr-1"></i>Đã thuộc</span>' : ''}
                        </div>
                    </div>
                `;
            } else {
                // MẶT SAU THẺ
                return `
                    <div onclick="window.__dsVocab.flip('${item.id}')" 
                        class="cursor-pointer relative min-h-[190px] flex flex-col justify-between p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-400/50 shadow-md transition-all">
                        
                        <div class="space-y-2">
                            <div class="flex items-start justify-between gap-2">
                                <h4 class="font-bold text-base text-indigo-600 dark:text-indigo-400">${item.meaning}</h4>
                                <button onclick="window.__dsVocab.speak('${item.exampleDe.replace(/'/g, "\\'")}', event)" title="Nghe câu ví dụ"
                                    class="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/15 hover:bg-indigo-600 hover:text-white text-indigo-500 flex items-center justify-center transition">
                                    <i class="fa-solid fa-volume-high text-xs"></i>
                                </button>
                            </div>
                            <p class="text-xs font-medium text-slate-700 dark:text-slate-200 leading-relaxed">"${item.exampleDe}"</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 italic">${item.exampleVi}</p>
                        </div>

                        <div class="flex items-center justify-between pt-3 mt-3 border-t border-indigo-200/50 dark:border-indigo-800/50">
                            <span class="text-[11px] text-slate-400"><i class="fa-solid fa-rotate mr-1"></i>Lật lại</span>
                            <button onclick="window.__dsVocab.master('${item.id}', event)" 
                                class="px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                    isMastered
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-500'
                                }">
                                <i class="fa-solid fa-check mr-1"></i>${isMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}
                            </button>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    // Export hàm cho sự kiện onclick
    window.__dsVocab = {
        flip: toggleFlip,
        speak: speakGerman,
        master: toggleMastered
    };

    // Tự chạy khi tải trang
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderVocabModule);
    } else {
        renderVocabModule();
    }
})();
