import * as React from 'react';
import {Component} from 'react';
import {Overlay} from './Overlay';

export const createOverlayContainer = () => {
  let overlayContainer: OverlayContainer;

  const addOverlay = (render) => {
    const {overlayRenders} = overlayContainer.state;
    const overlayRender = i => (<Overlay key={i}>{render({
      onCloseOverlay: () => removeOverlay(overlayRender),
    })}</Overlay>);

    overlayContainer.setState({
      overlayRenders: [...overlayRenders, overlayRender],
    });
    return overlayRender;
  };
  const removeOverlay = overlayToRemove => overlayContainer.setState({
    overlayRenders: overlayContainer.state.overlayRenders
      .filter(overlay => overlay !== overlayToRemove),
  });

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
        {overlayRenders.map((render, i) => render(i))}
      </div>);
    }
  }

  return {removeOverlay, addOverlay, OverlayContainer};
};

