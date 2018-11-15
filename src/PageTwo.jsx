'use strict';

// Load NPM modules
import React from 'react';
import axios from 'axios';
import {Pagination,Icon,Card,Col,Row,Spin,Popover,Button,Menu,Dropdown} from 'antd';
import {linkAttrs, linkTitle, cardAttrs} from './common/AttrDisplay.js'
import LinkCard from './common/LinkCard'
import CardMenu from './common/CardMenu'

class StarWars extends React.Component {
  constructor(props) {
    super(props);
    this.pageOnChange=this.pageOnChange.bind(this)
    this.loadPage=this.loadPage.bind(this)
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
  
  onClickLink(url,tag){
    this.loadPage(url,'starWarsCache')
  }

  renderCard(node,title,idx,attributes,CardMenu){
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
      'text':(node,attr)=><p key={node.name+'_'+attr.key}>{attr.label+': '+node[attr.key]}</p>,
      'link':(node,attr)=>renderLink(node,attr),
      'links':(node,attrs)=>renderLinks(node,attrs),
      'undefined':(node,attr)=><p key={node.name+'_'+attr.key}>{attr.label+': '+node[attr.key]}</p>
    }

    function getLinkInfo(url,tag,state,cacheName){

      if(url in state[cacheName]){
        let link=state[cacheName][url].data
        return {
          title:link[linkTitle[tag[0]]],
          content:linkAttrs[tag[0]].map(attr=>attrType[getType(link[attr.key])](link,attr))
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
      let link=getLinkInfo(url,tag,state,'starWarsCache')
      return <p key={attr.key}>
        {attr.label+': '}
        <LinkCard 
          key={url}
          state={state} 
          updateState={updateState} 
          onClick={()=>onClickLink(url,tag)} 
          content={link.content} 
          title={link.title} 
          trigger={'click'} 
          label={tag.join(': ')}
        />
      </p>
    }

    function renderLinks(node,attrs){
      let urls=node[attrs.key]
      let tags=urls.map(url=>{
        let tag=url.split('/').slice(-3,-1)
        let link=getLinkInfo(url,tag,state,'starWarsCache')
        return <LinkCard 
          key={url}
          state={state} 
          updateState={updateState} 
          onClick={()=>onClickLink(url,tag)} 
          content={link.content} 
          title={link.title} 
          trigger={'click'} 
          label={tag.join(': ')}
        />
      })
      return <p key={attrs.key}>
        {attrs.label+': '}
        {tags}
      </p>      
    }

    return <Col key={idx+'Col'} span={8}>
      <Card
        key={idx}
        title={node[title]}
        extra={CardMenu?CardMenu(node,this.props.state,this.props.updateState):(<p></p>)}
        style={{ width: 450, height:450,marginTop: 16}}
      >
      {attributes.map(attr=>attrType[getType(node[attr.key])](node,attr))}
      </Card>
    </Col>
  }

  render() {

    if(this.props.state.starWarsCache[this.props.state.starWarsPage]){
      var content=this.props.state.starWarsCache[this.props.state.starWarsPage].data.results.map((ppl,idx)=> 
        this.renderCard(ppl,'name',idx,cardAttrs[this.props.state.starWarsCharCache[ppl.name]||'id'],CardMenu)      
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
