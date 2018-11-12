'use strict';

// Converts camel case string to a sentence case
export const formatCamelCaseString = text => {
  var result = text.replace( /([A-Z])/g, " $1" )
  return  result.charAt(0).toUpperCase() + result.slice(1)
};

// Handles page navigation
//Solution for EX1: fixing the lambda function which cannot be binded with `this`. 
export function handleOnPageNavigation(item){
  this.setState({
    page: item.key
  })
};
