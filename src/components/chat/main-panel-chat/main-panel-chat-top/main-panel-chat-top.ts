import Block from 'core/Block';
import { Photo } from 'components/photo';
import { Icon } from 'components/icon';
import SettingsIcon from 'assets/settings.svg';

export default class MainPanelChatTop extends Block {
    constructor(props) {
        super({
            ...props,
            Settings: new Icon({ src: SettingsIcon, size: 'xs' }),
        });
    }

    init() {
        const Avatar = new Photo({ avatar: this.props.avatar, type: 'top' });

        this.children = {
            ...this.children,
            Avatar,
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
