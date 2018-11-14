'use strict';

// Load NPM modules
import React from 'react';
import axios from 'axios';
import {Pagination,Icon,Card,Col,Row,Spin,Popover,Button,Menu,Dropdown} from 'antd';
import LinkCard from './common/LinkCard.js'
class StarWars extends React.Component {
  constructor(props) {
    super(props);
    this.pageOnChange=this.pageOnChange.bind(this)
    this.loadPage=this.loadPage.bind(this)
    this.showCharDetails=this.showCharDetails.bind(this)
    this.onClickLink=this.onClickLink.bind(this)
    this.renderCard=this.renderCard.bind(this)
  }

  loadPage(pageUrl,cacheName){
    let props=this.props
    let cache=props.state[cacheName]
    if(!(pageUrl in cache)){
      axios.get(pageUrl)
      .then(function (response) {
        let newCache={}
        newCache[pageUrl]=response
        newCache=Object.assign(props.state[cacheName],newCache)
        let updates={}
        updates[cacheName]=newCache
        props.updateState(Object.assign(props.state,updates))
      })
      .catch(function (error) {
        console.log('error!')
        console.log(error);
      })
    }
  }

  componentDidMount() {
    //Default state starWarsPageReady = false
    this.loadPage(this.props.state.starWarsPage,'starWarsCache')
  }

  componentWillUnmount() {
  }


  pageOnChange(pageNumber) {
    this.props.updateState(Object.assign(this.props.state,{
      starWarsPage:'https://swapi.co/api/people/?page='+pageNumber
    }))
    this.loadPage('https://swapi.co/api/people/?page='+pageNumber,'starWarsCache')
  }
  
  showCharDetails(data){
    let context=this
    function handleCardShow(e) {
      let state=context.props.state;
      let newCache={};
      newCache[data.name]=e.key;
      let starWarsCharCache=Object.assign(state.starWarsCharCache,newCache);
      context.props.updateState(Object.assign(state,{
        starWarsCharCache:starWarsCharCache
      }))
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


  onClickLink(url,tag){
    this.loadPage(url,'starWarsCache')
  }

  renderCard(node,title,idx,attributes,showDetails){
    let context=this
    let state=this.props.state
    let updateState=this.props.updateState
    let onClickLink=this.onClickLink
    function getType(val){
      if(typeof(val)=='string'){
        return (val.match('https')?true:false)?'link':'text'
      }else if(Array.isArray(val)){
        if(getType(val[0])=='link') return 'links';
        if(getType(val[0])=='text') return 'texts'
      }
      return 'undefined'
    }
    let attrType={
      'text':(node,attr)=><p key={node.name+'_'+attr.key}>{attr.label+':'+node[attr.key]}</p>,
      'link':(node,attr)=>renderLink(node,attr),
      'links':(node,attrs)=>renderLinks(node,attrs),
      'undefined':(node,attr)=><p key={node.name+'_'+attr.key}>{attr.label+':'+node[attr.key]}</p>
    }

    function getLink(url,tag,cacheName){
      let showAttrs={
        people:[
          {label:'Height',key:'height'},
          {label:'Mass',key:'mass'},
          {label:'Hair color',key:'hair_color'},
          {label:'Eye color',key:'eye_color'},
          {label:'Skin color',key:'skin_color'},
          {label:'Created',key:'created'},
          {label:'Edited',key:'edited'},
          //{label:'Homeworld',key:'homeworld'},
          //{label:'Species',key:'species'},
          //{label:'Starships',key:'starships'},
          //{label:'Vehicles',key:'vehicles'},
          //{label:'Films',key:'films'}
        ],
        planets:[
          {label:'Created',key:'created'},
          {label:'Edited',key:'edited'},
          {label:'Climate',key:'climate'},
          {label:'Diameter',key:'diameter'},
          {label:'Gravity',key:'gravity'},
          {label:'Orbital period',key:'orbital_period'},
          {label:'Population',key:'population'},
          {label:'Surface water',key:'surface_water'},
          {label:'Terrain',key:'terrain'},
          //{label:'Films',key:'films'},
          {label:'Residents',key:'residents'}    
        ],
        species:[
          {label:'Created',key:'created'},
          {label:'Edited',key:'edited'},
          {label:'Average height',key:'average_height'},
          {label:'Average lifespan',key:'average_lifespan'},
          {label:'Classification',key:'classification'},
          {label:'Designation',key:'designation'},
          {label:'Eye colors',key:'eye_colors'},
          {label:'Language',key:'language'},
          {label:'Hair colors',key:'hair_colors'},
          {label:'Skin colors',key:'skin_colors'},
          //{label:'Films',key:'films'},
          {label:'Homeworld',key:'homeworld'},
          {label:'People',key:'people'},
        ],
        starships:[
          {label:'Pilots',key:'pilots'},
          {label:'MGLT',key:'MGLT'},
          {label:'Cargo capacity',key:'cargo_capacity'},
          {label:'Consumables',key:'consumables'},
          {label:'Cost in credits',key:'cost_in_credits'},
          {label:'Created',key:'created'},
          {label:'crew',key:'crew'},
          {label:'Edited',key:'edited'},
          {label:'Hyperdrive rating',key:'hyperdrive_rating'},
          {label:'Length',key:'length'},
          {label:'Manufacturer',key:'manufacturer'},
          {label:'Max atmosphering speed',key:'max_atmosphering_speed'},
          {label:'Model',key:'model'},
          {label:'Name',key:'name'},
          {label:'passengers',key:'passengers'},
          {label:'Starship class',key:'starship_class'},
          //{label:'films',key:'films'}
        ],
        vehicles:[
          {label:'Cargo capacity',key:'cargo_capacity'},
          {label:'Consumables',key:'consumables'},
          {label:'Cost in credits',key:'cost_in_credits'},
          {label:'Created',key:'created'},
          {label:'Crew',key:'crew'},
          {label:'Edited',key:'edited'},
          {label:'Length',key:'length'},
          {label:'Manufacturer',key:'manufacturer'},
          {label:'Max atmosphering speed',key:'max_atmosphering_speed'},
          {label:'Model',key:'model'},
          {label:'Passengers',key:'passengers'},
          {label:'Vehicle class',key:'vehicle_class'},
          {label:'pilots',key:'pilots'},
          //{label:'films',key:'films'}
        ],
        films:[
          {label:'Created',key:'created'},
          {label:'Director',key:'director'},
          {label:'Edited',key:'edited'},
          {label:'Episode id',key:'episode_id'},
          {label:'Opening crawl',key:'opening_crawl'},
          {label:'Producer',key:'producer'},
          {label:'Release date',key:'release_date'},
          {label:'characters',key:'characters'},
          {label:'planets',key:'planets'},
          {label:'species',key:'species'},
          {label:'starships',key:'starships'},
          {label:'vehicles',key:'vehicles'}
        ]
      }
      let showTitle={
        people:'name',
        planets:'name',
        species:'name',
        starships:'name',
        vehicles:'name',
        films:'title'
      }
      if(url in state[cacheName]){
        let link=state[cacheName][url].data
        return {
          title:link[showTitle[tag[0]]],
          content:showAttrs[tag[0]].map(attr=>attrType[getType(link[attr.key])](link,attr))
        }
      }else{
        return {
          title:<Spin style={{position: 'relative',left:'0'}}/>,
          content:<Spin style={{position: 'relative',left: '50%',top:'50%'}}/>
        }
      }
    }

    function renderLink(node,attr){
      let url=node[attr.key]
      let tag=url.split('/').slice(-3,-1)
      let link=getLink(url,tag,'starWarsCache')
      return <p key={attr.key}>
        {attr.label+':'}
        <LinkCard 
          key={url}
          state={state} 
          updateState={updateState} 
          onClick={()=>onClickLink(url,tag)} 
          content={link.content} 
          title={link.title} 
          trigger={'click'} 
          label={tag.join(':')}
        />
      </p>
    }

    function renderLinks(node,attrs){
      let urls=node[attrs.key]
      let tags=urls.map(url=>{
        let tag=url.split('/').slice(-3,-1)
        let link=getLink(url,tag,'starWarsCache')
        return <LinkCard 
          key={url}
          state={state} 
          updateState={updateState} 
          onClick={()=>onClickLink(url,tag)} 
          content={link.content} 
          title={link.title} 
          trigger={'click'} 
          label={tag.join(':')}
        />
      })
      return <p key={attrs.key}>
        {attrs.label+':'}
        {tags}
      </p>      
    }

    return <Col key={idx+'Col'} span={8}>
      <Card
        key={idx}
        title={node[title]}
        extra={showDetails?showDetails(node):(<p></p>)}
        style={{ width: 450, height:450,marginTop: 16}}
      >
      {attributes.map(attr=>attrType[getType(node[attr.key])](node,attr))}
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
      var content=this.props.state.starWarsCache[this.props.state.starWarsPage].data.results.map((ppl,idx)=> 
        this.renderCard(ppl,'name',idx,attributes[this.props.state.starWarsCharCache[ppl.name]||'id'],this.showCharDetails)      
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
