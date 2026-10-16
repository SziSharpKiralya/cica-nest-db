import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('macskak')
  @Render('macskak')
  async getMacskak() {
    return {
      title: 'Macskák Listája',
      macskak: await this.appService.macskakLista(),
    }
  }
    
  @Get('jatekok')
  @Render('jatekok')
  async getJatekok() {
    return {
      title: 'Játékok Listája',
      jatekok: await this.appService.jatekokLista(),
    }
  }

  @Get('macskaKeres')
  @Render('macskaKeres')
  async getMacskaKeres(@Query('szemszin') szemszin: string = '') {
    return {
      title: 'Macska Keresés',
      macskakSzurt: await this.appService.getMacskaBySzemSzin(szemszin),
    }
  }

  @Get('ujJatek')
  @Render('ujJatek')
  async getUjJatek() {
    return {
      title: 'Új Játék'
    }
  }

  @Post('ujJatek')
  async postUjJatek(@Body() body: { nev: string }) {
    await this.appService.createJatek(body.nev);
    return "Sikeres feltöltés"
  }
}