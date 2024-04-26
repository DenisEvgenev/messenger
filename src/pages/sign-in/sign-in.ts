import { FormSignIn } from '../../components';
import Block from '../../core/Block';

export default class SignInPage extends Block {
    constructor(props) {
        super({
            ...props,
            FormSignIn: new FormSignIn({}),
        });
    }

    render() {
        return `
            <div class="container">
                {{{ FormSignIn }}}
            </div>
        `;
    }
}
