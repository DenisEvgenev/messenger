import { Photo } from 'components/photo';
import Block from 'core/Block';
import { setActiveCard } from 'services/setActiveCard';

type Props = {
    avatar: string | null;
    groupName: string;
    isYourLastMessage: boolean;
    lastMessage: string;
    time: string;
    countUnreadedMessages: number;
    id: number;
    isChoosen?: boolean;
    activeId: number | null;
    events?: {
        click: () => void;
    }
}
export default class UserMessageBlock extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            isChoosen: props.activeId === props.id,
            events: {
                click: () => {
                    const card = {
                        id: props.id,
                        avatar: props.avatar,
                        title: props.groupName,
                    };
                    setActiveCard(card);
                },
            },
        });
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
                    <p class="user-message-block__user-name">{{ groupName }}</p>
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
