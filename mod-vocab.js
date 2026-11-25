// mod-vocab.js - Module Kho Từ Vựng A1-C1 + Tự Động Tạo Từ Vựng Bằng Groq AI (Miễn Phí)
(function () {
    // 1. Tiêm CSS cho hiệu ứng lật thẻ 3D
    if (!document.getElementById('vocab-3d-styles')) {
        const style = document.createElement('style');
        style.id = 'vocab-3d-styles';
        style.textContent = `
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
            .card-flip.flipped { transform: rotateY(180deg); }
        `;
        document.head.appendChild(style);
    }

    // 2. Kho từ vựng nền tảng có sẵn
    const BASE_VOCAB_DATA = [
        // A1
        { id: 'v_a1_1', level: 'A1', topic: 'Cơ bản', word: 'der Tag (-e)', meaning: 'Ngày', exampleDe: 'Guten Tag!', exampleVi: 'Xin chào / Ngày tốt lành!' },
        { id: 'v_a1_2', level: 'A1', topic: 'Cơ bản', word: 'die Schule (-n)', meaning: 'Trường học', exampleDe: 'Ich gehe in die Schule.', exampleVi: 'Tôi đi đến trường.' },
        { id: 'v_a1_3', level: 'A1', topic: 'Sinh hoạt', word: 'essen (isst, aß, gegessen)', meaning: 'Ăn', exampleDe: 'Wir essen zu Mittag.', exampleVi: 'Chúng tôi ăn trưa.' },
        // A2
        { id: 'v_a2_1', level: 'A2', topic: 'Đời sống', word: 'der Urlaub (-e)', meaning: 'Kỳ nghỉ', exampleDe: 'Ich mache Urlaub in den Bergen.', exampleVi: 'Tôi đi nghỉ mát trên núi.' },
        { id: 'v_a2_2', level: 'A2', topic: 'Sức khỏe', word: 'die Gesundheit', meaning: 'Sức khỏe', exampleDe: 'Sport ist gut für die Gesundheit.', exampleVi: 'Thể thao tốt cho sức khỏe.' },
        { id: 'v_a2_3', level: 'A2', topic: 'Di chuyển', word: 'ankommen (kam an, ist angekommen)', meaning: 'Đến nơi', exampleDe: 'Wann kommt der Zug an?', exampleVi: 'Khi nào tàu đến nơi?' },
        // B1
        { id: 'v_b1_1', level: 'B1', topic: 'Công việc', word: 'der Lebenslauf (¨-e)', meaning: 'Sơ yếu lý lịch (CV)', exampleDe: 'Bitte senden Sie Ihren Lebenslauf.', exampleVi: 'Vui lòng gửi sơ yếu lý lịch của bạn.' },
        { id: 'v_b1_2', level: 'B1', topic: 'Môi trường', word: 'die Umwelt', meaning: 'Môi trường tự nhiên', exampleDe: 'Der Schutz der Umwelt geht uns alle an.', exampleVi: 'Việc bảo vệ môi trường là việc của tất cả chúng ta.' },
        { id: 'v_b1_3', level: 'B1', topic: 'Học tập', word: 'teilnehmen (an + D)', meaning: 'Tham gia vào', exampleDe: 'Viele Studenten nehmen am Projekt teil.', exampleVi: 'Nhiều sinh viên tham gia vào dự án.' },
        // B2
        { id: 'v_b2_1', level: 'B2', topic: 'Học thuật', word: 'die Voraussetzung (-en)', meaning: 'Điều kiện tiên quyết', exampleDe: 'Deutschkenntnisse sind eine Voraussetzung.', exampleVi: 'Trình độ tiếng Đức là một điều kiện tiên quyết.' },
        { id: 'v_b2_2', level: 'B2', topic: 'Kinh tế', word: 'die Maßnahme (-n)', meaning: 'Biện pháp / Chính sách', exampleDe: 'Die Regierung muss Maßnahmen ergreifen.', exampleVi: 'Chính phủ phải áp dụng các biện pháp.' },
        { id: 'v_b2_3', level: 'B2', topic: 'Tư duy', word: 'berücksichtigen', meaning: 'Cân nhắc / Xem xét kỹ', exampleDe: 'Wir müssen alle Aspekte berücksichtigen.', exampleVi: 'Chúng ta phải cân nhắc mọi khía cạnh.' },
        // C1
        { id: 'v_c1_1', level: 'C1', topic: 'Chuyên sâu', word: 'die Notwendigkeit (-en)', meaning: 'Tính tất yếu / Sự cần thiết', exampleDe: 'Es besteht die Notwendigkeit zu handeln.', exampleVi: 'Tất yếu phải có hành động.' },
        { id: 'v_c1_2', level: 'C1', topic: 'Văn phong', word: 'die Relevanz', meaning: 'Sự liên quan / Tầm quan trọng', exampleDe: 'Das Thema ist von hoher gesellschaftlicher Relevanz.', exampleVi: 'Chủ đề này có tầm quan trọng lớn đối với xã hội.' },
        { id: 'v_c1_3', level: 'C1', topic: 'Học thuật', word: 'evaluieren', meaning: 'Đánh giá định lượng', exampleDe: 'Die Ergebnisse werden wissenschaftlich evaluiert.', exampleVi: 'Các kết quả được đánh giá về mặt khoa học.' }
    ];

    // 3. State quản lý dữ liệu
    let aiVocabList = JSON.parse(localStorage.getItem('ds_ai_vocab_list') || '[]');
    let masteredState = new Set(JSON.parse(localStorage.getItem('ds_mastered_vocab') || '[]'));
    let flippedState = new Set();
    let currentLvl = 'Tất cả';
    let searchQuery = '';
    let isGeneratingAI = false;
    let aiStatusMsg = '';

    function getGroqKey() {
        return localStorage.getItem('ds_groq_api_key') || '';
    }

    function saveGroqKey(key) {
        const cleanKey = key.trim();
        localStorage.setItem('ds_groq_api_key', cleanKey);
        return cleanKey;
    }

    function getAllVocab() {
        return [...aiVocabList, ...BASE_VOCAB_DATA];
    }

    // 4. Hàm gọi Groq API (Llama 3.3 70B) để tự động sinh từ vựng
    async function generateVocabWithAI() {
        const keyInput = document.getElementById('ai-vocab-key');
        const levelInput = document.getElementById('ai-vocab-level');
        const topicInput = document.getElementById('ai-vocab-topic');
        const countInput = document.getElementById('ai-vocab-count');

        let apiKey = keyInput ? saveGroqKey(keyInput.value) : getGroqKey();
        if (!apiKey) {
            aiStatusMsg = '❌ Vui lòng nhập Groq API Key (bắt đầu bằng gsk_...) trước khi tạo từ vựng.';
            renderVocabSystem();
            return;
        }

        const level = levelInput ? levelInput.value : 'B2';
        const topic = (topicInput && topicInput.value.trim()) ? topicInput.value.trim() : 'Đời sống & Công việc ở Đức';
        const count = countInput ? parseInt(countInput.value, 10) : 8;

        const existingWords = getAllVocab().map(v => v.word).slice(0, 50).join(', ');

        isGeneratingAI = true;
        aiStatusMsg = `⏳ Groq AI đang biên soạn ${count} từ vựng trình độ ${level} chủ đề "${topic}"...`;
        renderVocabSystem();

        const prompt = `Bạn là giáo viên tiếng Đức chuyên nghiệp. Hãy tạo chính xác ${count} từ vựng tiếng Đức trình độ ${level} về chủ đề "${topic}".
Yêu cầu:
- KHÔNG trùng lặp với các từ sau: ${existingWords}
- Danh từ PHẢI kèm giống (der/die/das) và dạng số nhiều, ví dụ: "die Voraussetzung (-en)".
- Động từ mạnh/bất quy tắc ghi kèm chia cơ bản nếu cần.
- Trả về DUY NHẤT một đối tượng JSON hợp lệ theo đúng cấu trúc sau:
{
  "words": [
    {
      "word": "từ tiếng Đức",
      "meaning": "nghĩa tiếng Việt ngắn gọn, chính xác",
      "exampleDe": "1 câu ví dụ tiếng Đức tự nhiên đúng trình độ ${level}",
      "exampleVi": "dịch nghĩa tiếng Việt của câu ví dụ",
      "topic": "${topic}",
      "level": "${level}"
    }
  ]
}`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: 'You are a helpful German language teacher. Always respond with valid JSON.' },
                        { role: 'user', content: prompt }
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Lỗi kết nối Groq API');
            }

            const rawText = data.choices?.[0]?.message?.content || '{}';
            const parsed = JSON.parse(rawText);
            const wordArray = Array.isArray(parsed) ? parsed : (parsed.words || []);

            if (!Array.isArray(wordArray) || wordArray.length === 0) {
                throw new Error('AI không trả về danh sách từ vựng hợp lệ.');
            }

            const newItems = wordArray.map((item, idx) => ({
                id: 'ai_' + Date.now() + '_' + idx,
                level: item.level || level,
                topic: item.topic || topic,
                word: item.word || '',
                meaning: item.meaning || '',
                exampleDe: item.exampleDe || '',
                exampleVi: item.exampleVi || '',
                isAI: true
            })).filter(item => item.word && item.meaning);

            aiVocabList = [...newItems, ...aiVocabList];
            localStorage.setItem('ds_ai_vocab_list', JSON.stringify(aiVocabList));

            currentLvl = 'Tất cả';
            aiStatusMsg = `✅ Đã thêm thành công ${newItems.length} từ vựng mới chủ đề "${topic}"!`;
        } catch (err) {
            console.error(err);
            aiStatusMsg = `❌ Lỗi: ${err.message}`;
        } finally {
            isGeneratingAI = false;
            renderVocabSystem();
        }
    }

    // 5. Các hàm tương tác thẻ
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
        localStorage.setItem('ds_mastered_vocab', JSON.stringify([...masteredState]));
        renderVocabSystem();
    }

    function deleteAIVocab(id, event) {
        if (event) event.stopPropagation();
        aiVocabList = aiVocabList.filter(item => item.id !== id);
        localStorage.setItem('ds_ai_vocab_list', JSON.stringify(aiVocabList));
        renderVocabSystem();
    }

    window.setVocabLevelFilter = function (lvl) {
        currentLvl = lvl;
        renderVocabSystem();
    };

    window.handleHugeSearch = function (val) {
        searchQuery = val.toLowerCase().trim();
        renderVocabSystem();
    };

    window.generateVocabWithAI = generateVocabWithAI;
    window.speakGermanWord = speakGermanWord;
    window.toggleFlipCard = toggleFlipCard;
    window.toggleMasterVocab = toggleMasterVocab;
    window.deleteAIVocab = deleteAIVocab;

    // 6. Render giao diện
    function renderVocabSystem() {
        const container = document.getElementById('vocab-container');
        if (!container) return;

        const allVocab = getAllVocab();
        const levels = ['Tất cả', 'A1', 'A2', 'B1', 'B2', 'C1'];
        const filtered = allVocab.filter(item => {
            const matchLvl = currentLvl === 'Tất cả' || item.level === currentLvl;
            const matchSearch = !searchQuery ||
                item.word.toLowerCase().includes(searchQuery) ||
                item.meaning.toLowerCase().includes(searchQuery) ||
                (item.topic && item.topic.toLowerCase().includes(searchQuery));
            return matchLvl && matchSearch;
        });

        const savedKey = getGroqKey();

        container.className = 'space-y-6 fade-in';
        container.innerHTML = `
            <!-- Bảng Điều Khiển Tạo Từ Vựng Groq AI -->
            <div class="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/90 p-5 rounded-2xl border border-indigo-500/30 shadow-lg text-white space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h3 class="text-base font-extrabold flex items-center gap-2">
                            <i class="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
                            Tạo Từ Vựng Không Giới Hạn Bằng Groq AI (Miễn Phí)
                        </h3>
                        <p class="text-xs text-slate-300 mt-0.5">Tự động sinh từ vựng kèm giống, nghĩa và câu ví dụ chuẩn Đức, lưu vĩnh viễn trên máy.</p>
                    </div>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 self-start">
                        Đã tạo bằng AI: ${aiVocabList.length} từ
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div class="md:col-span-3">
                        <label class="block text-[11px] font-bold text-slate-300 mb-1">Groq API Key</label>
                        <input id="ai-vocab-key" type="password" value="${savedKey}" placeholder="Dán Key (gsk_...)"
                            class="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-indigo-400 focus:outline-none text-xs text-white" />
                    </div>
                    <div class="md:col-span-4">
                        <label class="block text-[11px] font-bold text-slate-300 mb-1">Chủ đề muốn học</label>
                        <input id="ai-vocab-topic" type="text" placeholder="VD: Phỏng vấn, Y tế, IT, Giao tiếp..."
                            class="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-indigo-400 focus:outline-none text-xs text-white" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-[11px] font-bold text-slate-300 mb-1">Trình độ</label>
                        <select id="ai-vocab-level" class="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-indigo-400 focus:outline-none text-xs text-white">
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2" selected>B2</option>
                            <option value="C1">C1</option>
                        </select>
                    </div>
                    <div class="md:col-span-1">
                        <label class="block text-[11px] font-bold text-slate-300 mb-1">Số từ</label>
                        <select id="ai-vocab-count" class="w-full px-2 py-2 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-indigo-400 focus:outline-none text-xs text-white">
                            <option value="5">5</option>
                            <option value="8" selected>8</option>
                            <option value="12">12</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <div class="md:col-span-2 flex items-end">
                        <button onclick="window.generateVocabWithAI()" ${isGeneratingAI ? 'disabled' : ''}
                            class="w-full py-2 px-3 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-md ${
                                isGeneratingAI
                                    ? 'bg-slate-600 cursor-not-allowed text-slate-300'
                                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                            }">
                            <i class="fa-solid ${isGeneratingAI ? 'fa-spinner fa-spin' : 'fa-bolt'}"></i>
                            ${isGeneratingAI ? 'Đang tạo...' : 'Tạo ngay'}
                        </button>
                    </div>
                </div>

                ${aiStatusMsg ? `<div class="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">${aiStatusMsg}</div>` : ''}
            </div>

            <!-- Thanh Tìm Kiếm & Tiến Độ -->
            <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center shadow-sm">
                <div class="relative flex-1 max-w-lg">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input type="text" value="${searchQuery}" placeholder="Tra cứu từ vựng, nghĩa hoặc chủ đề..."
                        oninput="window.handleHugeSearch(this.value)"
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:outline-none text-sm transition font-medium" />
                </div>
                <div class="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0 self-start sm:self-center">
                    <i class="fa-solid fa-award"></i>
                    <span>Đã thuộc: ${masteredState.size}/${allVocab.length} từ</span>
                </div>
            </div>

            <!-- Bộ Lọc Trình Độ -->
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
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                ${filtered.map(item => {
                    const isFlipped = flippedState.has(item.id);
                    const isMastered = masteredState.has(item.id);
                    const lvlColor = item.level === 'A1' ? 'bg-sky-500/15 text-sky-500 border-sky-500/30' :
                                     item.level === 'A2' ? 'bg-blue-500/15 text-blue-500 border-blue-500/30' :
                                     item.level === 'B1' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' :
                                     item.level === 'B2' ? 'bg-purple-500/15 text-purple-500 border-purple-500/30' :
                                                           'bg-rose-500/15 text-rose-500 border-rose-500/30';

                    const safeWord = item.word.replace(/'/g, "\\'");
                    const safeEx = item.exampleDe.replace(/'/g, "\\'");

                    return `
                        <div class="perspective-1000 h-72 select-none">
                            <div class="relative w-full h-full rounded-2xl transition-all duration-700 transform-style-3d cursor-pointer group card-flip ${isFlipped ? 'flipped' : ''}"
                                 onclick="window.toggleFlipCard('${item.id}')">

                                <!-- MẶT TRƯỚC -->
                                <div class="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 border ${isMastered ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'border-slate-200 dark:border-slate-800 shadow-md'} rounded-2xl p-6 flex flex-col justify-between backface-hidden">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <span class="px-3 py-1 text-xs font-black rounded-lg border ${lvlColor}">${item.level}</span>
                                            ${item.isAI ? '<span class="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/15 text-amber-500 border border-amber-500/30">AI</span>' : ''}
                                        </div>
                                        <div class="flex items-center gap-1.5">
                                            ${item.isAI ? `<button onclick="window.deleteAIVocab('${item.id}', event)" title="Xóa từ này" class="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center transition"><i class="fa-solid fa-trash text-xs"></i></button>` : ''}
                                            <button onclick="window.speakGermanWord('${safeWord}', event)" title="Phát âm chuẩn"
                                                    class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-500 dark:text-slate-300 flex items-center justify-center transition shadow-sm">
                                                <i class="fa-solid fa-volume-high text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="text-center my-4 space-y-2">
                                        <span class="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">${item.topic}</span>
                                        <h4 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">${item.word}</h4>
                                    </div>
                                    <div class="flex items-center justify-between text-xs font-semibold text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span class="flex items-center gap-1.5"><i class="fa-solid fa-rotate text-indigo-500"></i>Nhấn để lật thẻ</span>
                                        ${isMastered ? '<span class="text-emerald-500 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i>Đã thuộc</span>' : '<span class="text-slate-400">Chưa thuộc</span>'}
                                    </div>
                                </div>

                                <!-- MẶT SAU -->
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950/80 dark:to-slate-900 border-2 border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
                                    <div class="space-y-3">
                                        <div class="flex items-start justify-between">
                                            <span class="px-3 py-1 text-xs font-extrabold rounded-lg bg-indigo-600 text-white shadow-sm">Ý nghĩa & Ngữ cảnh</span>
                                            <button onclick="window.speakGermanWord('${safeEx}', event)" title="Nghe câu ví dụ"
                                                    class="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition">
                                                <i class="fa-solid fa-volume-high text-sm"></i>
                                            </button>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-black text-slate-900 dark:text-white leading-snug">${item.meaning}</h3>
                                        </div>
                                        <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900 space-y-1">
                                            <p class="text-xs font-bold text-emerald-600 dark:text-emerald-400 italic">"${item.exampleDe}"</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">👉 ${item.exampleVi}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between pt-3 border-t border-indigo-200/60 dark:border-indigo-800/60">
                                        <span class="text-xs text-slate-400 font-medium"><i class="fa-solid fa-rotate mr-1"></i>Lật lại</span>
                                        <button onclick="window.toggleMasterVocab('${item.id}', event)"
                                                class="px-4 py-1.5 rounded-xl text-xs font-extrabold transition shadow-md ${
                                                    isMastered
                                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                                                }">
                                            <i class="fa-solid fa-check mr-1"></i>${isMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderVocabSystem);
    } else {
        renderVocabSystem();
    }
})();
