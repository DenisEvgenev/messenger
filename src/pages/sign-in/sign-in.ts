import { FormSignIn, FormWrapper, PopupError } from 'components';
import Block from 'core/Block';
import { registration } from 'services/auth';
import { connect } from 'utils/connect';

type Props = {
    loginField: string;
    passwordField: string;
    firstNameField: string;
    secondNameField: string;
    emailField: string;
    phoneField: string;
}

class SignInPage extends Block<Props> {
    init() {
        const FormWrapperBlock = new FormWrapper({
            FormBody: new FormSignIn(),
            onSubmit: (e: Event) => {
                e.preventDefault();
                registration({
                    login: this.props.loginField,
                    password: this.props.passwordField,
                    first_name: this.props.firstNameField,
                    second_name: this.props.secondNameField,
                    email: this.props.emailField,
                    phone: this.props.phoneField,
                });
            },
        });
        const PopupErrorBlock = new PopupError({});

        this.children = {
            ...this.children,
            FormWrapperBlock,
            PopupErrorBlock,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        this.children.FormWrapperBlock.children.FormBody.setProps({ ...oldProps, ...newProps });
        return true;
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

const mapStateToProps = ({
    loginField,
    passwordField,
    firstNameField,
    secondNameField,
    emailField,
    phoneField,
}: Props) =>
    ({
        loginField,
        passwordField,
        firstNameField,
        secondNameField,
        emailField,
        phoneField,
    });

export default connect(mapStateToProps)(SignInPage);
