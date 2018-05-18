import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  test():string {
    return 'working!';
  }

  constructor() { }
}
