const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
// mongoose.connect(mongodb+srv://miimmmi:<password>@cluster.chnj6mh.mongodb.net/?retryWrites=true&w=majority, {
//     useNewUrlParser: true, 
// }) 
// 몽구스 v.6부터는 이게 디폴트로 적용돼서 이거 안쳐줘도 됨.




app.get('/', (req, res) => {
  res.send('Hello World! 냐냐냥')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})