/**
 * Destroys the event listener created by the parent function.
 */
declare type ListenDestructor = () => void;

/**
 * Takes in an event listener callback for the corresponding event.
 * Returns a function that, when called, destroys
 * the event listener.
 */
declare type ListenComposer = (listener: () => void) => ListenDestructor;

/**
 * An enum type consisting of all of the DOM events valid
 * on Document and Element types
 */
declare type EventListenerComposeObject = {
  afterscriptexecute: ListenComposer;
  auxclick: ListenComposer;
  beforescriptexecute: ListenComposer;
  blur: ListenComposer;
  click: ListenComposer;
  compositionend: ListenComposer;
  compositionstart: ListenComposer;
  compositionupdate: ListenComposer;
  contextmenu: ListenComposer;
  copy: ListenComposer;
  cut: ListenComposer;
  dblclick: ListenComposer;
  DOMActivate: ListenComposer;
  DOMMouseScroll: ListenComposer;
  error: ListenComposer;
  focusin: ListenComposer;
  focusout: ListenComposer;
  focus: ListenComposer;
  fullscreenchange: ListenComposer;
  fullscreenerror: ListenComposer;
  gesturechange: ListenComposer;
  gestureend: ListenComposer;
  gesturestart: ListenComposer;
  keydown: ListenComposer;
  keypress: ListenComposer;
  keyup: ListenComposer;
  mousedown: ListenComposer;
  mouseenter: ListenComposer;
  mouseleave: ListenComposer;
  mousemove: ListenComposer;
  mouseout: ListenComposer;
  mouseover: ListenComposer;
  mouseup: ListenComposer;
  mousewheel: ListenComposer;
  msContentZoom: ListenComposer;
  MSGestureChange: ListenComposer;
  MSGestureEnd: ListenComposer;
  MSGestureHold: ListenComposer;
  MSGestureStart: ListenComposer;
  MSGestureTap: ListenComposer;
  MSInertiaStart: ListenComposer;
  MSManipulationStateChanged: ListenComposer;
  paste: ListenComposer;
  scroll: ListenComposer;
  select: ListenComposer;
  show: ListenComposer;
  touchcancel: ListenComposer;
  touchend: ListenComposer;
  touchmove: ListenComposer;
  touchstart: ListenComposer;
  webkitmouseforcechanged: ListenComposer;
  webkitmouseforcedown: ListenComposer;
  webkitmouseforceup: ListenComposer;
  webkitmouseforcewillbegin: ListenComposer;
  wheel: ListenComposer;
};

declare enum EventTypes {
  'afterscriptexecute',
  'auxclick',
  'beforescriptexecute',
  'blur',
  'click',
  'compositionend',
  'compositionstart',
  'compositionupdate',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'DOMActivate',
  'DOMMouseScroll',
  'error',
  'focusin',
  'focusout',
  'focus',
  'fullscreenchange',
  'fullscreenerror',
  'gesturechange',
  'gestureend',
  'gesturestart',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'mousewheel',
  'msContentZoom',
  'MSGestureChange',
  'MSGestureEnd',
  'MSGestureHold',
  'MSGestureStart',
  'MSGestureTap',
  'MSInertiaStart',
  'MSManipulationStateChanged',
  'paste',
  'scroll',
  'select',
  'show',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'webkitmouseforcechanged',
  'webkitmouseforcedown',
  'webkitmouseforceup',
  'webkitmouseforcewillbegin',
  'wheel',
}
