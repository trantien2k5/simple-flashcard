import fs from 'fs';

const subcategoriesMap = {
  "daily-life-routines": [
    "Buổi sáng", "Hoạt động thường nhật", "Việc nhà", "Thời gian & Lịch trình", "Nhu cầu hằng ngày", "Buổi tối & Giấc ngủ", "Mẫu câu phổ biến"
  ],
  "people-relationships": [
    "Gia đình", "Bạn bè & Xã hội", "Ngoại hình", "Tính cách", "Mối quan hệ", "Các giai đoạn cuộc đời"
  ],
  "communication-feelings": [
    "Cảm xúc tích cực", "Cảm xúc tiêu cực", "Giao tiếp cơ bản", "Bày tỏ ý kiến", "Lời chào & Phép lịch sự"
  ],
  "food-drink": [
    "Món ăn & Thực phẩm", "Đồ uống", "Nấu nướng & Chế biến", "Hương vị & Cảm nhận", "Ăn uống tại quán"
  ],
  "home-living": [
    "Các phòng trong nhà", "Đồ nội thất", "Thiết bị gia dụng", "Đồ dùng sinh hoạt", "Xung quanh nhà"
  ],
  "health-body": [
    "Bộ phận cơ thể", "Triệu chứng & Bệnh", "Khám chữa bệnh", "Thể lực & Dinh dưỡng", "Sức khỏe tinh thần"
  ],
  "shopping-money": [
    "Địa điểm mua sắm", "Tiền tệ & Thanh toán", "Quần áo & Phụ kiện", "Giao dịch & Giá cả", "Thói quen tiêu dùng"
  ],
  "transport-directions": [
    "Phương tiện cá nhân", "Phương tiện công cộng", "Hỏi đường & Phương hướng", "Hạ tầng giao thông", "Hành trình di chuyển"
  ],
  "work-jobs": [
    "Nghề nghiệp phổ biến", "Nơi làm việc & Thiết bị", "Nhiệm vụ & Báo cáo", "Họp hành & Dự án", "Hợp đồng & Đãi ngộ"
  ],
  "education-learning": [
    "Trường học & Đại học", "Môn học & Ngành học", "Học tập & Ôn thi", "Dụng cụ học tập", "Kỹ năng & Kiến thức"
  ],
  "travel-places": [
    "Điểm đến & Du lịch", "Chỗ ở & Khách sạn", "Địa lý & Danh lam", "Tham quan khám phá", "Hành lý & Chuẩn bị"
  ],
  "entertainment-hobbies": [
    "Âm nhạc & Nhạc cụ", "Phim ảnh & Kịch", "Thể thao & Rèn luyện", "Trò chơi & Giải trí", "Sở thích sáng tạo"
  ],
  "technology-internet": [
    "Thiết bị & Máy tính", "Internet & Mạng web", "Phần mềm & Ứng dụng", "Bảo mật & Dữ liệu", "Công nghệ số & AI"
  ],
  "nature-weather": [
    "Thời tiết & Khí hậu", "Bốn mùa", "Hiện tượng tự nhiên", "Cảnh quan & Địa hình", "Động thực vật & Môi trường"
  ],
  "society-world": [
    "Cộng đồng & Xã hội", "Quốc gia & Luật pháp", "Văn hóa & Truyền thống", "Tin tức & Truyền thông", "Thế giới & Nhân loại"
  ]
};

// Update each deck file
for (const [deckId, subs] of Object.entries(subcategoriesMap)) {
  const filePath = `./data/decks/${deckId}.js`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // If not already has subcategories:
    if (!content.includes('subcategories:')) {
      const target = `"targetCount":`;
      const replacement = `"subcategories": ${JSON.stringify(subs, null, 2)},\n  "targetCount":`;
      content = content.replace(target, replacement);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${deckId} with ${subs.length} subcategories`);
    } else {
      console.log(`${deckId} already has subcategories`);
    }
  }
}
