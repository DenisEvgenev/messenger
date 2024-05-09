import Block from 'core/Block';
import { MainPanelChatTop } from './main-panel-chat-top';
import { MainPanelChatBottom } from './main-panel-chat-bottom';
import { MainPanelChatMiddle } from './main-panel-chat-middle';

type Props = {
    userName: string;
    avatar: string;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
}

class MainPanelChat extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    init() {
        const MainPanelTop = new MainPanelChatTop(this.props);
        const MainPanelMiddle = new MainPanelChatMiddle(this.props);
        const MainPanelBottom = new MainPanelChatBottom(this.props);

        this.children = {
            ...this.children,
            MainPanelTop,
            MainPanelMiddle,
            MainPanelBottom,
        };
    }

    render(): string {
        return (`
            <div class="main-panel-chat">
                {{{ MainPanelTop }}}
                {{{ MainPanelMiddle }}}
                {{{ MainPanelBottom }}}
            </div>
        `);
    }
}

export default MainPanelChat;
