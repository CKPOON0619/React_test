'use strict';

// Load NPM modules
import React from 'react';

// Load antDesign modules
import { Input,Table } from 'antd';

// Gets an object which has the count of letters
const getLetterCount = text => {
  let allChar=text.replace(/[^a-zA-Z]+/g, "").split('');
  let dict=allChar.reduce((dict,ele)=>{dict[ele]=dict[ele]?(dict[ele]+1):1;return dict},{});
  return dict;
};

// Define columns
const getColumns = (text, increment) => {
  let lttrCnt=getLetterCount(text)
  let mxCnt=Math.max.apply(null, Object.keys(lttrCnt).map(x => lttrCnt[x]))
  let len=mxCnt%increment>0?(Math.floor(mxCnt/increment)+1):Math.floor(mxCnt/increment)
  let buckets=Array.apply(null,Array(len)).map((_,i)=>{
    let lowerBound=i*increment;
    let upperBound=(i+1)*increment;
    return {
      title: `${[lowerBound]} - ${[upperBound]}`,
      dataIndex: `${[lowerBound]} - ${[upperBound]}`
    }
  })
  return [
    {
      title: 'Letter',
      dataIndex: 'name'
    }].concat(buckets);
};

// Build entry
const getLetterRow = (letter, count, template) => {
  let update=Object.assign({},template)
  let increment=Object.keys(template)[1].split(' - ')[1]
  let bucketNum=Math.floor(count/increment)
  update.name=letter
  update.key=letter
  update[(bucketNum*increment)+' - '+((bucketNum+1)*increment)]='X'
  return update
};

// Get row template
const getRowTemplate = (text, increment) => {
  let cols=getColumns(text,increment)
  return cols.slice(1).reduce((template,bucketCol)=>{template[bucketCol.dataIndex]='-';return template},{'name':undefined});
};

// Define data source
const getDataSource = (text, increment) => {
  let letters=getLetterCount(text)
  let template=getRowTemplate(text,increment)
  let data=[]
  for(let k in letters){
    data.push(getLetterRow(k,letters[k],template))
  }
  return data;
};

// Build text box
const buildTextBox = (state, updateState) => (
  <Input.TextArea
    rows={8}
    style={{ marginBottom: '24px' }}
    value={state.text}
    onChange={e => updateState({ text: e.target.value })}
  />
);

// Build table
const buildTable = (dataSource, columns) => (
  <Table dataSource={dataSource} columns={columns} />
);

// Define export
export default (state, updateState) => (
  <div className="page-one">
    <h2>Enter Text:</h2>
    {buildTextBox(state, updateState)}
    <h2>View Letters by Count:</h2>
    {buildTable(
      getDataSource(state.text, state.increment),
      getColumns(state.text, state.increment)
    )}
  </div>
);
