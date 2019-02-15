const fetch =  require('node-fetch')
const getData = async apiUrl => {
    const response = await fetch(apiUrl)
    const responseData = await response.json()

    return responseData
}

module.exports = getData