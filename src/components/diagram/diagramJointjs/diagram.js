import React from 'react';
import ReactDOM from 'react-dom';
import * as joint from 'jointjs';
//import { connect } from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Panel
import Panel from './panel'
import {listOfActions} from './config-panel'

import Hardware from './hardware/figure';
import Passive from './passive/figure';
import Multimedia from './passive/figure';

import ObjectModal from './hardware/component';

// Css files
import "jointjs/dist/joint.css";
import "jointjs/css/layout.css";
import "jointjs/css/themes/default.css";

import $ from 'jquery'; 


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

        this.state = {
            op: false,
            op2: false,
            op3: false,
            selected: null,
            nameObject: "",
            attribute: "",
            value: "",
        };

        var CustomLink = joint.shapes.standard.Link.define('examples.CustomLink', {
        });

        this.linkDefau = new CustomLink({
        });
    }


    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 900,
            height: 500,
            model: this.graph,
            perpendicularLinks: false,
            linkPinning: true,
            defaultLink: this.linkDefau,
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

        // Event when connect a node using a link
        // two object can't be joined
        this.paper.on('link:connect', function(linkView, evt, targetView, connectedToView, magnetElement) {

            const fuente = linkView.sourceView.el.attributes.ty.value
            const destino = targetView.el.attributes.ty.value
            const substring = "object";

            if(fuente === "object" && destino === "object"){
                linkView.remove()
            }
            
        });

        // Event when double click

        this.paper.on('element:pointerdblclick', function(elementView, evt) {

            var element = elementView.model;
            //var text = prompt('Shape Text', element.attr(['label', 'text']));
            var text = element.attr(['label', 'text'])

            switch (element.attributes.attrs.root.ty) {
                case "Action":

                    this.changeShape(element, "")
                    this.handleOpen();
                  break;
                case "attribute":

                    this.changeShape(element, text)
                    this.handleOpenAttribute();
                  break;
                default:

                    this.changeShape(element, text)
                    this.handleOpenObject();
                  break;
            }
        }.bind(this));

        this.zoomLevel = 1;

        this.paper.on('link:snap:connect', function(linkView, evt, targetView) {
            targetView.vel.addClass('visible');
        });
    
        this.paper.on('link:snap:disconnect link:connect', function(linkView, evt, targetView) {
            targetView.vel.removeClass('visible');
        });

        this.paper.on('element:mouseenter', function(elementView, targetView) {
            var model = elementView.model;
            var bbox = model.getBBox();
            var ellipseRadius = (2);
            var offset = model.attr(['pointers', 'pointerShape']) === 'ellipse'
                ? { x: -ellipseRadius * bbox.width / 2, y: ellipseRadius * bbox.height / 2  }
                : { x: -3, y: 3 };

            elementView.vel.addClass('visible');

            var coorX = elementView.vel.node.attributes.removex.value
            var coorY = elementView.vel.node.attributes.removey.value

            elementView.addTools(new joint.dia.ToolsView({
                tools: [
                    new joint.elementTools.Remove({
                        useModelGeometry: true,
                        y: coorY,
                        x: coorX,
                        offset: offset
                    })
                ]
            }));
        });

        this.paper.on('cell:mouseleave', function(cellView, elementView) {
            cellView.removeTools();
            cellView.vel.removeClass('visible');
        });

        this.paper.$el.prepend([
            '<style>',
            '#' + this.paper.svg.id + ' .joint-port { visibility: hidden }',
            '#' + this.paper.svg.id + ' .visible .joint-port { visibility: visible; }',
            '</style>'
        ].join(' '));

        this.paper.options.snapLinks = true;

        $('#perpendicularLinks').on('change', function() {
            this.paper.options.perpendicularLinks = $(this).is(':checked') ? true : false;
        });

        this.paper.on('link:mouseenter', function(linkView) {
            var verticesTool = new joint.linkTools.Vertices();
            var segmentsTool = new joint.linkTools.Segments();
            var sourceArrowheadTool = new joint.linkTools.SourceArrowhead();
            var targetArrowheadTool = new joint.linkTools.TargetArrowhead();
            var sourceAnchorTool = new joint.linkTools.SourceAnchor();
            var targetAnchorTool = new joint.linkTools.TargetAnchor();
            var boundaryTool = new joint.linkTools.Boundary();
            var removeButton = new joint.linkTools.Remove();


            var toolsView = new joint.dia.ToolsView({
                tools: [
                    verticesTool, segmentsTool,
                    sourceArrowheadTool, targetArrowheadTool,
                    sourceAnchorTool, targetAnchorTool,
                    boundaryTool, removeButton
                ]
            });
            linkView.addTools(toolsView);
        });
        
        this.paper.on('link:mouseleave', function(linkView) {
            linkView.removeTools();
        });

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

    addFigure = (type) => {
        var figure = null;

        switch (type) {
            case "hardware":
                figure = Hardware()
              break;
            case "passive":
                figure = Passive()
              break;
            case "multimedia":
                figure = Multimedia()
              break;
            case "out":
                this.zoomOut()
              break;
            case "in":
                this.zoomIn()
              break;
            default:
                console.log("default")
            break;
        }

        if(figure){
            this.graph.addCells([figure]);
            
        }

    }  

    changeShape = (shape, text) => {

        if(text === undefined){
            text = ""
        }

        this.setState({
          selected: shape,
          nameObject: text,
        });
    };

    handleOpen = () => {
        this.setState({
          op: true
        });
    };

    handleClose = () => {
        this.setState({
            op: false
          });
    };

    /**
    handleClick =( event, data) => {
        event.preventDefault();

        var element = this.state.selected
        var svgFile = ChipIconsAction(data)
        element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile));
        this.setState({
            selected: null,
            nameObject: "",
            op: false,
        });
    };
    */
    handleOpenObject = () => {
        this.setState({
          op2: true
        });
    };

    handleCloseObject = () => {
        this.setState({
            op2: false
          });
    };

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    handleClickObject = (event, name ) => {
        event.preventDefault();

        var text = name
        var element = this.state.selected
        if (text !== null) {
            element.attr({
                label: { text: text },
                root: { title: text }
            });
            this.setState({
                selected: null,
                nameObject: "",
                op2: false,
            });
        }
    };


    handleOpenAttribute = () => {
        this.setState({
          op3: true
        });
    };

    handleCloseAttribute = () => {
        this.setState({
            op3: false
          });
    };

    handleClickAttribute = event => {
        event.preventDefault();
        var text = this.state.attribute + ': ' + this.state.value
        var element = this.state.selected
        if (text !== null) {
            element.attr({
                label: { text: text },
                root: { title: text }
            });
            this.setState({
                selected: null,
                attribute: "",
                value: "",
                op3: false,
            });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Panel listOfActions={listOfActions} action={this.addFigure}  />
                <div id="playground" ref="placeholder" ></div>
                <ObjectModal open={this.state.op2} handleOpen={this.handleOpenObject} handleClose={this.handleCloseObject} handleClick={this.handleClickObject} nameObject={this.state.nameObject}></ObjectModal>
            </div>
        );
    }
    
}

Graph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Graph)
