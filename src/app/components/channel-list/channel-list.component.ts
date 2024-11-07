import { Component } from "@angular/core";
import { IChannelResponse } from "../../../lib/channel-response";
import { ClientHttpService } from "../../services/client-http-service";

@Component({
  selector: 'channel-list',
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
})
export class ChannelListComponent {
  protected channels: IChannelResponse[] = [];

  protected selectedChannelId: string = '';

  constructor(private readonly clientService: ClientHttpService) {
    this.clientService.guildChannels.subscribe(channels => this.channels = channels);
  }


  onChannelClick(channelId: string) {
    this.selectedChannelId = channelId;
    this.clientService.setSelectedChannel(channelId);
  }
}