function isNumber(subject) {
  return typeof subject === 'number';
}
function isString(subject) {
  return typeof subject === 'string';
}
function isBoolean(subject) {
  return typeof subject === 'boolean';
}
function isObject(subject) {
  return Object.prototype.toString.call(subject) === '[object Object]';
}
function mathAbs(n) {
  return Math.abs(n);
}
function mathSign(n) {
  return Math.sign(n);
}
function deltaAbs(valueB, valueA) {
  return mathAbs(valueB - valueA);
}
function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0;
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
  return mathAbs(diff / valueB);
}
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}
function arrayKeys(array) {
  return objectKeys(array).map(Number);
}
function arrayLast(array) {
  return array[arrayLastIndex(array)];
}
function arrayLastIndex(array) {
  return Math.max(0, array.length - 1);
}
function arrayIsLastIndex(array, index) {
  return index === arrayLastIndex(array);
}
function arrayFromNumber(n, startAt = 0) {
  return Array.from(Array(n), (_, i) => startAt + i);
}
function objectKeys(object) {
  return Object.keys(object);
}
function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach(key => {
      const valueA = mergedObjects[key];
      const valueB = currentObject[key];
      const areObjects = isObject(valueA) && isObject(valueB);
      mergedObjects[key] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
    });
    return mergedObjects;
  }, {});
}
function isMouseEvent(evt, ownerWindow) {
  return typeof ownerWindow.MouseEvent !== 'undefined' && evt instanceof ownerWindow.MouseEvent;
}

function Alignment(align, viewSize) {
  const predefined = {
    start,
    center,
    end
  };
  function start() {
    return 0;
  }
  function center(n) {
    return end(n) / 2;
  }
  function end(n) {
    return viewSize - n;
  }
  function measure(n, index) {
    if (isString(align)) return predefined[align](n);
    return align(viewSize, n, index);
  }
  const self = {
    measure
  };
  return self;
}

function EventStore() {
  let listeners = [];
  function add(node, type, handler, options = {
    passive: true
  }) {
    let removeListener;
    if ('addEventListener' in node) {
      node.addEventListener(type, handler, options);
      removeListener = () => node.removeEventListener(type, handler, options);
    } else {
      const legacyMediaQueryList = node;
      legacyMediaQueryList.addListener(handler);
      removeListener = () => legacyMediaQueryList.removeListener(handler);
    }
    listeners.push(removeListener);
    return self;
  }
  function clear() {
    listeners = listeners.filter(remove => remove());
  }
  const self = {
    add,
    clear
  };
  return self;
}

function Animations(ownerDocument, ownerWindow, update, render) {
  const documentVisibleHandler = EventStore();
  const fixedTimeStep = 1000 / 60;
  let lastTimeStamp = null;
  let accumulatedTime = 0;
  let animationId = 0;
  function init() {
    documentVisibleHandler.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.hidden) reset();
    });
  }
  function destroy() {
    stop();
    documentVisibleHandler.clear();
  }
  function animate(timeStamp) {
    if (!animationId) return;
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp;
      update();
      update();
    }
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    accumulatedTime += timeElapsed;
    while (accumulatedTime >= fixedTimeStep) {
      update();
      accumulatedTime -= fixedTimeStep;
    }
    const alpha = accumulatedTime / fixedTimeStep;
    render(alpha);
    if (animationId) {
      animationId = ownerWindow.requestAnimationFrame(animate);
    }
  }
  function start() {
    if (animationId) return;
    animationId = ownerWindow.requestAnimationFrame(animate);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationId);
    lastTimeStamp = null;
    accumulatedTime = 0;
    animationId = 0;
  }
  function reset() {
    lastTimeStamp = null;
    accumulatedTime = 0;
  }
  const self = {
    init,
    destroy,
    start,
    stop,
    update,
    render
  };
  return self;
}

function Axis(axis, contentDirection) {
  const isRightToLeft = contentDirection === 'rtl';
  const isVertical = axis === 'y';
  const scroll = isVertical ? 'y' : 'x';
  const cross = isVertical ? 'x' : 'y';
  const sign = !isVertical && isRightToLeft ? -1 : 1;
  const startEdge = getStartEdge();
  const endEdge = getEndEdge();
  function measureSize(nodeRect) {
    const {
      height,
      width
    } = nodeRect;
    return isVertical ? height : width;
  }
  function getStartEdge() {
    if (isVertical) return 'top';
    return isRightToLeft ? 'right' : 'left';
  }
  function getEndEdge() {
    if (isVertical) return 'bottom';
    return isRightToLeft ? 'left' : 'right';
  }
  function direction(n) {
    return n * sign;
  }
  const self = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  };
  return self;
}

function Limit(min = 0, max = 0) {
  const length = mathAbs(min - max);
  function reachedMin(n) {
    return n < min;
  }
  function reachedMax(n) {
    return n > max;
  }
  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }
  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max;
  }
  function removeOffset(n) {
    if (!length) return n;
    return n - length * Math.ceil((n - max) / length);
  }
  const self = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  };
  return self;
}

function Counter(max, start, loop) {
  const {
    constrain
  } = Limit(0, max);
  const loopEnd = max + 1;
  let counter = withinLimit(start);
  function withinLimit(n) {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
  }
  function get() {
    return counter;
  }
  function set(n) {
    counter = withinLimit(n);
    return self;
  }
  function add(n) {
    return clone().set(get() + n);
  }
  function clone() {
    return Counter(max, get(), loop);
  }
  const self = {
    get,
    set,
    add,
    clone
  };
  return self;
}

function DragHandler(axis, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
  const {
    cross: crossAxis,
    direction
  } = axis;
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA'];
  const nonPassiveEvent = {
    passive: false
  };
  const initEvents = EventStore();
  const dragEvents = EventStore();
  const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
  const snapForceBoost = {
    mouse: 300,
    touch: 400
  };
  const freeForceBoost = {
    mouse: 500,
    touch: 600
  };
  const baseSpeed = dragFree ? 43 : 25;
  let isMoving = false;
  let startScroll = 0;
  let startCross = 0;
  let pointerIsDown = false;
  let preventScroll = false;
  let preventClick = false;
  let isMouse = false;
  function init(emblaApi) {
    if (!watchDrag) return;
    function downIfAllowed(evt) {
      if (isBoolean(watchDrag) || watchDrag(emblaApi, evt)) down(evt);
    }
    const node = rootNode;
    initEvents.add(node, 'dragstart', evt => evt.preventDefault(), nonPassiveEvent).add(node, 'touchmove', () => undefined, nonPassiveEvent).add(node, 'touchend', () => undefined).add(node, 'touchstart', downIfAllowed).add(node, 'mousedown', downIfAllowed).add(node, 'touchcancel', up).add(node, 'contextmenu', up).add(node, 'click', click, true);
  }
  function destroy() {
    initEvents.clear();
    dragEvents.clear();
  }
  function addDragEvents() {
    const node = isMouse ? ownerDocument : rootNode;
    dragEvents.add(node, 'touchmove', move, nonPassiveEvent).add(node, 'touchend', up).add(node, 'mousemove', move, nonPassiveEvent).add(node, 'mouseup', up);
  }
  function isFocusNode(node) {
    const nodeName = node.nodeName || '';
    return focusNodes.includes(nodeName);
  }
  function forceBoost() {
    const boost = dragFree ? freeForceBoost : snapForceBoost;
    const type = isMouse ? 'mouse' : 'touch';
    return boost[type];
  }
  function allowedForce(force, targetChanged) {
    const next = index.add(mathSign(force) * -1);
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce;
    if (skipSnaps && targetChanged) return baseForce * 0.5;
    return scrollTarget.byIndex(next.get(), 0).distance;
  }
  function down(evt) {
    const isMouseEvt = isMouseEvent(evt, ownerWindow);
    isMouse = isMouseEvt;
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
    isMoving = deltaAbs(target.get(), location.get()) >= 2;
    if (isMouseEvt && evt.button !== 0) return;
    if (isFocusNode(evt.target)) return;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    scrollBody.useFriction(0).useDuration(0);
    target.set(location);
    addDragEvents();
    startScroll = dragTracker.readPoint(evt);
    startCross = dragTracker.readPoint(evt, crossAxis);
    eventHandler.emit('pointerDown');
  }
  function move(evt) {
    const isTouchEvt = !isMouseEvent(evt, ownerWindow);
    if (isTouchEvt && evt.touches.length >= 2) return up(evt);
    const lastScroll = dragTracker.readPoint(evt);
    const lastCross = dragTracker.readPoint(evt, crossAxis);
    const diffScroll = deltaAbs(lastScroll, startScroll);
    const diffCross = deltaAbs(lastCross, startCross);
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt);
      preventScroll = diffScroll > diffCross;
      if (!preventScroll) return up(evt);
    }
    const diff = dragTracker.pointerMove(evt);
    if (diffScroll > dragThreshold) preventClick = true;
    scrollBody.useFriction(0.3).useDuration(0.75);
    animation.start();
    target.add(direction(diff));
    evt.preventDefault();
  }
  function up(evt) {
    const currentLocation = scrollTarget.byDistance(0, false);
    const targetChanged = currentLocation.index !== index.get();
    const rawForce = dragTracker.pointerUp(evt) * forceBoost();
    const force = allowedForce(direction(rawForce), targetChanged);
    const forceFactor = factorAbs(rawForce, force);
    const speed = baseSpeed - 10 * forceFactor;
    const friction = baseFriction + forceFactor / 50;
    preventScroll = false;
    pointerIsDown = false;
    dragEvents.clear();
    scrollBody.useDuration(speed).useFriction(friction);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    eventHandler.emit('pointerUp');
  }
  function click(evt) {
    if (preventClick) {
      evt.stopPropagation();
      evt.preventDefault();
      preventClick = false;
    }
  }
  function pointerDown() {
    return pointerIsDown;
  }
  const self = {
    init,
    destroy,
    pointerDown
  };
  return self;
}

function DragTracker(axis, ownerWindow) {
  const logInterval = 170;
  let startEvent;
  let lastEvent;
  function readTime(evt) {
    return evt.timeStamp;
  }
  function readPoint(evt, evtAxis) {
    const property = evtAxis || axis.scroll;
    const coord = `client${property === 'x' ? 'X' : 'Y'}`;
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
  }
  function pointerDown(evt) {
    startEvent = evt;
    lastEvent = evt;
    return readPoint(evt);
  }
  function pointerMove(evt) {
    const diff = readPoint(evt) - readPoint(lastEvent);
    const expired = readTime(evt) - readTime(startEvent) > logInterval;
    lastEvent = evt;
    if (expired) startEvent = evt;
    return diff;
  }
  function pointerUp(evt) {
    if (!startEvent || !lastEvent) return 0;
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
    const diffTime = readTime(evt) - readTime(startEvent);
    const expired = readTime(evt) - readTime(lastEvent) > logInterval;
    const force = diffDrag / diffTime;
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
    return isFlick ? force : 0;
  }
  const self = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  };
  return self;
}

function NodeRects() {
  function measure(node) {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = node;
    const offset = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    };
    return offset;
  }
  const self = {
    measure
  };
  return self;
}

function PercentOfView(viewSize) {
  function measure(n) {
    return viewSize * (n / 100);
  }
  const self = {
    measure
  };
  return self;
}

function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects) {
  const observeNodes = [container].concat(slides);
  let resizeObserver;
  let containerSize;
  let slideSizes = [];
  let destroyed = false;
  function readSize(node) {
    return axis.measureSize(nodeRects.measure(node));
  }
  function init(emblaApi) {
    if (!watchResize) return;
    containerSize = readSize(container);
    slideSizes = slides.map(readSize);
    function defaultCallback(entries) {
      for (const entry of entries) {
        if (destroyed) return;
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          emblaApi.reInit();
          eventHandler.emit('resize');
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver(entries => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach(node => resizeObserver.observe(node));
    });
  }
  function destroy() {
    destroyed = true;
    if (resizeObserver) resizeObserver.disconnect();
  }
  const self = {
    init,
    destroy
  };
  return self;
}

function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let scrollVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const displacement = target.get() - location.get();
    const isInstant = !scrollDuration;
    let scrollDistance = 0;
    if (isInstant) {
      scrollVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      scrollDistance = displacement;
    } else {
      previousLocation.set(location);
      scrollVelocity += displacement / scrollDuration;
      scrollVelocity *= scrollFriction;
      rawLocation += scrollVelocity;
      location.add(scrollVelocity);
      scrollDistance = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(scrollDistance);
    rawLocationPrevious = rawLocation;
    return self;
  }
  function settled() {
    const diff = target.get() - offsetLocation.get();
    return mathAbs(diff) < 0.001;
  }
  function duration() {
    return scrollDuration;
  }
  function direction() {
    return scrollDirection;
  }
  function velocity() {
    return scrollVelocity;
  }
  function useBaseDuration() {
    return useDuration(baseDuration);
  }
  function useBaseFriction() {
    return useFriction(baseFriction);
  }
  function useDuration(n) {
    scrollDuration = n;
    return self;
  }
  function useFriction(n) {
    scrollFriction = n;
    return self;
  }
  const self = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  };
  return self;
}

function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
  const pullBackThreshold = percentOfView.measure(10);
  const edgeOffsetTolerance = percentOfView.measure(50);
  const frictionLimit = Limit(0.1, 0.99);
  let disabled = false;
  function shouldConstrain() {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }
  function constrain(pointerDown) {
    if (!shouldConstrain()) return;
    const edge = limit.reachedMin(location.get()) ? 'min' : 'max';
    const diffToEdge = mathAbs(limit[edge] - location.get());
    const diffToTarget = target.get() - location.get();
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
    target.subtract(diffToTarget * friction);
    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useDuration(25).useBaseFriction();
    }
  }
  function toggleActive(active) {
    disabled = !active;
  }
  const self = {
    shouldConstrain,
    constrain,
    toggleActive
  };
  return self;
}

function ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();
  function usePixelTolerance(bound, snap) {
    return deltaAbs(bound, snap) <= 1;
  }
  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max);
  }
  function measureBounded() {
    return snapsAligned.map((snapAligned, index) => {
      const {
        min,
        max
      } = scrollBounds;
      const snap = scrollBounds.constrain(snapAligned);
      const isFirst = !index;
      const isLast = arrayIsLastIndex(snapsAligned, index);
      if (isFirst) return max;
      if (isLast) return min;
      if (usePixelTolerance(min, snap)) return min;
      if (usePixelTolerance(max, snap)) return max;
      return snap;
    }).map(scrollBound => parseFloat(scrollBound.toFixed(3)));
  }
  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    if (containScroll === 'keepSnaps') return snapsBounded;
    const {
      min,
      max
    } = scrollContainLimit;
    return snapsBounded.slice(min, max);
  }
  const self = {
    snapsContained,
    scrollContainLimit
  };
  return self;
}

function ScrollLimit(contentSize, scrollSnaps, loop) {
  const max = scrollSnaps[0];
  const min = loop ? max - contentSize : arrayLast(scrollSnaps);
  const limit = Limit(min, max);
  const self = {
    limit
  };
  return self;
}

function ScrollLooper(contentSize, limit, location, vectors) {
  const jointSafety = 0.1;
  const min = limit.min + jointSafety;
  const max = limit.max + jointSafety;
  const {
    reachedMin,
    reachedMax
  } = Limit(min, max);
  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }
  function loop(direction) {
    if (!shouldLoop(direction)) return;
    const loopDistance = contentSize * (direction * -1);
    vectors.forEach(v => v.add(loopDistance));
  }
  const self = {
    loop
  };
  return self;
}

function ScrollProgress(limit) {
  const {
    max,
    length
  } = limit;
  function get(n) {
    const currentLocation = n - max;
    return length ? currentLocation / -length : 0;
  }
  const self = {
    get
  };
  return self;
}

function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
  const {
    startEdge,
    endEdge
  } = axis;
  const {
    groupSlides
  } = slidesToScroll;
  const alignments = measureSizes().map(alignment.measure);
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();
  function measureSizes() {
    return groupSlides(slideRects).map(rects => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
  }
  function measureUnaligned() {
    return slideRects.map(rect => containerRect[startEdge] - rect[startEdge]).map(snap => -mathAbs(snap));
  }
  function measureAligned() {
    return groupSlides(snaps).map(g => g[0]).map((snap, index) => snap + alignments[index]);
  }
  const self = {
    snaps,
    snapsAligned
  };
  return self;
}

function SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
  const {
    groupSlides
  } = slidesToScroll;
  const {
    min,
    max
  } = scrollContainLimit;
  const slideRegistry = createSlideRegistry();
  function createSlideRegistry() {
    const groupedSlideIndexes = groupSlides(slideIndexes);
    const doNotContain = !containSnaps || containScroll === 'keepSnaps';
    if (scrollSnaps.length === 1) return [slideIndexes];
    if (doNotContain) return groupedSlideIndexes;
    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(groups, index);
      if (isFirst) {
        const range = arrayLast(groups[0]) + 1;
        return arrayFromNumber(range);
      }
      if (isLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
        return arrayFromNumber(range, arrayLast(groups)[0]);
      }
      return group;
    });
  }
  const self = {
    slideRegistry
  };
  return self;
}

function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
  const {
    reachedAny,
    removeOffset,
    constrain
  } = limit;
  function minDistance(distances) {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0];
  }
  function findTargetSnap(target) {
    const distance = loop ? removeOffset(target) : constrain(target);
    const ascDiffsToSnaps = scrollSnaps.map((snap, index) => ({
      diff: shortcut(snap - distance, 0),
      index
    })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
    const {
      index
    } = ascDiffsToSnaps[0];
    return {
      index,
      distance
    };
  }
  function shortcut(target, direction) {
    const targets = [target, target + contentSize, target - contentSize];
    if (!loop) return target;
    if (!direction) return minDistance(targets);
    const matchingTargets = targets.filter(t => mathSign(t) === direction);
    if (matchingTargets.length) return minDistance(matchingTargets);
    return arrayLast(targets) - contentSize;
  }
  function byIndex(index, direction) {
    const diffToSnap = scrollSnaps[index] - targetVector.get();
    const distance = shortcut(diffToSnap, direction);
    return {
      index,
      distance
    };
  }
  function byDistance(distance, snap) {
    const target = targetVector.get() + distance;
    const {
      index,
      distance: targetSnapDistance
    } = findTargetSnap(target);
    const reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index,
      distance
    };
    const diffToSnap = scrollSnaps[index] - targetSnapDistance;
    const snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index,
      distance: snapDistance
    };
  }
  const self = {
    byDistance,
    byIndex,
    shortcut
  };
  return self;
}

function ScrollTo(animation, indexCurrent, indexPrevious, scrollBody, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start();
      } else {
        animation.update();
        animation.render(1);
        animation.update();
      }
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      eventHandler.emit('select');
    }
  }
  function distance(n, snap) {
    const target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }
  function index(n, direction) {
    const targetIndex = indexCurrent.clone().set(n);
    const target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }
  const self = {
    distance,
    index
  };
  return self;
}

function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus) {
  const focusListenerOptions = {
    passive: true,
    capture: true
  };
  let lastTabPressTime = 0;
  function init(emblaApi) {
    if (!watchFocus) return;
    function defaultCallback(index) {
      const nowTime = new Date().getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      eventHandler.emit('slideFocusStart');
      root.scrollLeft = 0;
      const group = slideRegistry.findIndex(group => group.includes(index));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit('slideFocus');
    }
    eventStore.add(document, 'keydown', registerTabPress, false);
    slides.forEach((slide, slideIndex) => {
      eventStore.add(slide, 'focus', evt => {
        if (isBoolean(watchFocus) || watchFocus(emblaApi, evt)) {
          defaultCallback(slideIndex);
        }
      }, focusListenerOptions);
    });
  }
  function registerTabPress(event) {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime();
  }
  const self = {
    init
  };
  return self;
}

function Vector1D(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(n) {
    value = normalizeInput(n);
  }
  function add(n) {
    value += normalizeInput(n);
  }
  function subtract(n) {
    value -= normalizeInput(n);
  }
  function normalizeInput(n) {
    return isNumber(n) ? n : n.get();
  }
  const self = {
    get,
    set,
    add,
    subtract
  };
  return self;
}

function Translate(axis, container) {
  const translate = axis.scroll === 'x' ? x : y;
  const containerStyle = container.style;
  let previousTarget = null;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    const newTarget = roundToTwoDecimals(axis.direction(target));
    if (newTarget === previousTarget) return;
    containerStyle.transform = translate(newTarget);
    previousTarget = newTarget;
  }
  function toggleActive(active) {
    disabled = !active;
  }
  function clear() {
    if (disabled) return;
    containerStyle.transform = '';
    if (!container.getAttribute('style')) container.removeAttribute('style');
  }
  const self = {
    clear,
    to,
    toggleActive
  };
  return self;
}

function SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides) {
  const roundingSafety = 0.5;
  const ascItems = arrayKeys(slideSizesWithGaps);
  const descItems = arrayKeys(slideSizesWithGaps).reverse();
  const loopPoints = startPoints().concat(endPoints());
  function removeSlideSizes(indexes, from) {
    return indexes.reduce((a, i) => {
      return a - slideSizesWithGaps[i];
    }, from);
  }
  function slidesInGap(indexes, gap) {
    return indexes.reduce((a, i) => {
      const remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }
  function findSlideBounds(offset) {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }));
  }
  function findLoopPoints(indexes, offset, isEndEdge) {
    const slideBounds = findSlideBounds(offset);
    return indexes.map(index => {
      const initial = isEndEdge ? 0 : -contentSize;
      const altered = isEndEdge ? contentSize : 0;
      const boundEdge = isEndEdge ? 'end' : 'start';
      const loopPoint = slideBounds[index][boundEdge];
      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index]),
        target: () => location.get() > loopPoint ? initial : altered
      };
    });
  }
  function startPoints() {
    const gap = scrollSnaps[0];
    const indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, contentSize, false);
  }
  function endPoints() {
    const gap = viewSize - scrollSnaps[0] - 1;
    const indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, -contentSize, true);
  }
  function canLoop() {
    return loopPoints.every(({
      index
    }) => {
      const otherIndexes = ascItems.filter(i => i !== index);
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
    });
  }
  function loop() {
    loopPoints.forEach(loopPoint => {
      const {
        target,
        translate,
        slideLocation
      } = loopPoint;
      const shiftLocation = target();
      if (shiftLocation === slideLocation.get()) return;
      translate.to(shiftLocation);
      slideLocation.set(shiftLocation);
    });
  }
  function clear() {
    loopPoints.forEach(loopPoint => loopPoint.translate.clear());
  }
  const self = {
    canLoop,
    clear,
    loop,
    loopPoints
  };
  return self;
}

function SlidesHandler(container, eventHandler, watchSlides) {
  let mutationObserver;
  let destroyed = false;
  function init(emblaApi) {
    if (!watchSlides) return;
    function defaultCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          emblaApi.reInit();
          eventHandler.emit('slidesChanged');
          break;
        }
      }
    }
    mutationObserver = new MutationObserver(mutations => {
      if (destroyed) return;
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations);
      }
    });
    mutationObserver.observe(container, {
      childList: true
    });
  }
  function destroy() {
    if (mutationObserver) mutationObserver.disconnect();
    destroyed = true;
  }
  const self = {
    init,
    destroy
  };
  return self;
}

function SlidesInView(container, slides, eventHandler, threshold) {
  const intersectionEntryMap = {};
  let inViewCache = null;
  let notInViewCache = null;
  let intersectionObserver;
  let destroyed = false;
  function init() {
    intersectionObserver = new IntersectionObserver(entries => {
      if (destroyed) return;
      entries.forEach(entry => {
        const index = slides.indexOf(entry.target);
        intersectionEntryMap[index] = entry;
      });
      inViewCache = null;
      notInViewCache = null;
      eventHandler.emit('slidesInView');
    }, {
      root: container.parentElement,
      threshold
    });
    slides.forEach(slide => intersectionObserver.observe(slide));
  }
  function destroy() {
    if (intersectionObserver) intersectionObserver.disconnect();
    destroyed = true;
  }
  function createInViewList(inView) {
    return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index = parseInt(slideIndex);
      const {
        isIntersecting
      } = intersectionEntryMap[index];
      const inViewMatch = inView && isIntersecting;
      const notInViewMatch = !inView && !isIntersecting;
      if (inViewMatch || notInViewMatch) list.push(index);
      return list;
    }, []);
  }
  function get(inView = true) {
    if (inView && inViewCache) return inViewCache;
    if (!inView && notInViewCache) return notInViewCache;
    const slideIndexes = createInViewList(inView);
    if (inView) inViewCache = slideIndexes;
    if (!inView) notInViewCache = slideIndexes;
    return slideIndexes;
  }
  const self = {
    init,
    destroy,
    get
  };
  return self;
}

function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
  const {
    measureSize,
    startEdge,
    endEdge
  } = axis;
  const withEdgeGap = slideRects[0] && readEdgeGap;
  const startGap = measureStartGap();
  const endGap = measureEndGap();
  const slideSizes = slideRects.map(measureSize);
  const slideSizesWithGaps = measureWithGaps();
  function measureStartGap() {
    if (!withEdgeGap) return 0;
    const slideRect = slideRects[0];
    return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
  }
  function measureEndGap() {
    if (!withEdgeGap) return 0;
    const style = ownerWindow.getComputedStyle(arrayLast(slides));
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`));
  }
  function measureWithGaps() {
    return slideRects.map((rect, index, rects) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(rects, index);
      if (isFirst) return slideSizes[index] + startGap;
      if (isLast) return slideSizes[index] + endGap;
      return rects[index + 1][startEdge] - rect[startEdge];
    }).map(mathAbs);
  }
  const self = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  };
  return self;
}

function SlidesToScroll(axis, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap, pixelTolerance) {
  const {
    startEdge,
    endEdge,
    direction
  } = axis;
  const groupByNumber = isNumber(slidesToScroll);
  function byNumber(array, groupSize) {
    return arrayKeys(array).filter(i => i % groupSize === 0).map(i => array.slice(i, i + groupSize));
  }
  function bySize(array) {
    if (!array.length) return [];
    return arrayKeys(array).reduce((groups, rectB, index) => {
      const rectA = arrayLast(groups) || 0;
      const isFirst = rectA === 0;
      const isLast = rectB === arrayLastIndex(array);
      const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
      const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
      const gapA = !loop && isFirst ? direction(startGap) : 0;
      const gapB = !loop && isLast ? direction(endGap) : 0;
      const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
      if (index && chunkSize > viewSize + pixelTolerance) groups.push(rectB);
      if (isLast) groups.push(array.length);
      return groups;
    }, []).map((currentSize, index, groups) => {
      const previousSize = Math.max(groups[index - 1] || 0);
      return array.slice(previousSize, currentSize);
    });
  }
  function groupSlides(array) {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
  }
  const self = {
    groupSlides
  };
  return self;
}

function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler) {
  // Options
  const {
    align,
    axis: scrollAxis,
    direction,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag,
    watchFocus
  } = options;
  // Measurements
  const pixelTolerance = 2;
  const nodeRects = NodeRects();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);
  const axis = Axis(scrollAxis, direction);
  const viewSize = axis.measureSize(containerRect);
  const percentOfView = PercentOfView(viewSize);
  const alignment = Alignment(align, viewSize);
  const containSnaps = !loop && !!containScroll;
  const readEdgeGap = loop || !!containScroll;
  const {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
  const slidesToScroll = SlidesToScroll(axis, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap, pixelTolerance);
  const {
    snaps,
    snapsAligned
  } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
  const {
    snapsContained,
    scrollContainLimit
  } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance);
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
  const {
    limit
  } = ScrollLimit(contentSize, scrollSnaps, loop);
  // Indexes
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
  const indexPrevious = index.clone();
  const slideIndexes = arrayKeys(slides);
  // Animation
  const update = ({
    dragHandler,
    scrollBody,
    scrollBounds,
    options: {
      loop
    }
  }) => {
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody.seek();
  };
  const render = ({
    scrollBody,
    translate,
    location,
    offsetLocation,
    previousLocation,
    scrollLooper,
    slideLooper,
    dragHandler,
    animation,
    eventHandler,
    scrollBounds,
    options: {
      loop
    }
  }, alpha) => {
    const shouldSettle = scrollBody.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop ? shouldSettle : shouldSettle && withinBounds;
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown();
    if (hasSettledAndIdle) animation.stop();
    const interpolatedLocation = location.get() * alpha + previousLocation.get() * (1 - alpha);
    offsetLocation.set(interpolatedLocation);
    if (loop) {
      scrollLooper.loop(scrollBody.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation.get());
    if (hasSettledAndIdle) eventHandler.emit('settle');
    if (!hasSettled) eventHandler.emit('scroll');
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine), alpha => render(engine, alpha));
  // Shared
  const friction = 0.68;
  const startLocation = scrollSnaps[index.get()];
  const location = Vector1D(startLocation);
  const previousLocation = Vector1D(startLocation);
  const offsetLocation = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, offsetLocation, previousLocation, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index, indexPrevious, scrollBody, scrollTarget, target, eventHandler);
  const scrollProgress = ScrollProgress(limit);
  const eventStore = EventStore();
  const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
  const {
    slideRegistry
  } = SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus);
  // Engine
  const engine = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    dragHandler: DragHandler(axis, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, offsetLocation, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, previousLocation, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, container)
  };
  return engine;
}

function EventHandler() {
  let listeners = {};
  let api;
  function init(emblaApi) {
    api = emblaApi;
  }
  function getListeners(evt) {
    return listeners[evt] || [];
  }
  function emit(evt) {
    getListeners(evt).forEach(e => e(api, evt));
    return self;
  }
  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self;
  }
  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter(e => e !== cb);
    return self;
  }
  function clear() {
    listeners = {};
  }
  const self = {
    init,
    emit,
    off,
    on,
    clear
  };
  return self;
}

const defaultOptions = {
  align: 'center',
  axis: 'x',
  container: null,
  slides: null,
  containScroll: 'trimSnaps',
  direction: 'ltr',
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true
};

function OptionsHandler(ownerWindow) {
  function mergeOptions(optionsA, optionsB) {
    return objectsMergeDeep(optionsA, optionsB || {});
  }
  function optionsAtMedia(options) {
    const optionsAtMedia = options.breakpoints || {};
    const matchedMediaOptions = objectKeys(optionsAtMedia).filter(media => ownerWindow.matchMedia(media).matches).map(media => optionsAtMedia[media]).reduce((a, mediaOption) => mergeOptions(a, mediaOption), {});
    return mergeOptions(options, matchedMediaOptions);
  }
  function optionsMediaQueries(optionsList) {
    return optionsList.map(options => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
  }
  const self = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  };
  return self;
}

function PluginsHandler(optionsHandler) {
  let activePlugins = [];
  function init(emblaApi, plugins) {
    activePlugins = plugins.filter(({
      options
    }) => optionsHandler.optionsAtMedia(options).active !== false);
    activePlugins.forEach(plugin => plugin.init(emblaApi, optionsHandler));
    return plugins.reduce((map, plugin) => Object.assign(map, {
      [plugin.name]: plugin
    }), {});
  }
  function destroy() {
    activePlugins = activePlugins.filter(plugin => plugin.destroy());
  }
  const self = {
    init,
    destroy
  };
  return self;
}

function EmblaCarousel(root, userOptions, userPlugins) {
  const ownerDocument = root.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const optionsHandler = OptionsHandler(ownerWindow);
  const pluginsHandler = PluginsHandler(optionsHandler);
  const mediaHandlers = EventStore();
  const eventHandler = EventHandler();
  const {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  } = optionsHandler;
  const {
    on,
    off,
    emit
  } = eventHandler;
  const reInit = reActivate;
  let destroyed = false;
  let engine;
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions);
  let options = mergeOptions(optionsBase);
  let pluginList = [];
  let pluginApis;
  let container;
  let slides;
  function storeElements() {
    const {
      container: userContainer,
      slides: userSlides
    } = options;
    const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
    container = customContainer || root.children[0];
    const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
    slides = [].slice.call(customSlides || container.children);
  }
  function createEngine(options) {
    const engine = Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler);
    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options, {
        loop: false
      });
      return createEngine(optionsWithoutLoop);
    }
    return engine;
  }
  function activate(withOptions, withPlugins) {
    if (destroyed) return;
    optionsBase = mergeOptions(optionsBase, withOptions);
    options = optionsAtMedia(optionsBase);
    pluginList = withPlugins || pluginList;
    storeElements();
    engine = createEngine(options);
    optionsMediaQueries([optionsBase, ...pluginList.map(({
      options
    }) => options)]).forEach(query => mediaHandlers.add(query, 'change', reActivate));
    if (!options.active) return;
    engine.translate.to(engine.location.get());
    engine.animation.init();
    engine.slidesInView.init();
    engine.slideFocus.init(self);
    engine.eventHandler.init(self);
    engine.resizeHandler.init(self);
    engine.slidesHandler.init(self);
    if (engine.options.loop) engine.slideLooper.loop();
    if (container.offsetParent && slides.length) engine.dragHandler.init(self);
    pluginApis = pluginsHandler.init(self, pluginList);
  }
  function reActivate(withOptions, withPlugins) {
    const startIndex = selectedScrollSnap();
    deActivate();
    activate(mergeOptions({
      startIndex
    }, withOptions), withPlugins);
    eventHandler.emit('reInit');
  }
  function deActivate() {
    engine.dragHandler.destroy();
    engine.eventStore.clear();
    engine.translate.clear();
    engine.slideLooper.clear();
    engine.resizeHandler.destroy();
    engine.slidesHandler.destroy();
    engine.slidesInView.destroy();
    engine.animation.destroy();
    pluginsHandler.destroy();
    mediaHandlers.clear();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    mediaHandlers.clear();
    deActivate();
    eventHandler.emit('destroy');
    eventHandler.clear();
  }
  function scrollTo(index, jump, direction) {
    if (!options.active || destroyed) return;
    engine.scrollBody.useBaseFriction().useDuration(jump === true ? 0 : options.duration);
    engine.scrollTo.index(index, direction || 0);
  }
  function scrollNext(jump) {
    const next = engine.index.add(1).get();
    scrollTo(next, jump, -1);
  }
  function scrollPrev(jump) {
    const prev = engine.index.add(-1).get();
    scrollTo(prev, jump, 1);
  }
  function canScrollNext() {
    const next = engine.index.add(1).get();
    return next !== selectedScrollSnap();
  }
  function canScrollPrev() {
    const prev = engine.index.add(-1).get();
    return prev !== selectedScrollSnap();
  }
  function scrollSnapList() {
    return engine.scrollSnapList;
  }
  function scrollProgress() {
    return engine.scrollProgress.get(engine.offsetLocation.get());
  }
  function selectedScrollSnap() {
    return engine.index.get();
  }
  function previousScrollSnap() {
    return engine.indexPrevious.get();
  }
  function slidesInView() {
    return engine.slidesInView.get();
  }
  function slidesNotInView() {
    return engine.slidesInView.get(false);
  }
  function plugins() {
    return pluginApis;
  }
  function internalEngine() {
    return engine;
  }
  function rootNode() {
    return root;
  }
  function containerNode() {
    return container;
  }
  function slideNodes() {
    return slides;
  }
  const self = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  };
  activate(userOptions, userPlugins);
  setTimeout(() => eventHandler.emit('init'), 0);
  return self;
}
EmblaCarousel.globalOptions = undefined;

window.EmblaCarousel = EmblaCarousel;

const root = document.documentElement;
const TRANSLATIONS = {
  en: {
    pageTitle: 'Seed Eco Packaging',
    langSwitcherAria: 'Language switcher',
    siteNavPrimaryAria: 'Primary',
    siteNavSectionAria: 'Section navigation',
    footerNavAria: 'Footer navigation',
    navValues: 'Values',
    navBrand: 'Brand',
    navWhoWe: 'Who we',
    navServices: 'Services',
    navApproach: 'Approach',
    navTeam: 'Team',
    heroEyebrow: 'Sustainable',
    heroTitle: 'Eco-Engineering',
    heroSubtitle: 'Packaging Design',
    valuesTitle: 'Mission and vision',
    missionTitle: 'Mission',
    missionText: 'Changing business model in sustainable food packaging market',
    visionTitle: 'Vision',
    visionText: 'Launching more sustainable food packaging to the market and increasing the share of it in everyday single-use packaging',
    ownBrandKicker: 'Own&nbsp;brand',
    ownBrandTitle: 'This is the toughest test: the bio-material works in real retail.',
    ownBrandNote: 'Closing the loop - selling package (product + packaging) not just packaging material under own brand and PLs',
    whoWeEyebrow: "We don't sell</br>packaging!",
    whoWeSummary: 'We industrialize materials and run them in real market products.',
    painLabel: 'Pain:',
    helpLabel: 'How we can help:',
    requestLabel: 'Request',
    card1Title: 'Start-Ups (TRL3-5):',
    card1Meta: 'Formula created &longrightarrow; need scale TLR6',
    card1Lede1: 'Developed formulation',
    card1Lede2: 'No industrial validation',
    card1Lede3: 'Cannot access large factory lines',
    card1Pain1: '&ldquo;Valley of Death&rdquo; between lab and production',
    card1Pain2: 'No processing window validation',
    card1Pain3: 'No regulatory-ready documentation',
    card1Help1: 'Pilot compounding + film validation',
    card1Help2: 'Processing window mapping',
    card1Help3: 'Risk assessment report',
    card1Help4: 'Industrial transfer protocol',
    card1Ticket: 'Ticket size: &euro;50&ndash;80k per project',
    card2Title: 'Manufactures',
    card2Meta: 'Obtaining data without stopping own plants',
    card2Lede1: 'Mid-size (5&ndash;50M &euro; revenue)',
    card2Lede2: 'Operating PE/PP lines',
    card2Lede3: 'Want to integrate bio-based materials',
    card2Pain1: 'Risk of line downtime',
    card2Pain2: 'Unstable parameters',
    card2Pain3: 'Barrier &amp; sealing uncertainty',
    card2Pain4: 'OEE risk',
    card2Help1: 'Controlled pilot validation',
    card2Help2: 'Parameter optimization',
    card2Help3: 'Factory trial supervision',
    card2Help4: 'QA protocol setup',
    card2Ticket: 'Ticket size: &euro;70&ndash;120k per project',
    card3Title: 'Food Brands / Retail Suppliers',
    card3Meta: 'Solving regulatory issues',
    card3Lede1: 'Regional FMCG producers',
    card3Lede2: 'Facing sustainability pressure',
    card3Lede3: 'Limited packaging R&amp;D competence',
    card3Pain1: 'PPWR compliance',
    card3Pain2: 'ESG reporting',
    card3Pain3: 'Supplier validation',
    card3Help1: 'Packaging transition roadmap',
    card3Help2: 'Feasibility validation',
    card3Help3: 'Supplier benchmarking',
    card3Ticket: 'Ticket size: &euro;25&ndash;60k per project',
    teamTitle: 'Team',
    team1Role: 'Head of Innovation',
    team1Focus: 'Advanced Materials & Innovation',
    team2Role: 'Formulation Lead',
    team2Focus: 'Formulation & Characterization',
    team3Role: 'Head of Scale-Up',
    team3Focus: 'Scale-Up & Process Engineering',
    team4Role: 'Process Engineer',
    team4Focus: 'Pilot Production & Process Optimization',
    footerEyebrow: 'Ready to make it real?',
    footerTitle: 'Let’s turn material ideas into <span class="site-footer__title-accent">real packaging</span> with less risk.',
    footerNote: 'lab to line',
    footerCta: 'Start a conversation',
    footerContactKicker: 'Contact',
    footerContactCity: 'Belgrade / Novi Sad',
    footerContactText: 'Biomaterials, scale-up and packaging systems for real market products.',
    footerSectionsKicker: 'Sections',
    footerSocialKicker: 'Social',
    footerBrand: 'Seed Eco Packaging'
  },
  sr: {
    pageTitle: 'Seed Eko Ambalaza',
    langSwitcherAria: 'Izbor jezika',
    siteNavPrimaryAria: 'Primarna navigacija',
    siteNavSectionAria: 'Navigacija kroz sekcije',
    footerNavAria: 'Navigacija u futeru',
    navValues: 'Vrednosti',
    navBrand: 'Brend',
    navWhoWe: 'Ko smo',
    navServices: 'Usluge',
    navApproach: 'Pristup',
    navTeam: 'Tim',
    heroEyebrow: 'Sustainable',
    heroTitle: 'Eco-Engineering',
    heroSubtitle: 'Packaging Design',
    valuesTitle: 'Misija i vizija',
    missionTitle: 'Misija',
    missionText: 'Menjamo poslovni model na trzistu odrzive ambalaze za hranu',
    visionTitle: 'Vizija',
    visionText: 'Plasiramo odrziviju ambalazu za hranu na trziste i povecavamo njen udeo u svakodnevnoj jednokratnoj ambalazi',
    ownBrandKicker: 'Sopstveni&nbsp;brend',
    ownBrandTitle: 'Ovo je najtezi test: bio-materijal radi u pravoj maloprodaji.',
    ownBrandNote: 'Zatvaramo krug - prodajemo pakovanje (proizvod + ambalaza), a ne samo ambalazni materijal pod sopstvenim brendom i PL-ovima',
    whoWeEyebrow: 'Ne prodajemo</br>ambalazu!',
    whoWeSummary: 'Industrijalizujemo materijale i uvodimo ih u stvarne proizvode na trzistu.',
    painLabel: 'Problem:',
    helpLabel: 'Kako pomazemo:',
    requestLabel: 'Upit',
    card1Title: 'Startapi (TRL3-5):',
    card1Meta: 'Formula je napravljena &longrightarrow; potreban je scale TLR6',
    card1Lede1: 'Razvijena formulacija',
    card1Lede2: 'Bez industrijske validacije',
    card1Lede3: 'Nema pristup velikim fabrikama',
    card1Pain1: '&bdquo;Dolina smrti&ldquo; izmedju laboratorije i proizvodnje',
    card1Pain2: 'Nema validacije procesnog prozora',
    card1Pain3: 'Nema regulatorno spremne dokumentacije',
    card1Help1: 'Pilot kompaundiranje + validacija filma',
    card1Help2: 'Mapiranje procesnog prozora',
    card1Help3: 'Izvestaj o proceni rizika',
    card1Help4: 'Protokol za industrijski transfer',
    card1Ticket: 'Velicina projekta: &euro;50&ndash;80k po projektu',
    card2Title: 'Proizvodjaci',
    card2Meta: 'Dobijanje podataka bez zaustavljanja sopstvenih pogona',
    card2Lede1: 'Srednja velicina (5&ndash;50M &euro; prihoda)',
    card2Lede2: 'Rade na PE/PP linijama',
    card2Lede3: 'Zele da uvedu bio-bazirane materijale',
    card2Pain1: 'Rizik od zastoja linije',
    card2Pain2: 'Nestabilni parametri',
    card2Pain3: 'Neizvesnost oko barijere i zaptivanja',
    card2Pain4: 'Rizik za OEE',
    card2Help1: 'Kontrolisana pilot validacija',
    card2Help2: 'Optimizacija parametara',
    card2Help3: 'Nadzor fabrickih proba',
    card2Help4: 'Postavljanje QA protokola',
    card2Ticket: 'Velicina projekta: &euro;70&ndash;120k po projektu',
    card3Title: 'Brendovi hrane / Retail dobavljaci',
    card3Meta: 'Resavanje regulatornih pitanja',
    card3Lede1: 'Regionalni FMCG proizvodjaci',
    card3Lede2: 'Pod pritiskom odrzivosti',
    card3Lede3: 'Ogranicena kompetencija za R&amp;D ambalaze',
    card3Pain1: 'PPWR uskladjenost',
    card3Pain2: 'ESG izvestavanje',
    card3Pain3: 'Validacija dobavljaca',
    card3Help1: 'Mapa tranzicije ambalaze',
    card3Help2: 'Validacija izvodljivosti',
    card3Help3: 'Benchmarking dobavljaca',
    card3Ticket: 'Velicina projekta: &euro;25&ndash;60k po projektu',
    teamTitle: 'Tim',
    team1Role: 'Direktorka inovacija',
    team1Focus: 'Napredni materijali i inovacije',
    team2Role: 'Lider formulacije',
    team2Focus: 'Formulacija i karakterizacija',
    team3Role: 'Direktor scale-up-a',
    team3Focus: 'Scale-up i procesno inzenjerstvo',
    team4Role: 'Procesni inzenjer',
    team4Focus: 'Pilot proizvodnja i optimizacija procesa',
    footerEyebrow: 'Spremni da to pretvorimo u proizvod?',
    footerTitle: 'Pretvorimo ideje o materijalima u <span class="site-footer__title-accent">stvarnu ambalazu</span> sa manje rizika.',
    footerNote: 'od lab-a do linije',
    footerCta: 'Zapoocni razgovor',
    footerContactKicker: 'Kontakt',
    footerContactCity: 'Beograd / Novi Sad',
    footerContactText: 'Biomaterijali, scale-up i sistemi ambalaze za stvarne proizvode na trzistu.',
    footerSectionsKicker: 'Sekcije',
    footerSocialKicker: 'Mreze',
    footerBrand: 'Seed Eko Ambalaza'
  }
};

root.classList.add('js-ready');

function initLanguageSwitcher() {
  const buttons = Array.from(document.querySelectorAll('[data-lang-toggle]'));
  const FALLBACK_LANG = 'en';

  if (!buttons.length) {
    return;
  }

  function normalizeLang(value) {
    const normalized = String(value || '').toLowerCase().split('-')[0];
    return Object.prototype.hasOwnProperty.call(TRANSLATIONS, normalized) ? normalized : null;
  }

  function safeGetStorage(key) {
    try {
      return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }

  function safeSetStorage(key, value) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // ignore
    }
  }

  function detectInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = normalizeLang(params.get('lang'));

    if (fromQuery) {
      return fromQuery;
    }

    const stored = normalizeLang(safeGetStorage('seedLang'));

    if (stored) {
      return stored;
    }

    if (Array.isArray(navigator.languages)) {
      for (const lang of navigator.languages) {
        const normalized = normalizeLang(lang);

        if (normalized) {
          return normalized;
        }
      }
    }

    return normalizeLang(navigator.language) || FALLBACK_LANG;
  }

  function translateKey(key, lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[FALLBACK_LANG];
    const fallback = TRANSLATIONS[FALLBACK_LANG];

    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }

    if (fallback && Object.prototype.hasOwnProperty.call(fallback, key)) {
      return fallback[key];
    }

    return key;
  }

  function updateButtons(lang) {
    buttons.forEach((button) => {
      const isActive = button.dataset.langToggle === lang;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n-key]').forEach((element) => {
      const key = element.dataset.i18nKey;
      const target = element.dataset.i18nTarget || 'text';
      const value = translateKey(key, lang);

      if (target === 'html') {
        element.innerHTML = value;
        return;
      }

      if (target === 'aria-label') {
        element.setAttribute('aria-label', value);
        return;
      }

      element.textContent = value;
    });

    document.title = translateKey('pageTitle', lang);
    document.documentElement.lang = lang;
    updateButtons(lang);
  }

  function syncUrl(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }

  function setLanguage(lang, { store = true, sync = true } = {}) {
    const normalized = normalizeLang(lang) || FALLBACK_LANG;
    applyTranslations(normalized);

    if (store) {
      safeSetStorage('seedLang', normalized);
    }

    if (sync) {
      syncUrl(normalized);
    }
  }

  const initialLang = detectInitialLang();
  setLanguage(initialLang, { store: false, sync: true });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.langToggle);
    });
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'seedLang' && event.newValue) {
      setLanguage(event.newValue, { store: false, sync: true });
    }
  });
}

function initOwnBrandNoteDraw() {
  const notes = Array.from(document.querySelectorAll('[data-draw-note]'));

  if (!notes.length) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  for (const note of notes) {
    const path = note.querySelector('.own-brand__note-outline-path');

    if (!path) {
      continue;
    }

    const length = path.getTotalLength();
    note.style.setProperty('--note-outline-length', String(length));

    if (reduceMotion) {
      note.classList.add('is-drawn');
    }
  }

  if (reduceMotion) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      entry.target.classList.add('is-drawn');
      observer.unobserve(entry.target);
    }
  }, {
    threshold: 0.35,
    rootMargin: '0px 0px -8% 0px'
  });

  for (const note of notes) {
    observer.observe(note);
  }
}

function initHeroDock() {
  const dock = document.querySelector('[data-site-nav]');
  const hero = document.querySelector('.hero');

  if (!dock || !hero) {
    return;
  }

  function syncDockState() {
    const heroRect = hero.getBoundingClientRect();
    const dockHeight = dock.offsetHeight;
    const initialTop = heroRect.height - dockHeight / 2;
    const shouldDock = heroRect.top <= 12 - initialTop;

    dock.classList.toggle('is-docked', shouldDock);
  }

  syncDockState();
  window.addEventListener('scroll', syncDockState, { passive: true });
  window.addEventListener('resize', syncDockState);
}

function initWhoWeBridgeParallax() {
  const section = document.querySelector('[data-who-we]');
  const bridge = section?.querySelector('[data-who-we-bridge]');
  const scene = section?.querySelector('.who-we__scene');

  if (!section || !bridge || !scene) {
    console.error('[who-we bridge] Missing required nodes', {
      hasSection: Boolean(section),
      hasBridge: Boolean(bridge),
      hasScene: Boolean(scene)
    });
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    console.info('[who-we bridge] Reduced motion is enabled; parallax disabled.');
    scene.style.setProperty('--bridge-parallax-y', '0px');
    return;
  }

  let ticking = false;
  let isActive = false;

  function syncBridge() {
    ticking = false;

    if (!isActive) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const start = viewportHeight * 0.92;
    const end = viewportHeight * 0.22;
    const distance = start - end;
    const progress = Math.min(Math.max((start - rect.top) / distance, 0), 1);

    const factor = parseFloat(getComputedStyle(scene).getPropertyValue('--bridge-parallax-factor')) || 0;
    const startValue = bridge.offsetWidth * factor;
    const y = -startValue + startValue * progress;

    scene.style.setProperty('--bridge-parallax-y', `${y}px`);

    console.debug('[who-we bridge] sync', {
      isActive,
      progress: Number(progress.toFixed(3)),
      factor,
      startValue: Number(startValue.toFixed(2)),
      y: Number(y.toFixed(2)),
      sceneTop: Number(rect.top.toFixed(2))
    });
  }

  function requestSync() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(syncBridge);
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target !== scene) {
        continue;
      }

      isActive = entry.isIntersecting;

      console.debug('[who-we bridge] observer', {
        isActive,
        top: Number(entry.boundingClientRect.top.toFixed(2)),
        bottom: Number(entry.boundingClientRect.bottom.toFixed(2))
      });

      if (!isActive && entry.boundingClientRect.top > window.innerHeight) {
        const factor = parseFloat(getComputedStyle(scene).getPropertyValue('--bridge-parallax-factor')) || 0;
        const startValue = bridge.offsetWidth * factor;
        scene.style.setProperty('--bridge-parallax-y', `${-startValue}px`);
      }

      if (!isActive && entry.boundingClientRect.bottom < 0) {
        scene.style.setProperty('--bridge-parallax-y', '0px');
      }

      if (isActive) {
        requestSync();
      }
    }
  }, {
    threshold: 0,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(scene);
  console.info('[who-we bridge] Parallax initialized');
  requestSync();
  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);
}

function initCardsSlider() {
  const slider = document.querySelector('[data-cards-slider]');
  const cards = Array.from(slider?.querySelectorAll('.cards__item') ?? []);

  if (!slider || !cards.length) {
    return;
  }

  const embla = EmblaCarousel(slider, {
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    watchDrag: true
  });

  function syncSelectedCard() {
    const selectedIndex = embla.selectedScrollSnap();

    cards.forEach((card, index) => {
      card.classList.toggle('is-selected', index === selectedIndex);
    });
  }

  syncSelectedCard();
  embla.on('select', syncSelectedCard);
  embla.on('reInit', syncSelectedCard);

  cards.forEach((card, index) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) {
        return;
      }

      if (index === embla.selectedScrollSnap()) {
        return;
      }

      embla.scrollTo(index);
    });
  });

  window.addEventListener('resize', () => {
    embla.reInit();
  });
}

function initLayoutLab() {
  const section = document.querySelector('[data-layout-lab]');

  if (!section) {
    return;
  }

  const gridInputs = Array.from(section.querySelectorAll('[data-grid-input]'));
  const blockInputs = Array.from(section.querySelectorAll('[data-block-input]'));
  const blockList = section.querySelector('[data-block-list]');
  const canvas = section.querySelector('[data-grid-canvas]');
  const htmlOutput = section.querySelector('[data-code-output="html"]');
  const addButton = section.querySelector('[data-action="add-block"]');
  const removeButton = section.querySelector('[data-action="remove-block"]');

  const palette = [
    'linear-gradient(135deg, #d0f59e, #9fd15f)',
    'linear-gradient(135deg, #ffd6b8, #efae79)',
    'linear-gradient(135deg, #ffdca8, #f2c56b)',
    'linear-gradient(135deg, #f6c9bd, #e39b8f)',
    'linear-gradient(135deg, #d1efe7, #8cc9b8)',
    'linear-gradient(135deg, #e9d8ff, #c8b0ef)'
  ];

  const state = {
    grid: {
      columns: 12,
      rows: 6,
      columnGap: 24,
      rowGap: 24,
      rowHeight: 88,
      alignItems: 'stretch',
      justifyItems: 'stretch',
      alignContent: 'stretch',
      justifyContent: 'stretch'
    },
    selectedId: 1,
    nextId: 4,
    blocks: [
      {
        id: 1,
        label: 'Hero',
        colStart: 1,
        colSpan: 7,
        rowStart: 1,
        rowSpan: 2,
        alignSelf: 'stretch',
        justifySelf: 'stretch',
        contentAlign: 'center',
        contentJustify: 'center',
        background: palette[0]
      },
      {
        id: 2,
        label: 'Packshot',
        colStart: 8,
        colSpan: 5,
        rowStart: 1,
        rowSpan: 3,
        alignSelf: 'stretch',
        justifySelf: 'stretch',
        contentAlign: 'center',
        contentJustify: 'center',
        background: palette[1]
      },
      {
        id: 3,
        label: 'Note',
        colStart: 3,
        colSpan: 4,
        rowStart: 3,
        rowSpan: 2,
        alignSelf: 'center',
        justifySelf: 'stretch',
        contentAlign: 'start',
        contentJustify: 'start',
        background: palette[4]
      }
    ],
    interaction: null
  };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getContainerClassNames() {
    const classNames = ['layout-grid'];
    const containerClassMap = {
      alignItems: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
      },
      justifyItems: {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch'
      },
      alignContent: {
        start: 'content-start',
        center: 'content-center',
        end: 'content-end',
        stretch: 'content-stretch'
      },
      justifyContent: {
        start: 'justify-content-start',
        center: 'justify-content-center',
        end: 'justify-content-end',
        stretch: 'justify-content-stretch'
      }
    };

    for (const [key, classMap] of Object.entries(containerClassMap)) {
      const className = classMap[state.grid[key]];

      if (className) {
        classNames.push(className);
      }
    }

    return classNames;
  }

  function getItemClassNames(block) {
    const classNames = ['layout-grid__item', `col-${block.colSpan}`];
    const itemClassMap = {
      alignSelf: {
        start: 'self-start',
        center: 'self-center',
        end: 'self-end',
        stretch: 'self-stretch'
      },
      justifySelf: {
        start: 'justify-self-start',
        center: 'justify-self-center',
        end: 'justify-self-end',
        stretch: 'justify-self-stretch'
      }
    };

    if (block.colStart <= 9) {
      classNames.push(`start-${block.colStart}`);
    }

    for (const [key, classMap] of Object.entries(itemClassMap)) {
      const className = classMap[block[key]];

      if (className) {
        classNames.push(className);
      }
    }

    return classNames;
  }

  function getContainerStyleLines() {
    return [
      `--grid-columns: ${state.grid.columns}`,
      `--grid-gap-x: ${state.grid.columnGap}px`,
      `--grid-gap-y: ${state.grid.rowGap}px`,
      `grid-template-rows: repeat(${state.grid.rows}, minmax(${state.grid.rowHeight}px, auto))`
    ];
  }

  function getBlockStyleLines(block) {
    const styleLines = [`grid-row: ${block.rowStart} / span ${block.rowSpan}`];

    if (block.colStart > 9) {
      styleLines.unshift(`--col-start: ${block.colStart}`);
    }

    return styleLines;
  }

  function getBlockInnerStyle(block) {
    return [
      'display: grid',
      `align-items: ${block.contentAlign}`,
      `justify-items: ${block.contentJustify}`
    ].join('; ');
  }

  function getSelectedBlock() {
    return state.blocks.find((block) => block.id === state.selectedId) ?? state.blocks[0] ?? null;
  }

  function normalizeBlock(block) {
    block.colSpan = clamp(block.colSpan, 1, state.grid.columns);
    block.rowSpan = clamp(block.rowSpan, 1, state.grid.rows);
    block.colStart = clamp(block.colStart, 1, state.grid.columns - block.colSpan + 1);
    block.rowStart = clamp(block.rowStart, 1, state.grid.rows - block.rowSpan + 1);
  }

  function syncGridInputs() {
    for (const input of gridInputs) {
      const key = input.dataset.gridInput;
      input.value = String(state.grid[key]);
    }
  }

  function syncBlockInputs() {
    const block = getSelectedBlock();

    for (const input of blockInputs) {
      const key = input.dataset.blockInput;
      input.disabled = !block;
      input.value = block ? String(block[key]) : '';
    }

    removeButton.disabled = !block;
  }

  function renderBlockList() {
    blockList.innerHTML = '';

    for (const block of state.blocks) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'layout-lab__block-chip';
      button.dataset.blockId = String(block.id);

      if (block.id === state.selectedId) {
        button.classList.add('is-selected');
      }

      button.innerHTML = `
        <span class="layout-lab__block-chip-copy">
          <span class="layout-lab__block-chip-label">${escapeHtml(block.label)}</span>
          <span class="layout-lab__block-chip-meta">c${block.colStart} / span ${block.colSpan} · r${block.rowStart} / span ${block.rowSpan}</span>
        </span>
        <span class="layout-lab__block-chip-swatch" style="background:${block.background}"></span>
      `;

      blockList.append(button);
    }
  }

  function escapeHtml(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderCode() {
    const containerClassNames = getContainerClassNames();
    const containerStyle = getContainerStyleLines().join('; ');
    const html = [
      `<div class="${containerClassNames.join(' ')}" style="${containerStyle}">`,
      ...state.blocks.map((block) => {
        const itemClassNames = getItemClassNames(block);
        const itemStyle = getBlockStyleLines(block).join('; ');
        const contentStyle = getBlockInnerStyle(block);
        return `  <div class="${itemClassNames.join(' ')}" style="${itemStyle}">\n    <div style="${contentStyle}">${escapeHtml(block.label)}</div>\n  </div>`;
      }),
      '</div>'
    ].join('\n');

    htmlOutput.textContent = html;
  }

  function renderCanvas() {
    canvas.innerHTML = '';
    canvas.style.gridTemplateColumns = `repeat(${state.grid.columns}, minmax(0, 1fr))`;
    canvas.style.gridTemplateRows = `repeat(${state.grid.rows}, minmax(${state.grid.rowHeight}px, auto))`;
    canvas.style.columnGap = `${state.grid.columnGap}px`;
    canvas.style.rowGap = `${state.grid.rowGap}px`;
    canvas.style.alignItems = state.grid.alignItems;
    canvas.style.justifyItems = state.grid.justifyItems;
    canvas.style.alignContent = state.grid.alignContent;
    canvas.style.justifyContent = state.grid.justifyContent;

    const totalCells = state.grid.columns * state.grid.rows;

    for (let index = 0; index < totalCells; index += 1) {
      const cell = document.createElement('div');
      cell.className = 'layout-lab__grid-cell';
      canvas.append(cell);
    }

    for (const block of state.blocks) {
      const blockNode = document.createElement('button');
      blockNode.type = 'button';
      blockNode.className = 'layout-lab__grid-block';
      blockNode.dataset.blockId = String(block.id);
      blockNode.style.gridColumn = `${block.colStart} / span ${block.colSpan}`;
      blockNode.style.gridRow = `${block.rowStart} / span ${block.rowSpan}`;
      blockNode.style.alignSelf = block.alignSelf;
      blockNode.style.justifySelf = block.justifySelf;
      blockNode.style.background = block.background;

      if (block.id === state.selectedId) {
        blockNode.classList.add('is-selected');
      }

      if (state.interaction?.blockId === block.id) {
        blockNode.classList.add('is-dragging');
      }

      blockNode.innerHTML = `
        <span class="layout-lab__grid-block-content" style="align-items:${block.contentAlign}; justify-items:${block.contentJustify};">
          <span class="layout-lab__grid-block-badge">${escapeHtml(block.label)}</span>
        </span>
        <span class="layout-lab__grid-resize" data-resize-handle="true" aria-hidden="true"></span>
      `;
      canvas.append(blockNode);
    }
  }

  function getMetrics() {
    const rect = canvas.getBoundingClientRect();
    const totalColumnGap = state.grid.columnGap * (state.grid.columns - 1);
    const totalRowGap = state.grid.rowGap * (state.grid.rows - 1);
    const columnWidth = (rect.width - totalColumnGap) / state.grid.columns;
    const rowHeight = (rect.height - totalRowGap) / state.grid.rows;

    return { rect, columnWidth, rowHeight };
  }

  function snapTrack(offset, size, gap, count) {
    let cursor = 0;

    for (let index = 1; index <= count; index += 1) {
      const end = cursor + size;

      if (offset <= end) {
        return index;
      }

      cursor = end + gap;
    }

    return count;
  }

  function startInteraction(event, mode, blockId) {
    const block = state.blocks.find((item) => item.id === blockId);

    if (!block) {
      return;
    }

    state.selectedId = blockId;
    state.interaction = {
      mode,
      blockId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: {
        colStart: block.colStart,
        colSpan: block.colSpan,
        rowStart: block.rowStart,
        rowSpan: block.rowSpan
      }
    };

    const blockNode = event.target.closest('[data-block-id]');

    if (blockNode) {
      blockNode.setPointerCapture(event.pointerId);
    }

    render();
  }

  function updateInteraction(event) {
    if (!state.interaction) {
      return;
    }

    const block = state.blocks.find((item) => item.id === state.interaction.blockId);

    if (!block) {
      return;
    }

    const metrics = getMetrics();
    const deltaX = event.clientX - state.interaction.startX;
    const deltaY = event.clientY - state.interaction.startY;
    const deltaColumns = Math.round(deltaX / (metrics.columnWidth + state.grid.columnGap));
    const deltaRows = Math.round(deltaY / (metrics.rowHeight + state.grid.rowGap));

    if (state.interaction.mode === 'move') {
      block.colStart = state.interaction.origin.colStart + deltaColumns;
      block.rowStart = state.interaction.origin.rowStart + deltaRows;
    }

    if (state.interaction.mode === 'resize') {
      block.colSpan = state.interaction.origin.colSpan + deltaColumns;
      block.rowSpan = state.interaction.origin.rowSpan + deltaRows;
    }

    normalizeBlock(block);
    render();
  }

  function finishInteraction() {
    if (!state.interaction) {
      return;
    }

    state.interaction = null;
    render();
  }

  function render() {
    state.blocks.forEach(normalizeBlock);
    renderBlockList();
    syncGridInputs();
    syncBlockInputs();
    renderCanvas();
    renderCode();
  }

  gridInputs.forEach((input) => {
    input.addEventListener('input', () => {
      const key = input.dataset.gridInput;
      const isNumeric = input.type === 'number';
      state.grid[key] = isNumeric ? Number(input.value || 0) : input.value;

      if (isNumeric) {
        const min = Number(input.min || 0);
        const max = Number(input.max || 999);
        state.grid[key] = clamp(state.grid[key], min, max);
      }

      render();
    });
  });

  blockInputs.forEach((input) => {
    input.addEventListener('input', () => {
      const block = getSelectedBlock();

      if (!block) {
        return;
      }

      const key = input.dataset.blockInput;
      block[key] = input.type === 'number' ? Number(input.value || 0) : input.value;

      if (input.type === 'number') {
        const min = Number(input.min || 0);
        const max = Number(input.max || 999);
        block[key] = clamp(block[key], min, max);
      }

      normalizeBlock(block);
      render();
    });
  });

  blockList.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-block-id]');

    if (!trigger) {
      return;
    }

    state.selectedId = Number(trigger.dataset.blockId);
    render();
  });

  canvas.addEventListener('pointerdown', (event) => {
    const resizeHandle = event.target.closest('[data-resize-handle]');
    const blockButton = event.target.closest('[data-block-id]');

    if (!blockButton) {
      return;
    }

    event.preventDefault();
    startInteraction(event, resizeHandle ? 'resize' : 'move', Number(blockButton.dataset.blockId));
  });

  window.addEventListener('pointermove', (event) => {
    updateInteraction(event);
  });

  window.addEventListener('pointerup', () => {
    finishInteraction();
  });

  window.addEventListener('pointercancel', () => {
    finishInteraction();
  });

  canvas.addEventListener('click', (event) => {
    if (event.target.closest('[data-block-id]')) {
      return;
    }

    const selectedBlock = getSelectedBlock();

    if (!selectedBlock) {
      return;
    }

    const metrics = getMetrics();
    const x = event.clientX - metrics.rect.left;
    const y = event.clientY - metrics.rect.top;

    selectedBlock.colStart = clamp(
      snapTrack(x, metrics.columnWidth, state.grid.columnGap, state.grid.columns),
      1,
      state.grid.columns - selectedBlock.colSpan + 1
    );
    selectedBlock.rowStart = clamp(
      snapTrack(y, metrics.rowHeight, state.grid.rowGap, state.grid.rows),
      1,
      state.grid.rows - selectedBlock.rowSpan + 1
    );
    render();
  });

  addButton.addEventListener('click', () => {
    const id = state.nextId;
    state.nextId += 1;
    state.selectedId = id;

    state.blocks.push({
      id,
      label: `Block ${id}`,
      colStart: 1,
      colSpan: Math.min(4, state.grid.columns),
      rowStart: 1,
      rowSpan: Math.min(2, state.grid.rows),
      alignSelf: 'stretch',
      justifySelf: 'stretch',
      contentAlign: 'center',
      contentJustify: 'center',
      background: palette[(id - 1) % palette.length]
    });

    render();
  });

  removeButton.addEventListener('click', () => {
    if (!state.blocks.length) {
      return;
    }

    state.blocks = state.blocks.filter((block) => block.id !== state.selectedId);
    state.selectedId = state.blocks[0]?.id ?? null;
    render();
  });

  render();
}

initLanguageSwitcher();
initOwnBrandNoteDraw();
initHeroDock();
initWhoWeBridgeParallax();
initCardsSlider();
initLayoutLab();

