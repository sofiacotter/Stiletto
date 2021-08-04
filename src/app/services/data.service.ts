import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userDetails } from '../details';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private user: userDetails = {
    uid: '',
    email: '', 
    username: '',
    profilephoto: ''
  };

  private messageSource = new BehaviorSubject(this.user);
  
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(msg: userDetails) {
  
    this.messageSource.next(msg)
  }
}
