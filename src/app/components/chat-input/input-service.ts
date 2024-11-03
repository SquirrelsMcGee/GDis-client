import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ClientHttpService } from "../../services/client-http-service";

@Injectable()
export class InputService {
    public readonly input: Observable<string>;

    private readonly inputSubject$: Subject<string>;

    constructor(private readonly clientService: ClientHttpService) {
        this.inputSubject$ = new Subject<string>();
        this.input = this.inputSubject$;
    }

    public sendMessage(msg: string, files: FileList | null = null) {
        this.inputSubject$.next(msg);
        this.clientService.sendMessage('PLACEHOLDER', msg, files);
    }

}