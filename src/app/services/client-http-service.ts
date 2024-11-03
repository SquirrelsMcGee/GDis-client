import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from 'discord.js';
import { first, interval, Observable, Subject, tap } from "rxjs";

@Injectable()
export class ClientHttpService {
  private static readonly API: string = 'http://localhost:4090';

  public readonly availableMessages: Observable<Message[]>;
  public readonly messageHistory: Observable<Message[]>;

  private readonly availableMessages$: Subject<Message[]>;
  private readonly messageHistory$: Subject<Message[]>;

  constructor(private readonly http: HttpClient) {
    this.availableMessages$ = new Subject<Message[]>();
    this.availableMessages = this.availableMessages$;

    this.messageHistory$ = new Subject<Message[]>();
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
    return this.http.get<Message[]>(`${ClientHttpService.API}/history`, { params })
      .pipe(tap(msgs => this.messageHistory$.next(msgs)));
  }

  private getMessages(): void {
    this.http.get<Message[]>(`${ClientHttpService.API}/messages`)
      .pipe(first()).subscribe(messages => {
        this.availableMessages$.next(messages);
      })
  }
}