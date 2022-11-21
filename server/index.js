const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');

const config = require('./config/key');
const {auth} = require('./middleware/auth')
const {User} = require("./models/User");



app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())


const mongoose = require('mongoose');
const {
    json
} = require('body-parser');


mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World! ㄴ냐냐ㅑㅑ냐ㅑ냥')
})


app.get('/api/hello', (req, res) =>{
    
    res.send("안뇽하세요")
})



app.post('/api/users/register', (req, res) => {

    const user = new User(req.body)


    user.save((err, userInfo) => {
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {

    // 요청된 이메일이 데이터베이스에 있는지 찾는다.
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }


        // 요청된 이메일이 db에 있다면, 비번이 일치하는지 확인한당

        user.comparePassword(req.body.password, (err, isMatch) => {
            
            if (!isMatch) return res.json({
                loginSuccess: false,
                message: "비번 틀림;;;;;;;;;;"
            })
            // 비번까지 맞다? 그럼 토큰 생성하기
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 쿠키 || 로컬 스토리지 ... etc 에 저장한다.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess : true , userId: user._id})
            })
        })
    })
})


app.get('/api/users/auth', auth , (req, res) => {

    // 요기까지 미들웨어를 통과했다는 것?
    // == Authentication이 true라는 것~~~~~~~~~~

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name :req.user.name,
        lastname : req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})



app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
        { token: "" }
        , (err, user) => {
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success: true
            })
        })
})


const port = 5000
app.listen(port, () => { console.log(`Example app listening on port ${port}`) })