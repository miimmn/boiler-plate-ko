const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
// mongoose.connect(mongodb+srv://miimmmi:<password>@cluster.chnj6mh.mongodb.net/?retryWrites=true&w=majority, {
//     useNewUrlParser: true, 
// }) 
// ������ v.6���ʹ� �̰� ����Ʈ�� ����ż� �̰� �����൵ ��.




app.get('/', (req, res) => {
  res.send('Hello World! �ĳĳ�')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})