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
    res.send('Hello World! ���ĳĤ����Ĥ���')
})


app.get('/api/hello', (req, res) =>{
    
    res.send("�ȴ��ϼ���")
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

    // ��û�� �̸����� �����ͺ��̽��� �ִ��� ã�´�.
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "������ �̸��Ͽ� �ش��ϴ� ������ �����ϴ�."
            })
        }


        // ��û�� �̸����� db�� �ִٸ�, ����� ��ġ�ϴ��� Ȯ���Ѵ�

        user.comparePassword(req.body.password, (err, isMatch) => {
            
            if (!isMatch) return res.json({
                loginSuccess: false,
                message: "��� Ʋ��;;;;;;;;;;"
            })
            // ������� �´�? �׷� ��ū �����ϱ�
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // ��ū�� ��Ű || ���� ���丮�� ... etc �� �����Ѵ�.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess : true , userId: user._id})
            })
        })
    })
})


app.get('/api/users/auth', auth , (req, res) => {

    // ������ �̵��� ����ߴٴ� ��?
    // == Authentication�� true��� ��~~~~~~~~~~

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