import { Component } from '@angular/core';
import { first } from 'rxjs';
import { ClientHttpService, MessageResponse } from '../../services/client-http-service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent {
  protected messages: MessageResponse[] = []

  constructor(
    private readonly clientService: ClientHttpService,
  ) {
    this.clientService.availableMessages.subscribe(msgs => {
      this.messages = this.messages.concat(msgs);
    });

    this.clientService.selectedChannel.subscribe(channel => {
      this.messages = [];
      this.clientService.getMessageHistory(channel.id)
        .pipe(first())
        .subscribe((msgs) => {
          msgs = msgs.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
          this.messages = this.messages.concat(msgs)
        });
    });


  }


  isImageOrVideo(url: string): "image" | "video" | "unknown" {
    // List of common image and video extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    const videoExtensions = ["mp4", "mov", "wmv", "flv", "avi", "webm", "mkv"];

    // Extract the file extension from the URL by removing query parameters
    const cleanUrl = url.split('?')[0]; // Removes everything after '?'
    const extension = cleanUrl.split('.').pop()?.toLowerCase();

    if (extension) {
      if (imageExtensions.includes(extension)) {
        return 'image';  // Return true if it's an image
      } else if (videoExtensions.includes(extension)) {
        return 'video'; // Return false if it's a video
      }
    }

    return 'unknown'; // Return null if it's neither an image nor a video
  }
}
