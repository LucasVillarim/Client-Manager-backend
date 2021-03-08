import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  // eslint-disable-next-line class-methods-use-this
  private async database() {
    try {
      await mongoose.connect(
        'mongodb+srv://usuario_admin:v1ll4134679@clusterapi.blc69.mongodb.net/test?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
