import Block from 'core/Block';
import { EVENTS } from 'core/EventBus';
import isEqual from './isEqual';

export function connect(mapStateToProps: (args: object) => object) {
    return (Component: typeof Block<object>) =>
        class extends Component {
            private onChangeStoreCallback: () => void;

            constructor(props: object | undefined) {
                const { store } = window;
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                };

                store.on(EVENTS.UPDATED, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(EVENTS.UPDATED, this.onChangeStoreCallback);
            }
        };
}
