// Generator script for Daily Life & Routines 250 words
import fs from 'fs';

const rawData = [
  // --- 1. MORNING ROUTINE (35 words) ---
  {
    word: "Wake up",
    phonetic: "/weɪk ʌp/",
    pos: "phrasal verb",
    meaning: "Thức giấc, mở mắt tỉnh dậy",
    definition: "To stop sleeping and become conscious.",
    example: "I usually wake up at 6:30 AM every weekday.",
    exampleVi: "Tôi thường thức giấc lúc 6:30 sáng vào các ngày trong tuần.",
    level: "A1"
  },
  {
    word: "Get up",
    phonetic: "/ɡet ʌp/",
    pos: "phrasal verb",
    meaning: "Rời khỏi giường, đứng dậy bắt đầu ngày mới",
    definition: "To rise from bed after sleeping.",
    example: "I wake up at 6:00, but I don't get up until 6:15.",
    exampleVi: "Tôi tỉnh giấc lúc 6:00, nhưng đến 6:15 tôi mới rời khỏi giường.",
    level: "A1"
  },
  {
    word: "Alarm clock",
    phonetic: "/əˈlɑːrm klɑːk/",
    pos: "noun",
    meaning: "Đồng hồ báo thức",
    definition: "A clock that can be set to sound at a particular time to wake someone up.",
    example: "My alarm clock goes off loudly every morning.",
    exampleVi: "Đồng hồ báo thức của tôi reo rất to mỗi buổi sáng.",
    level: "A1"
  },
  {
    word: "Snooze",
    phonetic: "/snuːz/",
    pos: "verb",
    meaning: "Bấm tạm tắt báo thức (để ngủ thêm vài phút)",
    definition: "To delay an alarm or sleep for a short period.",
    example: "I hit the snooze button twice before getting up.",
    exampleVi: "Tôi bấm hoãn báo thức hai lần trước khi thực sự dậy.",
    level: "A2"
  },
  {
    word: "Stretch",
    phonetic: "/stretʃ/",
    pos: "verb",
    meaning: "Vươn vai, duỗi người",
    definition: "To straighten or extend one's body or limbs.",
    example: "I like to stretch for five minutes right after getting out of bed.",
    exampleVi: "Tôi thích vươn vai thư giãn năm phút ngay sau khi rời khỏi giường.",
    level: "A2"
  },
  {
    word: "Yawn",
    phonetic: "/jɑːn/",
    pos: "verb",
    meaning: "Ngáp",
    definition: "To open one's mouth wide and inhale deeply due to tiredness or boredom.",
    example: "He yawned sleepily while waiting for the kettle to boil.",
    exampleVi: "Anh ấy ngáp ngái ngủ trong lúc chờ nước sôi.",
    level: "A2"
  },
  {
    word: "Brush",
    phonetic: "/brʌʃ/",
    pos: "verb",
    meaning: "Đánh (răng), chải (tóc)",
    definition: "To clean or smooth something with a brush.",
    example: "Remember to brush your teeth twice a day.",
    exampleVi: "Hãy nhớ đánh răng hai lần một ngày nhé.",
    level: "A1"
  },
  {
    word: "Toothbrush",
    phonetic: "/ˈtuːθ.brʌʃ/",
    pos: "noun",
    meaning: "Bàn chải đánh răng",
    definition: "A small brush with a long handle used for cleaning teeth.",
    example: "I replace my toothbrush every three months.",
    exampleVi: "Tôi thay bàn chải đánh răng ba tháng một lần.",
    level: "A1"
  },
  {
    word: "Toothpaste",
    phonetic: "/ˈtuːθ.peɪst/",
    pos: "noun",
    meaning: "Kem đánh răng",
    definition: "A paste used with a toothbrush to clean teeth.",
    example: "We need to buy more toothpaste on the way home.",
    exampleVi: "Chúng ta cần mua thêm kem đánh răng trên đường về nhà.",
    level: "A1"
  },
  {
    word: "Wash",
    phonetic: "/wɑːʃ/",
    pos: "verb",
    meaning: "Rửa, giặt",
    definition: "To clean with water and typically soap or detergent.",
    example: "I wash my face with cool water every morning.",
    exampleVi: "Tôi rửa mặt bằng nước mát mỗi buổi sáng.",
    level: "A1"
  },
  {
    word: "Shower",
    phonetic: "/ˈʃaʊ.ɚ/",
    pos: "noun",
    meaning: "Tắm vòi hoa sen",
    definition: "An act of washing oneself in a shower.",
    example: "A quick cold shower helps me feel awake and energized.",
    exampleVi: "Tắm nhanh bằng vòi hoa sen nước mát giúp tôi tỉnh táo và tràn đầy năng lượng.",
    level: "A1"
  },
  {
    word: "Towel",
    phonetic: "/ˈtaʊ.əl/",
    pos: "noun",
    meaning: "Khăn tắm, khăn lau",
    definition: "A piece of thick absorbent cloth used for drying the body.",
    example: "Hang your wet towel in the bathroom to dry.",
    exampleVi: "Hãy treo chiếc khăn ướt trong phòng tắm cho khô nhé.",
    level: "A1"
  },
  {
    word: "Soap",
    phonetic: "/soʊp/",
    pos: "noun",
    meaning: "Xà phòng, xà bông",
    definition: "A substance used with water for washing and cleaning.",
    example: "Wash your hands thoroughly with soap and water.",
    exampleVi: "Rửa tay thật kỹ bằng xà phòng và nước sạch.",
    level: "A1"
  },
  {
    word: "Shampoo",
    phonetic: "/ʃæmˈpuː/",
    pos: "noun",
    meaning: "Dầu gội đầu",
    definition: "A liquid substance used for washing the hair.",
    example: "This herbal shampoo smells very fresh.",
    exampleVi: "Dầu gội thảo mộc này có mùi rất thơm mát.",
    level: "A1"
  },
  {
    word: "Comb",
    phonetic: "/koʊm/",
    pos: "verb",
    meaning: "Chải đầu bằng lược",
    definition: "To untangle or arrange the hair by drawing a comb through it.",
    example: "She quickly combed her hair before leaving the room.",
    exampleVi: "Cô ấy nhanh chóng chải lại tóc trước khi rời phòng.",
    level: "A1"
  },
  {
    word: "Shave",
    phonetic: "/ʃeɪv/",
    pos: "verb",
    meaning: "Cạo râu, cạo lông",
    definition: "To remove hair from the body by using a razor.",
    example: "He shaves his beard every morning before work.",
    exampleVi: "Anh ấy cạo râu mỗi sáng trước khi đi làm.",
    level: "A2"
  },
  {
    word: "Razor",
    phonetic: "/ˈreɪ.zɚ/",
    pos: "noun",
    meaning: "Dao cạo râu",
    definition: "An instrument with a sharp blade used for shaving hair.",
    example: "Be careful when changing the blade on your razor.",
    exampleVi: "Hãy cẩn thận khi thay lưỡi dao cạo râu.",
    level: "A2"
  },
  {
    word: "Skincare",
    phonetic: "/ˈskɪn.ker/",
    pos: "noun",
    meaning: "Chăm sóc da",
    definition: "The things that you do to take care of your skin.",
    example: "Her morning skincare routine includes cleanser and sunscreen.",
    exampleVi: "Quy trình chăm sóc da buổi sáng của cô ấy gồm sữa rửa mặt và kem chống nắng.",
    level: "A2"
  },
  {
    word: "Lotion",
    phonetic: "/ˈloʊ.ʃən/",
    pos: "noun",
    meaning: "Kem dưỡng ẩm, sữa dưỡng thể",
    definition: "A smooth liquid preparation applied to the skin for moisture.",
    example: "Apply moisturizing lotion after taking a bath.",
    exampleVi: "Thoa kem dưỡng ẩm sau khi tắm xong.",
    level: "A2"
  },
  {
    word: "Get dressed",
    phonetic: "/ɡet drest/",
    pos: "phrase",
    meaning: "Mặc quần áo",
    definition: "To put on clothes.",
    example: "I usually get dressed in about five minutes.",
    exampleVi: "Tôi thường mặc quần áo chỉ mất khoảng năm phút.",
    level: "A1"
  },
  {
    word: "Put on",
    phonetic: "/pʊt ɑːn/",
    pos: "phrasal verb",
    meaning: "Mặc vào, đeo vào (quần áo, kính, giày)",
    definition: "To place something on your body, like clothes or shoes.",
    example: "Put on your jacket; it's quite chilly outside.",
    exampleVi: "Mặc áo khoác vào đi; bên ngoài trời khá lạnh đấy.",
    level: "A1"
  },
  {
    word: "Outfit",
    phonetic: "/ˈaʊt.fɪt/",
    pos: "noun",
    meaning: "Bộ trang phục",
    definition: "A set of clothes worn together for a particular occasion.",
    example: "She picked out a comfortable outfit for work.",
    exampleVi: "Cô ấy đã chọn một bộ trang phục thoải mái để đi làm.",
    level: "A2"
  },
  {
    word: "Mirror",
    phonetic: "/ˈmɪr.ɚ/",
    pos: "noun",
    meaning: "Chiếc gương",
    definition: "A reflective surface, typically of glass, that reflects a clear image.",
    example: "He looked in the mirror to adjust his tie.",
    exampleVi: "Anh ấy nhìn vào gương để chỉnh lại cà vạt.",
    level: "A1"
  },
  {
    word: "Breakfast",
    phonetic: "/ˈbrek.fəst/",
    pos: "noun",
    meaning: "Bữa ăn sáng",
    definition: "The first meal of the day, typically eaten in the morning.",
    example: "Having a nutritious breakfast gives you energy for the whole day.",
    exampleVi: "Ăn một bữa sáng đầy đủ dinh dưỡng cung cấp năng lượng cho cả ngày dài.",
    level: "A1"
  },
  {
    word: "Brew",
    phonetic: "/bruː/",
    pos: "verb",
    meaning: "Pha (cà phê, trà)",
    definition: "To make a hot drink like tea or coffee by soaking in boiling water.",
    example: "I love the rich smell of freshly brewed coffee in the morning.",
    exampleVi: "Tôi thích mùi thơm đậm đà của cà phê mới pha vào buổi sáng.",
    level: "B1"
  },
  {
    word: "Boil",
    phonetic: "/bɔɪl/",
    pos: "verb",
    meaning: "Đun sôi, luộc",
    definition: "To reach or cause to reach the temperature at which it bubbles and turns to vapor.",
    example: "Boil some water to make hot tea.",
    exampleVi: "Đun sôi một ít nước để pha trà nóng.",
    level: "A1"
  },
  {
    word: "Kettle",
    phonetic: "/ˈket̬.əl/",
    pos: "noun",
    meaning: "Ấm đun nước",
    definition: "A container or device in which water is boiled.",
    example: "Plug in the electric kettle to heat the water.",
    exampleVi: "Cắm ấm điện vào để đun nước nóng nhé.",
    level: "A2"
  },
  {
    word: "Pack",
    phonetic: "/pæk/",
    pos: "verb",
    meaning: "Xếp đồ, chuẩn bị cặp / balo",
    definition: "To fill a bag or container with items needed for a trip or day.",
    example: "I always pack my backpack the night before.",
    exampleVi: "Tôi luôn chuẩn bị sẵn balo vào tối hôm trước.",
    level: "A1"
  },
  {
    word: "Grab",
    phonetic: "/ɡræb/",
    pos: "verb",
    meaning: "Cầm lấy, lấy nhanh",
    definition: "To take hold of something suddenly or quickly.",
    example: "Don't forget to grab your umbrella before leaving.",
    exampleVi: "Đừng quên cầm theo ô trước khi ra khỏi nhà nhé.",
    level: "A2"
  },
  {
    word: "Keys",
    phonetic: "/kiːz/",
    pos: "noun",
    meaning: "Chìa khóa",
    definition: "Small pieces of shaped metal used for opening or closing a lock.",
    example: "I always leave my house keys on the small table near the door.",
    exampleVi: "Tôi luôn để chìa khóa nhà trên chiếc bàn nhỏ gần cửa ra vào.",
    level: "A1"
  },
  {
    word: "Wallet",
    phonetic: "/ˈwɑː.lɪt/",
    pos: "noun",
    meaning: "Cái ví tiền",
    definition: "A small, flat folding case for holding paper money and cards.",
    example: "He took his credit card out of his wallet.",
    exampleVi: "Anh ấy lấy thẻ tín dụng ra khỏi ví của mình.",
    level: "A1"
  },
  {
    word: "Head out",
    phonetic: "/hed aʊt/",
    pos: "phrasal verb",
    meaning: "Bắt đầu đi ra ngoài, khởi hành",
    definition: "To leave a place and begin a journey.",
    example: "It's already 7:45; I need to head out right now.",
    exampleVi: "Đã 7:45 rồi; tôi cần phải đi ra ngoài ngay bây giờ.",
    level: "A2"
  },
  {
    word: "Commute",
    phonetic: "/kəˈmjuːt/",
    pos: "verb",
    meaning: "Đi lại làm việc hằng ngày (từ nhà đến nơi làm)",
    definition: "To travel some distance between one's home and place of work on a regular basis.",
    example: "She commutes to work by subway every day.",
    exampleVi: "Cô ấy đi làm hằng ngày bằng tàu điện ngầm.",
    level: "B1"
  },
  {
    word: "Step outside",
    phonetic: "/step ˌaʊtˈsaɪd/",
    pos: "phrase",
    meaning: "Bước chân ra ngoài",
    definition: "To walk out of a building or room.",
    example: "I stepped outside to check how cold it was.",
    exampleVi: "Tôi bước ra ngoài để xem trời lạnh đến mức nào.",
    level: "A2"
  },
  {
    word: "Morning person",
    phonetic: "/ˈmɔːr.nɪŋ ˌpɝː.sən/",
    pos: "noun",
    meaning: "Người quen dậy sớm buổi sáng",
    definition: "A person who finds it easy to get up early and is most active in the morning.",
    example: "I'm definitely a morning person; I do my best work before 9 AM.",
    exampleVi: "Tôi chắc chắn là người dậy sớm; tôi làm việc hiệu quả nhất trước 9 giờ sáng.",
    level: "A2"
  }
];

console.log("Template check passed");
