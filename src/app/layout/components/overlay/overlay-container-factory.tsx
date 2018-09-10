import * as React from 'react';
import {Component} from 'react';
import {Overlay, OverlayOptions} from './Overlay';
import ScrollLock from 'react-scrolllock';

export const createOverlayContainer = () => {
  let overlayContainer: OverlayContainer;

  const addOverlay = (render, options: OverlayOptions = {}) => {
    const {overlayRenders} = overlayContainer.state;
    const overlayRender = i => (<Overlay key={i} {...options}>{render({
      onCloseOverlay: () => removeOverlay(overlayRender),
    })}</Overlay>);

    overlayContainer.setState({
      overlayRenders: [...overlayRenders, overlayRender],
    });

    return overlayRender;
  };
  const removeOverlay = overlayToRemove => {
    const overlayRenders = overlayContainer.state.overlayRenders
      .filter(overlay => overlay !== overlayToRemove);
    overlayContainer.setState({overlayRenders});
  };

  interface OverlayContainerState {
    overlayRenders: any[];
  }

  class OverlayContainer extends Component<{}, OverlayContainerState> {
    constructor(props) {
      super(props);
      this.state = {
        overlayRenders: [],
      };
    }

    componentDidMount() {
      overlayContainer = this;
    }

    render() {
      const {overlayRenders} = this.state;
      return (<div>
        {!!overlayRenders.length && <ScrollLock/>}
        {overlayRenders.map((render, i) => render(i))}
      </div>);
    }
  }

  return {removeOverlay, addOverlay, OverlayContainer};
};

