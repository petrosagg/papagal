"use strict";

var r = require("./EventConstants"), o = require("./EventPluginUtils"), i = require("./EventPropagators"), s = require("./SyntheticClipboardEvent"), a = require("./SyntheticEvent"), u = require("./SyntheticFocusEvent"), l = require("./SyntheticKeyboardEvent"), c = require("./SyntheticMouseEvent"), p = require("./SyntheticDragEvent"), d = require("./SyntheticTouchEvent"), h = require("./SyntheticUIEvent"), f = require("./SyntheticWheelEvent"), m = require("./getEventCharCode"), g = require("./invariant"), v = require("./keyOf"), b = (require("./warning"), 
r.topLevelTypes), y = {
    blur: {
        phasedRegistrationNames: {
            bubbled: v({
                onBlur: true
            }),
            captured: v({
                onBlurCapture: true
            })
        }
    },
    click: {
        phasedRegistrationNames: {
            bubbled: v({
                onClick: true
            }),
            captured: v({
                onClickCapture: true
            })
        }
    },
    contextMenu: {
        phasedRegistrationNames: {
            bubbled: v({
                onContextMenu: true
            }),
            captured: v({
                onContextMenuCapture: true
            })
        }
    },
    copy: {
        phasedRegistrationNames: {
            bubbled: v({
                onCopy: true
            }),
            captured: v({
                onCopyCapture: true
            })
        }
    },
    cut: {
        phasedRegistrationNames: {
            bubbled: v({
                onCut: true
            }),
            captured: v({
                onCutCapture: true
            })
        }
    },
    doubleClick: {
        phasedRegistrationNames: {
            bubbled: v({
                onDoubleClick: true
            }),
            captured: v({
                onDoubleClickCapture: true
            })
        }
    },
    drag: {
        phasedRegistrationNames: {
            bubbled: v({
                onDrag: true
            }),
            captured: v({
                onDragCapture: true
            })
        }
    },
    dragEnd: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragEnd: true
            }),
            captured: v({
                onDragEndCapture: true
            })
        }
    },
    dragEnter: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragEnter: true
            }),
            captured: v({
                onDragEnterCapture: true
            })
        }
    },
    dragExit: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragExit: true
            }),
            captured: v({
                onDragExitCapture: true
            })
        }
    },
    dragLeave: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragLeave: true
            }),
            captured: v({
                onDragLeaveCapture: true
            })
        }
    },
    dragOver: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragOver: true
            }),
            captured: v({
                onDragOverCapture: true
            })
        }
    },
    dragStart: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragStart: true
            }),
            captured: v({
                onDragStartCapture: true
            })
        }
    },
    drop: {
        phasedRegistrationNames: {
            bubbled: v({
                onDrop: true
            }),
            captured: v({
                onDropCapture: true
            })
        }
    },
    focus: {
        phasedRegistrationNames: {
            bubbled: v({
                onFocus: true
            }),
            captured: v({
                onFocusCapture: true
            })
        }
    },
    input: {
        phasedRegistrationNames: {
            bubbled: v({
                onInput: true
            }),
            captured: v({
                onInputCapture: true
            })
        }
    },
    keyDown: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyDown: true
            }),
            captured: v({
                onKeyDownCapture: true
            })
        }
    },
    keyPress: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyPress: true
            }),
            captured: v({
                onKeyPressCapture: true
            })
        }
    },
    keyUp: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyUp: true
            }),
            captured: v({
                onKeyUpCapture: true
            })
        }
    },
    load: {
        phasedRegistrationNames: {
            bubbled: v({
                onLoad: true
            }),
            captured: v({
                onLoadCapture: true
            })
        }
    },
    error: {
        phasedRegistrationNames: {
            bubbled: v({
                onError: true
            }),
            captured: v({
                onErrorCapture: true
            })
        }
    },
    mouseDown: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseDown: true
            }),
            captured: v({
                onMouseDownCapture: true
            })
        }
    },
    mouseMove: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseMove: true
            }),
            captured: v({
                onMouseMoveCapture: true
            })
        }
    },
    mouseOut: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseOut: true
            }),
            captured: v({
                onMouseOutCapture: true
            })
        }
    },
    mouseOver: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseOver: true
            }),
            captured: v({
                onMouseOverCapture: true
            })
        }
    },
    mouseUp: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseUp: true
            }),
            captured: v({
                onMouseUpCapture: true
            })
        }
    },
    paste: {
        phasedRegistrationNames: {
            bubbled: v({
                onPaste: true
            }),
            captured: v({
                onPasteCapture: true
            })
        }
    },
    reset: {
        phasedRegistrationNames: {
            bubbled: v({
                onReset: true
            }),
            captured: v({
                onResetCapture: true
            })
        }
    },
    scroll: {
        phasedRegistrationNames: {
            bubbled: v({
                onScroll: true
            }),
            captured: v({
                onScrollCapture: true
            })
        }
    },
    submit: {
        phasedRegistrationNames: {
            bubbled: v({
                onSubmit: true
            }),
            captured: v({
                onSubmitCapture: true
            })
        }
    },
    touchCancel: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchCancel: true
            }),
            captured: v({
                onTouchCancelCapture: true
            })
        }
    },
    touchEnd: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchEnd: true
            }),
            captured: v({
                onTouchEndCapture: true
            })
        }
    },
    touchMove: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchMove: true
            }),
            captured: v({
                onTouchMoveCapture: true
            })
        }
    },
    touchStart: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchStart: true
            }),
            captured: v({
                onTouchStartCapture: true
            })
        }
    },
    wheel: {
        phasedRegistrationNames: {
            bubbled: v({
                onWheel: true
            }),
            captured: v({
                onWheelCapture: true
            })
        }
    }
}, _ = {
    topBlur: y.blur,
    topClick: y.click,
    topContextMenu: y.contextMenu,
    topCopy: y.copy,
    topCut: y.cut,
    topDoubleClick: y.doubleClick,
    topDrag: y.drag,
    topDragEnd: y.dragEnd,
    topDragEnter: y.dragEnter,
    topDragExit: y.dragExit,
    topDragLeave: y.dragLeave,
    topDragOver: y.dragOver,
    topDragStart: y.dragStart,
    topDrop: y.drop,
    topError: y.error,
    topFocus: y.focus,
    topInput: y.input,
    topKeyDown: y.keyDown,
    topKeyPress: y.keyPress,
    topKeyUp: y.keyUp,
    topLoad: y.load,
    topMouseDown: y.mouseDown,
    topMouseMove: y.mouseMove,
    topMouseOut: y.mouseOut,
    topMouseOver: y.mouseOver,
    topMouseUp: y.mouseUp,
    topPaste: y.paste,
    topReset: y.reset,
    topScroll: y.scroll,
    topSubmit: y.submit,
    topTouchCancel: y.touchCancel,
    topTouchEnd: y.touchEnd,
    topTouchMove: y.touchMove,
    topTouchStart: y.touchStart,
    topWheel: y.wheel
};

for (var w in _) {
    _[w].dependencies = [ w ];
}

var k = {
    eventTypes: y,
    executeDispatch: function(e, t, n) {
        var r = o.executeDispatch(e, t, n);
        if (r === false) {
            e.stopPropagation(), e.preventDefault()
        };
    },
    extractEvents: function(e, t, n, r) {
        var o = _[e];
        if (!o) {
            return null;
        }
        var v;
        switch (e) {
          case b.topInput:
          case b.topLoad:
          case b.topError:
          case b.topReset:
          case b.topSubmit:
            v = a;
            break;

          case b.topKeyPress:
            if (m(r) === 0) {
                return null;
            }

          case b.topKeyDown:
          case b.topKeyUp:
            v = l;
            break;

          case b.topBlur:
          case b.topFocus:
            v = u;
            break;

          case b.topClick:
            if (r.button === 2) {
                return null;
            }

          case b.topContextMenu:
          case b.topDoubleClick:
          case b.topMouseDown:
          case b.topMouseMove:
          case b.topMouseOut:
          case b.topMouseOver:
          case b.topMouseUp:
            v = c;
            break;

          case b.topDrag:
          case b.topDragEnd:
          case b.topDragEnter:
          case b.topDragExit:
          case b.topDragLeave:
          case b.topDragOver:
          case b.topDragStart:
          case b.topDrop:
            v = p;
            break;

          case b.topTouchCancel:
          case b.topTouchEnd:
          case b.topTouchMove:
          case b.topTouchStart:
            v = d;
            break;

          case b.topScroll:
            v = h;
            break;

          case b.topWheel:
            v = f;
            break;

          case b.topCopy:
          case b.topCut:
          case b.topPaste:
            v = s;
        }
        g(v);
        var y = v.getPooled(o, n, r);
        i.accumulateTwoPhaseDispatches(y);
        return y;
    }
};

module.exports = k;
