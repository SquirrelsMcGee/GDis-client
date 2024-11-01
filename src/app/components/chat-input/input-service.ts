import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class InputService {
    public readonly input: Observable<string>;

    private readonly inputSubject$: Subject<string>;

    constructor() {
        this.inputSubject$ = new Subject<string>();
        this.input = this.inputSubject$;
    }

    public sendMessage(msg: string) {
        this.inputSubject$.next(msg);
    }

}