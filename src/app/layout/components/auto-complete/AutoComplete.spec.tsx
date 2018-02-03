import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {use, expect} from 'chai';
import {spy} from 'sinon';
import * as sinonChai from 'sinon-chai';
import {configure, mount} from 'enzyme';
import {AutoComplete} from "./AutoComplete";
import {AutoCompleteResultSection} from "../auto-complete-result-section/AutoCompleteResultSection";

use(sinonChai);
configure({adapter: new Adapter()});

describe('layout.components.AutoComplete', () => {

  const PLACEHOLDER = 'test-placeholder';
  const DELAY = 0;
  const AFTER_DELAY = 5;
  const WRAPPER_DEFAULT_ARGS = {onSelect: (...args) => null, onSearch: () => null, data: []};

  interface IWrapperArgs {
    data?: string[] | { [sectionKey: string]: string[] };

    onSelect?();

    onSearch?();
  }

  const getWrapper = (args: IWrapperArgs = WRAPPER_DEFAULT_ARGS) => {
    const {onSelect, onSearch, data} = {...WRAPPER_DEFAULT_ARGS, ...args} as typeof WRAPPER_DEFAULT_ARGS;
    return mount(<AutoComplete placeholder={PLACEHOLDER}
                               cancelPreviousSearch={() => null}
                               delay={DELAY}
                               onSelect={onSelect}
                               onSearch={onSearch}>
      {
        Array.isArray(data)
          ? data.map((value, index) => (<div key={index} className="data">{value}</div>))
          : Object.keys(data).map(sectionKey => (
            <AutoCompleteResultSection sectionName={sectionKey} sectionKey={sectionKey}>
              {data[sectionKey].map((value, index) => (<div key={index} className="data">{value}</div>))}
            </AutoCompleteResultSection>
          ))
      }
    </AutoComplete>);
  };

  it('should set placeholder to input tag', () => {
    const wrapper = getWrapper();
    const input = wrapper.find('.text-field input');

    expect(input.prop('placeholder')).to.equal(PLACEHOLDER);
  });

  it('should call onSearch (with searchTerm) when input value has changed', done => {
    const SEARCH_TERM = 'val';
    const onSearch = spy();
    const wrapper = getWrapper({onSearch});
    const input = wrapper.find('input.form-input');

    input.instance()['value'] = SEARCH_TERM;
    input.simulate('change');

    setTimeout(() => {
      expect(onSearch).to.have.been.calledWith(SEARCH_TERM);
      done();
    }, AFTER_DELAY);
  });

  it('should create autocomplete menu with corresponding data', () => {
    const data = ['test', 'test2'];
    const wrapper = getWrapper({data});
    const dataItems = wrapper.find('div.data');
    wrapper.update();

    expect(dataItems).to.have.length(data.length);
    dataItems.forEach((dataItem, index) => expect(dataItem.text()).to.equal(data[index]));
  });

  it('should not show autocomplete menu', () => {
    const wrapper = getWrapper({data: ['test']});
    const menu = wrapper.find('ul.menu');

    expect(menu.hasClass('d-none')).to.be.true;
  });

  it('should show autocomplete menu', done => {
    const wrapper = getWrapper({data: ['test']});
    const input = wrapper.find('input.form-input');
    const menu = wrapper.find('ul.menu');
    input.simulate('focus');

    setTimeout(() => {
      // render().hasClass() needed due to https://github.com/airbnb/enzyme/issues/1177
      expect(menu.render().hasClass('d-block')).to.be.true;
      done();
    }, 50);
  });

  it('should close autocomplete menu', done => {
    const wrapper = getWrapper({data: ['test']});
    const input = wrapper.find('input.form-input');
    const menu = wrapper.find('ul.menu');
    input.simulate('focus');

    setTimeout(() => {
      // render().hasClass() needed due to https://github.com/airbnb/enzyme/issues/1177
      expect(menu.render().hasClass('d-block')).to.be.true;
      input.simulate('blur');
      setTimeout(() => {
        // render().hasClass() needed due to https://github.com/airbnb/enzyme/issues/1177
        expect(menu.render().hasClass('d-none')).to.be.true;
        done();
      }, 190);
    }, 25);
  });

  describe('selection', () => {

    it('should be able to select items from auto complete result list by mouse click', () => {
      const onSelect = spy();
      const data = ['a', 'b'];
      const wrapper = getWrapper({onSelect, data});
      const links = wrapper.find('a');

      links.forEach((link, index) => {
        link.simulate('click');
        expect(onSelect).to.have.been.calledWith(index);
      });
    });

    it('should be able to select items from auto complete result list by keyboard', () => {
      const onSelect = spy();
      const data = ['a', 'b', 'c'];
      const wrapper = getWrapper({onSelect, data});
      const input = wrapper.find('input.form-input');
      const preventDefault = () => null;
      const RETURN = 13;
      const ARROW_DOWN = 40;
      const ARROW_UP = 38;
      const EXPECTED_INDEX = 0;
      input.simulate('keyup', {keyCode: ARROW_DOWN, preventDefault});
      input.simulate('keyup', {keyCode: ARROW_DOWN, preventDefault});
      input.simulate('keyup', {keyCode: ARROW_UP, preventDefault});
      input.simulate('keyup', {keyCode: RETURN, preventDefault});
      expect(onSelect).to.have.been.calledWith(EXPECTED_INDEX);
    });

  });

  describe('sections', () => {

    const sectionsData = {
      sectionA: ['A.A', 'A.B'],
      sectionB: ['B.A', 'B.B'],
    };
    const sectionKeys = Object.keys(sectionsData);
    const data = sectionKeys.reduce((items, key) => {
      items = items.concat(sectionsData[key]);
      return items;
    }, []);
    const indexes = sectionKeys.reduce((_indexes, key) => {
      sectionsData[key].forEach((_, index) => {
        _indexes.push(index);
      });
      return _indexes;
    }, [] as number[]);

    it('should create sections in autocomplete menu with divider and data', () => {

      const wrapper = getWrapper({data: sectionsData});
      const dividers = wrapper.find('.custom-divider');
      const dataItems = wrapper.find('div.data');

      expect(dividers).to.have.length(sectionKeys.length);
      dividers.forEach((divider, index) => expect(divider.find(`[data-content="${sectionKeys[index]}"]`)).to.have.length(1));
      dataItems.forEach((dataItem, index) => expect(dataItem.text()).to.equal(data[index]));
    });

    describe('selection', () => {

      it('should be able to select items from auto complete result list by mouse click', () => {
        const onSelect = spy();
        const wrapper = getWrapper({onSelect, data: sectionsData});
        const links = wrapper.find('a');

        links.forEach((link, index) => {
          link.simulate('click');
          expect(onSelect).to.have.been.calledWith(indexes[index]);
        });
      });

      it('should be able to select items from auto complete result list by keyboard', () => {
        const onSelect = spy();
        const wrapper = getWrapper({onSelect, data: sectionsData});
        const input = wrapper.find('input.form-input');
        const preventDefault = () => null;
        const RETURN = 13;
        const ARROW_DOWN = 40;
        const ARROW_UP = 38;
        const EXPECTED_INDEX = 1;
        const arrowUp = () => input.simulate('keyup', {keyCode: ARROW_UP, preventDefault});
        const arrowDown = () => input.simulate('keyup', {keyCode: ARROW_DOWN, preventDefault});

        arrowDown(); // {0: *A.A*, 1: A.B}, {0: B.A, 1: B.B}
        arrowUp(); // {0: A.A, 1: A.B}, {0: B.A, 1: B.B}
        arrowDown(); // {0: *A.A*, 1: A.B}, {0: B.A, 1: B.B}
        arrowDown(); // {0: A.A, 1: *A.B*}, {0: B.A, 1: B.B}
        arrowDown(); // {0: A.A, 1: A.B}, {0: *B.A*, 1: B.B}
        arrowUp(); // {0: A.A, 1: *A.B*}, {0: B.A, 1: B.B}
        arrowDown(); // {0: A.A, 1: A.B}, {0: *B.A*, 1: B.B}
        arrowDown(); // {0: A.A, 1: A.B}, {0: B.A, 1: *B.B*}
        arrowDown(); // {0: A.A, 1: A.B}, {0: B.A, 1: B.B}
        arrowUp(); // {0: A.A, 1: A.B}, {0: B.A, 1: *B.B*}

        input.simulate('keyup', {keyCode: RETURN, preventDefault});
        expect(onSelect).to.have.been.calledWith(EXPECTED_INDEX);
      });

    });

  });

});

