/* eslint-disable max-len */
import Block from 'core/Block';

export default class Message extends Block {
    constructor(props) {
        super({
            ...props,
        });
    }

    render(): string {
        return (`
            <div class="main-panel-chat-middle__message {{#if isHost}}main-panel-chat-middle__message-host{{/if}}">
                <div class="main-panel-chat-middle__message-text">{{ text }}</div>
                <div class="main-panel-chat-middle__message-time">{{ time }}</div>
            </div>
        `);
    }
}
