const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    ne
} = require('nunjucks/src/tests');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({

    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 3
    },
    lastname: {
        type: String,
        minlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;


    // ��й�ȣ�� ������ ���� ��ȣȭ ����
    if (user.isModified('password')) {
        // ��� ��ȣ�� ��ȣȭ ��Ų��.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            });
        });
    } else { // ��й�ȣ�� �ƴ� �ٸ� ������ ������ ��
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {

    // plainPassword  'eeeee'   ��ȣȭ�� ��й�ȣ : '$2b$10$OYRECYzpT6ahI9L97MareeH8ZSzlR0thSuFRrxUacVvVd.fClmNfK' 
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this;

    // jsonwebtoken�� �̿��ؼ� ��ū�� �����ϱ�
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

    
}



userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //��ū�� ���ڵ� �Ѵ�.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // ���� ���̵� �̿��Ͽ� ���� ã�� ��
        // Ŭ���̾�Ʈ���� ������ ��ū�� db�� ������ ��ū�� ��ġ�ϴ��� Ȯ��
        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}