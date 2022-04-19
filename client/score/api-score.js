const submitScore = async (score) => {
  try {
      let response = await fetch('/api/scores/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listScore = async (signal) => {
  try {
    let response = await fetch('/api/scores/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}



export {
  submitScore,
  listScore
}
