export const apiRequest = async (url: string, method: string = 'GET', body?: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token') || '',
    'client': localStorage.getItem('client') || '',
    'uid': localStorage.getItem('uid') || ''
  };
  console.log("local token:");
  console.log(localStorage.getItem('access-token'));
  console.log(method, headers, body);
  const response = await fetch(url, {
    method,
    headers,
    body: body ? body : undefined
  });
  console.log("fetched token:");
  console.log(response.headers.get('Access-token'));
  if (response.ok) {
    const accessToken = response.headers.get('Access-Token');
    const client = response.headers.get('Client');
    const uid = response.headers.get('Uid');
    if (accessToken && client && uid) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);
    }
  }

  return response;
};
