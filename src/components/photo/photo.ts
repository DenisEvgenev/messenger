import Block from 'core/Block';

export default class Photo extends Block {
    constructor(props) {
        super({
            ...props,
        });
    }

    render() {
        return ('<img src="{{avatar}}" class="image image__{{type}}" />');
    }
}
