const { Router } = require("express")
const Profile = require("../models/Profile")
const library = require("./../middleware/library.middleware")
const router = Router()

router.post("/add", library, async (req, res) => {
    try {

        const { name, surname, email, status } = req.body

        const card = new Profile({
            name, surname, email, status, owner: req.user.userId
        })

        await card.save()

        res.status(201).json({ card, message: "Профиль изменен" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", library, async (req, res) => {
    try {
        await Profile.find({ owner: req.user.userId }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

module.exports = router