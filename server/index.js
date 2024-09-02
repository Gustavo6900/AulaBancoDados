const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('veiculos');
    collection = db.collection('car');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/veiculo', async (req, res) => {
  try {
    const novoVeiculo = req.body;

    const result = await collection.insertOne(novoVeiculo)
    
    res.status(201).json({ message: 'Veiculo registrado com sucesso', veiculoId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar matrícula', error: err });
  }
});

app.get('/veiculo', async (req, res) => {
  try {
    const veiculo = await collection.find().toArray()
    res.status(200).json(veiculo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar veiculo', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/veiculo/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const veiculo = await collection.findOne({ _id: newId });


    if (!veiculo) {
      res.status(404).json({ message: 'Veiculo não encontrada' });
    } else {
      res.status(200).json(veiculo);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar veiculo', error: err });
  }
});

app.put('/veiculo/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;

    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao })

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'veiculo não encontrada' });
    } else {
      res.status(200).json({ message: 'veiculo atualizado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar veiculo', error: err });
  }
});

app.delete('/veiculo/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

     const result = await collection.deleteOne({ _id: newId })

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'veiculo não encontrada' });
    } else {
      res.status(200).json({ message: 'veiculo excluido com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir veiculo', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
