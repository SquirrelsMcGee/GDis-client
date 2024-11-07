import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, interval, Observable, Subject, tap } from "rxjs";
import { IChannelResponse } from "../../lib/channel-response";
import { IGuildMemberResponse } from "../../lib/guild-member-response";
import { IGuildResponse } from "../../lib/guild-response";

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
  private readonly API: string = 'http://localhost:4090';

  public readonly guilds: Observable<IGuildResponse[]>;
  public readonly guildChannels: Observable<IChannelResponse[]>;
  public readonly messageHistory: Observable<MessageResponse[]>;
  public readonly availableMessages: Observable<MessageResponse[]>;

  public readonly selectedGuild: Observable<IGuildResponse>;
  public readonly selectedChannel: Observable<IChannelResponse>;

  private readonly guilds$: Subject<IGuildResponse[]>;
  private readonly guildChannels$: Subject<IChannelResponse[]>;
  private readonly messageHistory$: Subject<MessageResponse[]>;
  private readonly availableMessages$: Subject<MessageResponse[]>;

  private readonly selectedGuild$: Subject<IGuildResponse>;
  private readonly selectedChannel$: Subject<IChannelResponse>;

  private guildCache: IGuildResponse[] = [];
  private channelCache: IChannelResponse[] = [];

  constructor(private readonly http: HttpClient) {
    this.guilds$ = new Subject<IGuildResponse[]>();
    this.guildChannels$ = new Subject<IChannelResponse[]>();
    this.availableMessages$ = new Subject<MessageResponse[]>();
    this.messageHistory$ = new Subject<MessageResponse[]>();

    this.guilds = this.guilds$;
    this.guildChannels = this.guildChannels$;
    this.availableMessages = this.availableMessages$;
    this.messageHistory = this.messageHistory$;

    this.selectedGuild$ = new Subject<IGuildResponse>();
    this.selectedChannel$ = new Subject<IChannelResponse>();

    this.selectedChannel = this.selectedChannel$;
    this.selectedGuild = this.selectedGuild$;


    interval(1000).subscribe(() => {
      this.getMessages();
    });

    this.loadInitial();

    this.selectedGuild$.subscribe(guild => {
      //this.getGuildMembers(guild.id).subscribe();
      this.getChannels(guild.id).subscribe(channels => {
        this.channelCache = channels;
        this.guildChannels$.next(channels);

        //if (channels[0])
        //  this.setSelectedChannel(channels[0].id);
      });
    });
  }

  protected loadInitial(): void {
    this.getGuilds().subscribe(guilds => {
      this.guildCache = guilds;
      this.guilds$.next(guilds)

    });
  }

  public setSelectedGuild(guildId: string): void {
    const selected = this.guildCache.find(g => g.id === guildId);
    if (selected)
      this.selectedGuild$.next(selected);
  }

  public setSelectedChannel(channelId: string): void {
    const selected = this.channelCache.find(c => c.id === channelId);
    if (selected)
      this.selectedChannel$.next(selected);
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

    this.http.post<unknown>(`${this.API}/send`, formData, { params, headers })
      .pipe(first())
      .subscribe();
  }

  public getMessageHistory(channelId: string) {
    let params = new HttpParams();
    params = params.set('channelId', channelId)
    return this.http.get<MessageResponse[]>(`${this.API}/history`, { params })
      .pipe(tap(msgs => this.messageHistory$.next(msgs)));
  }

  private getMessages(): void {
    this.http.get<MessageResponse[]>(`${this.API}/messages`)
      .pipe(first()).subscribe(messages => {
        this.availableMessages$.next(messages);
      })
  }

  private getGuilds(): Observable<IGuildResponse[]> {
    return this.http.get<IGuildResponse[]>(this.API + '/guilds');
  }

  private getGuildMembers(guildId: string): Observable<IGuildMemberResponse[]> {
    let params = new HttpParams();
    params = params.set('guildId', guildId);

    return this.http.get<IGuildMemberResponse[]>(this.API + '/guildMembers', { params });
  }

  private getChannels(guildId: string): Observable<IChannelResponse[]> {
    let params = new HttpParams();
    params = params.set('guildId', guildId);

    return this.http.get<IChannelResponse[]>(this.API + '/guildChannels', { params });
  }
}