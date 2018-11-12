'use strict';

// Load screens
import pageOne from './../pageOne.jsx';
import pageTwo from './../pageTwo.jsx';

// A simple router to get the next page
export const pageRouter = page => ({ page1: pageOne, page2: pageTwo }[page]);
