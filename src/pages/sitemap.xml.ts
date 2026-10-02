import type { APIRoute } from 'astro';

export const prerender = true;

const urls = [
  'https://fitnessxmarketing.com/posts/signature-fitness-coaching-offer/',
  'https://fitnessxmarketing.com/posts/ai-lead-generation-for-personal-trainers/',
  'https://fitnessxmarketing.com/',
  'https://fitnessxmarketing.com/posts/',
  'https://fitnessxmarketing.com/newsletter/',
  'https://fitnessxmarketing.com/posts/wearable-data-and-data-driven-coaching/',
  'https://fitnessxmarketing.com/posts/yelp-chatgpt-personal-trainers/',
  'https://fitnessxmarketing.com/posts/ai-for-personal-trainers-top-uses-cases-tasks/',
  'https://fitnessxmarketing.com/posts/do-personal-trainers-need-to-look-the-part-coaches-weigh-in/',
  'https://fitnessxmarketing.com/posts/follow-up-for-trainers/',
  'https://fitnessxmarketing.com/posts/trainer-objections/',
  'https://fitnessxmarketing.com/posts/ideal-client-for-coaches/',
  'https://fitnessxmarketing.com/posts/a-non-trendy-take-on-where-fitness-is-going/',
  'https://fitnessxmarketing.com/tools/',
  'https://fitnessxmarketing.com/tools/wearable-tracking-for-coaches/',
  'https://fitnessxmarketing.com/tools/wearable-tracking-for-coaches/biweekly-wearable-check-in-for-coaches/',
  'https://fitnessxmarketing.com/tools/wearable-tracking-for-coaches/vo2max-training-protocol/',
  'https://fitnessxmarketing.com/tools/find-your-ideal-clients-faqs-for-coaches/',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

export const GET: APIRoute = () => new Response(sitemap, {
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
  },
});
