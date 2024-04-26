import { Icon } from 'components/icon';
import Block from 'core/Block';
import LeftArrowIcon from 'assets/arrow-left.svg';

export default class LeftPanel extends Block {
    constructor(props) {
        super({
            ...props,
            Icon: new Icon({ src: LeftArrowIcon, size: 'm' }),
        });
    }

    render() {
        return (
            `
            <div class="left-panel" page="{{page}}">
                {{{ Icon }}}
            </div>
            `
        );
    }
}
