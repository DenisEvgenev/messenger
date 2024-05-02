import { Button, Title } from 'components';
import Block from '../../core/Block';

export default class ClientErrorPage extends Block<object> {
    constructor(props: object) {
        super({
            ...props,
            TitleMain: new Title({ title: '404', type: 'main' }),
            Text: new Title({ title: 'Не туда попали' }),
            ButtonChat: new Button({ type: 'link', page: 'chat', label: 'Назад к чатам' }),
        });
    }

    render() {
        return `
        <div class="container">
            {{{ TitleMain }}}
            {{{ Text }}}
            {{{ ButtonChat }}}
        </div>
        `;
    }
}
