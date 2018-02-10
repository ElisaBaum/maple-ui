import * as React from 'react';
import {Component, ReactNode} from "react";
import {Inject} from "react.di";
import {DynamicContentHttpService} from "./DynamicContentHttpService";
import {ContentData} from "./ContentData";
import {Content} from "./Content";
import {CenteredSpinner} from "../layout/components/spinner/Spinner";
import {ContentError} from "./error/ContentError";
import {FadeIn} from '../layout/components/fade-in/FadeIn';
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
    } catch {
      // do nothing here, error is rendered below
    } finally {
      this.setState({isLoading: false});
    }
  }

  async componentWillMount() {
    await this.loadContent();
    this.navigationService.isOpen.subscribe(isNavOpen => this.setState({isNavOpen}));
  }

  render() {
    const {content, isLoading, isNavOpen} = this.state;
    const {component, render} = this.props;
    const WrappedComponent = component;

    if (content) {
      return (
        <FadeIn>
          <Content header={content.header} isNavOpen={isNavOpen}>
            {WrappedComponent
              ? <WrappedComponent content={content}/>
              : (render && render(content))
            }
          </Content>
        </FadeIn>
      );
    }

    if (isLoading) {
      return (
        <CenteredSpinner/>
      );
    }

    return (
      <ContentError reload={() => this.loadContent()}/>
    );
  }
}
