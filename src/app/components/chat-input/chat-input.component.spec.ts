import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { ClientHttpService } from '../../services/client-http-service';
import { ChatInputComponent } from './chat-input.component';
import { InputService } from './input-service';

describe('ChatInputComponent', () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ChatInputComponent],
      providers: [
        InputService,
        ClientHttpService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
