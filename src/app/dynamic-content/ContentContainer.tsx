import * as React from 'react';
import {Component, ReactNode} from "react";
import {Inject} from "react.di";
import {DynamicContentHttpService} from "./DynamicContentHttpService";
import {ContentData} from "./ContentData";
import {Content} from "./Content";
import {NavigationService} from "../layout/components/navigation/NavigationService";

export interface ContentComponentProps<T extends ContentData> {
  content: T;
}
interface ContentContainerProps<T extends ContentData> {
  contentKey: string;
  component?: React.ComponentType<ContentComponentProps<T>>;
  render?: (content: T) => ReactNode;
  action?: Promise<any>;
}

interface ContentContainerState<T extends ContentData> {
  content?: T;
  isLoading: boolean;
  isNavOpen?: boolean;
  errorMessage?: string;
}

export class ContentContainer<T extends ContentData> extends Component<ContentContainerProps<T>, ContentContainerState<T>> {

  @Inject dynamicContentService: DynamicContentHttpService<T>;
  @Inject navigationService: NavigationService;

  constructor(props) {
    super(props);
    this.state = {isLoading: false};
  }

  async loadContent() {
    this.setState({isLoading: true});
    const {contentKey} = this.props;

    try {
      const {action} = this.props;
      const futureContent = this.dynamicContentService.getDynamicContent(contentKey);
      const [content] = await Promise.all([futureContent, action]);
      this.setState({content});
    } catch (e) {
      this.setState({errorMessage: 'Fehler beim Laden'});
    } finally {
      this.setState({isLoading: false});
    }
  }

  async componentWillMount() {
    await this.loadContent();
    this.navigationService.isOpen.subscribe(isNavOpen => this.setState({isNavOpen}));
  }

  render() {
    const {content, isLoading, errorMessage, isNavOpen} = this.state;
    const {component, render} = this.props;
    const WrappedComponent = component;

    if (content) {
      return (
        <Content header={content.header} isNavOpen={isNavOpen}>
          {WrappedComponent
            ? <WrappedComponent content={content}/>
            : (render && render(content))
          }
        </Content>
      );
    }

    if (isLoading) {
      return (
        <div>Lädt...</div>
      );
    }

    return (
      <div>{errorMessage}</div>
    );
  }
}
