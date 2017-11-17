import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {DynamicContentHttpService} from "../dynamic-content/DynamicContentHttpService";
import {JourneyData} from "./JourneyData";
import {Journey} from "./Journey";

interface JourneyContainerState {
  content: JourneyData;
}

export class JourneyContainer extends Component<{}, JourneyContainerState> {

  @Inject dynamicContentService: DynamicContentHttpService<JourneyData>;

  private journeyContentKey: string = 'journey';

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadContent();
  }

  render() {
    return (
      <div>
        {
          this.state && this.state.content &&
          <Journey content={this.state.content}/>
        }
      </div>
    );
  }

  private async loadContent() {
    const content = await this.dynamicContentService.getDynamicContent(this.journeyContentKey);
    this.setState({content});
  }
}
