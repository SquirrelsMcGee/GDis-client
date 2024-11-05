import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { ClientHttpService } from '../../services/client-http-service';
import { InputService } from '../chat-input/input-service';
import { ChatAreaComponent } from './chat-area.component';

describe('ChatAreaComponent', () => {
  let component: ChatAreaComponent;
  let fixture: ComponentFixture<ChatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ChatAreaComponent],
      providers: [
        InputService,
        ClientHttpService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
