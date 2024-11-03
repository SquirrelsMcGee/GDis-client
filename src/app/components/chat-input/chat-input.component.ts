import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputService } from './input-service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  protected form: FormGroup;

  private files: FileList | null = null;

  @ViewChild('fileInput')
  private fileInput!: ElementRef;

  constructor(private readonly inputService: InputService) {
    this.form = new FormGroup({
      input: new FormControl('')
    })
  }

  submit() {
    const msg = this.form.get('input')?.value ?? '';
    this.inputService.sendMessage(msg, this.files);

    this.fileInput.nativeElement.value = '';
    this.files = null;
    this.form.reset();
  }

  onFile($event: Event) {
    const htmlElement = $event.target as HTMLInputElement;
    if (!htmlElement.files)
      return;

    this.files = htmlElement.files;
  }
}
