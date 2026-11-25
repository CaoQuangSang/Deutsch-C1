Tiếp theo, hãy tạo file mod-grammar.js theo quy trình cũ, dán đoạn code khung quản lý lộ trình ngữ pháp dưới đây vào và bấm lưu nhé:
// mod-grammar.js - Module Ngữ pháp A0-C1

const GrammarModule = {
    topics: [
        { id: 'a1', level: 'A1', title: 'Cơ bản về phát âm và danh từ' },
        { id: 'b2', level: 'B2', title: 'Konjunktiv II và Câu điều kiện' },
        { id: 'c1', level: 'C1', title: 'Nominalisierung và Passiversatzformen' }
    ],
    init: function() {
        console.log("Grammar Module Initialized");
    }
};

GrammarModule.init();

