firstName=["Bob","Peter","Sam","Cheesehead","Jennifer", "Adele", "Mike", "Atom", "Java", "America", "Pilot"];//11
lastName=["Peterson", "Jackson", "Hackson", "Dudeman","Dicass", "Cockman", "Dover", "Anderson", "Andersen"];//9

var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};

var createName = function(){
  var name=firstName[randomNumber(0,10)]+' '+lastName[randomNumber(0,8)];
  return name;
}

module.exports=createName;
