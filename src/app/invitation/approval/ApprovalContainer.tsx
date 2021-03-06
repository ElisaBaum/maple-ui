import * as React from 'react';
import {User} from "../../user/User";
import {Component} from "react";
import {Inject} from "react.di";
import {UserHttpService} from "../../user/UserHttpService";
import {Approval} from "./Approval";
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {ApprovalData} from "./ApprovalData";
import {toast} from "react-toastify";
import {UserService} from '../../user/UserService';

interface ApprovalContainerState {
  users: User[];
  action?: Promise<void>;
  maxPersonCount: number;
  newCompanionName?: string;
}

export class ApprovalContainer extends Component<{}, ApprovalContainerState> {

  @Inject userHttpService: UserHttpService;
  @Inject userService: UserService;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      maxPersonCount: 0
    };
  }

  componentWillMount() {
    this.setState({
      action: this.loadParty()
    });
  }

  async loadParty() {
    const party = await this.userHttpService.getParty();

    this.setState({
      maxPersonCount: party.maxPersonCount,
      users: party.users
    });
  }

  async addCompanion(partialUser: Partial<User> & { name: string }) {
    this.setState({
      newCompanionName: partialUser.name
    });

    try {
      const addedUser = await this.userHttpService.addCompanion(partialUser);

      this.setState(prevState => ({
        users: [...prevState.users, addedUser],
        newCompanionName: undefined
      }));

      toast.dismiss();
    } catch (e) {
      // TODO show error message dependent on type of error?
      toast.error(<p>Fehler</p>);
    }
  }

  async updateCompanionPartially(user: User) {
    try {
      this.userHttpService.updateCompanionPartially(user);
      toast.dismiss();
    } catch (e) {
      // TODO show error message dependent on type of error?
      toast.error(<p>Fehler</p>);
    }
  }

  render() {
    const {action, users, maxPersonCount, newCompanionName} = this.state;
    return (
      <ContentContainer contentKey={'approval'} action={action} render={(content: ApprovalData) => (
        <Approval users={users}
                  currentUser={this.userService.getUser()}
                  maxPersonCount={maxPersonCount}
                  newCompanionName={newCompanionName}
                  updateCompanion={user => this.updateCompanionPartially(user)}
                  addCompanion={name => this.addCompanion(name)}
                  content={content}/>
      )}/>
    );
  }
}
