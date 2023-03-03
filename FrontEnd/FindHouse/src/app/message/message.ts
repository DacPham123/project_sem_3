export interface IMessage {
    id: number;
    senderId: string;
    senderUsername: string;
    recipientId: string;
    recipientUsername: string;
    content: string;
    dateRead?: Date;
    messageSent: Date;
}