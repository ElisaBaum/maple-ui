import * as React from 'react';
import {User} from "../../user/User";
import {Component} from "react";
import {Inject} from "react.di";
import {UserHttpService} from "../../user/UserHttpService";
import {Approval} from "./Approval";
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {ApprovalData} from "./ApprovalData";

interface ApprovalContainerState {
  users: User[];
}

export class ApprovalContainer extends Component<{}, ApprovalContainerState> {

  @Inject userService: UserHttpService;

  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  async componentWillMount() {
    // todo error handling
    const users = await this.userService.getPartyUsers();
    this.setState({users});
  }

  async addCompanion(name: string) {
    this.userService.addCompanion(name);
    // todo error handling
  }

  async updateCompanionApproval(approved: boolean) {
    this.userService.updateCompanionApproval(approved);
    // todo error handling
  }

  async updateUser(approved: boolean) {
    this.userService.updateUser(approved);
    // todo error handling
  }

  render() {
    return (
      <ContentContainer contentKey={'approval'} render={(content: ApprovalData) => (
        <Approval users={this.state.users}
                  addCompanion={name => this.addCompanion(name)}
                  content={content}/>
      )}/>
    );
  }
}
