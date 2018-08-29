var r, o, i, s, a, u, l;

s = require("classnames");

a = React.DOM;

l = a.video;

u = a.source;

o = React.createClass({
    displayName: "VideoSource",
    componentDidMount: function() {
        return $(this.getDOMNode()).on("error", this.props.onError);
    },
    componentWillUnmount: function() {
        return $(this.getDOMNode()).off("error");
    },
    render: function() {
        return u({
            src: this.props.src,
            type: this.props.type
        });
    }
});

i = React.createFactory(o);

r = React.createClass({
    displayName: "GifvEmbeddable",
    propTypes: {
        url: React.PropTypes.string,
        sourcesInformation: React.PropTypes.array,
        onError: React.PropTypes.func
    },
    _source: function(e) {
        return i({
            key: e.key,
            src: e.src,
            type: e.type,
            onError: this.props.onError
        });
    },
    getInitialState: function() {
        return {
            hidden: true
        };
    },
    componentDidMount: function() {
        $(this.getDOMNode()).on("error", this.props.onError);
        return $(this.getDOMNode()).on("loadeddata", function(e) {
            return function() {
                return e.props.parent.preserveScrolling(function() {
                    return e.setState({
                        hidden: false
                    });
                });
            };
        }(this));
    },
    componentWillUnmount: function() {
        $(this.getDOMNode()).off("error");
        return $(this.getDOMNode()).off("loadeddata");
    },
    componentDidAttach: function() {
        return this.getDOMNode().play();
    },
    render: function() {
        return l({
            className: s({
                hidden: this.state.hidden
            }),
            loop: "loop",
            muted: "muted",
            autoPlay: "autoplay",
            preload: "preload",
            onError: this.props.onError
        }, this.props.sources.map(this._source), this.props.url);
    }
});

module.exports = r;
