import Block from 'core/Block';
import { Icon } from 'components/icon';
import FileIcon from 'assets/file.svg';
import ArrowRightIcon from 'assets/arrow-right.svg';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { sendMessage } from 'core/WSTransport';

type Props = {
    userName?: string;
    avatar?: string;
    lastMessage?: string;
    isYourLastMessage?: boolean;
    time?: string;
    countUnreadedMessages?: number;
    message?: string;
    events?: {
        submit: (event: Event) => void;
    }
}

export default class MainPanelChatBottom extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: (event) => {
                    event.preventDefault();
                },
            },
        });
    }

    init() {
        const onSendMessageBind = this.onSendMessage.bind(this);
        const onChangeMessageBind = this.onChangeMessage.bind(this);

        const File = new Icon({ src: FileIcon, size: 'l' });
        const SendMessageIcon = new Icon({
            src: ArrowRightIcon,
            size: 'm',
        });
        const Message = new Input({
            name: 'message',
            type: 'text',
            label: 'Сообщение',
            onBlur: onChangeMessageBind,
        });
        const SendMessage = new Button({
            type: 'submit',
            label: '',
            className: 'send-message',
            events: {
                click: onSendMessageBind,
            },
            icon: ArrowRightIcon,
        });

        this.children = {
            ...this.children,
            File,
            SendMessageIcon,
            SendMessage,
            Message,
        };
    }

    onChangeMessage(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        this.setProps({ message: inputValue });
    }

    onSendMessage() {
        const focusableElement = document.querySelector(
            '.input__element[name="message"]',
        ) as HTMLInputElement;

        focusableElement.blur();
        if (this.props.message) {
            focusableElement.value = '';

            sendMessage(this.props.message);
            this.children.Message.setProps({ text: '' });
        }
        focusableElement.focus();
    }

    render(): string {
        return (`
            <form class="main-panel-chat-bottom">
                <div class="main-panel-chat-bottom__message">{{{ Message }}}</div>
                <div class="main-panel-chat-bottom__send-message">{{{ SendMessage }}}</div>
            </form>
        `);
    }
}
