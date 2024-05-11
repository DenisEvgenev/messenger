import Block from 'core/Block';
import { Photo } from 'components/photo';
import { Icon } from 'components/icon';
import AddUserIcon from 'assets/addUser.svg';
import RemoveUserIcon from 'assets/removeUser.svg';
import { SelectedChat } from 'services/setActiveCard';
import { connect } from 'utils/connect';
import isEqual from 'utils/isEqual';
import { FormModal } from 'components/form-modal';
import { Input } from 'components/input';
import { addUsers, removeUsers } from 'services/chats';
import { searchUser } from 'services/user';

type Props = {
    title: string;
    avatar: string | null;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
    selectedChat: SelectedChat;
    loginUser: string;
}

class MainPanelChatTop extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            title: props.selectedChat?.title,
        });
    }

    init() {
        const Avatar = new Photo({ avatar: this.props.selectedChat?.avatar });
        const AddUser = new Icon({
            src: AddUserIcon,
            size: 's',
            events: {
                click: () => this.children.AddingUsersBlock.setProps({ showModal: true }),
            },
        });

        const RemoveUser = new Icon({
            src: RemoveUserIcon,
            size: 's',
            events: {
                click: () => this.children.RemovingUsersBlock.setProps({ showModal: true }),
            },
        });
        const AddingUsersBlock = new FormModal({
            formBody: new Input({
                type: 'text',
                label: 'Логин',
                onBlur: (event) => {
                    const target = event.target as HTMLInputElement;
                    const inputValue = target.value;
                    window.store.set({ loginUser: inputValue });
                },
                name: 'title',
            }),
            title: 'Добавить пользователя',
            onSubmit: async (e: Event) => {
                e.preventDefault();

                const user = await searchUser({ login: this.props.loginUser });

                if (!user || !this.props.selectedChat) {
                    return;
                }

                addUsers({
                    chatId: this.props.selectedChat.id,
                    users: [user[0].id],
                });

                this.children.AddingUsersBlock.setProps({ showModal: false });
            },
        });

        const RemovingUsersBlock = new FormModal({
            formBody: new Input({
                type: 'text',
                label: 'Логин',
                onBlur: (event) => {
                    const target = event.target as HTMLInputElement;
                    const inputValue = target.value;
                    window.store.set({ loginUser: inputValue });
                },
                name: 'title',
            }),
            title: 'Удалить пользователя',
            onSubmit: async (e: Event) => {
                e.preventDefault();

                const user = await searchUser({ login: this.props.loginUser });

                if (!user || !this.props.selectedChat) {
                    return;
                }

                removeUsers({
                    chatId: this.props.selectedChat.id,
                    users: [user[0].id],
                });

                this.children.RemovingUsersBlock.setProps({ showModal: false });
            },
        });

        this.children = {
            ...this.children,
            Avatar,
            AddUser,
            AddingUsersBlock,
            RemovingUsersBlock,
            RemoveUser,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: any; } {
        if (isEqual(oldProps, newProps)) {
            return false;
        }

        if (oldProps.selectedChat?.title !== newProps.selectedChat?.title) {
            this.setProps({
                ...newProps,
                title: newProps.selectedChat?.title,
            });
        }

        return true;
    }

    render(): string {
        return (`
            <div class="main-panel-chat-top">
                {{{ AddingUsersBlock }}}
                {{{ RemovingUsersBlock }}}
                <div class="main-panel-chat-top__avatar">{{{ Avatar }}}</div>
                <p class="main-panel-chat-top__user-name">{{ title }}</p>
                <div class="main-panel-chat-top__settings">{{{ AddUser }}}{{{ RemoveUser }}}</div>
            </div>
        `);
    }
}

const mapStateToProps = ({ selectedChat, loginUser }:
    { loginUser: string; selectedChat: SelectedChat }) =>
    ({ selectedChat, loginUser });

export default connect(mapStateToProps)(MainPanelChatTop);
