export interface IMessageResponse {
  content: string;
  createdTimestamp: number;
  attachments: IMessageAttachment[]
}

export interface IMessageAttachment {
  id: string;
  proxyUrl: string
}