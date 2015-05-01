var React = require('react/addons');
var Router = require('react-router');
var PortfolioActions = require('../actions/portfolioActions');
var PortfolioStore = require('../stores/portfolioStore');
//var PortfolioItem = require('./porfolioItem');
//var $ = require('jquery');

var PortfolioDetail = React.createClass({

  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function(){

    //return { portfolioDetails: {} };

    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var id = this.getParams().id;

    return {
      id: id,
      detail: PortfolioStore.getItemById(id),
      type: this.getParams().type
    };
  },

  componentDidMount: function(){

    var self = this;

    if( PortfolioStore.hasLoadedItemById(self.state.id) === false ){

      PortfolioActions.LOAD_SINGLE(self.state.id);

      self.unsubscribe = PortfolioStore.listen(function(){

        self.setState({
          detail: PortfolioStore.getItemById(self.state.id)
        });
      });

    } else {

      debugger;
      self.setState({
        detail: PortfolioStore.getItemById(self.state.id)
      });
    }
  },

  componentWillUnmount: function(){

    if( typeof this.unsubscribe === 'function'){

      this.unsubscribe();
    }
  },

  render: function(){

    return (<div>
      <h1 className="h3  text-center">I am the detail screen for: {this.state.detail.title}</h1>
      <div>
        {this.state.detail.fullSizeImage}
      </div>
    </div>);
  }
});

module.exports = PortfolioDetail;