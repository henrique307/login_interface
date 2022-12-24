import express from 'express';
import { routesInjector } from './utils/routesInjector';

const app = express();
const porta = process.env.PORT || 8080;

routesInjector(app);

app.listen(8080, () => console.log(`app escutando na porta ${porta}`));