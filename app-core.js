// app-core.js - Core logic for DeutschSprung B2 (Gemini API, Audio-Visual Feedback, State Management)

const STORAGE_KEY = 'deutschsprung_state_v1';

const AppState = {
    apiKey: '',
    currentLevel: 'B2',
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    vocabList: [
        { word: 'die Herausforderung', meaning: 'thử thách', example: 'Eine neue Sprache zu lernen ist eine große Herausforderung.', level: 'B1', mastered: false },
        { word: 'berücksichtigen', meaning: 'cân nhắc, xem xét', example: 'Wir müssen alle Faktoren berücksichtigen.', level: 'B2', mastered: false },
        { word: 'die Voraussetzung', meaning: 'điều kiện tiên quyết', example: 'Gute Deutschkenntnisse sind eine Voraussetzung für das Studium.', level: 'B2', mastered: false }
    ],
    grammarTopics: [
        { id: 'konjunktiv2', title: 'Konjunktiv II (Thức giả định)', level: 'B1-B2', completed: false, summary: 'Dùng để diễn đạt điều kiện không có thật, lời khuyên hoặc yêu cầu lịch sự.' },
        { id: 'passiv', title: 'Passiv mit Modalverben (Bị động với động từ khuyết thiếu)', level: 'B2', completed: false, summary: 'Cấu trúc: Modalverb + Partizip II + werden.' },
        { id: 'nomen_verb', title: 'Nomen-Verb-Verbindungen (Cụm danh động từ)', level: 'B2-C1', completed: false, summary: 'Các cụm từ cố định trang trọng như "eine Entscheidung treffen" hoặc "in Frage kommen".' }
    ]
};

// --- State Management ---
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            Object.assign(AppState, JSON.parse(saved));
        } catch (e) {
            console.error('Failed to parse saved state:', e);
        }
    }
    updateStreak();
    renderAll();
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
}

function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (AppState.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        AppState.streak = (AppState.lastActiveDate === yesterday) ? AppState.streak + 1 : 1;
        AppState.lastActiveDate = today;
        saveState();
    }
}

function addXP(points) {
    AppState.xp += points;
    saveState();
    playFeedbackSound('success');
    showToast(`+${points} XP! Tổng: ${AppState.xp} XP`, 'success');
    renderDashboard();
}

// --- Audio-Visual Feedback ---
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playFeedbackSound(type) {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    }
}

function speakGerman(text) {
    if (!('speechSynthesis' in window)) {
        showToast('Trình duyệt không hỗ trợ phát âm.', 'error');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }

    const colors = {
        success: 'bg-emerald-600 border-emerald-400',
        error: 'bg-rose-600 border-rose-400',
        info: 'bg-slate-700 border-slate-500'
    };

    const toast = document.createElement('div');
    toast.className = `${colors[type] || colors.info} border text-white px-4 py-2 rounded shadow-lg text-sm transition-opacity duration-300`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Gemini API Integration ---
async function callGemini(prompt, systemInstruction = "Bạn là gia sư tiếng Đức trình độ C2 hỗ trợ học viên Việt Nam học B2. Trả lời ngắn gọn, chính xác, giải thích bằng tiếng Việt kèm ví dụ tiếng Đức.") {
    if (!AppState.apiKey) {
        const key = prompt('Nhập Gemini API Key của bạn để kích hoạt AI:');
        if (!key) {
            showToast('Cần có Gemini API Key để dùng tính năng này.', 'error');
            return null;
        }
        AppState.apiKey = key.trim();
        saveState();
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${AppState.apiKey}`;
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7 }
            })
        });

        if (!response.ok) {
            if (response.status === 400 || response.status === 403) {
                AppState.apiKey = '';
                saveState();
                throw new Error('API Key không hợp lệ hoặc đã hết hạn.');
            }
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI.';
    } catch (error) {
        playFeedbackSound('error');
        showToast(error.message, 'error');
        return null;
    }
}

async function generateAIVocab(topic = 'Công việc và Sự nghiệp') {
    showToast('AI đang tạo từ vựng mới...', 'info');
    const prompt = `Tạo 3 từ vựng tiếng Đức trình độ B2 chủ đề "${topic}". Trả về ĐÚNG định dạng JSON array (không markdown, không giải thích thêm): [{"word": "từ kèm mạo từ nếu là danh từ", "meaning": "nghĩa tiếng Việt", "example": "câu ví dụ tiếng Đức", "level": "B2"}]`;
    
    const result = await callGemini(prompt, "Chỉ xuất dữ liệu JSON hợp lệ.");
    if (!result) return;

    try {
        const cleanJson = result.replace(/```json|```/g, '').trim();
        const newWords = JSON.parse(cleanJson);
        newWords.forEach(w => {
            w.mastered = false;
            AppState.vocabList.unshift(w);
        });
        saveState();
        renderVocab();
        addXP(15);
    } catch (e) {
        console.error('JSON Parse Error:', result);
        showToast('Lỗi xử lý dữ liệu từ AI. Vui lòng thử lại.', 'error');
    }
}

async function explainGrammarWithAI(topicTitle) {
    const outputEl = document.getElementById('ai-grammar-output');
    if (outputEl) outputEl.innerHTML = '<p class="text-amber-400 animate-pulse">AI đang phân tích ngữ pháp...</p>';

    const prompt = `Giải thích chi tiết ngữ pháp tiếng Đức "${topicTitle}" cho trình độ B2. Gồm: 1. Cách dùng, 2. Công thức, 3. 3 ví dụ thực tế kèm dịch nghĩa, 4. Lỗi sai thường gặp.`;
    const response = await callGemini(prompt);
    
    if (response && outputEl) {
        outputEl.innerHTML = `<div class="p-4 bg-slate-800 border border-slate-600 rounded mt-3 whitespace-pre-line text-sm leading-relaxed">${response}</div>`;
        addXP(10);
    }
}

// --- UI Rendering ---
function renderDashboard() {
    const dash = document.getElementById('dashboard');
    if (!dash) return;
    dash.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <p class="text-slate-400 text-sm">Trình độ mục tiêu</p>
                <p class="text-2xl font-bold text-amber-400">${AppState.currentLevel}</p>
            </div>
            <div class="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <p class="text-slate-400 text-sm">Điểm kinh nghiệm (XP)</p>
                <p class="text-2xl font-bold text-emerald-400">${AppState.xp} XP</p>
            </div>
            <div class="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <p class="text-slate-400 text-sm">Chuỗi ngày học</p>
                <p class="text-2xl font-bold text-rose-400">${AppState.streak} ngày</p>
            </div>
        </div>
        <div class="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-wrap gap-3 items-center justify-between">
            <div>
                <h3 class="font-semibold text-lg">Cấu hình AI & Dữ liệu</h3>
                <p class="text-sm text-slate-400">Trạng thái API Key: ${AppState.apiKey ? '<span class="text-emerald-400">Đã lưu</span>' : '<span class="text-amber-400">Chưa nhập</span>'}</p>
            </div>
            <div class="space-x-2">
                <button onclick="resetApiKey()" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm">Đổi API Key</button>
                <button onclick="generateAIVocab()" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded text-sm">+ Tạo từ vựng AI</button>
            </div>
        </div>
    `;
}

function renderVocab() {
    const container = document.getElementById('vocab-container');
    if (!container) return;
    container.innerHTML = AppState.vocabList.map((item, idx) => `
        <div class="bg-slate-800 p-4 rounded-lg border ${item.mastered ? 'border-emerald-600/50' : 'border-slate-700'} flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-bold text-amber-400">${item.word}</h3>
                    <button onclick="speakGerman('${item.word.replace(/'/g, "\\'")}')" class="text-slate-400 hover:text-white p-1" title="Nghe phát âm">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <p class="text-slate-200 font-medium mt-1">${item.meaning}</p>
                <p class="text-sm text-slate-400 italic mt-2">"${item.example}"</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center">
                <span class="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">${item.level}</span>
                <button onclick="toggleMastered(${idx})" class="text-xs px-2.5 py-1 rounded ${item.mastered ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}">
                    ${item.mastered ? '✓ Đã thuộc' : 'Đánh dấu đã thuộc'}
                </button>
            </div>
        </div>
    `).join('');
}

function renderGrammar() {
    const container = document.getElementById('grammar-container');
    if (!container) return;
    container.innerHTML = AppState.grammarTopics.map(topic => `
        <div class="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-xs font-semibold text-amber-400">${topic.level}</span>
                    <h3 class="text-lg font-semibold">${topic.title}</h3>
                </div>
                <button onclick="explainGrammarWithAI('${topic.title.replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-sm">
                    AI Giải thích chi tiết
                </button>
            </div>
            <p class="text-sm text-slate-300 mt-2">${topic.summary}</p>
        </div>
    `).join('') + `<div id="ai-grammar-output"></div>`;
}

function toggleMastered(index) {
    AppState.vocabList[index].mastered = !AppState.vocabList[index].mastered;
    if (AppState.vocabList[index].mastered) addXP(5);
    saveState();
    renderVocab();
}

function resetApiKey() {
    AppState.apiKey = '';
    saveState();
    callGemini('Xin chào');
    renderDashboard();
}

function renderAll() {
    renderDashboard();
    renderVocab();
    renderGrammar();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadState);
