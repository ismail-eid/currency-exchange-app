
export const checkStatus = response => {
  if (response.ok) {
    return response;
  }

  throw new Error('404 we cant find the data')
}

export const json = data => {
  return data.json()
}