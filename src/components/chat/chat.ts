import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';
import { getChats } from 'services/chats';
import { LeftPanelChat } from './left-panel-chat';
import { MainPanelChat } from './main-panel-chat';

export default class Chat extends Block<object> {
    componentDidMount() {
        getChats();
    }

    init() {
        const LeftPanel = new LeftPanelChat({});
        const MainPanel = new MainPanelChat({
            userName: 'Андрей',
            avatar: emptyPhoto,
            lastMessage: 'Изображение',
            isYourLastMessage: false,
            time: '10:49',
            countUnreadedMessages: 2,
        });

        this.children = {
            ...this.children,
            LeftPanel,
            MainPanel,
        };
    }

    render() {
        return (`
            <div class="chat">
                {{{ LeftPanel }}}
                {{{ MainPanel }}}
            </div>
        `);
    }
}
