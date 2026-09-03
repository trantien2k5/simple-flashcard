import fs from 'fs';

// Helper to write a deck file
function createDeckFile(filename, deckVarName, deckObj) {
  const content = `/**
 * DECK: ${deckObj.title}
 * Giai đoạn ${deckObj.phase} (${deckObj.level}) - ${deckObj.cards.length} từ vựng cốt lõi
 */

export const ${deckVarName} = ${JSON.stringify(deckObj, null, 2)};
`;
  fs.writeFileSync(`./data/decks/${filename}`, content, 'utf-8');
  console.log(`Created ./data/decks/${filename} (${deckObj.cards.length} cards)`);
}

// =============================================================================
// TOPIC 2: 👥 CON NGƯỜI & MỐI QUAN HỆ (PEOPLE & RELATIONSHIPS) - 50 CARDS
// =============================================================================
const topic2Cards = [
  { word: "Family", phonetic: "/ˈfæm.əl.i/", pos: "noun", meaning: "Gia đình", definition: "A group of people related by blood or marriage.", example: "I have dinner with my family every Sunday.", exampleVi: "Tôi ăn tối cùng gia đình mỗi Chủ nhật.", level: "A1" },
  { word: "Parents", phonetic: "/ˈper.ənts/", pos: "noun", meaning: "Bố mẹ, cha mẹ", definition: "A person's father and mother.", example: "My parents are very supportive of my studies.", exampleVi: "Bố mẹ tôi rất ủng hộ việc học của tôi.", level: "A1" },
  { word: "Sibling", phonetic: "/ˈsɪb.lɪŋ/", pos: "noun", meaning: "Anh chị em ruột", definition: "A brother or sister.", example: "I have two siblings, one older brother and a younger sister.", exampleVi: "Tôi có hai anh chị em, một anh trai và một em gái.", level: "A2" },
  { word: "Relative", phonetic: "/ˈrel.ə.t̬ɪv/", pos: "noun", meaning: "Họ hàng, bà con", definition: "A person connected by blood or marriage.", example: "All our relatives gathered for the holiday feast.", exampleVi: "Tất cả họ hàng đã tề tựu đông đủ cho bữa tiệc ngày lễ.", level: "A2" },
  { word: "Grandparents", phonetic: "/ˈɡræn.per.ənts/", pos: "noun", meaning: "Ông bà", definition: "The parents of your father or mother.", example: "We visit our grandparents in the countryside every summer.", exampleVi: "Chúng tôi về quê thăm ông bà vào mỗi mùa hè.", level: "A1" },
  { word: "Cousin", phonetic: "/ˈkʌz.ən/", pos: "noun", meaning: "Anh chị em họ", definition: "A child of your uncle or aunt.", example: "My cousin lives in Tokyo.", exampleVi: "Anh họ tôi đang sống tại Tokyo.", level: "A1" },
  { word: "Uncle", phonetic: "/ˈʌŋ.kəl/", pos: "noun", meaning: "Chú, bác, cậu", definition: "The brother of one's father or mother.", example: "My uncle is a talented architect.", exampleVi: "Chú tôi là một kiến trúc sư tài ba.", level: "A1" },
  { word: "Aunt", phonetic: "/ænt/", pos: "noun", meaning: "Cô, dì, bác gái, thím", definition: "The sister of one's father or mother.", example: "My aunt taught me how to make apple pie.", exampleVi: "Dì tôi đã dạy tôi cách làm bánh táo.", level: "A1" },
  { word: "Nephew", phonetic: "/ˈnef.juː/", pos: "noun", meaning: "Cháu trai (con của anh/chị/em)", definition: "A son of one's brother or sister.", example: "I bought a robot toy for my nephew.", exampleVi: "Tôi đã mua một món đồ chơi robot cho cháu trai.", level: "A2" },
  { word: "Niece", phonetic: "/niːs/", pos: "noun", meaning: "Cháu gái (con của anh/chị/em)", definition: "A daughter of one's brother or sister.", example: "My niece loves painting watercolor pictures.", exampleVi: "Cháu gái tôi rất thích vẽ tranh màu nước.", level: "A2" },
  { word: "Friend", phonetic: "/frend/", pos: "noun", meaning: "Bạn bè", definition: "A person whom one knows and with whom one has a bond of mutual affection.", example: "She is one of my closest friends.", exampleVi: "Cô ấy là một trong những người bạn thân nhất của tôi.", level: "A1" },
  { word: "Best friend", phonetic: "/best frend/", pos: "noun", meaning: "Bạn thân nhất", definition: "The closest friend you have.", example: "We have been best friends since high school.", exampleVi: "Chúng tôi là bạn thân nhất từ thời cấp ba.", level: "A1" },
  { word: "Neighbor", phonetic: "/ˈneɪ.bɚ/", pos: "noun", meaning: "Hàng xóm", definition: "A person living near or next door.", example: "Our neighbors are very helpful and polite.", exampleVi: "Hàng xóm của chúng tôi rất hay giúp đỡ và lịch sự.", level: "A2" },
  { word: "Colleague", phonetic: "/ˈkɑː.liːɡ/", pos: "noun", meaning: "Đồng nghiệp", definition: "A person with whom one works.", example: "I have great respect for all my colleagues.", exampleVi: "Tôi rất tôn trọng tất cả các đồng nghiệp của mình.", level: "A2" },
  { word: "Classmate", phonetic: "/ˈklæs.meɪt/", pos: "noun", meaning: "Bạn cùng lớp", definition: "A member of the same class at school or college.", example: "My classmates and I formed a study group.", exampleVi: "Tôi và các bạn cùng lớp đã lập một nhóm học tập.", level: "A1" },
  { word: "Roommate", phonetic: "/ˈruːm.meɪt/", pos: "noun", meaning: "Bạn cùng phòng", definition: "A person occupying the same room or apartment as another.", example: "My roommate always keeps the apartment clean.", exampleVi: "Bạn cùng phòng của tôi luôn giữ căn hộ sạch sẽ.", level: "A2" },
  { word: "Acquaintance", phonetic: "/əˈkweɪn.təns/", pos: "noun", meaning: "Người quen xã giao", definition: "A person one knows slightly, but who is not a close friend.", example: "He is just a casual acquaintance.", exampleVi: "Anh ấy chỉ là một người quen xã giao.", level: "B1" },
  { word: "Stranger", phonetic: "/ˈstreɪn.dʒɚ/", pos: "noun", meaning: "Người lạ mặt", definition: "A person whom one does not know.", example: "Never accept rides from strangers.", exampleVi: "Không bao giờ đi nhờ xe người lạ.", level: "A2" },
  { word: "Partner", phonetic: "/ˈpɑːrt.nɚ/", pos: "noun", meaning: "Bạn đời, cộng sự", definition: "A person with whom one shares a continuous relationship.", example: "She is my life partner and best supporter.", exampleVi: "Cô ấy là bạn đời và người ủng hộ tuyệt vời nhất của tôi.", level: "A2" },
  { word: "Couple", phonetic: "/ˈkʌp.əl/", pos: "noun", meaning: "Cặp đôi, vợ chồng", definition: "Two people who are married or in a relationship.", example: "The newlywed couple went to Italy for their honeymoon.", exampleVi: "Cặp đôi mới cưới đã đến Ý để hưởng tuần trăng mật.", level: "A1" },
  { word: "Boyfriend", phonetic: "/ˈbɔɪˌfrend/", pos: "noun", meaning: "Bạn trai", definition: "A regular male romantic partner.", example: "She and her boyfriend met at university.", exampleVi: "Cô ấy và bạn trai quen nhau ở trường đại học.", level: "A1" },
  { word: "Girlfriend", phonetic: "/ˈɡɝːlˌfrend/", pos: "noun", meaning: "Bạn gái", definition: "A regular female romantic partner.", example: "He planned a special dinner for his girlfriend.", exampleVi: "Anh ấy đã lên kế hoạch cho một bữa tối đặc biệt dành cho bạn gái.", level: "A1" },
  { word: "Husband", phonetic: "/ˈhʌz.bənd/", pos: "noun", meaning: "Người chồng", definition: "A married man in relation to his spouse.", example: "Her husband is cooking dinner tonight.", exampleVi: "Chồng cô ấy đang nấu bữa tối đêm nay.", level: "A1" },
  { word: "Wife", phonetic: "/waɪf/", pos: "noun", meaning: "Người vợ", definition: "A married woman in relation to her spouse.", example: "He and his wife love traveling together.", exampleVi: "Anh ấy và vợ rất thích đi du lịch cùng nhau.", level: "A1" },
  { word: "Child", phonetic: "/tʃaɪld/", pos: "noun", meaning: "Đứa trẻ, con cái", definition: "A young human being below the age of puberty.", example: "Every child loves playing in the park.", exampleVi: "Mọi đứa trẻ đều thích chơi đùa trong công viên.", level: "A1" },
  { word: "Adult", phonetic: "/ˈæd.ʌlt/", pos: "noun", meaning: "Người lớn, người trưởng thành", definition: "A person who is fully grown.", example: "Adults need seven to eight hours of sleep per night.", exampleVi: "Người lớn cần ngủ từ 7 đến 8 tiếng mỗi đêm.", level: "A1" },
  { word: "Teenager", phonetic: "/ˈtiːnˌeɪ.dʒɚ/", pos: "noun", meaning: "Thiếu niên (13-19 tuổi)", definition: "A person aged between 13 and 19.", example: "As a teenager, I enjoyed playing video games.", exampleVi: "Khi còn là một thiếu niên, tôi rất thích chơi điện tử.", level: "A2" },
  { word: "Elderly", phonetic: "/ˈel.dɚ.li/", pos: "adjective", meaning: "Lớn tuổi, cao niên", definition: "Polite word for old persons.", example: "We should offer seats to elderly passengers on the train.", exampleVi: "Chúng ta nên nhường ghế cho hành khách lớn tuổi trên tàu.", level: "B1" },
  { word: "Personality", phonetic: "/ˌpɝː.sənˈæl.ə.t̬i/", pos: "noun", meaning: "Tính cách, nhân cách", definition: "The unique combination of traits in an individual.", example: "Her cheerful personality brightens the entire room.", exampleVi: "Tính cách vui vẻ của cô ấy làm bừng sáng cả căn phòng.", level: "A2" },
  { word: "Character", phonetic: "/ˈker.ək.tɚ/", pos: "noun", meaning: "Phẩm chất, tính cách cốt lõi", definition: "Mental and moral qualities distinctive to an individual.", example: "Adversity reveals a person's true character.", exampleVi: "Nghịch cảnh bộc lộ phẩm chất thực sự của một con người.", level: "B1" },
  { word: "Appearance", phonetic: "/əˈpɪr.əns/", pos: "noun", meaning: "Ngoại hình, diện mạo", definition: "The way someone looks on the outside.", example: "She always maintains a neat and tidy appearance.", exampleVi: "Cô ấy luôn giữ diện mạo gọn gàng và tươm tất.", level: "A2" },
  { word: "Tall", phonetic: "/tɑːl/", pos: "adjective", meaning: "Cao", definition: "Of great height.", example: "He is taller than his older brother.", exampleVi: "Anh ấy cao hơn cả anh trai mình.", level: "A1" },
  { word: "Short", phonetic: "/ʃɔːrt/", pos: "adjective", meaning: "Thấp, lùn", definition: "Measuring a small distance from bottom to top.", example: "She has short brown hair and blue eyes.", exampleVi: "Cô ấy có mái tóc ngắn màu nâu và đôi mắt xanh.", level: "A1" },
  { word: "Slim", phonetic: "/slɪm/", pos: "adjective", meaning: "Thon thả, mảnh mai", definition: "Attractively thin.", example: "Exercise regularly to stay healthy and slim.", exampleVi: "Tập thể dục thường xuyên để khỏe mạnh và thon gọn.", level: "A2" },
  { word: "Handsome", phonetic: "/ˈhæn.səm/", pos: "adjective", meaning: "Đẹp trai", definition: "Good-looking of a man.", example: "He looked very handsome in his dark suit.", exampleVi: "Anh ấy trông rất đẹp trai trong bộ vest tối màu.", level: "A1" },
  { word: "Beautiful", phonetic: "/ˈbjuː.t̬ə.fəl/", pos: "adjective", meaning: "Xinh đẹp", definition: "Pleasing to look at.", example: "She wore a beautiful evening dress.", exampleVi: "Cô ấy đã mặc một chiếc váy dạ hội tuyệt đẹp.", level: "A1" },
  { word: "Kind", phonetic: "/kaɪnd/", pos: "adjective", meaning: "Tốt bụng, nhân hậu", definition: "Having a friendly and generous nature.", example: "He was kind enough to carry my heavy bags.", exampleVi: "Anh ấy đã rất tốt bụng khi xách hộ túi đồ nặng cho tôi.", level: "A1" },
  { word: "Polite", phonetic: "/pəˈlaɪt/", pos: "adjective", meaning: "Lịch sự, lễ phép", definition: "Having good manners and showing respect.", example: "Always speak in a polite tone to customers.", exampleVi: "Luôn nói chuyện với khách hàng bằng giọng điệu lịch sự.", level: "A2" },
  { word: "Honest", phonetic: "/ˈɑː.nɪst/", pos: "adjective", meaning: "Trung thực, thật thà", definition: "Truthful and sincere.", example: "Thank you for giving me an honest answer.", exampleVi: "Cảm ơn bạn đã cho tôi một câu trả lời trung thực.", level: "A2" },
  { word: "Generous", phonetic: "/ˈdʒen.ər.əs/", pos: "adjective", meaning: "Hào phóng, rộng lượng", definition: "Willing to give and share freely.", example: "He made a generous donation to the charity.", exampleVi: "Anh ấy đã quyên góp một khoản hào phóng cho quỹ từ thiện.", level: "B1" },
  { word: "Friendly", phonetic: "/ˈfrend.li/", pos: "adjective", meaning: "Thân thiện, niềm nở", definition: "Kind and pleasant toward others.", example: "The people in this town are exceptionally friendly.", exampleVi: "Người dân ở thị trấn này đặc biệt thân thiện.", level: "A1" },
  { word: "Funny", phonetic: "/ˈfʌn.i/", pos: "adjective", meaning: "Hài hước, vui tính", definition: "Causing laughter and amusement.", example: "He tells funny jokes that everyone loves.", exampleVi: "Anh ấy kể những câu chuyện hài hước mà ai cũng thích.", level: "A1" },
  { word: "Smart", phonetic: "/smɑːrt/", pos: "adjective", meaning: "Thông minh", definition: "Intelligent and quick at learning.", example: "She found a smart solution to the problem.", exampleVi: "Cô ấy đã tìm ra một giải pháp thông minh cho vấn đề.", level: "A1" },
  { word: "Hardworking", phonetic: "/ˌhɑːrdˈwɝː.kɪŋ/", pos: "adjective", meaning: "Chăm chỉ", definition: "Putting a lot of effort and care into work.", example: "Hardworking students achieve great results.", exampleVi: "Những học sinh chăm chỉ đạt được kết quả tuyệt vời.", level: "A2" },
  { word: "Lazy", phonetic: "/ˈleɪ.zi/", pos: "adjective", meaning: "Lười biếng", definition: "Unwilling to work or be active.", example: "Don't be lazy on a sunny Sunday morning.", exampleVi: "Đừng lười biếng vào một buổi sáng Chủ nhật đầy nắng.", level: "A1" },
  { word: "Shy", phonetic: "/ʃaɪ/", pos: "adjective", meaning: "Nhút nhát", definition: "Nervous and timid in social situations.", example: "The little boy was too shy to say hello.", exampleVi: "Cậu bé quá nhút nhát để nói lời chào.", level: "A2" },
  { word: "Outgoing", phonetic: "/ˈaʊtˌɡoʊ.ɪŋ/", pos: "adjective", meaning: "Cởi mở, hướng ngoại", definition: "Friendly and socially confident.", example: "Her outgoing personality makes her popular.", exampleVi: "Tính cách hướng ngoại giúp cô ấy được nhiều người yêu mến.", level: "B1" },
  { word: "Patient", phonetic: "/ˈpeɪ.ʃənt/", pos: "adjective", meaning: "Kiên nhẫn", definition: "Able to wait calmly without getting annoyed.", example: "Be patient; good things take time.", exampleVi: "Hãy kiên nhẫn; những điều tốt đẹp cần có thời gian.", level: "A2" },
  { word: "Trust", phonetic: "/trʌst/", pos: "verb", meaning: "Tin tưởng", definition: "To believe in the reliability or truth of someone.", example: "I trust her completely with my private secrets.", exampleVi: "Tôi hoàn toàn tin tưởng cô ấy với những bí mật riêng tư của mình.", level: "A2" },
  { word: "Respect", phonetic: "/rɪˈspekt/", pos: "verb", meaning: "Tôn trọng", definition: "To admire someone deeply for their qualities or achievements.", example: "Mutual respect is vital in any relationship.", exampleVi: "Sự tôn trọng lẫn nhau là điều tối quan trọng trong mọi mối quan hệ.", level: "A2" }
];

createDeckFile('people-relationships.js', 'PEOPLE_RELATIONSHIPS_DECK', {
  id: "people-relationships",
  title: "Con người & Mối quan hệ",
  description: "Ngoại hình, tính cách, quan hệ gia đình, bạn bè và xã hội.",
  category: "Phase1",
  phase: 1,
  icon: "👥",
  color: "#6366f1",
  level: "A1 - B1",
  targetCount: 300,
  cards: topic2Cards.map((c, i) => ({ id: `pp-${String(i+1).padStart(3, '0')}`, ...c }))
});

console.log("Topic 2 generated successfully!");
