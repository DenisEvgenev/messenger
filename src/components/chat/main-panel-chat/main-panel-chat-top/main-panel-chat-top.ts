import Block from 'core/Block';
import { Photo } from 'components/photo';
import { Icon } from 'components/icon';
import SettingsIcon from 'assets/settings.svg';
import { logout } from 'services/auth';

type Props = {
    userName: string;
    avatar: string;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
}

export default class MainPanelChatTop extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    init() {
        const Avatar = new Photo({ avatar: this.props.avatar });
        const Settings = new Icon({
            src: SettingsIcon,
            size: 'xs',
            events: {
                click: () => logout(),
            },
        });

        this.children = {
            ...this.children,
            Avatar,
            Settings,
        };
    }

    render(): string {
        return (`
            <div class="main-panel-chat-top">
                <div class="main-panel-chat-top__avatar">{{{ Avatar }}}</div>
                <p class="main-panel-chat-top__user-name">{{userName}}</p>
                <div class="main-panel-chat-top__settings">{{{ Settings }}}</div>
            </div>
        `);
    }
}
