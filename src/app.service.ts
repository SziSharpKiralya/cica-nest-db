import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Macskak } from './Macskak.js';
import { Jatekok } from './Jatekok.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createConnection() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cicak'
    });
    return connection;
  }

  async macskakLista() {
    const connection = await this.createConnection();
    const [results] = await connection.execute(
      'SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak');
    await connection.end();
    return results as Macskak[];
  }

  async jatekokLista() {
    const connection = await this.createConnection();
    const [results] = await connection.execute(
      'SELECT id, nev FROM jatekok');
    await connection.end();
    return results as Jatekok[];
  }
}