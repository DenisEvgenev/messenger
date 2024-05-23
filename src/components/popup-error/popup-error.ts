import Block from 'core/Block';
import { connect } from 'utils/connect';

type Props = {
    popupErrorText?: string;
}

class PopupError extends Block<Props> {
    render() {
        return `
            <div class="popup-error{{#if popupErrorText}} popup-error__active{{/if}}">
                {{ popupErrorText }}
            </div>
        `;
    }
}

const mapStateToProps = ({ popupErrorText }: Props) => ({ popupErrorText });

export default connect(mapStateToProps)(PopupError);
