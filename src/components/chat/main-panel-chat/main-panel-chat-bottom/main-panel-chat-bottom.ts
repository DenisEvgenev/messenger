import Block from 'core/Block';
import { Icon } from 'components/icon';
import FileIcon from 'assets/file.svg';
import ArrowRightIcon from 'assets/arrow-right.svg';
import { Input } from 'components/input';
import { Button } from 'components/button';

type Props = {
    userName?: string;
    avatar?: string;
    lastMessage?: string;
    isYourLastMessage?: boolean;
    time?: string;
    countUnreadedMessages?: number;
    message?: string;
}

export default class MainPanelChatBottom extends Block<Props> {
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
            type: 'invisible',
            label: '',
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

        if (target.value) {
            this.children.Message.setProps({ error: false, errorText: null });
        } else {
            this.children.Message.setProps({
                error: true,
                errorText: 'Сообщение не должно быть пустым',
            });
        }

        this.setProps({ message: inputValue });
    }

    onSendMessage() {
        console.log('===== message ====', this.props.message);
    }

    render(): string {
        return (`
            <div class="main-panel-chat-bottom">
                <div class="main-panel-chat-bottom__file">{{{ File }}}</div>
                <div class="main-panel-chat-bottom__message">{{{ Message }}}</div>
                <div class="main-panel-chat-bottom__send-message">{{{ SendMessage }}}</div>
            </div>
        `);
    }
}
