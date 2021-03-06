const create = async (comment) => {
  try {
      let response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listComment = async (signal) => {
  try {
    let response = await fetch('/api/comments/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}



export {
  create,
  listComment
}
