const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';

app.get('/', (request, response) => {
    response.send('Oh hey Pet Box');
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.pets = [
    { id: 'a1', name: 'Rover', type: 'dog' },
    { id: 'b2', name: 'Marcus Aurelius', type: 'parakeet' },
    { id: 'c3', name: 'Craisins', type: 'cat' }
];

app.get('/api/v1/pets', (request, response) => {
    const pets = app.locals.pets;

    response.json({ pets });
});

app.get('/api/v1/pets/:id', (request, response) => {
    const { id } = request.params;
    const pet = app.locals.pets.find(pet => pet.id === id);
    if (!pet) {
        return response.sendStatus(404);
    }

    response.status(200).json(pet)
});

app.use(express.json());

app.post('/api/v1/pets', (request, response) => {
    const id = Date.now();
    const { name, type } = request.body;

    app.locals.pets.push({ id, name, type });

    response.status(201).json({ id, name, type });
})