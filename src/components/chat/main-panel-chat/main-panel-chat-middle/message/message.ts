import Block from 'core/Block';

type Props = {
    text: string;
    isHost: boolean;
    time: string;
}

export default class Message extends Block<Props> {
    render(): string {
        return (`
            <div class="main-panel-chat-middle__message `
            + `{{#if isHost}}main-panel-chat-middle__message-host{{/if}}">
                <div class="main-panel-chat-middle__message-text">{{ text }}</div>
                <div class="main-panel-chat-middle__message-time">{{ time }}</div>
            </div>
        `);
    }
}
