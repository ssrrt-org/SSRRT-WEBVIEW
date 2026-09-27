#!/usr/bin/env python3
"""Patch ganesha, subramanya, dattatreya, shiva JSON from SSRRT temple guide."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src/constants/templeDocs"

def save(name, data):
    (OUT / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

save("ganesha", {
  "name": "Lord Ganesha",
  "tagLine": "Vighneshvara — The Remover of All Obstacles",
  "tag": "Vighneshvara · Remover of Obstacles",
  "mantra": "॥ श्री गणेशाय नमः ॥",
  "heroIntro": "Lord Ganesha is first to be worshipped before every significant undertaking — wisdom, listening, and the power to clear inner and outer obstacles.",
  "quote": "Before every undertaking at this Ashram — every meal cooked, every cow fed, every prayer offered — Ganesha is remembered first.",
  "gift": "Clears obstacles outer and inner; blesses new beginnings; patron of students and scholars.",
  "whySeek": [
    {"title": "Before new beginnings", "note": "Careers, marriages, housewarmings, and fresh spiritual practices."},
    {"title": "When obstacles arise", "note": "Outer blocks and inner blocks of fear or confusion."},
    {"title": "For clarity and focus", "note": "His ears listen; his trunk discriminates — concentration before action."},
  ],
  "sections": [
    {"heading": "About Lord Ganesha", "paragraphs": [
      "Lord Ganesha — the elephant-headed son of Shiva and Parvati — is perhaps the most immediately recognisable deity in the entire Hindu pantheon and certainly among the most widely worshipped. His image graces the entrance of temples, homes, businesses, and vehicles across India and throughout the Hindu diaspora worldwide. He is invoked at the beginning of every significant undertaking — every journey, every business venture, every examination, every new year, every marriage, every construction, every work of art. In the Hindu understanding, nothing of significance begins without Ganesha's blessing, and with his blessing, no obstacle is insurmountable.",
      "Ganesha's form is a magnificent fusion of the human and the divine, the cosmic and the intimate. His elephant head represents supreme wisdom and the capacity to understand the deepest truths of existence. His large ears signify his willingness to listen — to hear the prayers and concerns of every devotee, however humble. His small eyes indicate deep concentration and the ability to see through the surface of things to their essential nature. His trunk, which can move with extraordinary delicacy or power, represents the discriminating intellect — the faculty that distinguishes between the real and the unreal, the permanent and the transient. His large belly suggests the ability to digest all of life's experiences, both pleasant and painful, with equanimity.",
      "He rides on a mouse — a creature renowned for its ability to find a way through any obstacle, to navigate the most complex territory. Together, the great elephant-headed god and his tiny mount represent the combination of cosmic power and precise, intelligent navigation that is the hallmark of Ganesha's grace. He does not simply remove obstacles through brute force; he reveals the path through them that wisdom, patience, and discernment can find.",
    ]},
    {"heading": "Why Ganesha's Presence at the Ashram Is Foundational", "paragraphs": [
      "In the architecture of the Ashram's spiritual community, the Ganesha temple plays a foundational role. In Vedic and Puranic tradition, Ganesha is always propitiated first — before any other deity, before any significant act or ceremony. He is Prathamapujya, the first to be worshipped. His presence at the entrance of or within a sacred compound is understood to set the spiritual tone for everything that follows — to clear the energetic field of obstacles, to establish auspiciousness, and to create the conditions for all subsequent worship and service to bear fruit.",
      "At the Srimad Sai Rajarajeshwari Ashram, Ganesha's temple is thus a keystone of the entire spiritual ecosystem. Every act of service performed at the Ashram — every meal offered to the poor, every student educated, every cow protected, every prayer offered at every other temple — is sanctified and facilitated by Ganesha's presence. His blessing is the foundation on which the entire edifice of the Ashram's mission rests.",
    ]},
    {"heading": "Spiritual Benefits of Worshipping at the Ganesha Temple", "paragraphs": [
      "The practical and spiritual benefits of sincere Ganesha worship are well-documented across thousands of years of tradition and the personal experience of millions of devotees. Most fundamentally, Ganesha worship clears obstacles — not only external obstacles but also the internal obstacles that are, in the Hindu understanding, far more significant: the obstacles of ego, of fear, of confusion, of attachment, of the various forms of mental and emotional turbulence that prevent a human being from moving forward on the spiritual path.",
      "At a time when many people come to spiritual practice specifically because they feel blocked — because they sense that something in them is not moving as it should — the Ganesha temple at this Ashram offers a particularly powerful form of help. Sitting before Lord Ganesha, offering one's difficulties with genuine sincerity and asking for his discernment to reveal the way through, is an ancient practice that continues to produce results for those who approach it with faith.",
      "Beyond obstacle removal, Ganesha is also the deity of beginnings, of new chapters. For those who stand at a threshold in their lives, the Goshala and the Ganesha temple together offer a sacred start. Children and students who visit before a new academic year often feel a particular affinity for Lord Ganesha, the patron of scholars — many families from Karekura bring their children here before school begins.",
    ]},
  ],
})

save("subramanya", {
  "name": "Lord Subramanya",
  "tagLine": "Murugan, Skanda, Karthikeya — The Eternal Warrior of the Spirit",
  "tag": "Murugan · Skanda · The eternal warrior of the spirit",
  "mantra": "॥ ॐ सरवण भव ॥",
  "heroIntro": "Lord Subramanya leads the army of the gods against darkness — courage, discipline, and piercing wisdom embodied in the vel.",
  "quote": "Spiritual life is not passive — it requires the courage Subramanya embodies.",
  "gift": "Sharpens mind and will; renews purpose; refuge for students and seekers of spiritual courage.",
  "whySeek": [
    {"title": "Courage and discipline", "note": "The eternal warrior of the spirit — effort, not passivity."},
    {"title": "For students", "note": "Clarity of purpose when choosing a path or facing examinations."},
    {"title": "Renewed willpower", "note": "When spiritual life demands sustained, fearless effort."},
  ],
  "sections": [
    {"heading": "About Lord Subramanya", "paragraphs": [
      "Lord Subramanya — also known as Murugan, Skanda, Karthikeya, Shanmukha, and by many other sacred names — is among the most beloved deities of South India. He is the second son of Shiva and Parvati, born to lead the army of the gods against the demon Tarakasura. Subramanya is depicted as a young man of surpassing beauty, riding his peacock mount Paravani, holding the vel — a divine spear of piercing wisdom.",
      "The peacock, which kills snakes, represents Subramanya's power over the ego and its venomous expressions. The vel, gifted by the Divine Mother Parvati, is simultaneously a weapon of spiritual warfare and a symbol of penetrating insight. He is called Shanmukha — the one with six faces — each perceiving all things simultaneously. He is the embodiment of divine youth, of eternal spiritual vigour.",
      "For the tradition of Shaivism, particularly in the South, Subramanya is understood as the highest teacher — the one who instructed even Shiva himself in the mysteries of the Pranava, the primordial sound OM.",
    ]},
    {"heading": "The Significance of Subramanya in the Ashram", "paragraphs": [
      "The Subramanya temple speaks to a dimension of the Ashram's vision that is easy to overlook: spiritual life is not passive. It requires courage, discipline, sustained effort, and clarity. Lord Subramanya embodies these qualities in their highest form.",
      "Amma's own life demonstrates this warrior quality — decades of sustained, selfless service, refusal to be deterred by difficulty, willingness to meet the needs of thousands with unfailing energy and love. The Subramanya temple, consecrated by her presence, carries this energy of spiritual vigour and purposeful determination.",
    ]},
    {"heading": "Spiritual Benefits of the Subramanya Temple", "paragraphs": [
      "Devotees who worship at Subramanya temples throughout South India report a sharpening of the mind, a strengthening of willpower, and a renewed sense of purpose — the gifts of Murugan energy.",
      "For young people, the Subramanya temple at the Ashram is a powerful resource at crossroads in life, before examinations, or when confidence is needed to pursue one's path. The combination of Subramanya's blessing with the consecrated Ashram and the sacred Cauvery creates conditions of particular potency.",
      "The tradition also holds that Subramanya worship addresses Kuja (Mars) afflictions and ancestral karmic patterns. Many devotees come with these intentions and return with stories of clarity and relief. For active seekers needing greater discipline in practice, the vel symbolises discriminating intelligence that separates the genuine path from distraction.",
    ]},
  ],
})

save("dattatreya", {
  "name": "Lord Dattatreya",
  "tagLine": "Trimurti Incarnate — The Guru of Gurus",
  "tag": "Trimurti Incarnate · The Guru of Gurus",
  "mantra": "॥ ॐ दिगंबराय विद्महे ॥",
  "heroIntro": "Lord Dattatreya embodies Brahma, Vishnu, and Shiva in one form — the Adi Guru who established the guru–disciple lineage.",
  "quote": "His grace dissolves what cannot be solved by effort alone — the weight of ancestral karma.",
  "gift": "Liberation from ancestral patterns; deepest guru grace; wholeness of the Trimurti in one darshan.",
  "whySeek": [
    {"title": "Guru's grace", "note": "Transmission from realised teacher to sincere student."},
    {"title": "Ancestral karma", "note": "Liberation from patterns that persist across generations."},
    {"title": "The Trimurti", "note": "Creation, preservation, and dissolution in one sacred form."},
  ],
  "sections": [
    {"heading": "About Lord Dattatreya", "paragraphs": [
      "Lord Dattatreya is one of the most unique and philosophically profound of all Hindu deities — embodying Brahma, Vishnu, and Shiva in a single form with three heads, six arms, four dogs, and a cow. The three heads represent creation, preservation, and dissolution; the four dogs the four Vedas; the cow the earth and nurturing principle.",
      "Dattatreya is revered as the Adi Guru — the first spiritual teacher who transmitted knowledge guru to disciple, establishing the parampara that carries wisdom across millennia. He taught kings and sages, seeing everything as teacher and everything as student.",
      "The Dattatreya tradition is strong in Maharashtra and Karnataka; the Ashram's location gives this temple regional resonance and centuries of devotional lineage through saints such as Sripada Srivallabha, Narasimha Saraswati, and Swami Samarth.",
    ]},
    {"heading": "Dattatreya and the Guru Principle", "paragraphs": [
      "A Dattatreya temple at an ashram affirms that spiritual growth requires living transmission of grace from a realised teacher. SSRRT exists through Amma's vision; progress is intimately connected to her grace.",
      "Lord Dattatreya consecrates the guru principle — he presides over all gurus; Amma is a living expression of that tradition. Worship here participates in the sacred relationship between the soul that yearns for liberation and the master who guides it home.",
    ]},
    {"heading": "Spiritual Benefits of the Dattatreya Temple", "paragraphs": [
      "Dattatreya's grace is associated with liberation from ancestral karmas — patterns of limitation inherited across generations that no human effort alone can fully untangle.",
      "Sincere worship at this consecrated temple is among the most powerful traditional means of pacifying ancestral souls and dissolving inherited debts. Devotees report deep release — emotional, physical, and circumstantial — that other approaches had not produced.",
      "The temple is also refuge for those seeking the deepest guidance: not advice alone but living transmission of guru grace. To call upon Dattatreya here, on the Cauvery, in an Ashram pulsing with decades of seva, is to invite that transmission under the most favourable conditions the tradition offers.",
    ]},
  ],
})

save("shiva", {
  "name": "The Grand Shiva Temple",
  "tagLine": "Mahadeva on His Celestial Throne — A Vision of Cosmic Grandeur",
  "tag": "Mahadeva on his celestial throne",
  "mantra": "॥ ॐ नमः शिवाय ॥",
  "heroIntro": "Lord Shiva enthroned on the grand mantapa with Nandi — Mahadeva as destroyer, regenerator, and lord of yoga on the banks of the Cauvery.",
  "quote": "On the banks of the Cauvery, Shiva enthroned is a vision of the cosmos — ordered, purposeful, radiating.",
  "gift": "Dissolves ego; refuge in grief and endings; Yogeshvara's grace for meditation and Nandi as witness to prayer.",
  "whySeek": [
    {"title": "For meditation", "note": "Shiva as Yogeshvara — stillness and inner dissolution."},
    {"title": "In grief and endings", "note": "Every ending is also a doorway."},
    {"title": "Through Nandi", "note": "Whisper a prayer into Nandi's ear at the grand mantapa."},
  ],
  "sections": [
    {"heading": "About Lord Shiva", "paragraphs": [
      "Lord Shiva — Mahadeva — is the most ancient and paradoxical of Hindu deities: destroyer and regenerator, ascetic and householder, lord of the cremation ground and king of Kailash. He dances the Tandava that maintains cosmic rhythm and meditates in absolute stillness. He is Nirguna Brahman and Bholenath, most easily pleased.",
      "Shiva's vehicle Nandi guards the gate of Kailasha — devotion so pure it became union with the Lord. Nandi reminds the devotee to approach with a full heart and single-pointed attention.",
      "To bow before Shiva is to encounter the ultimate reality and the most intimate divine personality — accessible to sincere prayer, responsive to whispered vows before Nandi.",
    ]},
    {"heading": "The Grand Mantapa and the Unique Shiva Installation", "paragraphs": [
      "The Shiva temple is among the most distinctive features of the campus — Lord Shiva with Nandi upon a grand mantapa of arresting scale and artistry. The mantapa is the cosmic throne upon which the divine reveals majesty; many devotees report spontaneous stillness upon beholding it.",
      "The installation has been crafted and consecrated with devotional precision, charged by Amma's worship — understood as a throne genuinely occupied, radiating Mahadeva's presence across the campus.",
    ]},
    {"heading": "The Shiva Temple and the River Cauvery", "paragraphs": [
      "On the Cauvery — the Ganga of the South — Shiva's temple gains added sanctity. Rivers carry flowing grace; Shiva and sacred waters together create conditions supreme for meditation.",
      "Shiva is Yogeshvara; practitioners who meditate here often report unusual depth — stillness beneath mental activity, the silent awareness Shiva embodies.",
    ]},
    {"heading": "Spiritual Advantages of the Grand Shiva Temple", "paragraphs": [
      "As Mahadeva encompassing all deities, Shiva's temple is the spiritual crown of the campus — where paths converge. Circumambulating the temples and arriving at the mantapa completes the pilgrimage of grace.",
      "Shiva destroys ego — the false separate self at the root of suffering. Sincere worship here brings moments of expansion beyond the bounded self.",
      "For grief, fear of death, and major endings, Shiva teaches that dissolution is doorway. Whisper your prayer into Nandi's ear — the tradition holds it reaches Shiva directly; countless Ashram stories affirm prayers thus offered.",
    ]},
  ],
})

print("patched ganesha, subramanya, dattatreya, shiva")
