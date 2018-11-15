
import React from 'react';
import {Icon,Button,Menu,Dropdown} from 'antd';
function CardMenu(node,state,updateState){
    function handleCardShow(e) {
      let newCache={};
      newCache[node.name]=e.key;
      let starWarsCharCache=Object.assign(state.starWarsCharCache,newCache);
      updateState(Object.assign(state,{
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

  export default CardMenu