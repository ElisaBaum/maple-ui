import {Component} from 'react';
import {Inject} from 'react.di';
import {UserService} from '../../../user/UserService';

export class ShowIfOwner extends Component<{ children, partyId }> {
  @Inject userService: UserService;

  render() {
    const {children, partyId} = this.props;
    if (this.userService) {
      const user = this.userService.getUser();
      if (user && user.partyId === partyId) {
        return children;
      }
    }
    return [];
  }
}
