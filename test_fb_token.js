const USER_TOKEN = 'EAAih8bWsRQQBSO7CNsfh1yxSLyG95neHEKWnncMr3KtmmZA7381KDOOkWNCyAZCzWOjOsVmBMNbUQJSb9ZAs0rYo9jyVJksueUGT2t5FM87weqpBzQkmA9OnP04jVQhZBOQcZAX52OERC79SD5dK6dbm4TcndZCr28Uv8G71CAyX65t5qjiQZB9XqCAv0UdArjzpVZCraprqEaE3ZAnTjRPWcI8jsSWCanfGkwq6i5bUfiWG8IyDFt7ek8b6ZAWZBE1e73gSpV9ZBlzAFbuzVl8wHZCQO';

async function run() {
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${USER_TOKEN}`);
  const pagesData = await pagesRes.json();
  console.log(pagesData);
}

run();
