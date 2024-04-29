import { FormAuth, FormWrapper } from 'components';
import Block from 'core/Block';

export default class LoginPage extends Block<object> {
    init() {
        const FormWrapperBlock = new FormWrapper({
            FormBody: new FormAuth(),
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
