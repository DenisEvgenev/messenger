import Block from 'core/Block';

type Props = {
    size: string;
    src: string;
}

export default class Icon extends Block<Props> {
    render() {
        return (`
            <img src="{{src}}" class="icon icon__{{size}}" />
        `);
    }
}
