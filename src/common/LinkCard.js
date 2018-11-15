import React from 'react';
import axios from 'axios';
import { Popover, Button } from 'antd';

class LinkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.hide=this.hide.bind(this)
        this.handleVisibleChange=this.handleVisibleChange.bind(this)
    }
    hide(){
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange(visible){
        this.props.onClick();
        this.setState({ visible });   
    }

    render() {
        return (
            <Popover
                placement="right"
                content={this.props.content}
                title={this.props.title}
                trigger={this.props.trigger}
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
            <Button type="default">{this.props.label}</Button>
            </Popover>
        );
    }
}

export default LinkCard