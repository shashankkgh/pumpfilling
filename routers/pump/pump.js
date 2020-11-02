const Router = require('express').Router
const router = new Router()
const pumpModule = require('../../models').PUMPMODEL

router.get('/get-all-booking/:pump_id', async (req, res) => {
    const pump_id = req.params.pump_id
    if (!pump_id) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_id is required!' })
    let data = await pumpModule.getPumpBooking(pump_id)
    return res.status(200).send({ code: 200, status: 'success', data: data})
})

module.exports = router