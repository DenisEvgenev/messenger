import { FormAuth } from '../../components';
import Block from '../../core/Block';

export default class LoginPage extends Block {
    constructor(props) {
        super({
            ...props,
            FormAuth: new FormAuth({}),
        });
    }

    render() {
        return `
            <div class="container">
                {{{ FormAuth }}}
            </div>
        `;
    }
}
