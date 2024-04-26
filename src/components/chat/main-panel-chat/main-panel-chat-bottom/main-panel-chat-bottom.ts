import Block from 'core/Block';
import { Icon } from 'components/icon';
import FileIcon from 'assets/file.svg';
import ArrowRightIcon from 'assets/arrow-right.svg';
import { Input } from 'components/input';
import { Button } from 'components/button';

export default class MainPanelChatBottom extends Block {
    init() {
        const onSendMessageBind = this.onSendMessage.bind(this);
        const onChangeMessageBind = this.onChangeMessage.bind(this);

        const File = new Icon({ src: FileIcon, size: 'l' });
        const SendMessageIcon = new Icon({
            src: ArrowRightIcon,
            size: 'm',
        });
        const Message = new Input({
            type: 'message',
            label: 'Сообщение',
            onBlur: onChangeMessageBind,
        });
        const SendMessage = new Button({
            type: 'invisible',
            label: '',
            onClick: onSendMessageBind,
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

    onChangeMessage({ target }) {
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
        console.log('===== onSendMessage ====', this.props.message);
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
