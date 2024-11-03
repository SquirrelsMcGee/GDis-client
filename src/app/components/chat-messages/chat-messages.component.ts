import { Component, OnDestroy } from '@angular/core';
import { Message } from 'discord.js';
import { first } from 'rxjs';
import { ClientHttpService } from '../../services/client-http-service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements OnDestroy {
  protected messages: Message[] = []

  constructor(
    private readonly clientService: ClientHttpService,
  ) {
    this.clientService.availableMessages.subscribe(msgs => {
      this.messages = this.messages.concat(msgs);
    });

    this.clientService.getMessageHistory('PLACEHOLDER')
      .pipe(first())
      .subscribe((msgs) => {
        msgs = msgs.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
        this.messages = this.messages.concat(msgs)
      });
  }

  ngOnDestroy(): void {
  }
}
