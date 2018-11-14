'use strict';

// Load NPM modules
import React from 'react';
import axios from 'axios';
import {Pagination,Icon,Card,Col,Row,Spin,Popover,Button,Menu,Dropdown} from 'antd';

class StarWars extends React.Component {
  constructor(props) {
    super(props);
    this.pageOnChange=this.pageOnChange.bind(this)
    this.loadPage=this.loadPage.bind(this)
    this.showCharDetails=this.showCharDetails.bind(this)
  }

  loadPage(page){
    let props=this.props
    let cache=props.state.starWarsCache
    if(!(page in cache)){
      axios.get('https://swapi.co/api/people/?page='+page)
      .then(function (response) {
        let newCache={}
        newCache[page]=response.data.results
        let starWarsCache=Object.assign(props.state.starWarsCache,newCache)
        props.updateState(Object.assign(props.state,{
          starWarsCache:starWarsCache
        }))
      })
      .catch(function (error) {
        console.log('error!')
        console.log(error);
      })
    }
  }

  componentDidMount() {
    //Default state starWarsPageReady = false
    this.loadPage(this.props.state.starWarsPage)
  }

  componentWillUnmount() {
  }


  pageOnChange(pageNumber) {
    this.props.updateState(Object.assign(this.props.state,{
      starWarsPage:pageNumber
    }))
    this.loadPage(pageNumber)
  }
  
  showCharDetails(data){
    let context=this
    function handleCardShow(e) {
      let state=context.props.state
      let newCache={};
      console.log(e)
      newCache[data.name]=e.key;
      let starWarsCharCache=Object.assign(state.starWarsCharCache,newCache);
      context.props.updateState(Object.assign(state,{
        starWarsCharCache:starWarsCharCache
      }))
      console.log(state)
    }
    
    const menu = (
      <Menu onClick={handleCardShow}>
        <Menu.Item key="id">Identity</Menu.Item>
        <Menu.Item key="appr">Appearence</Menu.Item>
        <Menu.Item key="casting">Casting</Menu.Item>
        <Menu.Item key="links">Links</Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu}>
      <Button>
        Show <Icon type="down" />
      </Button>
    </Dropdown>
  }

  renderCard(ppl,idx,attributes){
    return <Col key={idx+'Col'} span={4}>
      <Card
        key={idx}
        title={ppl.name}
        extra={this.showCharDetails(ppl)}
        style={{ width: 270, height:300,marginTop: 16}}
      >
      {attributes.map(attr=><p key={ppl.name+'_'+attr.key}>{attr.label+':'+ppl[attr.key]}</p>)}
      </Card>
    </Col>
  }

  render() {
    let identityAttrs=[
      {label:'Gender',key:'gender'},
      {label:'Birth year',key:'birth_year'}
    ]
    let appearenceAttrs=[
      {label:'Height',key:'height'},
      {label:'Mass',key:'mass'},
      {label:'Hair color',key:'hair_color'},
      {label:'Eye color',key:'eye_color'},
      {label:'Skin color',key:'skin_color'},
    ]
    let castingAttrs=[
      {label:'Created',key:'created'},
      {label:'Edited',key:'edited'}
    ]
    let linksAttrs=[
      {label:'Homeworld',key:'homeworld'},
      {label:'Species',key:'species'},
      {label:'Starships',key:'starships'},
      {label:'Vehicles',key:'vehicles'},
      {label:'Films',key:'films'}
    ]
    let attributes={
      id:identityAttrs,
      appr:appearenceAttrs,
      casting:castingAttrs,
      links:linksAttrs
    }
    if(this.props.state.starWarsCache[this.props.state.starWarsPage]){
      var content=this.props.state.starWarsCache[this.props.state.starWarsPage].map((ppl,idx)=> 
        this.renderCard(ppl,idx,attributes[this.props.state.starWarsCharCache[ppl.name]||'id'])      
      )
    }else{
      var content=<Spin style={{position: 'relative',left: '50%',top:'50%'}}/>
    }
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          {content}
        </Row>
        <Pagination showQuickJumper defaultCurrent={1} total={90} onChange={this.pageOnChange} style={{paddingTop: '30px' }}/>
      </div>
    );
  }
}

// Define export
export default (state, updateState) => (
  <div className="page-two">
    <StarWars state={state} updateState={updateState}/>
  </div>
);
