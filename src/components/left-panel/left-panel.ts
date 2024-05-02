import { Icon } from 'components/icon';
import Block from 'core/Block';
import LeftArrowIcon from 'assets/arrow-left.svg';

type Props = {
    page: string;
}

export default class LeftPanel extends Block<Props> {
    init() {
        const IconBlock = new Icon({ src: LeftArrowIcon, size: 'm' });

        this.children = {
            ...this.children,
            IconBlock,
        };
    }

    render() {
        return (
            `
            <div class="left-panel" page="{{page}}">
                {{{ IconBlock }}}
            </div>
            `
        );
    }
}
