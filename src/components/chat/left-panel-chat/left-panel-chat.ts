import { Button } from 'components/button';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { ChatDTO, UserDTO } from 'api/types';
import { ListElements } from 'components/list-elements';
import { FormModal } from 'components/form-modal';
import { createChat, getChats } from 'services/chats';
import { Input } from 'components/input';
import isEqual from 'utils/isEqual';
import { SelectedChat } from 'services/setActiveCard';
import getNormalFormatTime from 'utils/getNormalFormatTime';
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
        return chatCards?.map((data) =>
            new UserMessageBlock({
                id: data.id,
                avatar: data.avatar,
                groupName: data.title,
                isYourLastMessage: this.props.userData?.login === data.last_message?.user.login,
                lastMessage: data.last_message?.content,
                time: getNormalFormatTime(data.last_message?.time),
                countUnreadedMessages: data.unread_count,
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
            onSubmit: async (e: Event) => {
                e.preventDefault();

                const focusableElements = document.querySelectorAll('input');

                focusableElements.forEach((element) => {
                    element.blur();
                });

                if (this.props.chatTitleField) {
                    const createChatResult = await createChat({ title: this.props.chatTitleField });

                    if (createChatResult) {
                        await getChats();
                        this.children.AddingChatBlock.setProps({ showModal: false });
                    }
                }
            },
        });

        const ButtonAddingChat = new Button({
            label: 'Добавить чат',
            type: 'add-chat',
            events: {
                click: () => this.children.AddingChatBlock.setProps({ showModal: true }),
            },
        });

        const ListChats = new ListElements(
            { elements: this.mapChatCardToComponent(this.props.chats, null) || [] },
        );

        this.children = {
            ...this.children,
            ButtonProfile,
            AddingChatBlock,
            ListChats,
            ButtonAddingChat,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (!isEqual(oldProps, newProps)) {
            this.children.ListChats.setProps({
                elements: this.mapChatCardToComponent(
                    newProps.chats,
                    newProps.selectedChat?.id,
                ) || [],
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
                <div class="left-panel-chat__list">
                    {{{ ListChats }}}
                </div>
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
