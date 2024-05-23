import Block from 'core/Block';
import { createWebSocket } from 'core/WSTransport';
import { connect } from 'utils/connect';
import isEqual from 'utils/isEqual';
import { SelectedChat } from 'services/setActiveCard';
import { UserDTO, Messages } from 'api/types';
import { ListElements } from 'components/list-elements';
import { Message } from './message';

type Props = {
    userName: string;
    avatar: string;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
    messagesComponentsKeys?: Array<string>;
    selectedChat?: SelectedChat;
    userData?: UserDTO;
    messages: Messages;
    chatActive?: boolean;
    messageCount?: string;
}

class MainPanelChatMiddle extends Block<Props> {
    private messages: Messages = [];

    mapChatMessagesToComponent(messages: Messages) {
        return messages?.map(({ content, time, user_id: userId }) =>
            new Message({
                content,
                isYourLastMessage: this.props.userData?.id === userId,
                time: `${new Date(time).getHours().toString().padStart(2, '0')}:`
                + `${new Date(time).getMinutes().toString().padStart(2, '0')}`,
            })).reverse();
    }

    init() {
        const ListMessages = new ListElements(
            {
                elements: this.mapChatMessagesToComponent(this.props.messages) || [],
                className: 'main-panel-chat-middle__empty',
            },
        );

        this.children = {
            ...this.children,
            ListMessages,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (isEqual(oldProps, newProps)) {
            return false;
        }

        if (!isEqual(oldProps.selectedChat, newProps.selectedChat)) {
            this.messages = [];
        }

        if (!isEqual(oldProps.messages, newProps.messages)) {
            if (!Array.isArray(newProps.messages)) {
                this.messages.unshift(newProps.messages);
            } else {
                newProps.messages?.forEach((message) => this.messages.push(message));
            }

            const elements = this.mapChatMessagesToComponent(this.messages);

            this.children.ListMessages.setProps({
                elements,
                showEmpty: newProps.messages.length,
            });
        }

        if (newProps.selectedChat && oldProps.selectedChat !== newProps.selectedChat
            && newProps.userData && !newProps.chatActive) {
            createWebSocket(newProps.selectedChat.id, newProps.userData.id);
        }
        return true;
    }

    render(): string {
        return (`
            <div id="messages" class="main-panel-chat-middle">
                {{{ ListMessages }}}
            </div>
        `);
    }
}

const mapStateToProps = ({
    selectedChat, userData, chatActive, messages,
}: Props) =>
    ({
        selectedChat, userData, chatActive, messages,
    });
export default connect(mapStateToProps)(MainPanelChatMiddle);
