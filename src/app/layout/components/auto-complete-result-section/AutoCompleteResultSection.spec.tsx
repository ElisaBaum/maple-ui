import * as React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {AutoCompleteResultSection, IAutoCompleteResultSection} from "./AutoCompleteResultSection";


describe('layout.components.AutoCompleteResultSection', () => {

  const props: IAutoCompleteResultSection = {
    sectionName: "Section 1",
    sectionKey: "key",
    children: ["1", "2", "3"]
  };

  it('should render AutoCompleteSection component with children', () => {
    const wrapper = shallow(<AutoCompleteResultSection {...props}/>);
    expect(wrapper.contains(<div>{...props.children}</div>)).to.be.true;
  });

});





