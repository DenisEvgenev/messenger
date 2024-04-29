import { Chat } from 'components';
import Block from 'core/Block';

export default class ChatPage extends Block<object> {
    constructor(props: object) {
        super({
            ...props,
            Chat: new Chat(),
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
