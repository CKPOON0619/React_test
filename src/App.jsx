'use strict';

// Load NPM modules
import autoBind from 'react-autobind';
import React, { Component } from 'react';

// Load antDesign modules
import { Layout, Menu, Breadcrumb } from 'antd';

// Load libs & functions
import { pageRouter } from './common/Router.js';
import { exampleText } from './common/Resources.js';
import { handleOnPageNavigation } from './common/Functions.js';
import { buildBreadcrumb, buildNavigationItems } from './common/Components.jsx';

// Define component class
export default class Application extends Component {
  // Initial Constructor
  constructor(props) {
    super(props) && autoBind(this);
    this.state = {
      page: 'page1',
      increment: 10,
      text: exampleText
    };
  }
  // Update state
  updateState(state) {
    return this.setState(state);
  }
  // Render
  render() {
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Layout.Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[this.state.page]}
            style={{ lineHeight: '64px' }}
            onClick={item => handleOnPageNavigation.call(this, item)}>
            {buildNavigationItems(['page1', 'page2'])}
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {buildBreadcrumb(['Home'])}
          </Breadcrumb>
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 'calc(100vh - 186px)'
            }}>
            {pageRouter(this.state.page)(this.state, this.updateState)}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          If you have any problems, please refer to the README.md for guidance.
        </Layout.Footer>
      </Layout>
    );
  }
}
