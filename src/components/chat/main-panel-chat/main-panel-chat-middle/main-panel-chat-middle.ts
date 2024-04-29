import Block from 'core/Block';
import { Message } from './message';

type Props = {
    userName: string;
    avatar: string;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
    messagesComponentsKeys?: Array<string>;
}

export default class MainPanelChatMiddle extends Block<Props> {
    constructor(props: Props) {
        const messages = [
            { text: 'Круто!', isHost: true, time: '12:00' },
            {
                text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для '
                + 'полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 '
                + 'EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности '
                + 'Луны, так как астронавты с собой забрали только кассеты с пленкой!',
                isHost: false,
                time: '12:00',
            },
        ];

        const messagesComponents = messages.reduce((acc: Record<string, any>, data) => {
            const component = new Message(data);
            const { id } = component;

            acc[id] = component;
            return acc;
        }, {});

        super({
            ...props,
            messagesComponentsKeys: Object.keys(messagesComponents),
            ...messagesComponents,
        });
    }

    render(): string {
        return (`
            <div class="main-panel-chat-middle">
                ${this.props.messagesComponentsKeys?.map(
                (key: string) => `{{{ ${key} }}}`,
            ).join('')}
            </div>
        `);
    }
}
