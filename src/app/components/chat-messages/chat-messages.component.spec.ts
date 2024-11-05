import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { ClientHttpService } from '../../services/client-http-service';
import { InputService } from '../chat-input/input-service';
import { ChatMessagesComponent } from './chat-messages.component';

describe('ChatMessagesComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ChatMessagesComponent],
      providers: [
        InputService,
        ClientHttpService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
