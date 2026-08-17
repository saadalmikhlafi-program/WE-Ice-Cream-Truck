const USER_TOKEN = 'EAAih8bWsRQQBSO7CNsfh1yxSLyG95neHEKWnncMr3KtmmZA7381KDOOkWNCyAZCzWOjOsVmBMNbUQJSb9ZAs0rYo9jyVJksueUGT2t5FM87weqpBzQkmA9OnP04jVQhZBOQcZAX52OERC79SD5dK6dbm4TcndZCr28Uv8G71CAyX65t5qjiQZB9XqCAv0UdArjzpVZCraprqEaE3ZAnTjRPWcI8jsSWCanfGkwq6i5bUfiWG8IyDFt7ek8b6ZAWZBE1e73gSpV9ZBlzAFbuzVl8wHZCQO';

const POSTS_TO_DELETE = [
  '1292552100605870_122101700889424832', // Post 1
  '1292552100605870_122101701249424832', // Post 2
  '1292552100605870_122101701483424832', // Post 3
  '1292552100605870_122101701825424832', // Post 4
  '1292552100605870_122101702095424832', // Post 5
  '1292552100605870_122101702443424832', // Post 6
  '1292552100605870_122101702713424832', // Post 7
  '1292552100605870_122101703043424832', // Post 8
];

const PHOTOS_TO_DELETE = [
  '122101700805424832',
  '122101701165424832',
  '122101701399424832',
  '122101701711424832',
  '122101702053424832',
  '122101702395424832',
  '122101702635424832',
  '122101702971424832'
];

async function run() {
  console.log('Fetching fresh Page Access Token...');
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${USER_TOKEN}`);
  const pagesData = await pagesRes.json();
  const page = pagesData.data[0];
  const PAGE_TOKEN = page.access_token;
  
  console.log('--- Deleting Posts ---');
  for (const id of POSTS_TO_DELETE) {
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: PAGE_TOKEN })
      });
      const data = await res.json();
      console.log(data.success ? `✅ Deleted post ${id}` : `⚠️  Could not delete post ${id}: ${JSON.stringify(data.error?.message)}`);
    } catch (err) {
      console.error(`❌ Error:`, err.message);
    }
  }

  console.log('--- Deleting Photos ---');
  for (const id of PHOTOS_TO_DELETE) {
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: PAGE_TOKEN })
      });
      const data = await res.json();
      console.log(data.success ? `✅ Deleted photo ${id}` : `⚠️  Could not delete photo ${id}: ${JSON.stringify(data.error?.message)}`);
    } catch (err) {
      console.error(`❌ Error:`, err.message);
    }
  }
}

run();
