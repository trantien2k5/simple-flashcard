import fs from 'fs';

// Load existing 250 cards
const existingCards = JSON.parse(fs.readFileSync('./scratch/daily-life-routines.json', 'utf-8'));

// 50 additional high-frequency Daily Life words to reach 300 words
const additional50 = [
  { word: "Charge phone", phonetic: "/tʃɑːrdʒ foʊn/", pos: "phrase", meaning: "Sạc pin điện thoại", definition: "To connect a mobile phone to a power source to restore battery energy.", example: "I always charge my phone before going to bed.", exampleVi: "Tôi luôn sạc điện thoại trước khi đi ngủ.", level: "A1" },
  { word: "Battery low", phonetic: "/ˈbæt̬.ɚ.i loʊ/", pos: "phrase", meaning: "Pin yếu, sắp hết pin", definition: "Having little remaining electrical power in a device.", example: "My phone battery is low; I need a charging cable.", exampleVi: "Điện thoại tôi sắp hết pin; tôi cần cáp sạc.", level: "A1" },
  { word: "Plug in", phonetic: "/plʌɡ ɪn/", pos: "phrasal verb", meaning: "Cắm phích điện", definition: "To connect an electrical device to an electrical socket.", example: "Plug in the laptop charger into the wall outlet.", exampleVi: "Cắm sạc laptop vào ổ cắm trên tường.", level: "A2" },
  { word: "Unplug", phonetic: "/ʌnˈplʌɡ/", pos: "verb", meaning: "Rút phích cắm điện", definition: "To disconnect an electrical device by removing its plug.", example: "Unplug the iron as soon as you finish ironing.", exampleVi: "Rút phích cắm bàn ủi ngay khi bạn ủi đồ xong.", level: "A2" },
  { word: "Check notifications", phonetic: "/tʃek ˌnoʊ.t̬ə.fəˈkeɪ.ʃənz/", pos: "phrase", meaning: "Kiểm tra thông báo điện thoại", definition: "To look at incoming messages and alerts on a device.", example: "I avoid checking notifications first thing in the morning.", exampleVi: "Tôi tránh kiểm tra thông báo việc đầu tiên vào buổi sáng.", level: "A2" },
  { word: "Freshen up", phonetic: "/ˈfreʃ.ən ʌp/", pos: "phrasal verb", meaning: "Rửa mặt tút tát lại cho sảng khoái", definition: "To wash one's face and make oneself look clean and tidy.", example: "Let me go to the restroom to freshen up.", exampleVi: "Để tôi vào nhà vệ sinh rửa mặt cho tỉnh táo một chút.", level: "B1" },
  { word: "Put on makeup", phonetic: "/pʊt ɑːn ˈmeɪk.ʌp/", pos: "phrase", meaning: "Trang điểm", definition: "To apply cosmetics to the face.", example: "She takes fifteen minutes to put on light makeup.", exampleVi: "Cô ấy mất mười lăm phút để trang điểm nhẹ nhàng.", level: "A2" },
  { word: "Take off makeup", phonetic: "/teɪk ɔːf ˈmeɪk.ʌp/", pos: "phrase", meaning: "Tẩy trang", definition: "To remove cosmetics from the face before sleeping.", example: "Always take off your makeup thoroughly before going to sleep.", exampleVi: "Luôn tẩy trang thật kỹ trước khi đi ngủ.", level: "A2" },
  { word: "Washcloth", phonetic: "/ˈwɑːʃ.klɑːθ/", pos: "noun", meaning: "Khăn mặt nhỏ", definition: "A small cloth used for washing oneself.", example: "Use a clean washcloth to gently wipe your face.", exampleVi: "Dùng khăn mặt sạch để lau nhẹ mặt.", level: "A2" },
  { word: "Gargle", phonetic: "/ˈɡɑːr.ɡəl/", pos: "verb", meaning: "Súc họng, súc miệng", definition: "To wash the mouth and throat with a liquid kept in motion by breathing through it.", example: "Gargle with warm salt water if you have a sore throat.", exampleVi: "Súc họng bằng nước muối ấm nếu bạn bị đau họng.", level: "B1" },
  { word: "Deep breath", phonetic: "/diːp breθ/", pos: "noun", meaning: "Hơi thở sâu", definition: "An inhalation taking a large amount of air into the lungs.", example: "Take a deep breath and relax your shoulders.", exampleVi: "Hít một hơi thật sâu và thả lỏng hai vai.", level: "A2" },
  { word: "Pour", phonetic: "/pɔːr/", pos: "verb", meaning: "Rót, đổ (nước, sữa, trà)", definition: "To flow or cause to flow in a stream from a container.", example: "Pour a glass of fresh milk for breakfast.", exampleVi: "Rót một ly sữa tươi cho bữa sáng.", level: "A1" },
  { word: "Sip", phonetic: "/sɪp/", pos: "verb", meaning: "Nhấp từng ngụm nhỏ", definition: "To drink by taking small mouthfuls.", example: "He sat by the window, sipping his hot tea.", exampleVi: "Anh ấy ngồi bên cửa sổ, nhâm nhi từng ngụm trà nóng.", level: "A2" },
  { word: "Slice", phonetic: "/slaɪs/", pos: "verb", meaning: "Cắt lát mỏng", definition: "To cut something into thin, broad pieces.", example: "Slice the bread and toast it lightly.", exampleVi: "Cắt lát bánh mì rồi nướng nhẹ lên.", level: "A2" },
  { word: "Spill", phonetic: "/spɪl/", pos: "verb", meaning: "Làm tràn, làm đổ (nước ra bàn)", definition: "To cause liquid to flow over the edge of its container by accident.", example: "Be careful not to spill coffee on your keyboard.", exampleVi: "Cẩn thận đừng làm đổ cà phê lên bàn phím.", level: "A2" },
  { word: "Wipe down", phonetic: "/waɪp daʊn/", pos: "phrasal verb", meaning: "Lau sạch bề mặt (bàn, quầy bếp)", definition: "To clean a surface by rubbing it with a damp cloth.", example: "Wipe down the kitchen counter after cooking.", exampleVi: "Lau sạch quầy bếp sau khi nấu ăn xong.", level: "A2" },
  { word: "Air dry", phonetic: "/er draɪ/", pos: "verb", meaning: "Phơi / để khô tự nhiên trong không khí", definition: "To dry naturally without using heat or a towel.", example: "Let the washed dishes air dry on the rack.", exampleVi: "Để bát đĩa đã rửa khô tự nhiên trên giá úp.", level: "A2" },
  { word: "Laundry basket", phonetic: "/ˈlɑːn.dri ˌbæs.kɪt/", pos: "noun", meaning: "Giỏ đựng quần áo bẩn", definition: "A container used for holding clothes waiting to be washed.", example: "Put your dirty socks directly into the laundry basket.", exampleVi: "Bỏ tất bẩn thẳng vào giỏ đựng quần áo giặt nhé.", level: "A1" },
  { word: "Clothes hanger", phonetic: "/kloʊðz ˈhæŋ.ɚ/", pos: "noun", meaning: "Móc treo quần áo", definition: "A curved piece of wood, plastic, or wire with a hook used for hanging clothes.", example: "Hang your jacket on a clothes hanger.", exampleVi: "Treo áo khoác lên móc treo quần áo.", level: "A1" },
  { word: "Ironing board", phonetic: "/ˈaɪ.ɚ.nɪŋ ˌbɔːrd/", pos: "noun", meaning: "Cầu là / bàn kê ủi quần áo", definition: "A long, narrow padded board on which clothes are ironed.", example: "Set up the ironing board near the power outlet.", exampleVi: "Dựng bàn ủi đồ gần ổ cắm điện.", level: "A2" },
  { word: "Run errands", phonetic: "/rʌn ˈer.əndz/", pos: "phrase", meaning: "Chạy việc vặt ngoài phố (đi ngân hàng, gửi bưu điện)", definition: "To go out to do routine tasks like shopping or posting mail.", example: "I have to run some errands this Saturday morning.", exampleVi: "Sáng thứ Bảy này tôi phải chạy vài việc vặt ngoài phố.", level: "B1" },
  { word: "Drop by", phonetic: "/drɑːp baɪ/", pos: "phrasal verb", meaning: "Ghé tạt qua chơi", definition: "To visit someone casually without making a formal appointment.", example: "Drop by my office if you have any questions.", exampleVi: "Ghé tạt qua văn phòng tôi nếu bạn có thắc mắc gì nhé.", level: "A2" },
  { word: "Drop off", phonetic: "/drɑːp ɔːf/", pos: "phrasal verb", meaning: "Đưa ai đó đến nơi rồi đi tiếp / giao đồ", definition: "To deliver someone or something to a destination on the way.", example: "Can you drop me off near the metro station?", exampleVi: "Bạn có thể thả tôi xuống gần ga tàu điện ngầm được không?", level: "A2" },
  { word: "Lock up", phonetic: "/lɑːk ʌp/", pos: "phrasal verb", meaning: "Khóa chặt toàn bộ cửa", definition: "To lock all doors and windows before leaving or sleeping.", example: "Make sure you lock up the house before heading out.", exampleVi: "Hãy đảm bảo bạn đã khóa chặt cửa nhà trước khi đi ra ngoài.", level: "A2" },
  { word: "Take notes", phonetic: "/teɪk noʊts/", pos: "phrase", meaning: "Ghi chép nhanh, ghi chú lại", definition: "To write down important information to remember it.", example: "Take notes during the morning briefing.", exampleVi: "Hãy ghi chép lại trong buổi họp ngắn buổi sáng.", level: "A2" },
  { word: "Look up", phonetic: "/lʊk ʌp/", pos: "phrasal verb", meaning: "Tra cứu (từ điển, thông tin)", definition: "To search for information in a book or online.", example: "Look up the new English words in a dictionary.", exampleVi: "Tra cứu các từ tiếng Anh mới trong từ điển.", level: "A2" },
  { word: "Wait in line", phonetic: "/weɪt ɪn laɪn/", pos: "phrase", meaning: "Xếp hàng đợi", definition: "To stand in a queue waiting for service.", example: "I had to wait in line for ten minutes at the bank.", exampleVi: "Tôi đã phải xếp hàng đợi mười phút ở ngân hàng.", level: "A2" },
  { word: "Make plans", phonetic: "/meɪk plænz/", pos: "phrase", meaning: "Lên kế hoạch, hẹn trước", definition: "To arrange activities for the future.", example: "Let's make plans for dinner this weekend.", exampleVi: "Chúng ta hãy lên kế hoạch đi ăn tối cuối tuần này nhé.", level: "A1" },
  { word: "Keep a diary", phonetic: "/kiːp ə ˈdaɪ.ɚ.i/", pos: "phrase", meaning: "Viết nhật ký hằng ngày", definition: "To regularly record daily events and personal thoughts.", example: "Keeping a diary helps clear your mind before bed.", exampleVi: "Viết nhật ký giúp tâm trí bạn thảnh thơi trước khi đi ngủ.", level: "A2" },
  { word: "Set a timer", phonetic: "/set ə ˈtaɪ.mɚ/", pos: "phrase", meaning: "Hẹn giờ đếm ngược", definition: "To configure a clock to alert when a time period elapses.", example: "Set a timer for 15 minutes for your study session.", exampleVi: "Hẹn giờ 15 phút cho phiên học tập của bạn.", level: "A2" },
  { word: "Trim nails", phonetic: "/trɪm neɪlz/", pos: "phrase", meaning: "Cắt tỉa móng tay móng chân", definition: "To cut the edges of one's nails neatly.", example: "I usually trim my nails after a warm bath.", exampleVi: "Tôi thường cắt móng tay sau khi tắm nước ấm.", level: "A2" },
  { word: "Splash water", phonetic: "/splæʃ ˈwɑː.t̬ɚ/", pos: "phrase", meaning: "Vỗ nước lên mặt", definition: "To throw water lightly onto the face to refresh.", example: "Splash cold water on your face to wake yourself up.", exampleVi: "Vỗ nước mát lên mặt để đánh thức bản thân tỉnh táo.", level: "A2" },
  { word: "Bath mat", phonetic: "/bæθ mæt/", pos: "noun", meaning: "Thảm chùi chân phòng tắm", definition: "A mat placed on the floor outside a bathtub or shower.", example: "Step onto the bath mat so the floor stays dry.", exampleVi: "Bước lên thảm chùi chân để sàn nhà luôn khô ráo.", level: "A2" },
  { word: "Night light", phonetic: "/ˈnaɪt ˌlaɪt/", pos: "noun", meaning: "Đèn ngủ (ánh sáng dịu)", definition: "A dim light kept on at night in a bedroom.", example: "A gentle night light helps toddlers sleep peacefully.", exampleVi: "Một chiếc đèn ngủ ánh sáng dịu giúp trẻ nhỏ ngủ ngon lành.", level: "A2" },
  { word: "Fall back asleep", phonetic: "/fɑːl bæk əˈsliːp/", pos: "phrase", meaning: "Ngủ thiếp lại sau khi tỉnh giấc", definition: "To return to sleep after waking up during the night.", example: "I woke up at 3 AM but fell back asleep easily.", exampleVi: "Tôi thức giấc lúc 3 giờ sáng nhưng dễ dàng ngủ lại ngay.", level: "B1" },
  { word: "Daily schedule", phonetic: "/ˈdeɪ.li ˈskedʒ.uːl/", pos: "noun", meaning: "Lịch trình sinh hoạt mỗi ngày", definition: "A timetable of activities for each day.", example: "Sticking to a daily schedule increases productivity.", exampleVi: "Tuân theo lịch trình hằng ngày giúp tăng năng suất.", level: "A2" },
  { word: "Productive", phonetic: "/prəˈdʌk.tɪv/", pos: "adjective", meaning: "Làm việc năng suất, hiệu quả", definition: "Achieving or producing a significant amount or result.", example: "I had a very productive morning at work.", exampleVi: "Tôi đã có một buổi sáng làm việc rất năng suất.", level: "B1" },
  { word: "Peaceful", phonetic: "/ˈpiːs.fəl/", pos: "adjective", meaning: "Yên bình, thanh thản", definition: "Free from disturbance; tranquil and serene.", example: "Early mornings are peaceful and quiet.", exampleVi: "Buổi sáng sớm thật yên bình và tĩnh lặng.", level: "A2" },
  { word: "Take a walk", phonetic: "/teɪk ə wɑːk/", pos: "phrase", meaning: "Đi dạo mát", definition: "To go for a leisurely walk for exercise or pleasure.", example: "Let's take a walk around the neighborhood after dinner.", exampleVi: "Hãy cùng đi dạo quanh xóm sau bữa tối nhé.", level: "A1" },
  { word: "Sit back", phonetic: "/sɪt bæk/", pos: "phrasal verb", meaning: "Tựa lưng thư giãn", definition: "To relax in a chair with your back supported.", example: "Sit back and enjoy a warm cup of cocoa.", exampleVi: "Hãy tựa lưng thư giãn và thưởng thức một ly cacao ấm.", level: "A2" },
  { word: "Check the weather", phonetic: "/tʃek ðə ˈweð.ɚ/", pos: "phrase", meaning: "Xem dự báo thời tiết", definition: "To look at the weather forecast before heading out.", example: "Check the weather forecast to see if you need an umbrella.", exampleVi: "Xem dự báo thời tiết xem bạn có cần mang ô không.", level: "A1" },
  { word: "Get home", phonetic: "/ɡet hoʊm/", pos: "phrase", meaning: "Về tới nhà", definition: "To arrive at one's house.", example: "What time do you usually get home from work?", exampleVi: "Bạn thường đi làm về tới nhà lúc mấy giờ?", level: "A1" },
  { word: "Turn around", phonetic: "/tɝːn əˈraʊnd/", pos: "phrasal verb", meaning: "Quay đầu lại, quay trở lại", definition: "To change direction and face the opposite way.", example: "I had to turn around because I forgot my keys.", exampleVi: "Tôi phải quay xe trở lại vì quên chìa khóa.", level: "A2" },
  { word: "Switch off", phonetic: "/swɪtʃ ɔːf/", pos: "phrasal verb", meaning: "Tắt thiết bị điện", definition: "To turn off a switch or device.", example: "Switch off the computer screen when taking a break.", exampleVi: "Tắt màn hình máy tính khi nghỉ giải lao nhé.", level: "A1" },
  { word: "Squeeze", phonetic: "/skwiːz/", pos: "verb", meaning: "Bóp, vắt (kem đánh răng, chanh)", definition: "To firmly press something with your fingers.", example: "Squeeze fresh lemon juice into your warm tea.", exampleVi: "Vắt nước chanh tươi vào tách trà ấm của bạn.", level: "A2" },
  { word: "Rinse", phonetic: "/rɪns/", pos: "verb", meaning: "Tráng qua nước sạch, súc miệng", definition: "To wash with clean water to remove soap or food particles.", example: "Rinse your mouth after brushing your teeth.", exampleVi: "Súc miệng bằng nước sạch sau khi đánh răng.", level: "A2" },
  { word: "Take off coat", phonetic: "/teɪk ɔːf koʊt/", pos: "phrase", meaning: "Cởi áo khoác ra", definition: "To remove outerwear upon entering indoors.", example: "Take off your wet coat and hang it by the door.", exampleVi: "Cởi chiếc áo khoác ướt ra và treo cạnh cửa nhé.", level: "A1" },
  { word: "Get dressed up", phonetic: "/ɡet drest ʌp/", pos: "phrase", meaning: "Diện đồ đẹp, chưng diện", definition: "To wear formal or particularly smart clothes.", example: "We got dressed up for our anniversary dinner.", exampleVi: "Chúng tôi đã diện đồ thật đẹp cho bữa tối kỷ niệm.", level: "B1" },
  { word: "Stay in", phonetic: "/steɪ ɪn/", pos: "phrasal verb", meaning: "Ở nhà nghỉ ngơi (không đi chơi ngoài)", definition: "To remain at home in the evening rather than going out.", example: "I feel like staying in and watching a movie tonight.", exampleVi: "Tối nay tôi thích ở nhà xem phim hơn là đi ra ngoài.", level: "A2" },
  { word: "Good night", phonetic: "/ɡʊd naɪt/", pos: "phrase", meaning: "Chúc ngủ ngon!", definition: "A conventional expression used when parting at night or before going to sleep.", example: "Good night! Sleep well and sweet dreams.", exampleVi: "Chúc ngủ ngon! Ngủ thật ngon và mơ đẹp nhé.", level: "A1" }
];

// Combine all 300 cards
const all300Cards = [...existingCards, ...additional50].map((card, idx) => ({
  id: `dl-${String(idx + 1).padStart(3, '0')}`,
  ...card
}));

console.log(`Total 300 cards compiled: ${all300Cards.length}`);

// Write deck file
const deckContent = `/**
 * DECK: Daily Life & Routines (Đời sống & Thói quen hằng ngày)
 * Quy mô chuẩn: 300 từ vựng nền tảng phân bố A1-A2 (ưu tiên) và B1.
 * Thuộc GIAI ĐOẠN 1 — NỀN TẢNG (FOUNDATION)
 * Phủ 7 chủ đề con:
 *  1. Morning routine
 *  2. Everyday activities
 *  3. Home activities & Chores
 *  4. Time & Schedule
 *  5. Daily needs & Shopping
 *  6. Evening & Sleep
 *  7. Common expressions
 */

export const DAILY_LIFE_ROUTINES_DECK = {
  id: "daily-life-routines",
  title: "Đời sống & Thói quen",
  description: "Thói quen buổi sáng, việc nhà, lịch trình, mua sắm và giấc ngủ hằng ngày.",
  category: "Foundation",
  phase: 1,
  icon: "🏠",
  color: "#0ea5e9",
  level: "A1 - B1",
  targetCount: 300,
  subcategories: [
    "Morning Routine",
    "Everyday Activities",
    "Home & Chores",
    "Time & Schedule",
    "Daily Needs & Shopping",
    "Evening & Sleep",
    "Common Expressions"
  ],
  cards: ${JSON.stringify(all300Cards, null, 2)}
};
`;

fs.writeFileSync('./data/decks/daily-life-routines.js', deckContent, 'utf-8');
console.log('Successfully updated ./data/decks/daily-life-routines.js with 300 cards!');
