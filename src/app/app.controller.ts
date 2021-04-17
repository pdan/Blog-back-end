import { Context, controller, Get, IAppController, render, Session, UseSessions } from '@foal/core';
import { fetchUser } from '@foal/typeorm';
import { createConnection } from 'typeorm';

import { ApiController } from './controllers';
import { User } from './entities';

@UseSessions({
  cookie: true,
  user: fetchUser(User)
})
export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController)
  ];

  async init() {
    await createConnection();
  }

  @Get('/')
  index() {
    return render('templates/index.html');
  }

  @Get('/user/signin')
  signin(ctx: Context<any, Session>) {
    return render('templates/signin.html', { error: ctx.session.get('error', '') });
  }
  
  @Get('/user/signup')
  signup(ctx: Context<any, Session>) {
    return render('templates/signup.html', { error: ctx.session.get('error', '') });
  }
}