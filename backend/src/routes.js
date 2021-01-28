const { Router, request } = require('express');
const Car = require('./models/Car');

const routes = Router();

routes.post('/cars', async (request, response) => {
    console.log(request.body);
    const {marca, modelo, ano_fabricacao, placa} = request.body;

    const car = await Car.create({
        marca,
        modelo,
        ano_fabricacao,
        placa
    })

    return response.status(201).json(car);
});

routes.delete('/cars/:id',async (request, response) => {
    const {id} = request.params;
    console.log(id);
    await Car.findByIdAndDelete({
        _id: id
    })
    return response.status(200).json(id);

});

routes.put('/cars/:id', async (request, response) => {
    const {id} = request.params;
    const carRequest = request.body;
    const options = { upsert: true }; //Cria caso não exista
    await Car.updateOne({_id: id},carRequest, options)
    return response.status(204);

});

routes.get('/cars', async(request, response) => {
    const cars = await Car.find();
    // const cars = await Car.find().select({ "_id":0, "__v":0 });
    return response.json(cars);
});

routes.get('/cars/:id', async (request, response) => {
    const {id} = request.params;
    const cars = await Car.findById({_id: id});
    // const cars = await Car.findById({_id: id}).select({ "_id":0, "__v":0 });
    return response.json(cars);
});


// fetch("http://localhost:3333/cars/", {
//   "method": "GET",
//   "headers": {}
// })
// .then(response => {
//   response.json().then(response_json => {
//     console.log(response_json[1].marca)
//     });
// })
// .catch(err => {
//   console.error(err);
// });


module.exports = routes;