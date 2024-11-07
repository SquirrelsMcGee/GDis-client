import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { GuildsListComponent } from './components/guilds-list/guilds-list.component';
import { ClientHttpService } from './services/client-http-service';

@NgModule({
  declarations: [
    AppComponent,

    GuildsListComponent,
    ChannelListComponent,
    ChatAreaComponent,
    ChatInputComponent,
    ChatMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ClientHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
