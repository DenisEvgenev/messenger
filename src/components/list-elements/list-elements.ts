import Block from 'core/Block';
import { connect } from 'utils/connect';
import isEqual from 'utils/isEqual';

type Props = {
    elements: Array<Block<object>>;
    showEmpty?: boolean;
    events?: {
        click: () => void;
    }
    onClick?: () => void;
    className: string;
}

class ListElements extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            showEmpty: props.elements.length === 0,
            events: {
                click: props.onClick || (() => {}),
            },
        });
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (isEqual(oldProps, newProps)) {
            return false;
        }

        this.props.showEmpty = newProps.elements.length === 0;
        return true;
    }

    render(): string {
        return `
        <div id="list-elements">
            {{#if showEmpty}}
                <div class="{{ className }}">Выберите чат чтобы отправить сообщение</div>
            {{/if}}
            {{{ elements }}}
        </div>
        `;
    }
}

export default connect(({ isLoading }: { isLoading: boolean }) => ({ isLoading }))(ListElements);
