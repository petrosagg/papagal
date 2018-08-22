"use strict";

var r = require("./EventConstants"), o = require("./EventPluginUtils"), i = require("./EventPropagators"), s = require("./SyntheticClipboardEvent"), a = require("./SyntheticEvent"), u = require("./SyntheticFocusEvent"), l = require("./SyntheticKeyboardEvent"), c = require("./SyntheticMouseEvent"), p = require("./SyntheticDragEvent"), d = require("./SyntheticTouchEvent"), h = require("./SyntheticUIEvent"), f = require("./SyntheticWheelEvent"), m = require("./getEventCharCode"), g = require("./invariant"), v = require("./keyOf"), b = (require("./warning"), 
r.topLevelTypes), y = {
    blur: {
        phasedRegistrationNames: {
            bubbled: v({
                onBlur: !0
            }),
            captured: v({
                onBlurCapture: !0
            })
        }
    },
    click: {
        phasedRegistrationNames: {
            bubbled: v({
                onClick: !0
            }),
            captured: v({
                onClickCapture: !0
            })
        }
    },
    contextMenu: {
        phasedRegistrationNames: {
            bubbled: v({
                onContextMenu: !0
            }),
            captured: v({
                onContextMenuCapture: !0
            })
        }
    },
    copy: {
        phasedRegistrationNames: {
            bubbled: v({
                onCopy: !0
            }),
            captured: v({
                onCopyCapture: !0
            })
        }
    },
    cut: {
        phasedRegistrationNames: {
            bubbled: v({
                onCut: !0
            }),
            captured: v({
                onCutCapture: !0
            })
        }
    },
    doubleClick: {
        phasedRegistrationNames: {
            bubbled: v({
                onDoubleClick: !0
            }),
            captured: v({
                onDoubleClickCapture: !0
            })
        }
    },
    drag: {
        phasedRegistrationNames: {
            bubbled: v({
                onDrag: !0
            }),
            captured: v({
                onDragCapture: !0
            })
        }
    },
    dragEnd: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragEnd: !0
            }),
            captured: v({
                onDragEndCapture: !0
            })
        }
    },
    dragEnter: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragEnter: !0
            }),
            captured: v({
                onDragEnterCapture: !0
            })
        }
    },
    dragExit: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragExit: !0
            }),
            captured: v({
                onDragExitCapture: !0
            })
        }
    },
    dragLeave: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragLeave: !0
            }),
            captured: v({
                onDragLeaveCapture: !0
            })
        }
    },
    dragOver: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragOver: !0
            }),
            captured: v({
                onDragOverCapture: !0
            })
        }
    },
    dragStart: {
        phasedRegistrationNames: {
            bubbled: v({
                onDragStart: !0
            }),
            captured: v({
                onDragStartCapture: !0
            })
        }
    },
    drop: {
        phasedRegistrationNames: {
            bubbled: v({
                onDrop: !0
            }),
            captured: v({
                onDropCapture: !0
            })
        }
    },
    focus: {
        phasedRegistrationNames: {
            bubbled: v({
                onFocus: !0
            }),
            captured: v({
                onFocusCapture: !0
            })
        }
    },
    input: {
        phasedRegistrationNames: {
            bubbled: v({
                onInput: !0
            }),
            captured: v({
                onInputCapture: !0
            })
        }
    },
    keyDown: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyDown: !0
            }),
            captured: v({
                onKeyDownCapture: !0
            })
        }
    },
    keyPress: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyPress: !0
            }),
            captured: v({
                onKeyPressCapture: !0
            })
        }
    },
    keyUp: {
        phasedRegistrationNames: {
            bubbled: v({
                onKeyUp: !0
            }),
            captured: v({
                onKeyUpCapture: !0
            })
        }
    },
    load: {
        phasedRegistrationNames: {
            bubbled: v({
                onLoad: !0
            }),
            captured: v({
                onLoadCapture: !0
            })
        }
    },
    error: {
        phasedRegistrationNames: {
            bubbled: v({
                onError: !0
            }),
            captured: v({
                onErrorCapture: !0
            })
        }
    },
    mouseDown: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseDown: !0
            }),
            captured: v({
                onMouseDownCapture: !0
            })
        }
    },
    mouseMove: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseMove: !0
            }),
            captured: v({
                onMouseMoveCapture: !0
            })
        }
    },
    mouseOut: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseOut: !0
            }),
            captured: v({
                onMouseOutCapture: !0
            })
        }
    },
    mouseOver: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseOver: !0
            }),
            captured: v({
                onMouseOverCapture: !0
            })
        }
    },
    mouseUp: {
        phasedRegistrationNames: {
            bubbled: v({
                onMouseUp: !0
            }),
            captured: v({
                onMouseUpCapture: !0
            })
        }
    },
    paste: {
        phasedRegistrationNames: {
            bubbled: v({
                onPaste: !0
            }),
            captured: v({
                onPasteCapture: !0
            })
        }
    },
    reset: {
        phasedRegistrationNames: {
            bubbled: v({
                onReset: !0
            }),
            captured: v({
                onResetCapture: !0
            })
        }
    },
    scroll: {
        phasedRegistrationNames: {
            bubbled: v({
                onScroll: !0
            }),
            captured: v({
                onScrollCapture: !0
            })
        }
    },
    submit: {
        phasedRegistrationNames: {
            bubbled: v({
                onSubmit: !0
            }),
            captured: v({
                onSubmitCapture: !0
            })
        }
    },
    touchCancel: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchCancel: !0
            }),
            captured: v({
                onTouchCancelCapture: !0
            })
        }
    },
    touchEnd: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchEnd: !0
            }),
            captured: v({
                onTouchEndCapture: !0
            })
        }
    },
    touchMove: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchMove: !0
            }),
            captured: v({
                onTouchMoveCapture: !0
            })
        }
    },
    touchStart: {
        phasedRegistrationNames: {
            bubbled: v({
                onTouchStart: !0
            }),
            captured: v({
                onTouchStartCapture: !0
            })
        }
    },
    wheel: {
        phasedRegistrationNames: {
            bubbled: v({
                onWheel: !0
            }),
            captured: v({
                onWheelCapture: !0
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
        if (r === !1) {
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