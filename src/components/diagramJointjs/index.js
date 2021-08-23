import React from 'react';
import ReactDOM from 'react-dom';
import * as joint from 'jointjs';
//import { connect } from 'react-redux'
import PropTypes from "prop-types";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import withStyles from "@material-ui/core/styles/withStyles";
// Panel
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// Css files
import "jointjs/dist/joint.css";
import "jointjs/css/layout.css";
import "jointjs/css/themes/default.css";


const styles = theme => ({
    ...theme.formTheme,
    root: {
        
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    new: {
        overflow: 'auto',
    },
    list: {
        position: 'absolute',
        zIndex: '1',
        width: '40px',
        
    },
    btn: {
        paddingLeft : '8px',
        backgroundColor: '#CCCCCC',
    },
    ico: {
        minWidth: '24px',
    },
    chip: {
        margin: theme.spacing(1)
    }
  });

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.graph = new joint.dia.Graph()

    }


    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 900,
            height: 500,
            model: this.graph,
            perpendicularLinks: false,
            linkPinning: true,
            gridSize: 20,
            drawGrid: {
                name: 'mesh',
                args: { color: '#D6D6D6' }
            },
            background: {
                color: '#EEEEEE'
            },     
            defaultConnectionPoint: { name: 'boundary' },
            interactive: function(cellView) {
                if (cellView.model.get('customLinkInteractions')) return { vertexAdd: false };
                return true; // all interactions enabled
            },
            linkView: joint.dia.LinkView.extend({
                contextmenu: function(evt, x, y) {
                    if (this.model.get('customLinkInteractions')) {
                        this.addLabel(x, y, { absoluteDistance: true, reverseDistance: true });
                    }
                },
                // custom options:
                options: joint.util.defaults({
                    doubleLinkTools: true,
                }, joint.dia.LinkView.prototype.options)
            })
        });

        this.zoomLevel = 1;

    }


    zoomIn = () => {
        this.zoomLevel = Math.min(3, this.zoomLevel + 0.2);
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    zoomOut = () => {
        this.zoomLevel = Math.max(0.2, this.zoomLevel - 0.2);
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

            <List className={classes.list}>
                <ListItem className={classes.btn} button onClick={this.zoomOut} >
                        <ListItemIcon className={classes.ico}>
                            <ZoomOutIcon style={{ fontSize: 28 }}/>
                        </ListItemIcon>
                </ListItem>
                <ListItem className={classes.btn} button onClick={this.zoomIn}>
                        <ListItemIcon className={classes.ico}>
                            <ZoomInIcon style={{ fontSize: 28 }}/>
                        </ListItemIcon>
                </ListItem>
            </List>

                <div id="playground" ref="placeholder" >
            
                </div>
                
            </div>
        );
    }
    
}

Graph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Graph)
