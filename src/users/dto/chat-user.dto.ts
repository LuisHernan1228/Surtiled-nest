export class ChatUserDto {
  readonly id: number;
  readonly names: string;
  readonly surnames: string;
  readonly imageName?: string;
  readonly role: string;
  readonly socketId?: string;
}
