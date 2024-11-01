import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputService } from '../chat-input/input-service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements OnDestroy {
  protected messages: string[] = [
    'test',
    'something',
    'cool!'
  ]

  private sub: Subscription;

  constructor(private readonly inputService: InputService) {
    this.sub = this.inputService.input.subscribe(this.handleMessage.bind(this));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private handleMessage(msg: string): void {
    this.messages.push(msg);
  }
}
