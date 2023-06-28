

import express from 'express';
import cors from 'cors';
import {Zebra} from 'zebra-browser-print-wrapper'

const app = express();
const port = 9100;
const zebra = new Zebra.default();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.put('/connect/:zebraRecept2', async (req, res) => {
  try {
    await zebra.connect(req.params.zebraRecept2);
    console.log(`Connecté à ${req.params.zebraRecept2}`);
    return res.status(204).end();
  } catch (err) {
    throw err;
  }
});

app.delete('/disconnect/:zebraRecept2', async (req, res) => {
  try {
    await zebra.disconnect(req.params.zebraRecept2);
    console.log(`Déconnecté de ${req.params.zebraRecept2}`);
    return res.status(204).end();
  } catch (err) {
    throw err;
  }
});

app.put('/print', async (req, res) => {
  let data = '';
  for await (const chunk of req) {
    if (!Buffer.isBuffer(chunk)) continue;
    data += chunk.toString('utf8');
  }
  try {
    await zebra.print(data, () => {});
    console.log('Impression terminée');
    return res.status(200).end();
  } catch (error) {
    console.log('Erreur lors de l\'impression', error);
    throw new Error(error);
  }
});

app.get('/available', (req, res) => {
  zebra.getPrinters((result) => {
    if (result.success) {
      res.json({ printers: result.data });
    } else {
      res.status(500).send(result.message);
    }
  });
});

app.get('/default', (req, res) => {
  zebra.getDefaultPrinter((result) => {
    if (result.success) {
      res.json({ printer: result.data });
    } else {
      res.status(500).send(result.message);
    }
  });
});

app.post('/write', (req, res) => {
  const { device, data } = req.body;

  // Créer une instance de ZebraBrowserPrint en spécifiant l'adresse IP ou le nom d'hôte de l'imprimante
  const zebra = new Zebra(device);

  // Établir une connexion avec l'imprimante
  zebra.connect()
    .then(() => {
      // Écrire les données sur l'imprimante
      zebra.write(data);

      // Déconnecter de l'imprimante
      zebra.disconnect();
      
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Erreur lors de la communication avec l\'imprimante:');
      res.sendStatus(500);
    });
});

app.post('/read', (req, res) => {
  const { device } = req.body;

  // Créer une instance de ZebraBrowserPrint en spécifiant l'adresse IP ou le nom d'hôte de l'imprimante
  const zebra = new Zebra(device);

  // Établir une connexion avec l'imprimante
  zebra.connect()
    .then(() => {
      // Lire les données depuis l'imprimante
      const data = zebra.read();

      // Déconnecter de l'imprimante
      zebra.disconnect();

      res.send(data);
    })
    .catch((error) => {
      console.error('Erreur lors de la communication avec l\'imprimante:', error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Le serveur backend est en cours d'exécution sur le port ${port}`);
});
export const serverZebra = zebra