import Block from 'core/Block';

type Props = {
    content: string;
    isYourLastMessage: boolean;
    time: string;
}

export default class Message extends Block<Props> {
    render(): string {
        return (`
            <div class="main-panel-chat-middle__message `
            + `{{#if isYourLastMessage}}main-panel-chat-middle__message-host{{/if}}">
                <div class="main-panel-chat-middle__message-text">{{ content }}</div>
                <div class="main-panel-chat-middle__message-time">{{ time }}</div>
            </div>
        `);
    }
}
