import { Photo } from 'components/photo';
import Block from 'core/Block';

export default class UserMessageBlock extends Block {
    constructor(props) {
        super({ ...props });
    }

    init() {
        const Avatar = new Photo({ avatar: this.props.avatar });

        this.children = {
            ...this.children,
            Avatar,
        };
    }

    render(): string {
        return (
            `
            <div class="user-message-block {{#if isChoosen}}user-message-block__choosen{{/if}}">
                {{{ Avatar }}}
                <div class="user-message-block__column-middle">
                    <p class="user-message-block__user-name">{{ userName }}</p>
                    <div class="user-message-block__last-message">
                        {{#if isYourLastMessage}}
                            <p class="user-message-block__last-message-black">Вы:</p>
                        {{/if}}
                        <p class="user-message-block__last-message-gray">{{ lastMessage }}</p>
                    </div>
                </div>
                <div class="user-message-block__column-last">
                    <p class="user-message-block__time">{{ time }}</p>
                    {{#if countUnreadedMessages}}
                        <div class="user-message-block__count-message">
                            {{ countUnreadedMessages }}
                        </div>
                    {{/if}}
                </div>
            </div>
            `
        );
    }
}
