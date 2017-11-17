import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {DynamicContentHttpService} from "../dynamic-content/DynamicContentHttpService";
import {Journey} from "./Journey";

export class JourneyContainer extends Component<{}, {}> {

  @Inject dynamicContentService: DynamicContentHttpService<any>;

  private journeyContentKey: string = 'journey';

  constructor(props) {
    super(props);
    this.loadContent();
  }

  async loadContent() {

    const content = await this.dynamicContentService.getDynamicContent(this.journeyContentKey);
    console.log(content);

  }

  render() {
    return (<div></div>);
  }
}
