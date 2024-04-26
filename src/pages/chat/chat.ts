import { Chat } from 'components';
import Block from '../../core/Block';

export default class ChatPage extends Block {
    constructor(props) {
        super({
            ...props,
            Chat: new Chat({}),
        });
    }

    render() {
        return `
            <div>
                {{{ Chat }}}
            </div>
        `;
    }
}
