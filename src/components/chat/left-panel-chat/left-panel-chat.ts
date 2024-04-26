import { Button } from 'components/button';
import { Input } from 'components/input';
import emptyPhoto from 'assets/empty.png';
import Block from 'core/Block';
import { UserMessageBlock } from './user-message-block';

export default class LeftPanelChat extends Block {
    constructor(props) {
        const userMessages = [
            {
                userName: 'Андрей',
                avatar: emptyPhoto,
                lastMessage: 'Изображение',
                isYourLastMessage: false,
                time: '10:49',
                countUnreadedMessages: 2,
            },
            {
                userName: 'Илья',
                avatar: emptyPhoto,
                lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
                isYourLastMessage: false,
                time: '15:12',
                countUnreadedMessages: 4,
            },
            {
                userName: 'Вадим',
                avatar: emptyPhoto,
                lastMessage: 'Круто',
                isYourLastMessage: true,
                time: '15:12',
                countUnreadedMessages: 0,
                isChoosen: true,
            },
        ];

        const userMessagesComponents = userMessages.reduce((acc, data) => {
            const component = new UserMessageBlock(data);

            acc[component.id] = component;
            return acc;
        }, {});

        super({
            ...props,
            userMessagesComponentsKeys: Object.keys(userMessagesComponents),
            ...userMessagesComponents,
        });
    }

    init() {
        const ButtonProfile = new Button({
            label: 'Профиль >',
            type: 'link-chat',
            page: 'profile',
        });
        const SearchLine = new Input({ type: 'search-line', label: '🔍 Поиск' });

        this.children = {
            ...this.children,
            ButtonProfile,
            SearchLine,
        };
    }

    render(): string {
        return (`
            <div class="left-panel-chat">
                {{{ ButtonProfile }}}
                {{{ SearchLine }}}
                ${this.props.userMessagesComponentsKeys
                .map(
                    (key: string) => `{{{ ${key} }}}`,
                ).join('')
            }
            </div>
        `);
    }
}
