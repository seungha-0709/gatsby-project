import axios from "axios"

exports.handler = function (event, context, callback) {
  const apiRoot = "https://kimseungha.me/ghost/api/v3/content/posts/?key=a66ba36570db1489323eb9a32c&include=tags&limit=all"
  const accessKey = 'a66ba36570db1489323eb9a32c'

  axios.get(apiRoot).then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: res.data
      })
    })
  })
}