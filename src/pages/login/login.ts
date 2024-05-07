import { FormAuth, FormWrapper, PopupError } from 'components';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { login } from 'services/auth';

type Props = {
    loginField: string;
    passwordField: string;
    loginError: string;
}
class LoginPage extends Block<Props> {
    init() {
        const FormWrapperBlock = new FormWrapper({
            FormBody: new FormAuth(),
            onSubmit: (e: Event) => {
                e.preventDefault();
                login({ login: this.props.loginField, password: this.props.passwordField });
            },
        });
        const PopupErrorBlock = new PopupError({});

        this.children = {
            ...this.children,
            FormWrapperBlock,
            PopupErrorBlock,
        };
    }

    render() {
        return `
            <div class="container">
                {{{ PopupErrorBlock }}}
                {{{ FormWrapperBlock }}}
            </div>
        `;
    }
}

const mapStateToProps = ({ loginField, passwordField, loginError }: Props) =>
    ({ loginField, passwordField, loginError });

export default connect(mapStateToProps)(LoginPage);
