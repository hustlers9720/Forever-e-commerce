import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// route for login user
const logInUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not Valid' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Password not Correct' })
        }
        else {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// route for register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exist or not 
        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: 'User Already Exist' })
        }

        // validating email format and strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please Enter a valid Email' })
        }

        if (password.length < 0) {
            return res.json({ success: false, message: 'Please Enter a Strong Password' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, messgae: error.message })
    }
}


// route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({ success: true, token })
        }
        else {
            res.json({ success: false,  messgae : "Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, messgae: error.message })
    }
}
export { logInUser, registerUser, adminLogin }