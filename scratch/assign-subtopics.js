import fs from 'fs';
import { INITIAL_DECKS } from '../data/data-registry.js';

console.log("=== BẮT ĐẦU GÁN SUBTOPIC CHO TOÀN BỘ 1.000 TỪ VỰNG ===");

const subcategoriesMap = {
  "daily-life-routines": [
    { name: "Buổi sáng", count: 45 },
    { name: "Hoạt động thường nhật", count: 50 },
    { name: "Việc nhà & Dọn dẹp", count: 45 },
    { name: "Thời gian & Lịch trình", count: 40 },
    { name: "Nhu cầu hằng ngày", count: 40 },
    { name: "Buổi tối & Giấc ngủ", count: 40 },
    { name: "Cụm từ thông dụng", count: 40 }
  ],
  "people-relationships": [
    { name: "Gia đình", count: 9 },
    { name: "Bạn bè & Xã hội", count: 8 },
    { name: "Ngoại hình", count: 8 },
    { name: "Tính cách", count: 9 },
    { name: "Mối quan hệ", count: 8 },
    { name: "Các giai đoạn cuộc đời", count: 8 }
  ],
  "communication-feelings": [
    { name: "Cảm xúc tích cực", count: 10 },
    { name: "Cảm xúc tiêu cực", count: 10 },
    { name: "Giao tiếp cơ bản", count: 10 },
    { name: "Bày tỏ ý kiến", count: 10 },
    { name: "Lời chào & Phép lịch sự", count: 10 }
  ],
  "food-drink": [
    { name: "Món ăn & Thực phẩm", count: 10 },
    { name: "Đồ uống", count: 10 },
    { name: "Nấu nướng & Chế biến", count: 10 },
    { name: "Hương vị & Cảm nhận", count: 10 },
    { name: "Ăn uống tại quán", count: 10 }
  ],
  "home-living": [
    { name: "Các phòng trong nhà", count: 10 },
    { name: "Đồ nội thất", count: 10 },
    { name: "Thiết bị gia dụng", count: 10 },
    { name: "Đồ dùng sinh hoạt", count: 10 },
    { name: "Xung quanh nhà", count: 10 }
  ],
  "health-body": [
    { name: "Bộ phận cơ thể", count: 10 },
    { name: "Triệu chứng & Bệnh", count: 10 },
    { name: "Khám chữa bệnh", count: 10 },
    { name: "Thể lực & Dinh dưỡng", count: 10 },
    { name: "Sức khỏe tinh thần", count: 10 }
  ],
  "shopping-money": [
    { name: "Địa điểm mua sắm", count: 10 },
    { name: "Tiền tệ & Thanh toán", count: 10 },
    { name: "Quần áo & Phụ kiện", count: 10 },
    { name: "Giao dịch & Giá cả", count: 10 },
    { name: "Thói quen tiêu dùng", count: 10 }
  ],
  "transport-directions": [
    { name: "Phương tiện cá nhân", count: 10 },
    { name: "Phương tiện công cộng", count: 10 },
    { name: "Hỏi đường & Phương hướng", count: 10 },
    { name: "Hạ tầng giao thông", count: 10 },
    { name: "Hành trình di chuyển", count: 10 }
  ],
  "work-jobs": [
    { name: "Nghề nghiệp phổ biến", count: 10 },
    { name: "Nơi làm việc & Thiết bị", count: 10 },
    { name: "Nhiệm vụ & Báo cáo", count: 10 },
    { name: "Họp hành & Dự án", count: 10 },
    { name: "Hợp đồng & Đãi ngộ", count: 10 }
  ],
  "education-learning": [
    { name: "Trường học & Đại học", count: 10 },
    { name: "Môn học & Ngành học", count: 10 },
    { name: "Học tập & Ôn thi", count: 10 },
    { name: "Dụng cụ học tập", count: 10 },
    { name: "Kỹ năng & Kiến thức", count: 10 }
  ],
  "travel-places": [
    { name: "Điểm đến & Du lịch", count: 10 },
    { name: "Chỗ ở & Khách sạn", count: 10 },
    { name: "Địa lý & Danh lam", count: 10 },
    { name: "Tham quan khám phá", count: 10 },
    { name: "Hành lý & Chuẩn bị", count: 10 }
  ],
  "entertainment-hobbies": [
    { name: "Âm nhạc & Nhạc cụ", count: 10 },
    { name: "Phim ảnh & Kịch", count: 10 },
    { name: "Thể thao & Rèn luyện", count: 10 },
    { name: "Trò chơi & Giải trí", count: 10 },
    { name: "Sở thích sáng tạo", count: 10 }
  ],
  "technology-internet": [
    { name: "Thiết bị & Máy tính", count: 10 },
    { name: "Internet & Mạng web", count: 10 },
    { name: "Phần mềm & Ứng dụng", count: 10 },
    { name: "Bảo mật & Dữ liệu", count: 10 },
    { name: "Công nghệ số & AI", count: 10 }
  ],
  "nature-weather": [
    { name: "Thời tiết & Khí hậu", count: 10 },
    { name: "Bốn mùa", count: 10 },
    { name: "Hiện tượng tự nhiên", count: 10 },
    { name: "Cảnh quan & Địa hình", count: 10 },
    { name: "Động thực vật & Môi trường", count: 10 }
  ],
  "society-world": [
    { name: "Cộng đồng & Xã hội", count: 10 },
    { name: "Quốc gia & Luật pháp", count: 10 },
    { name: "Văn hóa & Truyền thống", count: 10 },
    { name: "Tin tức & Truyền thông", count: 10 },
    { name: "Thế giới & Nhân loại", count: 10 }
  ]
};

for (const deck of INITIAL_DECKS) {
  const plan = subcategoriesMap[deck.id];
  if (!plan) continue;

  const subNames = plan.map(p => p.name);
  deck.subcategories = subNames;

  let currentPlanIdx = 0;
  let countInCurrent = 0;

  deck.cards.forEach((card, idx) => {
    if (countInCurrent >= plan[currentPlanIdx].count && currentPlanIdx < plan.length - 1) {
      currentPlanIdx++;
      countInCurrent = 0;
    }
    card.subtopic = plan[currentPlanIdx].name;
    countInCurrent++;
  });

  const varName = deck.id.toUpperCase().replace(/-/g, '_') + '_DECK';
  const filePath = `./data/decks/${deck.id}.js`;
  const fileContent = `/**
 * DECK: ${deck.title}
 * Giai đoạn ${deck.phase} (${deck.level}) - ${deck.cards.length} từ vựng cốt lõi
 * Phủ ${deck.subcategories.length} chủ đề con.
 */

export const ${varName} = ${JSON.stringify(deck, null, 2)};
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Đã cập nhật ${deck.id}: ${deck.cards.length} thẻ -> ${deck.subcategories.length} chủ đề con`);
}

console.log("Hoàn thành gán subtopic cho toàn bộ 15 decks!");
