import React, { Component } from 'react';
import ScreenReaderFocusElm from './screen-reader-focus-elm.component';
import PortfolioItem from './portfolio-item.component';
import { UI_IDS, DESIGN_CATEGORIES, OTHER_CATEGORIES, WEB_CATEGORIES, MIX_CATEGORIES } from '../configuration/';
import filterPortfolioByProp from '../util/filter-by-property.util';

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);

    this.createPortfolioItem = this.createPortfolioItem.bind(this);
  }

  componentWillMount(){
    if(this.props.loadedAllItems === false ){
      this.props.loadAllPortfolio([...DESIGN_CATEGORIES, ...OTHER_CATEGORIES, ...WEB_CATEGORIES, ...MIX_CATEGORIES]);
    }
  }

  createPortfolioItem(item) {
    return (<PortfolioItem item={item} key={item.ID} />);
  }

  render() {

    /*
     * FIXME: when :focus on individual items in the list, you can't see the outline. this is bad for accessibility. Also make sure design works on Firefox
     */

    const { portfolio } = this.props;
    const webItems = portfolio.filter(filterPortfolioByProp('isWebsite')).map(this.createPortfolioItem);
    const designItems = portfolio.filter(filterPortfolioByProp('isDesign')).map(this.createPortfolioItem);
    const otherItems = portfolio.filter(filterPortfolioByProp('isOther')).map(this.createPortfolioItem);

    let webContent = null;
    let designContent = null;
    let otherContent = null;

    if (webItems.length > 0) {
      webContent = (
        <div>
          <h1 className="h3  text-center">Web Design &amp; Development</h1>
          <ul className="portfolio  row  center-xs  start-sm">
            {webItems}
          </ul>
        </div>
      );
    }

    if (designItems.length > 0) {
      designContent = (
        <div>
          <h1 className="h3  text-center">Illustration, Logos, &amp; Flyers</h1>
          <ul className="portfolio  row  center-xs  start-sm">
            {designItems}
          </ul>
        </div>
      );
    }

    if (otherItems.length > 0) {
      otherContent = (
        <div>
          <h1 className="h3  text-center">Other Rad Stuff</h1>
          <ul className="portfolio  row  center-xs  start-sm">
            {otherItems}
          </ul>
        </div>
      );
    }

    return (
      <section>
        <ScreenReaderFocusElm elmId={UI_IDS.portfolioList} className="no-focus-ring">
          {webContent}
          {designContent}
          {otherContent}
        </ScreenReaderFocusElm>
      </section>
    );
  }
}