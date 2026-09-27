#!/usr/bin/env python3
"""One-time generator: writes templeDocs/*.json from embedded SSRRT temple guide text."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src/constants/templeDocs"

def w(name, data):
    (OUT / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", name, (OUT / f"{name}.json").stat().st_size)

# Krishna already authored in krishna.json — skip if present

SHIRDI = {
  "name": "Shirdi Sai Baba Temple",
  "tagLine": "Sabka Malik Ek — The Lord of All Is One",
  "tag": "Sabka Malik Ek · The Lord of All is One",
  "mantra": "॥ ॐ साई राम ॥",
  "heroIntro": "Shirdi Sai Baba is among the most universally beloved saints in Indian spiritual history — a figure whose compassion crossed every boundary of caste, creed, and religion.",
  "quote": "The same unconditional compassion devotees knew in Shirdi is felt in the air of this Ashram.",
  "gift": "Shraddha and Saburi — faith and patience — awakening grace that meets the whole person in daily life.",
  "whySeek": [
    {"title": "Faith and patience", "note": "Shraddha and Saburi — his twin gifts to every sincere devotee."},
    {"title": "Beyond boundaries", "note": "Sabka Malik Ek — the Lord of all is One."},
    {"title": "Practical grace", "note": "His compassion meets financial difficulty, family conflict, and the search for direction."},
  ],
  "sections": [
    {
      "heading": "About Shirdi Sai Baba",
      "paragraphs": [
        "Shirdi Sai Baba is one of the most universally beloved saints in Indian spiritual history — a figure whose transcendence of religious boundaries, whose radical compassion for every human being regardless of caste, creed, or religion, and whose miraculous works have made him an object of devotion for hundreds of millions of people not only in India but across the world. He appeared in the small village of Shirdi in Maharashtra in the latter half of the 19th century, living there for decades in a state of absolute simplicity and profound spiritual power until his Mahasamadhi in 1918.",
        "Sai Baba was, and remains, an enigma. He dressed like a Muslim fakir, lived in a mosque, but observed Hindu rituals. He quoted the Quran and the Upanishads with equal facility. He said 'Allah Malik' — God is the master — and 'Sabka Malik Ek' — the Lord of all is One. He accepted worship from Hindus and Muslims alike, sat with the poor and the wealthy, healed the sick, comforted the grieving, challenged the arrogant, and embodied with his every breath the truth that at the deepest level there is no division between the faiths, and no separation between any human soul and the Divine Source of all existence.",
        "The miracles attributed to Shirdi Sai Baba are legion and have been carefully documented: healings of terminal illnesses, the multiplication of food, the bilocation of his physical presence, the knowing of events happening at great distances, the appearance to devotees in dreams and visions, and countless others. But for his deepest devotees, these miracles are not the point. The point is the quality of his love — a love so unconditional, so patient, so all-encompassing that merely thinking of him is, for many, sufficient to dissolve the most acute anxiety and restore a felt sense of protection and grace.",
      ],
    },
    {
      "heading": "The Connection Between Amma and Shirdi Sai",
      "paragraphs": [
        "The presence of a Shirdi Sai Baba temple at the Srimad Sai Rajarajeshwari Ashram carries a significance that is both personal and cosmic. Ancient Nadi readings — those remarkable palm-leaf manuscripts inscribed by sages of a distant past — describe Amma as 'one equivalent to Shirdi Sai' in spiritual stature and in the quality of her mission. This is not a claim made lightly; the Nadi scriptures are considered among the most authoritative spiritual records in the tradition, and such a statement places Amma in the highest tier of spiritual masters.",
        "For devotees who know both Amma and the Shirdi Sai tradition, this equivalence is not surprising — it is felt. The same quality of unconditional compassion that radiates from accounts of Shirdi Sai Baba is experienced in Amma's presence. The same willingness to serve anyone who comes, regardless of background. The same combination of exacting wisdom and boundless tenderness. The same demonstration, through personal example, that the highest spiritual attainment is not withdrawal from the world but fuller, more loving engagement with it. The Shirdi Sai temple at this Ashram is therefore a site of particular double blessing: it carries the grace of Shirdi Sai himself, and it is additionally consecrated by Amma, who has been identified by ancient prophecy as his spiritual peer in this age.",
      ],
    },
    {
      "heading": "Spiritual Advantages of the Shirdi Sai Temple",
      "paragraphs": [
        "Shirdi Sai Baba is known in the tradition by a phrase that encapsulates his primary spiritual gift: Shraddha and Saburi — faith and patience. These are the two qualities he most consistently taught, most dramatically demonstrated, and most reliably awakens in those who come to him with sincerity. In an age of immediate gratification and spiritual impatience, the Shirdi Sai temple at this Ashram is a place where one can learn, experientially and not merely intellectually, what it means to surrender the anxious insistence on control, to trust in the divine timing of events, and to wait with an open heart for the unfolding of grace.",
        "Devotees of Shirdi Sai consistently report that his grace operates in a thoroughly practical way — not merely in elevated states of spiritual experience, but in the practical circumstances of daily life: in the resolution of financial difficulties, in the healing of family conflicts, in the finding of direction when one is lost, in the provision of exactly what is needed at exactly the right moment. This quality of Sai's grace — its earthiness, its attention to the whole person and not just the spiritual seeker — makes his temple a particularly welcoming place for those who come not with polished spiritual credentials but with genuine need.",
        "The atmosphere of the temple, consecrated by Amma's decades of devoted worship, adds an additional and immeasurable quality to the experience of visiting. Many devotees report that they feel Sai Baba's presence here with a directness and immediacy that surprises them. The combination of the natural sanctity of the Cauvery riverbank, the consecration by Amma, and the collective devotion of the many thousands who have prayed here over the years creates an atmosphere of remarkable spiritual density — a place where the veil between the human and the divine feels very thin indeed.",
      ],
    },
  ],
}

# Additional temples: ganesha, subramanya, dattatreya, shiva — see repo doc or extend this script.
# Run: python3 frontend/scripts/populate-temple-docs.py

if __name__ == "__main__":
    w("shirdi", SHIRDI)
