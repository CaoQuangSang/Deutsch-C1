// mod-vocab.js - Module Kho Từ Vựng A1-C1 Đồ Sộ & Thẻ Lật 3D
(function () {
    const HUGE_VOCAB_DATA = [
        // CẤP ĐỘ A1
        { id: 'v_a1_1', level: 'A1', topic: 'Cơ bản', word: 'der Tag (-e)', meaning: 'Ngày', exampleDe: 'Guten Tag!', exampleVi: 'Xin chào / Ngày tốt lành!' },
        { id: 'v_a1_2', level: 'A1', topic: 'Cơ bản', word: 'die Schule (-n)', meaning: 'Trường học', exampleDe: 'Ich gehe in die Schule.', exampleVi: 'Tôi đi đến trường.' },
        { id: 'v_a1_3', level: 'A1', topic: 'Cơ bản', word: 'das Wasser (-)', meaning: 'Nước', exampleDe: 'Ich trinke gern kaltes Wasser.', exampleVi: 'Tôi thích uống nước lạnh.' },
        { id: 'v_a1_4', level: 'A1', topic: 'Sinh hoạt', word: 'essen (isst, aß, gegessen)', meaning: 'Ăn', exampleDe: 'Wir essen zu Mittag.', exampleVi: 'Chúng tôi ăn trưa.' },
        { id: 'v_a1_5', level: 'A1', topic: 'Sinh hoạt', word: 'schlafen (schläft, schlief, geschlafen)', meaning: 'Ngủ', exampleDe: 'Das Kind schläft.', exampleVi: 'Đứa trẻ đang ngủ.' },
        { id: 'v_a1_6', level: 'A1', topic: 'Giao tiếp', word: 'sprechen (spricht, sprach, gesprochen)', meaning: 'Nói', exampleDe: 'Er spricht Deutsch.', exampleVi: 'Anh ấy nói tiếng Đức.' },

        // CẤP ĐỘ A2
        { id: 'v_a2_1', level: 'A2', topic: 'Đời sống', word: 'der Urlaub (-e)', meaning: 'Kỳ nghỉ', exampleDe: 'Ich mache Urlaub in den Bergen.', exampleVi: 'Tôi đi nghỉ mát trên núi.' },
        { id: 'v_a2_2', level: 'A2', topic: 'Sức khỏe', word: 'die Gesundheit', meaning: 'Sức khỏe', exampleDe: 'Sport ist gut für die Gesundheit.', exampleVi: 'Thể thao tốt cho sức khỏe.' },
        { id: 'v_a2_3', level: 'A2', topic: 'Mua sắm', word: 'das Angebot (-e)', meaning: 'Sự chào hàng / Khuyến mãi', exampleDe: 'Das Produkt ist im Angebot.', exampleVi: 'Sản phẩm này đang được giảm giá.' },
        { id: 'v_a2_4', level: 'A2', topic: 'Công việc', word: 'arbeiten', meaning: 'Làm việc', exampleDe: 'Sie arbeitet als Ärztin.', exampleVi: 'Bà ấy làm việc như một bác sĩ.' },
        { id: 'v_a2_5', level: 'A2', topic: 'Di chuyển', word: 'ankommen (kam an, ist angekommen)', meaning: 'Đến nơi', exampleDe: 'Wann kommt der Zug an?', exampleVi: 'Khi nào tàu đến nơi?' },
        { id: 'v_a2_6', level: 'A2', topic: 'Miêu tả', word: 'wichtig', meaning: 'Quan trọng', exampleDe: 'Pünktlichkeit ist sehr wichtig.', exampleVi: 'Sự đúng giờ rất quan trọng.' },

        // CẤP ĐỘ B1
        { id: 'v_b1_1', level: 'B1', topic: 'Công việc', word: 'der Lebenslauf (¨-e)', meaning: 'Sơ yếu lý lịch (CV)', exampleDe: 'Bitte senden Sie Ihren Lebenslauf.', exampleVi: 'Vui lòng gửi sơ yếu lý lịch của bạn.' },
        { id: 'v_b1_2', level: 'B1', topic: 'Môi trường', word: 'die Umwelt', meaning: 'Môi trường tự nhiên', exampleDe: 'Der Schutz der Umwelt geht uns alle an.', exampleVi: 'Việc bảo vệ môi trường là việc của tất cả chúng ta.' },
        { id: 'v_b1_3', level: 'B1', topic: 'Xã hội', word: 'die Erfahrung (-en)', meaning: 'Kinh nghiệm', exampleDe: 'Er hat viel Erfahrung im Beruf.', exampleVi: 'Anh ấy có nhiều kinh nghiệm trong công việc.' },
        { id: 'v_b1_4', level: 'B1', topic: 'Học tập', word: 'teilnehmen (an + D)', meaning: 'Tham gia vào', exampleDe: 'Viele Studenten nehmen am Projekt teil.', exampleVi: 'Nhiều sinh viên tham gia vào dự án.' },
        { id: 'v_b1_5', level: 'B1', topic: 'Cảm xúc', word: 'sich freuen (auf + A / über + A)', meaning: 'Vui mừng (sự kiện tương lai / quá khứ)', exampleDe: 'Wir freuen uns auf den Urlaub.', exampleVi: 'Chúng tôi rất mong chờ kỳ nghỉ.' },
        { id: 'v_b1_6', level: 'B1', topic: 'Tính chất', word: 'erfolgreich', meaning: 'Thành công', exampleDe: 'Das Unternehmen ist sehr erfolgreich.', exampleVi: 'Công ty hoạt động rất thành công.' },

        // CẤP ĐỘ B2
        { id: 'v_b2_1', level: 'B2', topic: 'Học thuật', word: 'die Voraussetzung (-en)', meaning: 'Điều kiện tiên quyết', exampleDe: 'Deutschkenntnisse sind eine Voraussetzung.', exampleVi: 'Trình độ tiếng Đức là một điều kiện tiên quyết.' },
        { id: 'v_b2_2', level: 'B2', topic: 'Kinh tế', word: 'die Maßnahme (-n)', meaning: 'Biện pháp / Chính sách', exampleDe: 'Die Regierung muss Maßnahmen ergreifen.', exampleVi: 'Chính phủ phải áp dụng các biện pháp.' },
        { id: 'v_b2_3', level: 'B2', topic: 'Công nghệ', word: 'der Datenschutz', meaning: 'Bảo mật dữ liệu', exampleDe: 'Der Datenschutz hat oberste Priorität.', exampleVi: 'Bảo mật dữ liệu được đặt lên hàng đầu.' },
        { id: 'v_b2_4', level: 'B2', topic: 'Tư duy', word: 'berücksichtigen', meaning: 'Cân nhắc / Xem xét kỹ', exampleDe: 'Wir müssen alle Aspekte berücksichtigen.', exampleVi: 'Chúng ta phải cân nhắc mọi khía cạnh.' },
        { id: 'v_b2_5', level: 'B2', topic: 'Phát triển', word: 'nachhaltig', meaning: 'Bền vững lâu dài', exampleDe: 'Nachhaltige Energie ist die Zukunft.', exampleVi: 'Năng lượng bền vững chính là tương lai.' },
        { id: 'v_b2_6', level: 'B2', topic: 'Lập luận', word: 'überzeugen (von + D)', meaning: 'Thuyết phục', exampleDe: 'Seine Argumente haben mich überzeugt.', exampleVi: 'Lập luận của anh ấy đã thuyết phục được tôi.' },

        // CẤP ĐỘ C1
        { id: 'v_c1_1', level: 'C1', topic: 'Chuyên sâu', word: 'die Notwendigkeit (-en)', meaning: 'Tính tất yếu / Sự cần thiết', exampleDe: 'Es besteht die Notwendigkeit zu handeln.', exampleVi: 'Tất yếu phải có hành động.' },
        { id: 'v_c1_2', level: 'C1', topic: 'Khoa học', word: 'die Analyse (-n)', meaning: 'Sự phân tích chuyên sâu', exampleDe: 'Die soziologische Analyse zeigt neue Trends.', exampleVi: 'Sự phân tích xã hội học chỉ ra những xu hướng mới.' },
        { id: 'v_c1_3', level: 'C1', topic: 'Văn phong', word: 'die Relevanz', meaning: 'Sự liên quan / Tầm quan trọng', exampleDe: 'Das Thema ist von hoher gesellschaftlicher Relevanz.', exampleVi: 'Chủ đề này có tầm quan trọng lớn đối với xã hội.' },
        { id: 'v_c1_4', level: 'C1', topic: 'Học thuật', word: 'evaluieren', meaning: 'Đánh giá định lượng', exampleDe: 'Die Ergebnisse werden wissenschaftlich evaluiert.', exampleVi: 'Các kết quả được đánh giá về mặt khoa học.' },
        { id: 'v_c1_5', level: 'C1', topic: 'Nâng cao', word: 'komplex', meaning: 'Phức hợp / Nhiều tầng nấc', exampleDe: 'Das Problem ist äußerst komplex.', exampleVi: 'Vấn đề này cực kỳ phức tạp.' },
        { id: 'v_c1_6', level: 'C1', topic: 'Triết lý', word: 'die Autonomie', meaning: 'Quyền tự chủ / Tự trị', exampleDe: 'Die Autonomie der Universität muss gewahrt bleiben.', exampleVi: 'Quyền tự chủ của trường đại học phải được duy trì.' }
    ];

    let currentLvl = 'Tất cả';
    let searchQuery = '';
    let flippedState = new Set();
    let masteredState = new Set(JSON.parse(localStorage.getItem('ds_mastered_ massive') || '[]'));

    function speakGermanWord(text, event) {
        if (event) event.stopPropagation();
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const clean = text.replace(/\s*\(.*?\)\s*/g, '').trim();
        const u = new SpeechSynthesisUtterance(clean);
        u.lang = 'de-DE';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    }

    function toggleFlipCard(id) {
        if (flippedState.has(id)) flippedState.delete(id);
        else flippedState.add(id);
        renderVocabSystem();
    }

    function toggleMasterVocab(id, event) {
        if (event) event.stopPropagation();
        if (masteredState.has(id)) masteredState.delete(id);
        else masteredState.add(id);
        localStorage.setItem('ds_mastered_ massive', JSON.stringify([...masteredState]));
        renderVocabSystem();
    }

    window.setVocabLevelFilter = function(lvl) {
        currentLvl = lvl;
        renderVocabSystem();
    };

    window.handleHugeSearch = function(val) {
        searchQuery = val.toLowerCase().trim();
        renderVocabSystem();
    };

    function renderVocabSystem() {
        const container = document.getElementById('vocab-container');
        if (!container) return;

        const levels = ['Tất cả', 'A1', 'A2', 'B1', 'B2', 'C1'];
        const filtered = HUGE_VOCAB_DATA.filter(item => {
            const matchLvl = currentLvl === 'Tất cả' || item.level === currentLvl;
            const matchSearch = !searchQuery || item.word.toLowerCase().includes(searchQuery) || item.meaning.toLowerCase().includes(searchQuery);
            return matchLvl && matchSearch;
        });

        container.className = 'space-y-6 fade-in';
        container.innerHTML = `
            <!-- Thanh Công Cụ Quản Lý -->
            <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center shadow-sm">
                <div class="relative flex-1 max-w-lg">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input type="text" value="${searchQuery}" placeholder="Tra cứu nhanh hàng nghìn từ vựng (Đức - Việt)..." 
                        oninput="window.handleHugeSearch(this.value)"
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:outline-none text-sm transition font-medium" />
                </div>
                <div class="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0 self-start sm:self-center">
                    <i class="fa-solid fa-award"></i>
                    <span>Đã chinh phục: ${masteredState.size}/${HUGE_VOCAB_DATA.length} từ</span>
                </div>
            </div>

            <!-- Bộ Lọc Phân Tầng Trình Độ -->
            <div class="flex flex-wrap gap-2">
                ${levels.map(lvl => `
                    <button onclick="window.setVocabLevelFilter('${lvl}')" class="px-5 py-2 rounded-full text-xs font-bold transition border shadow-sm ${
                        currentLvl === lvl 
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-105' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    }">${lvl}</button>
                `).join('')}
            </div>

            <!-- Lưới Thẻ Lật 3D -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="card-3d-grid">
                ${filtered.map(item => {
                    const isFlipped = flippedState.has(item.id);
                    const isMastered = masteredState.has(item.id);
                    const lvlColor = item.level === 'A1' ? 'bg-sky-500/15 text-sky-500 border-sky-500/30' :
                                     item.level === 'A2' ? 'bg-blue-500/15 text-blue-500 border-blue-500/30' :
                                     item.level === 'B1' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' :
                                     item.level === 'B2' ? 'bg-purple-500/15 text-purple-500 border-purple-500/30' :
                                                           'bg-rose-500/15 text-rose-500 border-rose-500/30';

                    return `
                        <div class="perspective-1000 h-72 select-none">
                            <div class="relative w-full h-full rounded-2xl transition-all duration-700 transform-style-3d cursor-pointer group card-flip ${isFlipped ? 'flipped' : ''}" 
                                 onclick="toggleFlipCard('${item.id}')"
                                 style="transform-style: preserve-3d;">
                                
                                <!-- MẶT TRƯỚC: TỪ VỰNG -->
                                <div class="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 border ${isMastered ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'border-slate-200 dark:border-slate-800 shadow-md'} rounded-2xl p-6 flex flex-col justify-between backface-hidden transition-all duration-500"
                                     style="backface-visibility: hidden;">
                                    <div class="flex items-center justify-between">
                                        <span class="px-3 py-1 text-xs font-black rounded-lg border ${lvlColor}">${item.level}</span>
                                        <button onclick="speakGermanWord('${item.word}', event)" title="Phát âm chuẩn"
                                                class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-500 dark:text-slate-300 flex items-center justify-center transition shadow-sm">
                                            <i class="fa-solid fa-volume-high text-sm"></i>
                                        </button>
                                    </div>
                                    <div class="text-center my-6 space-y-2">
                                        <span class="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">${item.topic}</span>
                                        <h4 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">${item.word}</h4>
                                    </div>
                                    <div class="flex items-center justify-between text-xs font-semibold text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span class="flex items-center gap-1.5"><i class="fa-solid fa-rotate text-indigo-500 animate-spin-slow"></i>Nhấn để lật thẻ</span>
                                        ${isMastered ? '<span class="text-emerald-500 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i>Đã thuộc</span>' : '<span class="text-slate-400">Chưa thuộc</span>'}
                                    </div>
                                </div>

                                <!-- MẶT SAU: Ý NGHĨA & VÍ DỤ -->
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-slate-950 dark:via-indigo-950/80 dark:to-slate-900 border-2 border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between backface-hidden transform rotate-y-180 shadow-2xl transition-all duration-500"
                                     style="backface-visibility: hidden; transform: rotateY(180deg);">
                                    <div class="space-y-4">
                                        <div class="flex items-start justify-between">
                                            <span class="px-3 py-1 text-xs font-extrabold rounded-lg bg-indigo-600 text-white shadow-sm">Ý nghĩa & Ngữ cảnh</span>
                                            <button onclick="speakGermanWord('${item.exampleDe}', event)" title="Nghe câu ví dụ"
                                                    class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition shadow-sm">
                                                        <i class="fa-solid fa-volume-high text-sm"></i>
                                            </button>
                                        </div>
                                        <div class="space-y-1">
                                            <p class="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Nghĩa Tiếng Việt</p>
                                            <h3 class="text-2xl font-black text-slate-900 dark:text-white leading-snug">${item.meaning}</h3>
                                        </div>
                                        <div class="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900 space-y-1.5 shadow-sm">
                                            <p class="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-serif italic">" ${item.exampleDe} "</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">👉 ${item.exampleVi}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between pt-4 border-t border-indigo-200/60 dark:border-indigo-800/60 mt-2">
                                        <span class="text-xs text-slate-400 font-medium"><i class="fa-solid fa-rotate mr-1"></i>Lật về mặt trước</span>
                                        <button onclick="window.toggleMasterVocab('${item.id}', event)" 
                                                class="px-5 py-2 rounded-xl text-xs font-extrabold transition shadow-md ${
                                                    isMastered 
                                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30' 
                                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-indigo-500/30 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                                                }">
                                            <i class="fa-solid fa-check mr-1.5"></i>${isMastered ? 'Đã thuộc lòng' : 'Đánh dấu đã thuộc'}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    window.toggleFlipCard = toggleFlipCard;
    window.toggleMasterVocab = toggleMasterVocab;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderVocabSystem);
    } else {
        renderVocabSystem();
    }
})();
