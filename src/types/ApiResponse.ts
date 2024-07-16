import {Message} from '@/model/User'

export interface ApiResponse {
    success:boolean;
    message:string;
    isAccceptingMessages?:boolean;
    messages?:Array<Message>;
}