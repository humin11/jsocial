var classSet = React.addons.classSet;
var CollapsibleContent = React.createClass({
  getDefaultProps: function(){
    return {
      maxRow: 5,
      maxChar: 300,
      maxHeight: '54px'
    };
  },
  getInitialState: function () {
    return {
      expanded: false,
      contentStyle: { maxHeight: this.props.maxHeight }
    };
  },
  _handleExpandContent: function(){
    if(!this.state.expanded){
      this.setState({
        expanded: true,
        contentStyle: {}
      });
    } else {
      this.setState({
        expanded: false,
        contentStyle: { maxHeight: this.props.maxHeight }
      });
    }
  },
  render: function(){
    var content = this.props.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    var br = content.match(/<br>/g);
    var contentToolbar = null;
    var expandBtnClass = classSet({
      'hide': this.state.expanded
    });
    var collapseBtnClass = classSet({
      'hide': !this.state.expanded
    });
    var contentStyle = {};
    if(br && br.length > this.props.maxRow || content.length > this.props.maxChar){
      contentStyle = this.state.contentStyle;
      contentToolbar =
        <div className="content-toolbar">
          <span className={expandBtnClass} onClick={this._handleExpandContent}><Entity entity="expandCommentContent" /></span>
          <span className={collapseBtnClass} onClick={this._handleExpandContent}><Entity entity="collapse" /></span>
        </div>;
    }
    return (
      <div style={this.props.style}>
        <div className={this.props.className} dangerouslySetInnerHTML={{__html: content}} style={contentStyle} />
        {contentToolbar}
      </div>
    );
  }
});

module.exports = CollapsibleContent;