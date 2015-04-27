var EntityMixin = {
  EntityRef:function(ref,property,text){
    this.refs[ref].getDOMNode()[property] = text;
  }
}
module.exports = EntityMixin;