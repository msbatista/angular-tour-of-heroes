import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  readonly messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  get(): string[] {
    return this.messages;
  }

  clear(): void {
    this.messages.length = 0;
  }
}
