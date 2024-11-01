import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup} from '@angular/forms';
import { InputService } from './input-service';


@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  protected form: FormGroup;

  constructor(private readonly inputService: InputService) {
    this.form = new FormGroup({
      input: new FormControl('')
    })
  }

  submit() {
    const msg = this.form.get('input')?.value ?? '';
    this.inputService.sendMessage(msg);
    this.form.reset();
  }
}
