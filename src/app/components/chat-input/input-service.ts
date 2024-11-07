import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IChannelResponse } from "../../../lib/channel-response";
import { ClientHttpService } from "../../services/client-http-service";

@Injectable()
export class InputService {
    public readonly input: Observable<string>;

    private readonly inputSubject$: Subject<string>;

    private selectedChannel?: IChannelResponse;

    constructor(private readonly clientService: ClientHttpService) {
        this.inputSubject$ = new Subject<string>();
        this.input = this.inputSubject$;

        this.clientService.selectedChannel.subscribe(channel => this.selectedChannel = channel);
    }

    public sendMessage(msg: string, files: FileList | null = null) {
        if (!this.selectedChannel)
            return;

        this.inputSubject$.next(msg);
        this.clientService.sendMessage(this.selectedChannel.id, msg, files);
    }

}