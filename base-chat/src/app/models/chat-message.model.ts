export class ChatMessage {
    $key? : string;
    email? : string;
    username? : string;
    message? : string;
    timestamp? : Date = new Date();
}