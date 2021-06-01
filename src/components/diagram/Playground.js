import React from 'react';
import ReactDOM from 'react-dom';
import * as joint from 'jointjs';
//import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from "prop-types";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import IconButton from '@material-ui/core/IconButton';
import withStyles from "@material-ui/core/styles/withStyles";
import $ from 'jquery'; 

const styles = theme => ({
    ...theme.formTheme,
    root: {
        width: "100%",
        border:"1px solid black",
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
            interactive: function(cellView) {
                if (cellView.model.get('customLinkInteractions')) return { vertexAdd: false };
                return true; // all interactions enabled
            },
            elementView: joint.dia.ElementView.extend({
                pointerdblclick: function(evt, x, y) {
                    this.model.remove();
                }
            }),
            linkView: joint.dia.LinkView.extend({
                // custom interactions:
                pointerdblclick: function(evt, x, y) {
                    if (this.model.get('customLinkInteractions')) {
                        this.addVertex(x, y);
                    }
                },
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

        this.paper.on('link:pointerdown', function(evt, linkView, x, y) {
            console.log('link:pointerdown');
        });
        
        this.paper.on('link:disconnect', function(linkView, evt, disconnectedFromView, magnetElement, type) {
            console.log('link:disconnect', type, disconnectedFromView, magnetElement);
        });
        
        this.paper.on('link:connect', function(linkView, evt, connectedToView, magnetElement, type) {
            console.log('link:connect', type, connectedToView, magnetElement);
        });

        this.paper.on('element:mouseenter', function(elementView) {
            var model = elementView.model;
            var bbox = model.getBBox();
            var ellipseRadius = (2);
            var offset = model.attr(['pointers', 'pointerShape']) === 'ellipse'
                ? { x: -ellipseRadius * bbox.width / 2, y: ellipseRadius * bbox.height / 2  }
                : { x: -3, y: 3 };

            elementView.addTools(new joint.dia.ToolsView({
                tools: [
                    new joint.elementTools.Remove({
                        useModelGeometry: true,
                        y: '50%',
                        x: '100%',
                        offset: offset
                    })
                ]
            }));
        });

        this.paper.on('cell:mouseleave', function(cellView) {
            cellView.removeTools();
        });
        
        $('#perpendicularLinks').on('change', function() {
            this.paper.options.perpendicularLinks = $(this).is(':checked') ? true : false;
        });

        this.zoomLevel = 1;

        // custom link definition
        this.CustomLink = joint.dia.Link.define('examples.CustomLink', {
            defaultLabel: {
                markup: [
                    {
                        tagName: 'circle',
                        selector: 'body'
                    }, {
                        tagName: 'text',
                        selector: 'label'
                    }
                ],
                attrs: {
                    line: {
                        stroke: '#222138',
                        sourceMarker: {
                            'fill': '#31d0c6',
                            'stroke': 'none',
                            'd': 'M 5 -10 L -15 0 L 5 10 Z'
                        },
                        targetMarker: {
                            'fill': '#fe854f',
                            'stroke': 'none',
                            'd': 'M 5 -10 L -15 0 L 5 10 Z'
                        }
                    }
                },
                position: {
                    distance: 0.5, // place label at midpoint by default
                    offset: {
                        y: -20 // offset label by 20px upwards by default
                    },
                    args: {
                        absoluteOffset: true // keep offset absolute when moving by default
                    }
                }
            }
        });
    }

    addObjectPassive = () => {

        this.rect2 = new joint.shapes.standard.Rectangle();
        this.rect2.position(400, 30);
        this.rect2.resize(100, 100);
        this.rect2.attr({
            body: {
                fill: '#64B5F6',
                rx: 5,
                ry: 5,
                strokeWidth: 2
            },
            text: { text: 'Box', magnet: true }
        });

        this.graph.addCells([this.rect2]);
    }

    addObjectHardware = () => {

        this.circle1 = new joint.shapes.standard.Circle();
        this.circle1.resize(100, 100);
        this.circle1.position(200, 10);
        this.circle1.attr('root/tabindex', 2);
        this.circle1.attr('root/title', 'joint.shapes.standard.Circle');
        this.circle1.attr('body/fill', '#F06292');
        this.circle1.attr('text/text', 'Box');
        this.circle1.attr('text/magnet', true);
/** 
        var rect2 = new joint.shapes.basic.Circle({
            position: { x: 300, y: 70 },
            size: { width: 100, height: 100 },
            attrs: { 
                body: {
                    fill: '#2C3E50',
                    rx: 5,
                    ry: 5,
                    strokeWidth: 2
                }}
        });
*/
        this.graph.addCells([this.circle1]);
    }

    addObjectMultimedial = () => {

        this.poly1 = new joint.shapes.standard.Polygon();
        this.poly1.resize(100, 100);
        this.poly1.position(200, 210);
        this.poly1.attr('root/tabindex', 5);
        this.poly1.attr('root/title', 'joint.shapes.standard.Polygon');
        this.poly1.attr('body/fill', '#FFB74D');
        this.poly1.attr('body/refPoints', '0,10 10,0 20,10 10,20');
        this.poly1.attr('text/text', 'Box');
        this.poly1.attr('text/magnet', true);
/** 
        var rect2 =  new joint.shapes.basic.Rhombus({
            position: { x: 300, y: 70 },
            size: { width: 100, height: 100 },
            attrs: { 
                body: {
                    fill: '#2C3E50',
                    rx: 5,
                    ry: 5,
                    strokeWidth: 2
                }}
        });
*/
        this.graph.addCells([this.poly1]);
    }

    zoomIn = () => {
        this.zoomLevel = Math.min(3, this.zoomLevel + 0.2);
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    zoomOut = () => {
        console.log(this.zoomLevel)
        this.zoomLevel = Math.max(0.2, this.zoomLevel - 0.2);
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    enlace = () => {
        // custom link definition
        this.link1 = new joint.shapes.standard.Link({
            source: { x: 20, y: 20 },
            target: { x: 350, y: 20 },
            attrs: {
                line: {
                    stroke: '#222138',
                    sourceMarker: {
                        'fill': '#31d0c6',
                        'stroke': 'none',
                        'd': 'M 5 -10 L -15 0 L 5 10 Z'
                    },
                    targetMarker: {
                        'fill': '#fe854f',
                        'stroke': 'none',
                        'd': 'M 5 -10 L -15 0 L 5 10 Z'
                    }
                }
            }
        });

        this.link1.source(this.circle1);
        this.link1.target(this.poly1); 

        this.graph.addCells([this.link1]);
        console.log(this.circle1)
        console.log(this.poly1)
        console.log(this.link1)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    variant="contained"
                    aria-label="vertical outlined primary button group"
                >
                    <IconButton aria-label="zoomOut" onClick={this.zoomOut}>
                        <ZoomOutIcon />
                    </IconButton>
                    <IconButton aria-label="zoomIn" onClick={this.zoomIn}>
                        <ZoomInIcon />
                    </IconButton>
                    <Button onClick={this.addObjectHardware}>Object Hardware</Button>
                    <Button onClick={this.addObjectPassive}>Object Passive</Button>
                    <Button onClick={this.addObjectMultimedial}>Object Multimedia</Button>
                    <Button onClick={this.enlace}>enlace</Button>
                </ButtonGroup>
                <div id="playground" ref="placeholder" className={classes.root} >
                </div>
            </div>
);
    }
}

Graph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Graph)
