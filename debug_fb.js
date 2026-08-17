const TOKEN = 'EAAih8bWsRQQBSO7CNsfh1yxSLyG95neHEKWnncMr3KtmmZA7381KDOOkWNCyAZCzWOjOsVmBMNbUQJSb9ZAs0rYo9jyVJksueUGT2t5FM87weqpBzQkmA9OnP04jVQhZBOQcZAX52OERC79SD5dK6dbm4TcndZCr28Uv8G71CAyX65t5qjiQZB9XqCAv0UdArjzpVZCraprqEaE3ZAnTjRPWcI8jsSWCanfGkwq6i5bUfiWG8IyDFt7ek8b6ZAWZBE1e73gSpV9ZBlzAFbuzVl8wHZCQO';
const PAGE_ID = '61592744978695';

async function debugToken() {
  // 1. Check token info
  console.log('--- Checking Token Info ---');
  const debugRes = await fetch(`https://graph.facebook.com/v19.0/debug_token?input_token=${TOKEN}&access_token=${TOKEN}`);
  const debugData = await debugRes.json();
  console.log(JSON.stringify(debugData, null, 2));

  // 2. Check what pages this user/token can manage
  console.log('\n--- Checking Managed Pages ---');
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${TOKEN}`);
  const pagesData = await pagesRes.json();
  console.log(JSON.stringify(pagesData, null, 2));
}

debugToken();
