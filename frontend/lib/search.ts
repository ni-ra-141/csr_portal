import faq from "@/knowledge/faq.json";
import registration from "@/knowledge/registration.json";
import rules from "@/knowledge/rules.json";
import resources from "@/knowledge/resources.json";
import announcements from "@/knowledge/announcements.json";
import webinars from "@/knowledge/webinars.json";

// Merge everything into one array
const knowledge = [
  ...faq,
  ...registration,
  ...rules,
  ...resources,
  ...announcements,
  ...webinars,
];

export function searchKnowledge(question: string): string {
  const keywords = question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);

  const scored = knowledge.map((item: Record<string, unknown>) => {
    const text = JSON.stringify(item).toLowerCase();

    let score = 0;

    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score++;
      }
    }

    return { item, score };
  });

  const matches = scored
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (matches.length === 0) {
    return "";
  }

  return matches
    .map(entry => JSON.stringify(entry.item, null, 2))
    .join("\n\n");
}