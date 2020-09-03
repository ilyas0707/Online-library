const { Router } = require("express")
const Plan = require("../models/Plan")
const library = require("./../middleware/library.middleware")
const router = Router()

router.post("/add", library, async (req, res) => {
    try {

        const { name, dateFrom, dateTo, timeFrom, timeTo } = req.body

        const notes = new Plan({
            name, dateFrom, dateTo, timeFrom, timeTo, owner: req.user.userId
        })

        await notes.save()

        res.status(201).json({ notes, message: "Дело добавлено" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", library, async (req, res) => {
    try {
        await Plan.find({ owner: req.user.userId }, (error, data) => {
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