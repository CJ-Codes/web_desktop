import React, {
  PureComponent, createRef, lazy, Suspense,
} from 'react';
import { StartLoading } from '../';
import { ContextArea } from './style';

export default class extends PureComponent {

  constructor (props) {
    super(props);
    this.area = createRef();
    this.state = {
      App: null,
      view: props.win,
      display: false,
    }
  }

  componentDidMount() {
    const { info } = this.props;
    const request = import(`../../../apps/${info.get('file')}/`);
    request
      .then(() => {
        this.setState(() => ({ App: lazy(() => request) }))
      })
      .catch(() => {
        setTimeout(() => {
          this.setState(() => ({
            display: true,
            App: () => (
              <div className="empty">empty</div>
            )
          }))
        }, 3000)
      })

    this.viewResize()
  }

  componentDidUpdate({ win, maximize, resize }) {
    const { win: size, maximize: max, resize: re } = this.props;
    const isResize = ''+win !== ''+size
      || maximize !== max
      || resize !== re;

    if (isResize) {
      this.viewResize()
    }
  }

  render () {
    const { opened } = this.props;
    const { App, view, display, } = this.state;

    return (
      <ContextArea ref={ this.area }>
      {
        !display && <StartLoading />
      }
      {
        opened && (
        <Suspense fallback={null}>
        {
          App && <App
            view={ view }
            setDisplay={ v => this.setState({ display: v }) }
          />
        }
        </Suspense>
      )}
      </ContextArea>
    )
  }

  viewResize() {
    const e = this.area.current;
    if (e) {
      const view = [e.offsetWidth, e.offsetHeight];
      this.setState(() => ({ view }))
    }
  }

//
}