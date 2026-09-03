import fs from 'fs';

// Helper function to write a deck file
function writeDeckFile(filename, deckObj) {
  const content = `/**
 * DECK: ${deckObj.title}
 * Quy mô: ${deckObj.cards.length} từ vựng cốt lõi (Giai đoạn ${deckObj.phase})
 * Cấp độ: ${deckObj.level}
 */

export const ${deckObj.exportName} = ${JSON.stringify(deckObj, null, 2)};
`;
  fs.writeFileSync(`./data/decks/${filename}`, content, 'utf-8');
  console.log(`Exported ./data/decks/${filename} (${deckObj.cards.length} cards)`);
}

// -----------------------------------------------------------------------------
// 2. 👥 PEOPLE & RELATIONSHIPS (50 words)
// -----------------------------------------------------------------------------
const peopleCards = [
  { word: "Family", phonetic: "/ˈfæm.əl.i/", pos: "noun", meaning: "Gia đình", definition: "A group of one or more parents and their children living together as a unit.", example: "I spend every Sunday having dinner with my family.", exampleVi: "Tôi dành mỗi Chủ nhật để ăn tối cùng gia đình.", level: "A1" },
  { word: "Parents", phonetic: "/ˈper.ənts/", pos: "noun", meaning: "Bố mẹ, phụ huynh", definition: "A person's father and mother.", example: "My parents have been happily married for thirty years.", exampleVi: "Bố mẹ tôi đã kết hôn hạnh phúc suốt ba mươi năm.", level: "A1" },
  { word: "Sibling", phonetic: "/ˈsɪb.lɪŋ/", pos: "noun", meaning: "Anh chị em ruột", definition: "A brother or sister.", example: "Do you have any siblings, or are you an only child?", exampleVi: "Bạn có anh chị em nào không, hay là con một?", level: "A2" },
  { word: "Relative", phonetic: "/ˈrel.ə.t̬ɪv/", pos: "noun", meaning: "Họ hàng, bà con", definition: "A person connected by blood or marriage.", example: "We visit our relatives in the countryside during Tet.", exampleVi: "Chúng tôi về quê thăm họ hàng vào dịp Tết.", level: "A2" },
  { word: "Grandparents", phonetic: "/ˈɡræn.per.ənts/", pos: "noun", meaning: "Ông bà", definition: "The parents of a person's father or mother.", example: "My grandparents live in a quiet seaside town.", exampleVi: "Ông bà tôi sống tại một thị trấn biển yên bình.", level: "A1" },
  { word: "Cousin", phonetic: "/ˈkʌz.ən/", pos: "noun", meaning: "Anh chị em họ", definition: "A child of one's uncle or aunt.", example: "My cousin and I grew up playing football together.", exampleVi: "Tôi và anh họ lớn lên cùng nhau chơi đá bóng.", level: "A1" },
  { word: "Uncle", phonetic: "/ˈʌŋ.kəl/", pos: "noun", meaning: "Chú, bác, cậu", definition: "The brother of one's parent or husband of one's aunt.", example: "My uncle is a talented doctor.", exampleVi: "Chú tôi là một bác sĩ tài ba.", level: "A1" },
  { word: "Aunt", phonetic: "/ænt/", pos: "noun", meaning: "Cô, dì, thím, mợ", definition: "The sister of one's parent or wife of one's uncle.", example: "My aunt baked a strawberry cake for my birthday.", exampleVi: "Dì tôi đã nướng một chiếc bánh dâu cho sinh nhật tôi.", level: "A1" },
  { word: "Nephew", phonetic: "/ˈnef.juː/", pos: "noun", meaning: "Cháu trai (con của anh/chị/em)", definition: "A son of one's brother or sister.", example: "I bought a toy racing car for my little nephew.", exampleVi: "Tôi mua một chiếc xe đua đồ chơi cho đứa cháu trai nhỏ.", level: "A2" },
  { word: "Niece", phonetic: "/niːs/", pos: "noun", meaning: "Cháu gái (con của anh/chị/em)", definition: "A daughter of one's brother or sister.", example: "My niece loves drawing colorful pictures.", exampleVi: "Cháu gái tôi rất thích vẽ tranh nhiều màu sắc.", level: "A2" },
  { word: "Friend", phonetic: "/frend/", pos: "noun", meaning: "Bạn bè", definition: "A person with whom one has a bond of mutual affection.", example: "A true friend supports you through tough times.", exampleVi: "Một người bạn thực sự luôn ủng hộ bạn qua những lúc khó khăn.", level: "A1" },
  { word: "Best friend", phonetic: "/best frend/", pos: "noun", meaning: "Bạn thân nhất, tri kỷ", definition: "The one friend that you are closest to.", example: "Anna has been my best friend since primary school.", exampleVi: "Anna là bạn thân nhất của tôi từ thời tiểu học.", level: "A1" },
  { word: "Neighbor", phonetic: "/ˈneɪ.bɚ/", pos: "noun", meaning: "Hàng xóm, láng giềng", definition: "A person living near or next door.", example: "Our neighbors are very quiet and friendly.", exampleVi: "Hàng xóm của chúng tôi rất yên tĩnh và thân thiện.", level: "A2" },
  { word: "Colleague", phonetic: "/ˈkɑː.liːɡ/", pos: "noun", meaning: "Đồng nghiệp", definition: "A person with whom one works.", example: "I collaborate with colleagues from different teams.", exampleVi: "Tôi hợp tác với các đồng nghiệp từ nhiều nhóm khác nhau.", level: "A2" },
  { word: "Classmate", phonetic: "/ˈklæs.meɪt/", pos: "noun", meaning: "Bạn cùng lớp", definition: "A fellow member of a class at school or college.", example: "I met my old classmates at the high school reunion.", exampleVi: "Tôi đã gặp lại các bạn cùng lớp cũ tại buổi họp lớp cấp ba.", level: "A1" },
  { word: "Roommate", phonetic: "/ˈruːm.meɪt/", pos: "noun", meaning: "Bạn cùng phòng", definition: "A person occupying the same room as another.", example: "My roommate and I take turns doing the dishes.", exampleVi: "Tôi và bạn cùng phòng thay phiên nhau rửa bát.", level: "A2" },
  { word: "Acquaintance", phonetic: "/əˈkweɪn.təns/", pos: "noun", meaning: "Người quen (xã giao)", definition: "A person one knows slightly, but who is not a close friend.", example: "He has many acquaintances but only a few close friends.", exampleVi: "Anh ấy có nhiều người quen nhưng chỉ có vài người bạn thân.", level: "B1" },
  { word: "Stranger", phonetic: "/ˈstreɪn.dʒɚ/", pos: "noun", meaning: "Người lạ mặt", definition: "A person whom one does not know or with whom one is not familiar.", example: "Don't share your personal passwords with strangers.", exampleVi: "Đừng chia sẻ mật khẩu cá nhân cho người lạ.", level: "A2" },
  { word: "Partner", phonetic: "/ˈpɑːrt.nɚ/", pos: "noun", meaning: "Bạn đời, cộng sự", definition: "Either of a pair of people engaged together in business or a relationship.", example: "My business partner is extremely hardworking.", exampleVi: "Cộng sự kinh doanh của tôi cực kỳ chăm chỉ.", level: "A2" },
  { word: "Couple", phonetic: "/ˈkʌp.əl/", pos: "noun", meaning: "Cặp đôi, vợ chồng", definition: "Two people who are married or in a romantic relationship.", example: "The young couple walked hand in hand along the beach.", exampleVi: "Cặp đôi trẻ nắm tay nhau đi dọc bãi biển.", level: "A1" },
  { word: "Boyfriend", phonetic: "/ˈbɔɪˌfrend/", pos: "noun", meaning: "Bạn trai", definition: "A regular male companion with whom a person has a romantic relationship.", example: "Her boyfriend surprised her with flowers.", exampleVi: "Bạn trai cô ấy đã tạo bất ngờ với một bó hoa.", level: "A1" },
  { word: "Girlfriend", phonetic: "/ˈɡɝːlˌfrend/", pos: "noun", meaning: "Bạn gái", definition: "A regular female companion with whom a person has a romantic relationship.", example: "He introduced his girlfriend to his parents.", exampleVi: "Anh ấy đã giới thiệu bạn gái với bố mẹ mình.", level: "A1" },
  { word: "Husband", phonetic: "/ˈhʌz.bənd/", pos: "noun", meaning: "Người chồng", definition: "A married man, especially in relation to his spouse.", example: "Her husband cooked dinner tonight.", exampleVi: "Chồng cô ấy đã nấu bữa tối tối nay.", level: "A1" },
  { word: "Wife", phonetic: "/waɪf/", pos: "noun", meaning: "Người vợ", definition: "A married woman, especially in relation to her spouse.", example: "He bought a silver necklace for his wife.", exampleVi: "Anh ấy đã mua một sợi dây chuyền bạc cho vợ mình.", level: "A1" },
  { word: "Child", phonetic: "/tʃaɪld/", pos: "noun", meaning: "Đứa trẻ, con cái", definition: "A young human being below the age of puberty.", example: "Every child deserves a good education and loving home.", exampleVi: "Mọi đứa trẻ đều xứng đáng có một nền giáo dục tốt và mái ấm yêu thương.", level: "A1" },
  { word: "Adult", phonetic: "/ˈæd.ʌlt/", pos: "noun", meaning: "Người trưởng thành", definition: "A person who is fully grown or developed.", example: "Tickets cost ten dollars for adults and five for children.", exampleVi: "Vé giá mười đô la cho người lớn và năm đô la cho trẻ em.", level: "A1" },
  { word: "Teenager", phonetic: "/ˈtiːnˌeɪ.dʒɚ/", pos: "noun", meaning: "Thanh thiếu niên (13-19 tuổi)", definition: "A person aged between 13 and 19 years.", example: "Most teenagers enjoy listening to modern music.", exampleVi: "Hầu hết thanh thiếu niên đều thích nghe nhạc hiện đại.", level: "A2" },
  { word: "Elderly", phonetic: "/ˈel.dɚ.li/", pos: "adjective", meaning: "Cao tuổi, lớn tuổi (lịch sự)", definition: "Of persons or their characteristics: old or aging.", example: "Please give up your seat to elderly passengers on the bus.", exampleVi: "Vui lòng nhường ghế cho hành khách cao tuổi trên xe buýt.", level: "B1" },
  { word: "Personality", phonetic: "/ˌpɝː.sənˈæl.ə.t̬i/", pos: "noun", meaning: "Tính cách, nhân cách", definition: "The combination of characteristics that form an individual's character.", example: "She has a cheerful and outgoing personality.", exampleVi: "Cô ấy có một tính cách vui vẻ và hướng ngoại.", level: "A2" },
  { word: "Character", phonetic: "/ˈker.ək.tɚ/", pos: "noun", meaning: "Phẩm chất, tính nết", definition: "The mental and moral qualities distinctive to an individual.", example: "Honesty is an essential part of good character.", exampleVi: "Trung thực là một phần thiết yếu của nhân cách tốt.", level: "B1" },
  { word: "Appearance", phonetic: "/əˈpɪr.əns/", pos: "noun", meaning: "Ngoại hình, diện mạo", definition: "The way that someone or something looks.", example: "He takes great care of his physical appearance.", exampleVi: "Anh ấy rất chăm chút cho ngoại hình của mình.", level: "A2" },
  { word: "Tall", phonetic: "/tɑːl/", pos: "adjective", meaning: "Cao ráo", definition: "Of great or more than average height.", example: "He is tall and athletic.", exampleVi: "Anh ấy cao ráo và khỏe khoắn.", level: "A1" },
  { word: "Short", phonetic: "/ʃɔːrt/", pos: "adjective", meaning: "Thấp, lùn", definition: "Not measuring much from base to top.", example: "She has short curly hair.", exampleVi: "Cô ấy có mái tóc ngắn uốn xoăn.", level: "A1" },
  { word: "Slim", phonetic: "/slɪm/", pos: "adjective", meaning: "Mảnh mai, thon gọn", definition: "Gracefully thin; slender.", example: "She maintains a slim figure by jogging daily.", exampleVi: "Cô ấy duy trì vóc dáng thon gọn nhờ chạy bộ mỗi ngày.", level: "A2" },
  { word: "Handsome", phonetic: "/ˈhæn.səm/", pos: "adjective", meaning: "Đẹp trai", definition: "Good-looking of a man.", example: "He is a smart and handsome gentleman.", exampleVi: "Anh ấy là một quý ông thông minh và đẹp trai.", level: "A1" },
  { word: "Beautiful", phonetic: "/ˈbjuː.t̬ə.fəl/", pos: "adjective", meaning: "Xinh đẹp, tuyệt đẹp", definition: "Pleasing the senses or mind aesthetically.", example: "She has a beautiful, radiant smile.", exampleVi: "Cô ấy có một nụ cười xinh đẹp, rạng rỡ.", level: "A1" },
  { word: "Kind", phonetic: "/kaɪnd/", pos: "adjective", meaning: "Tốt bụng, nhân hậu", definition: "Having or showing a friendly, generous, and considerate nature.", example: "Thank you for your kind help today.", exampleVi: "Cảm ơn vì sự giúp đỡ tốt bụng của bạn hôm nay.", level: "A1" },
  { word: "Polite", phonetic: "/pəˈlaɪt/", pos: "adjective", meaning: "Lịch sự, lễ phép", definition: "Having or showing behavior that is respectful and considerate.", example: "It is polite to say thank you when receiving a gift.", exampleVi: "Nói lời cảm ơn khi nhận quà là hành động lịch sự.", level: "A2" },
  { word: "Honest", phonetic: "/ˈɑː.nɪst/", pos: "adjective", meaning: "Trung thực, chân thật", definition: "Free of deceit and untruthfulness; sincere.", example: "I appreciate your honest opinion about my work.", exampleVi: "Tôi rất trân trọng ý kiến trung thực của bạn về công việc của tôi.", level: "A2" },
  { word: "Generous", phonetic: "/ˈdʒen.ər.əs/", pos: "adjective", meaning: "Hào phóng, rộng lượng", definition: "Showing a readiness to give more of something than is strictly necessary.", example: "He is very generous with his time and advice.", exampleVi: "Anh ấy rất hào phóng về thời gian và lời khuyên của mình.", level: "B1" },
  { word: "Friendly", phonetic: "/ˈfrend.li/", pos: "adjective", meaning: "Thân thiện, cởi mở", definition: "Kind and pleasant.", example: "The staff at the hotel were exceptionally friendly.", exampleVi: "Nhân viên tại khách sạn cực kỳ thân thiện.", level: "A1" },
  { word: "Funny", phonetic: "/ˈfʌn.i/", pos: "adjective", meaning: "Hài hước, vui tính", definition: "Causing laughter or amusement; humorous.", example: "He always tells funny stories that make us laugh.", exampleVi: "Anh ấy luôn kể những câu chuyện hài hước làm chúng tôi cười.", level: "A1" },
  { word: "Smart", phonetic: "/smɑːrt/", pos: "adjective", meaning: "Thông minh, nhanh dạ", definition: "Having or showing a quick-witted intelligence.", example: "She is a smart student who learns concepts fast.", exampleVi: "Cô ấy là một học sinh thông minh, tiếp thu khái niệm rất nhanh.", level: "A1" },
  { word: "Hardworking", phonetic: "/ˌhɑːrdˈwɝː.kɪŋ/", pos: "adjective", meaning: "Chăm chỉ, cần cù", definition: "Tending to work with energy and commitment.", example: "He is the most hardworking employee on our team.", exampleVi: "Anh ấy là nhân viên chăm chỉ nhất trong nhóm chúng tôi.", level: "A2" },
  { word: "Lazy", phonetic: "/ˈleɪ.zi/", pos: "adjective", meaning: "Lười biếng", definition: "Unwilling to work or use energy.", example: "Don't be lazy; get up and do some exercise!", exampleVi: "Đừng lười biếng; hãy đứng dậy và tập thể dục một chút đi!", level: "A1" },
  { word: "Shy", phonetic: "/ʃaɪ/", pos: "adjective", meaning: "Nhút nhát, e thẹn", definition: "Being reserved, having or showing nervousness in the company of other people.", example: "He was too shy to speak in front of the whole class.", exampleVi: "Cậu ấy quá nhút nhát để phát biểu trước cả lớp.", level: "A2" },
  { word: "Outgoing", phonetic: "/ˈaʊtˌɡoʊ.ɪŋ/", pos: "adjective", meaning: "Cởi mở, hòa đồng", definition: "Friendly and socially confident.", example: "Her outgoing nature makes it easy for her to make new friends.", exampleVi: "Tính cách cởi mở giúp cô ấy dễ dàng kết bạn mới.", level: "B1" },
  { word: "Patient", phonetic: "/ˈpeɪ.ʃənt/", pos: "adjective", meaning: "Kiên nhẫn, nhẫn nại", definition: "Able to accept or tolerate delays, problems, or suffering without becoming annoyed.", example: "Teaching young kids requires a very patient attitude.", exampleVi: "Dạy trẻ nhỏ đòi hỏi một thái độ rất kiên nhẫn.", level: "A2" },
  { word: "Trust", phonetic: "/trʌst/", pos: "verb", meaning: "Tin tưởng, tín nhiệm", definition: "To believe in the reliability, truth, or ability of someone.", example: "Trust takes years to build and seconds to break.", exampleVi: "Lòng tin mất nhiều năm để xây dựng nhưng chỉ mất vài giây để đổ vỡ.", level: "A2" },
  { word: "Respect", phonetic: "/rɪˈspekt/", pos: "verb", meaning: "Tôn trọng, kính trọng", definition: "To feel or show esteem and honor for someone.", example: "We should always respect differing viewpoints.", exampleVi: "Chúng ta nên luôn tôn trọng những quan điểm khác biệt.", level: "A2" }
];

writeDeckFile('people-relationships.js', {
  id: "people-relationships",
  title: "Con người & Mối quan hệ",
  description: "Ngoại hình, tính cách, quan hệ gia đình, bạn bè và xã hội.",
  category: "Phase1",
  phase: 1,
  icon: "👥",
  color: "#6366f1",
  level: "A1 - B1",
  targetCount: 300,
  exportName: "PEOPLE_RELATIONSHIPS_DECK",
  cards: peopleCards.map((c, i) => ({ id: `pp-${String(i+1).padStart(3, '0')}`, ...c }))
});
