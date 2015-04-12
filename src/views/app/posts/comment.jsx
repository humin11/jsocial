var moment = require('moment');
moment.locale('zh-cn');

var Comment = React.createClass({
  render: function () {
    var create_at = moment(this.props.comment.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    return (
      <div className='inbox-avatar' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.comment.author.avatar} width='30' height='30' style={{verticalAlign:'top',top:10,position:'relative'}} />
        <div className='inbox-avatar-name'>
          <div className='fg-darkgrayishblue75'>{this.props.comment.author.name}</div>
          <div className='fg-text'><small>{this.props.comment.content}</small></div>
        </div>
        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
          <div><small><strong>{create_at}</strong></small></div>
        </div>
      </div>
    )
  }
});

module.exports = Comment;