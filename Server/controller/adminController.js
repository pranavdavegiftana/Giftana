const Admin = require("../models/adminModel")
const requireLogin = require("../middleware/requireLogin")
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const jwt = require("jsonwebtoken")




// / registeration of Admin
const registerAdmin = asyncHandler(async(req, res) => {
    const { adminName, password, email, role } = req.body;
    console.log(adminName, password, email, role);
    // res.send(adminName, password, email, role)
    const adminExist = await Admin.findOne({ adminName })

    if (adminExist) {
        res.status(400)
        throw new Error(`Admin with this ${email} already exists`)
    }


    const admin = await Admin.create({ adminName, email, password, role })
    if (admin) {
        res.status(201).json({
            id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin._id),
        })
    } else {
        res.status(400)
        throw new Error(`Error Occured`)

    }


})



// Login

// login or authenticated Admin
const authAdmin = asyncHandler(async(req, res) => {
    const { adminName, password } = req.body;

    const admin = await Admin.findOne({ adminName });

    if (admin && (await admin.matchPassword(password))) {


        // verify token

        const token = await generateToken(admin._id);
        res.cookie(("access_token", token, {
            expires: new Date(Date.now() + 25890000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
        }))

        res.send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin._id),
        });

        // .status(200)
        // .json({ message: "Logged in successfully 😊 👌" }));
        // res.cookie({
        //     _id: admin._id,
        //     adminName: admin.adminName,
        //     email: admin.email,
        //     role: admin.role,
        //     token: generateToken(admin._id),
        // });
        // const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);
        // return res
        //     .cookie("access_token", token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === "development",
        //     })
        //     .status(200)
        //     .json({ message: "Logged in successfully 😊 👌" });

    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

    // const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);
    // return res
    //     .cookie("access_token", token, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === "development",
    //     })
    //     .status(200)
    //     .json({ message: "Logged in successfully 😊 👌" });
});



// Logout Admin
const logoutAdmin = asyncHandler(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "You had logout"
    });
});


module.exports = { registerAdmin, authAdmin, logoutAdmin }