import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LoadingService {
  private subject = new Subject<any>();

  sendData(message: boolean) {
    this.subject.next(message);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
