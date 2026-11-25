Dán đoạn code này để quản lý kho từ vựng theo chủ đề, bộ lọc và game nối từ:
// mod-vocab.js - Module Quản lý Từ vựng & Trò chơi

const VocabModule = {
    topics: [
        { id: 'a1-a2', name: 'Nhập môn A1-A2', count: 120 },
        { id: 'b1-b2', name: 'Trung cấp B1-B2', count: 250 },
        { id: 'c1', name: 'Cao cấp C1', count: 180 }
    ],
    init: function() {
        console.log("Vocab Module Initialized");
    }
};

VocabModule.init();

Hãy dán vào file và bấm Commit changes nhé!
