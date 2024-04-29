import { Button, Title } from 'components';
import Block from 'core/Block';

export default class ServerErrorPage extends Block<object> {
    constructor(props: object) {
        super({
            ...props,
            TitleMain: new Title({ title: '500', type: 'main' }),
            Text: new Title({ title: 'Мы уже фиксим' }),
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
