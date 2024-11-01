import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatAreaComponent,
    ChatInputComponent,
    ChatMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
