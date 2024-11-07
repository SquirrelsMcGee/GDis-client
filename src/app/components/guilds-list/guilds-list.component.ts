import { Component } from "@angular/core";
import { IGuildResponse } from "../../../lib/guild-response";
import { ClientHttpService } from "../../services/client-http-service";

@Component({
  selector: 'guild-list',
  templateUrl: './guilds-list.component.html',
  styleUrl: './guilds-list.component.scss'
})
export class GuildsListComponent {
  protected guilds: IGuildResponse[] = [];

  protected selectedGuildId: string = '';

  constructor(private readonly clientService: ClientHttpService) {
    this.clientService.guilds.subscribe(guilds => this.guilds = guilds);
  }

  onGuildClick(guildId: string) {
    this.selectedGuildId = guildId;
    this.clientService.setSelectedGuild(guildId);
  }
}