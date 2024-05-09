import Block from 'core/Block';
import { connect } from 'utils/connect';

type Props = {
    chats: Array<Block<object>>;
    showEmpty?: boolean;
    events?: {
        click: () => void;
    }
    onClick?: () => void;
}

class ListChats extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            showEmpty: props.chats.length === 0,
            events: {
                click: props.onClick || (() => {}),
            },
        });
    }

    render(): string {
        return `
        <div>
            {{#if showEmpty}}
                Нет чатов
            {{/if}}
            {{{ chats }}}
        </div>
        `;
    }
}

export default connect(({ isLoading }: { isLoading: boolean }) => ({ isLoading }))(ListChats);
