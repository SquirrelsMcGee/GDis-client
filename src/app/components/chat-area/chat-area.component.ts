import { Component } from '@angular/core';
import { ClientHttpService } from '../../services/client-http-service';
import { InputService } from '../chat-input/input-service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.scss',
  providers: [
    InputService,
    ClientHttpService
  ]
})
export class ChatAreaComponent {
}
