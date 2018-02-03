import * as React from 'react';
import * as classNames from 'classnames';
import {ChangeEvent, Component, KeyboardEvent, MouseEvent, ReactElement} from "react";
import {
  AutoCompleteResultSection,
  IAutoCompleteResultSection
} from "../auto-complete-result-section/AutoCompleteResultSection";
import {TextField} from '../controls/text-field/TextField';
import {Label} from '../controls/label/Label';
import './AutoComplete.scss';

interface ISection {
  name?: string;
  key?: string;
  children: Array<ReactElement<any>>;
}

interface IAutoCompleteState {
  hasFocus: boolean;
  focusedIndex?: number;
  focusedSectionIndex: number;
  sections: ISection[];
}

interface IAutoCompleteProps {
  placeholder: string;
  label?: string;
  delay?: number;
  children: any[];
  loading?: boolean;

  cancelPreviousSearch();

  onSearch(searchTerm: string);

  onSelect(index: number, sectionKey?: string);

  onClear?();
}

const FIRST_INDEX = 0;
const NO_INDEX = undefined;

export class AutoComplete extends Component<IAutoCompleteProps, IAutoCompleteState> {

  timeoutId: any;
  searchInput: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      sections: [],
      focusedSectionIndex: 0,
    };
  }

  componentDidMount() {
    this.setupSections(this.props.children);
  }

  componentWillReceiveProps({children}) {
    this.setupSections(children);
  }

  handleInputChange(e: ChangeEvent<any>) {
    const searchTerm = e.currentTarget.value;
    const {delay, onSearch, cancelPreviousSearch, onClear} = this.props;

    cancelPreviousSearch();
    clearTimeout(this.timeoutId);

    if (searchTerm) {
      this.setState({focusedIndex: 0});
      this.timeoutId = setTimeout(() => onSearch(searchTerm), (delay !== undefined) ? delay : 300);
    } else {
      onClear && onClear();
    }
  }

  handleFocus(hasFocus: boolean) {
    let delay = 0;

    // TODO@robin this need to be improved, 'cause
    // TODO@robin it is more a quick fix than a
    // TODO@robin satisfying solution
    // When focus is lost, menu gets hidden; To prevent
    // this, "hasFocus=false" state will be set with
    // a delay, to give time to click on menu item.
    if (hasFocus === false) {
      delay = 175;
    }

    setTimeout(() => this.setState({hasFocus}), delay);
  }

  handleKeyUp(e: KeyboardEvent<any>) {
    e.preventDefault();

    const {focusedIndex, focusedSectionIndex, sections} = this.state;
    const hasResults = !!sections.length;

    if (!hasResults) {
      this.setState({
        focusedIndex: undefined,
        focusedSectionIndex: 0,
      });
      return;
    }
    const isArrowUp = e.keyCode === 38;
    const isArrowDown = e.keyCode === 40;
    const isReturn = e.keyCode === 13;

    if (isReturn) {
      if (focusedIndex !== undefined) {
        this.handleSelectItem(focusedIndex, sections[focusedSectionIndex].key);
      }
    } else if (isArrowUp || isArrowDown) {
      this.setFocusedItemIndex(isArrowUp, isArrowDown);
    }
  }

  handleSelectItem(index: number, sectionName: string | undefined, e?: MouseEvent<any>) {
    if (e) {
      e.preventDefault();
      // In case of mouse click event, reset focus index
      this.setState({focusedIndex: undefined});
    }
    const {onSelect} = this.props;
    onSelect(index, sectionName);
    this.handleClear();
    this.searchInput.blur();
  }

  handleClear() {
    const {onClear} = this.props;
    onClear && onClear();
    this.searchInput.value = '';
  }

  setupSections(children) {
    const usableChildren = React.Children.toArray(children).filter(child => !!child);

    if (usableChildren.length) {
      const hasSections = usableChildren[0]['type'] === AutoCompleteResultSection;
      if (hasSections) {
        this.setState({
          sections: this.getSectionsByAutoCompleteResultSectionsChildren(children)
        });
      } else {
        this.setState({
          sections: [{children}]
        });
      }
    } else {
      this.setState({sections: []});
    }
  }

  getSectionsByAutoCompleteResultSectionsChildren(children) {
    const sections: ISection[] = [];
    React.Children.forEach(children, (child: ReactElement<IAutoCompleteResultSection>) => {
      if (child && child.props) {
        sections.push({
          name: child.props.sectionName,
          key: child.props.sectionKey,
          children: child.props.children,
        });
      }
    });
    return sections;
  }

  setFocusedItemIndex(isArrowUp, isArrowDown) {
    const {focusedIndex, focusedSectionIndex, sections} = this.state;
    const maxSectionIndex = sections.length - 1;
    const maxIndexLastSection = sections[sections.length - 1].children.length - 1;
    const maxIndex = sections[focusedSectionIndex].children.length - 1;

    if (isArrowUp) {
      const indexes = this.getNewFocusedIndexesByArrowUp(
        focusedIndex,
        focusedSectionIndex,
        maxSectionIndex,
        maxIndexLastSection,
        sections,
      );
      this.setState({...indexes});
    } else if (isArrowDown) {
      const indexes = this.getNewFocusedIndexesByArrowDown(
        focusedIndex,
        focusedSectionIndex,
        maxSectionIndex,
        maxIndex,
      );
      this.setState({...indexes});
    }
  }

  getNewFocusedIndexesByArrowUp(focusedIndex: number | undefined,
                                focusedSectionIndex: number,
                                maxSectionIndex: number,
                                maxIndexLastSection: number,
                                sections: ISection[]) {
    // no item has focus
    if (focusedIndex === NO_INDEX) {
      return {
        focusedIndex: maxIndexLastSection,
        focusedSectionIndex: maxSectionIndex,
      };
    }
    // first item of current section has focus
    if (focusedIndex === FIRST_INDEX) {
      // first section has focus
      if (focusedSectionIndex === FIRST_INDEX) {
        return {
          focusedIndex: NO_INDEX,
          focusedSectionIndex: FIRST_INDEX,
        };
      }
      const newSectionFocusedIndex = focusedSectionIndex - 1;
      const maxIndexPreviousSection = sections[newSectionFocusedIndex].children.length - 1;
      return {
        focusedIndex: maxIndexPreviousSection,
        focusedSectionIndex: newSectionFocusedIndex,
      };
    }
    return {
      focusedIndex: focusedIndex - 1,
      focusedSectionIndex,
    };
  }

  getNewFocusedIndexesByArrowDown(focusedIndex: number | undefined,
                                  focusedSectionIndex: number,
                                  maxSectionIndex: number,
                                  maxIndex: number) {
    // no item has focus
    if (focusedIndex === NO_INDEX) {
      return {
        focusedIndex: FIRST_INDEX,
        focusedSectionIndex: FIRST_INDEX,
      };
    }
    // last item of current section has focus
    if (focusedIndex === maxIndex) {
      // last section has focus
      if (focusedSectionIndex === maxSectionIndex) {
        return {
          focusedIndex: NO_INDEX,
          focusedSectionIndex: FIRST_INDEX,
        };
      }
      return {
        focusedIndex: FIRST_INDEX,
        focusedSectionIndex: focusedSectionIndex + 1,
      };
    }
    return {
      focusedIndex: focusedIndex + 1,
      focusedSectionIndex,
    };
  }

  isItemFocused(childIndex, sectionIndex) {
    const {focusedIndex, focusedSectionIndex} = this.state;

    return (childIndex === focusedIndex) &&
      (sectionIndex === focusedSectionIndex);
  }

  render() {
    const {sections} = this.state;
    const {placeholder, label, loading} = this.props;
    const showMenu = !!sections.length;
    const hasClearBtn = showMenu;

    return (
      <div className="form-autocomplete">
        <div className={classNames('form-autocomplete-input', {'has-clear-btn': hasClearBtn})}>
          <TextField type="text"
                     icon="search"
                     loading={loading}
                     labels={() => (<Label floated>{label}</Label>)}
                     inputRef={input => this.searchInput = input}
                     onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
                     onKeyUp={e => this.handleKeyUp(e)}
                     onFocus={() => this.handleFocus(true)}
                     onBlur={() => this.handleFocus(false)}
                     onChange={e => this.handleInputChange(e)}
                     placeholder={placeholder}/>
          <button type="button"
                  className="btn btn-link-secondary clear-btn"
                  onClick={() => this.handleClear()}>
            <i className="material-icons">clear</i>
          </button>
        </div>
        <ul className={classNames('menu', showMenu ? 'd-block' : 'd-none')}>
          {sections.map(({name, key, children}, sectionIndex) => (
            <div key={sectionIndex}>
              {name && (<h3 className={'autocomplete-divider'}>{name}</h3>)}
              {React.Children.map(children, (child, childIndex) => (
                <li className="menu-item" key={childIndex}>
                  <a href="#"
                     onClick={e => this.handleSelectItem(childIndex, key, e)}
                     className={classNames({
                       'is-focused': this.isItemFocused(childIndex, sectionIndex)
                     })}>
                    {child}
                  </a>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
