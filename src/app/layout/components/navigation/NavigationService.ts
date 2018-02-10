import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Injectable} from "react.di";

@Injectable
export class NavigationService {

  isOpen: Observable<boolean>;

  private isOpenSubject: Subject<boolean>;

  constructor() {
    this.isOpenSubject = new Subject<boolean>();
    this.isOpen = this.isOpenSubject.asObservable();
  }

  setOpen(isOpen: boolean) {
    this.isOpenSubject.next(isOpen);
  }

}
