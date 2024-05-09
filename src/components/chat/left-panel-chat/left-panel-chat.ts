import { Button } from 'components/button';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { ChatDTO, UserDTO } from 'api/types';
import { ListChats } from 'components/list-chats';
import { FormModal } from 'components/form-modal';
import { createChat } from 'services/chats';
import { Input } from 'components/input';
import isEqual from 'utils/isEqual';
import { SelectedChat } from 'services/setActiveCard';
import { UserMessageBlock } from './user-message-block';

type Props = {
    userMessagesComponentsKeys?: Array<string>;
    userData?: UserDTO;
    chats: Array<ChatDTO>;
    chatTitleField?: string;
    selectedChat: SelectedChat;
}

class LeftPanelChat extends Block<Props> {
    mapChatCardToComponent(chatCards: Array<ChatDTO>, activeId: number | null) {
        const lastMessage = {
            user: {
                first_name: 'Petya',
                second_name: 'Pupkin',
                avatar: '/path/to/avatar.jpg',
                email: 'my@email.com',
                login: 'userLogin',
                phone: '8(911)-222-33-22',
            },
            time: '2020-01-02T14:22:22.000Z',
            content: 'this is message content',
        };

        return chatCards?.map((data) =>
            new UserMessageBlock({
                id: data.id,
                avatar: data.avatar,
                groupName: data.title,
                isYourLastMessage: this.props.userData?.login === lastMessage.user.login,
                lastMessage: lastMessage.content,
                time: `${new Date(lastMessage.time).getHours().toString().padStart(2, '0')}:`
                + `${new Date(lastMessage.time).getMinutes().toString().padStart(2, '0')}`,
                countUnreadedMessages: 1,
                activeId,
            }));
    }

    init() {
        const ButtonProfile = new Button({
            label: 'Профиль >',
            type: 'link-chat',
            events: {
                click: () => window.router.go('/settings'),
            },
        });

        const AddingChatBlock = new FormModal({
            formBody: new Input({
                type: 'text',
                label: 'Название чата',
                onBlur: (event) => {
                    const target = event.target as HTMLInputElement;
                    const inputValue = target.value;
                    window.store.set({ chatTitleField: inputValue });
                },
                name: 'title',
            }),
            onSubmit: (e: Event) => {
                e.preventDefault();
                createChat({ title: this.props.chatTitleField });
            },
        });

        const ButtonAddingChat = new Button({
            label: 'Добавить чат',
            type: 'add-chat',
            events: {
                click: () => this.children.AddingChatBlock.setProps({ showModal: true }),
            },
        });

        const ListChatsBlock = new ListChats(
            { chats: this.mapChatCardToComponent(this.props.chats, null) || [] },
        );

        this.children = {
            ...this.children,
            ButtonProfile,
            AddingChatBlock,
            ListChatsBlock,
            ButtonAddingChat,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: any; } {
        if (!isEqual(oldProps, newProps)) {
            this.children.ListChatsBlock.setProps({
                chats: this.mapChatCardToComponent(newProps.chats, newProps.selectedChat?.id) || [],
                showEmpty: newProps.chats?.length === 0,
            });
        }

        return true;
    }

    render(): string {
        return (`
            <div class="left-panel-chat">
                {{{ ButtonProfile }}}
                {{{ ButtonAddingChat }}}
                {{{ AddingChatBlock }}}
                {{{ ListChatsBlock }}}
            </div>
        `);
    }
}

const mapStateToProps = ({
    chats, userData, chatTitleField, selectedChat,
}: Props) =>
    ({
        chats, userData, chatTitleField, selectedChat,
    });
export default connect(mapStateToProps)(LeftPanelChat);
