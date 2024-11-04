import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, interval, Observable, Subject, tap } from "rxjs";

export type MessageResponse = {
  content: string;
  createdTimestamp: number,
  attachments: {
    id: string;
    proxyUrl: string
  }[]
}

@Injectable()
export class ClientHttpService {
  private static readonly API: string = 'http://localhost:4090';

  public readonly availableMessages: Observable<MessageResponse[]>;
  public readonly messageHistory: Observable<MessageResponse[]>;

  private readonly availableMessages$: Subject<MessageResponse[]>;
  private readonly messageHistory$: Subject<MessageResponse[]>;

  constructor(private readonly http: HttpClient) {
    this.availableMessages$ = new Subject<MessageResponse[]>();
    this.availableMessages = this.availableMessages$;

    this.messageHistory$ = new Subject<MessageResponse[]>();
    this.messageHistory = this.messageHistory$;

    interval(500).subscribe(() => {
      this.getMessages();
    })
  }

  public sendMessage(channelId: string, message: string, files: FileList | null = null): void {
    let params = new HttpParams();
    params = params.set('channelId', channelId);
    params = params.set('message', message);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++)
        formData.append(`file${i.toLocaleString()}`, files[i]);
    }

    this.http.post<unknown>(`${ClientHttpService.API}/send`, formData, { params, headers })
      .pipe(first())
      .subscribe();
  }


  public getMessageHistory(channelId: string) {
    let params = new HttpParams();
    params = params.set('channelId', channelId)
    return this.http.get<MessageResponse[]>(`${ClientHttpService.API}/history`, { params })
      .pipe(tap(msgs => this.messageHistory$.next(msgs)));
  }

  private getMessages(): void {
    this.http.get<MessageResponse[]>(`${ClientHttpService.API}/messages`)
      .pipe(first()).subscribe(messages => {
        this.availableMessages$.next(messages);
      })
  }
}