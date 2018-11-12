'use strict';

// Load NPM modules
import React from 'react';

// Load andDesign modules
import { Menu, Breadcrumb } from 'antd';

// Load functions
import { formatCamelCaseString } from './Functions.js';

// Builds the breadcrumb
export const buildBreadcrumb = items => {
  return items.map(item => (
    <Breadcrumb.Item key={item}>{formatCamelCaseString(item)}</Breadcrumb.Item>
  ));
};

// Builds the menu items
export const buildNavigationItems = navItems => {
  return navItems.map(item => (
    <Menu.Item key={item}>{formatCamelCaseString(item)}</Menu.Item>
  ));
};
