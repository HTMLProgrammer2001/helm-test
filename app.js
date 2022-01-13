const express = require('express');

const app = express();
app.use(express.json());

const knex = require('knex')({
   client: 'mysql2',
   connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
   }
});

app.get('/', async (req, res) => {
   const users = await knex('users').select('*');
   res.json({users});
});

app.post('/', async (req, res) => {
   const [newUserId] = await knex('users').insert({Name: req.body.name});
   const newUser = await knex('users').select('*').where('ID', newUserId).first();
   res.json({user: newUser});
});

app.put('/:id', async (req, res) => {
   console.log(req.params.id);
   await knex('users').update({Name: req.body.name}).where('ID', req.params.id);
   const updatedUser = await knex('users').select('*').where('ID', req.params.id).first();
   res.json({user: updatedUser});
});

app.delete('/:id', async (req, res) => {
   await knex('users').where('ID', req.params.id).delete();
   res.json({id: req.params.id});
});

app.listen(3000, () => console.log('App started'));
