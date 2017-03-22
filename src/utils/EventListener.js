import _ from 'lodash';

/* Simple Event Handling class
 * ---------------------------------------
 * This is a simple class which handles event emitting and event handling.
 * Simple usage:

  let e = new EventListener();
  let handleEvent = () => { ... };
  e.on('$event', handleEvent, someContext)
  ...
  setTimeout(() => e.trigger('$event'), 5000);

 * NOTE that someContext has to be an object;
 */

class EventListener {
    constructor () {
        this.eventListeners = new WeakMap();
        this.contextSet = [];
    }

    on (event, callback, context) {
        if (!this.eventListeners.get(context)) {
            this.eventListeners.set(context, new Map());
            this.contextSet.push(context);
        }
        this.eventListeners.get(context).set(event, callback);
    }

    once (event, callback, context) {
        this.on(event, () => {
            callback();
            this.off(context, event);
        }, context);
    }

    off (context, ...events) {
        if (!events.length) events = this.eventListeners.get(context).values();
        this.contextSet.splice(this.contextSet.indexOf(context), 1);
        _.each(events, (event) => this.eventListeners.get(context).delete(event));
    }

    trigger (event, ...params) {
        _.each(this.contextSet, (context) => this.eventListeners.get(context).get(event) ? this.eventListeners.get(context).get(event)(...params) : false);
    }
}

export default EventListener;
