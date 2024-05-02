import { FormSignIn, FormWrapper } from 'components';
import Block from 'core/Block';

export default class SignInPage extends Block<object> {
    init() {
        const FormWrapperBlock = new FormWrapper({
            FormBody: new FormSignIn(),
        });

        this.children = {
            ...this.children,
            FormWrapperBlock,
        };
    }

    render() {
        return `
            <div class="container">
                {{{ FormWrapperBlock }}}
            </div>
        `;
    }
}
