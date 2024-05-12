import { Chat, PopupError } from 'components';
import Block from 'core/Block';

export default class ChatPage extends Block<object> {
    constructor(props: object) {
        super({
            ...props,
            Chat: new Chat(),
            PopupError: new PopupError({}),
        });
    }

    render() {
        return `
            <div>
                {{{ PopupError }}}
                {{{ Chat }}}
            </div>
        `;
    }
}
