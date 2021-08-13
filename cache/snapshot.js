var snapshotAuxiliaryData = {};

function generateSnapshot () {
  const outerScope = this

  let process = {}
  Object.defineProperties(process, {
    'platform': {value: 'darwin', enumerable: false},
    'argv': {value: [], enumerable: false},
    'env': {value: {'NODE_ENV': 'production'}, enumerable: false}
  })
  function get_process () {
    return process
  }

  function createElement(_type) {
    return {
      innerHTML: '',
      style: {}
    }
  }

  let documentElement = {
    textContent: '',
    style: {
      cssFloat: ''
    }
  }
  let document = {}
  Object.defineProperties(document, {
    'createElement': {value: createElement, enumerable: false},
    'addEventListener': {value: function() {}, enumerable: false},
    'documentElement': {value: documentElement, enumerable: false},
    'oninput': {value: {}, enumerable: false},
    'onchange': {value: {}, enumerable: false}
  })
  function get_document () {
    return document
  }

  let global = {}
  Object.defineProperties(global, {
    'document': {value: document, enumerable: false},
    'process': {value: process, enumerable: false},
    'WeakMap': {value: WeakMap, enumerable: false},
    'isGeneratingSnapshot': {value: true, enumerable: false}
  })
  function get_global () {
    return global
  }

  // Globally visible function and constructor names that are available in an Electron renderer window, but not visible
  // during snapshot creation.
  // See test/samples/list-globals.js for the generation code.
  // - Manually remove "webkitURL" which is deprecated to avoid a warning on startup.
  const globalFunctionNames = [
    "USBOutTransferResult", "USBIsochronousOutTransferResult", "USBIsochronousOutTransferPacket",
    "USBIsochronousInTransferResult", "USBIsochronousInTransferPacket", "USBInTransferResult", "USBInterface",
    "USBEndpoint", "USBDevice", "USBConnectionEvent", "USBConfiguration", "USBAlternateInterface", "USB", "NFC",
    "BluetoothUUID", "BluetoothRemoteGATTService", "BluetoothRemoteGATTServer", "BluetoothRemoteGATTDescriptor",
    "BluetoothRemoteGATTCharacteristic", "BluetoothDevice", "BluetoothCharacteristicProperties", "Bluetooth",
    "WebAuthentication", "PublicKeyCredential", "AuthenticatorResponse", "AuthenticatorAttestationResponse",
    "AuthenticatorAssertionResponse", "WebGLRenderingContext", "WebGL2RenderingContext", "Path2D", "CanvasPattern",
    "CanvasGradient", "TextDetector", "FaceDetector", "DetectedText", "DetectedFace", "DetectedBarcode",
    "BarcodeDetector", "NavigationPreloadManager", "SensorErrorEvent", "Sensor", "RelativeOrientationSensor",
    "OrientationSensor", "Magnetometer", "LinearAccelerationSensor", "Gyroscope", "AmbientLightSensor", "Accelerometer",
    "AbsoluteOrientationSensor", "webkitSpeechRecognitionEvent", "webkitSpeechRecognitionError",
    "webkitSpeechRecognition", "webkitSpeechGrammarList", "webkitSpeechGrammar", "SpeechSynthesisUtterance",
    "SpeechSynthesisEvent", "RemotePlayback", "RTCRtpSender", "PushSubscriptionOptions", "PushSubscription",
    "PushManager", "PresentationReceiver", "PresentationConnectionList", "PresentationRequest",
    "PresentationConnectionCloseEvent", "PresentationConnectionAvailableEvent", "PresentationConnection",
    "PresentationAvailability", "Presentation", "PermissionStatus", "Permissions", "PaymentResponse",
    "PaymentRequestUpdateEvent", "PaymentRequest", "PaymentAddress", "PaymentManager", "Notification",
    "VideoPlaybackQuality", "TrackDefaultList", "TrackDefault", "CanvasCaptureMediaStreamTrack", "PhotoCapabilities",
    "MediaSettingsRange", "ImageCapture", "IDBObserverChanges", "IDBObserver", "IDBObservation", "StorageManager",
    "CompositorWorker", "BudgetService", "BroadcastChannel", "SyncManager", "BackgroundFetchRegistration",
    "BackgroundFetchManager", "BackgroundFetchFetch", "AudioParamMap", "XSLTProcessor", "Worklet", "VTTRegion",
    "KeyframeEffectReadOnly", "KeyframeEffect", "DocumentTimeline", "AnimationTimeline", "AnimationPlaybackEvent",
    "AnimationEffectTimingReadOnly", "AnimationEffectTiming", "AnimationEffectReadOnly", "Animation", "VisualViewport",
    "SharedWorker", "PerformanceServerTiming", "SVGMPathElement", "SVGDiscardElement", "SVGAnimationElement",
    "ResizeObserverEntry", "ResizeObserver", "PerformancePaintTiming", "PerformanceObserverEntryList",
    "PerformanceObserver", "PerformanceNavigationTiming", "IntersectionObserverEntry", "IntersectionObserver",
    "StaticRange", "InputEvent", "DOMRectReadOnly", "DOMRect", "DOMQuad", "DOMPointReadOnly", "DOMPoint",
    "DOMMatrixReadOnly", "DOMMatrix", "ScrollTimeline", "StylePropertyMapReadonly", "StylePropertyMap",
    "CSSVariableReferenceValue", "CSSURLImageValue", "CSSUnparsedValue", "CSSUnitValue", "CSSTranslation",
    "CSSTransformValue", "CSSTransformComponent", "CSSStyleValue", "CSSSkew", "CSSScale", "CSSRotation",
    "CSSResourceValue", "CSSPositionValue", "CSSPerspective", "CSSNumericValue", "CSSMatrixComponent",
    "CSSKeywordValue", "CSSImageValue", "VideoTrackList", "VideoTrack", "AudioTrackList", "AudioTrack",
    "AccessibleNodeList", "AccessibleNode", "webkitRTCPeerConnection", "webkitMediaStream", "WebSocket",
    "WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync",
    "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram",
    "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo", "WaveShaperNode", "TextEncoder",
    "TextDecoder", "SubtleCrypto", "StorageEvent", "Storage", "StereoPannerNode", "SourceBufferList", "SourceBuffer",
    "ServiceWorkerRegistration", "ServiceWorkerContainer", "ServiceWorker", "ScriptProcessorNode", "ScreenOrientation",
    "Response", "Request", "RTCStatsReport", "RTCSessionDescription", "RTCRtpReceiver", "RTCRtpContributingSource",
    "RTCPeerConnectionIceEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCDataChannelEvent", "RTCDataChannel",
    "RTCCertificate", "Plugin", "PluginArray", "PeriodicWave", "PasswordCredential", "PannerNode", "OscillatorNode",
    "OfflineAudioContext", "OfflineAudioCompletionEvent", "NetworkInformation", "MimeType", "MimeTypeArray",
    "MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamEvent", "MediaStream", "MediaStreamAudioSourceNode",
    "MediaStreamAudioDestinationNode", "MediaSource", "MediaRecorder", "MediaKeys", "MediaKeySystemAccess",
    "MediaKeyStatusMap", "MediaKeySession", "MediaKeyMessageEvent", "MediaEncryptedEvent",
    "MediaElementAudioSourceNode", "MediaDevices", "MediaDeviceInfo", "MIDIPort", "MIDIOutputMap", "MIDIOutput",
    "MIDIMessageEvent", "MIDIInputMap", "MIDIInput", "MIDIConnectionEvent", "MIDIAccess", "ImageBitmapRenderingContext",
    "IIRFilterNode", "IDBVersionChangeEvent", "IDBTransaction", "IDBRequest", "IDBOpenDBRequest", "IDBObjectStore",
    "IDBKeyRange", "IDBIndex", "IDBFactory", "IDBDatabase", "IDBCursorWithValue", "IDBCursor", "Headers",
    "GamepadEvent", "Gamepad", "GamepadButton", "GainNode", "FederatedCredential", "EventSource",
    "DynamicsCompressorNode", "DeviceOrientationEvent", "DeviceMotionEvent", "DelayNode", "DOMError", "CryptoKey",
    "Crypto", "CredentialsContainer", "Credential", "ConvolverNode", "ConstantSourceNode", "CloseEvent",
    "ChannelSplitterNode", "ChannelMergerNode", "CanvasRenderingContext2D", "CacheStorage", "Cache", "BlobEvent",
    "BiquadFilterNode", "BeforeInstallPromptEvent", "BatteryManager", "BaseAudioContext", "AudioScheduledSourceNode",
    "AudioProcessingEvent", "AudioParam", "AudioNode", "AudioListener", "AudioDestinationNode", "AudioContext",
    "AudioBufferSourceNode", "AudioBuffer", "AppBannerPromptResult", "AnalyserNode", "postMessage", "blur", "focus",
    "close", "XPathResult", "XPathExpression", "XPathEvaluator", "XMLSerializer", "XMLHttpRequestUpload",
    "XMLHttpRequestEventTarget", "XMLHttpRequest", "XMLDocument", "Worker", "Window", "WheelEvent", "ValidityState",
    "VTTCue", "URLSearchParams", "URL", "UIEvent", "TreeWalker", "TransitionEvent", "TrackEvent", "TouchList",
    "TouchEvent", "Touch", "TimeRanges", "TextTrackList", "TextTrackCueList", "TextTrackCue", "TextTrack",
    "TextMetrics", "TextEvent", "Text", "TaskAttributionTiming", "StyleSheetList", "StyleSheet", "ShadowRoot",
    "Selection", "SecurityPolicyViolationEvent", "Screen", "SVGViewElement", "SVGUseElement", "SVGUnitTypes",
    "SVGTransformList", "SVGTransform", "SVGTitleElement", "SVGTextPositioningElement", "SVGTextPathElement",
    "SVGTextElement", "SVGTextContentElement", "SVGTSpanElement", "SVGSymbolElement", "SVGSwitchElement",
    "SVGStyleElement", "SVGStringList", "SVGStopElement", "SVGSetElement", "SVGScriptElement", "SVGSVGElement",
    "SVGRectElement", "SVGRect","SVGRadialGradientElement", "SVGPreserveAspectRatio", "SVGPolylineElement",
    "SVGPolygonElement", "SVGPointList", "SVGPoint", "SVGPatternElement", "SVGPathElement", "SVGNumberList",
    "SVGNumber", "SVGMetadataElement","SVGMatrix", "SVGMaskElement", "SVGMarkerElement", "SVGLinearGradientElement",
    "SVGLineElement", "SVGLengthList", "SVGLength", "SVGImageElement", "SVGGraphicsElement", "SVGGradientElement",
    "SVGGeometryElement", "SVGGElement", "SVGForeignObjectElement", "SVGFilterElement", "SVGFETurbulenceElement",
    "SVGFETileElement", "SVGFESpotLightElement", "SVGFESpecularLightingElement", "SVGFEPointLightElement",
    "SVGFEOffsetElement", "SVGFEMorphologyElement", "SVGFEMergeNodeElement", "SVGFEMergeElement", "SVGFEImageElement",
    "SVGFEGaussianBlurElement", "SVGFEFuncRElement", "SVGFEFuncGElement", "SVGFEFuncBElement", "SVGFEFuncAElement",
    "SVGFEFloodElement", "SVGFEDropShadowElement", "SVGFEDistantLightElement", "SVGFEDisplacementMapElement",
    "SVGFEDiffuseLightingElement", "SVGFEConvolveMatrixElement", "SVGFECompositeElement",
    "SVGFEComponentTransferElement", "SVGFEColorMatrixElement", "SVGFEBlendElement", "SVGEllipseElement", "SVGElement",
    "SVGDescElement", "SVGDefsElement", "SVGComponentTransferFunctionElement", "SVGClipPathElement", "SVGCircleElement",
    "SVGAnimatedTransformList", "SVGAnimatedString", "SVGAnimatedRect", "SVGAnimatedPreserveAspectRatio",
    "SVGAnimatedNumberList", "SVGAnimatedNumber", "SVGAnimatedLengthList", "SVGAnimatedLength", "SVGAnimatedInteger",
    "SVGAnimatedEnumeration", "SVGAnimatedBoolean", "SVGAnimatedAngle", "SVGAnimateTransformElement",
    "SVGAnimateMotionElement", "SVGAnimateElement", "SVGAngle", "SVGAElement", "Range", "RadioNodeList",
    "PromiseRejectionEvent", "ProgressEvent","ProcessingInstruction", "PopStateEvent", "PointerEvent",
    "PerformanceTiming", "PerformanceResourceTiming", "PerformanceNavigation", "PerformanceMeasure", "PerformanceMark",
    "PerformanceLongTaskTiming", "PerformanceEntry", "Performance", "PageTransitionEvent", "NodeList", "NodeIterator",
    "NodeFilter", "Node", "Navigator", "NamedNodeMap", "MutationRecord", "MutationObserver", "MutationEvent",
    "MouseEvent", "MessagePort", "MessageEvent", "MessageChannel", "MediaQueryListEvent", "MediaQueryList", "MediaList",
    "MediaError", "Location", "KeyboardEvent", "InputDeviceCapabilities", "ImageData", "ImageBitmap", "IdleDeadline",
    "History", "HashChangeEvent", "HTMLVideoElement", "HTMLUnknownElement", "HTMLUListElement", "HTMLTrackElement",
    "HTMLTitleElement", "HTMLTextAreaElement", "HTMLTemplateElement", "HTMLTableSectionElement", "HTMLTableRowElement",
    "HTMLTableElement", "HTMLTableColElement", "HTMLTableCellElement", "HTMLTableCaptionElement", "HTMLStyleElement",
    "HTMLSpanElement", "HTMLSourceElement", "HTMLSlotElement", "HTMLShadowElement", "HTMLSelectElement",
    "HTMLScriptElement", "HTMLQuoteElement", "HTMLProgressElement", "HTMLPreElement", "HTMLPictureElement",
    "HTMLParamElement", "HTMLParagraphElement", "HTMLOutputElement", "HTMLOptionsCollection", "Option",
    "HTMLOptionElement", "HTMLOptGroupElement", "HTMLObjectElement", "HTMLOListElement", "HTMLModElement",
    "HTMLMeterElement", "HTMLMetaElement", "HTMLMenuElement", "HTMLMediaElement", "HTMLMarqueeElement",
    "HTMLMapElement", "HTMLLinkElement", "HTMLLegendElement", "HTMLLabelElement", "HTMLLIElement", "HTMLInputElement",
    "Image", "HTMLImageElement", "HTMLIFrameElement", "HTMLHtmlElement", "HTMLHeadingElement", "HTMLHeadElement",
    "HTMLHRElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLFormElement", "HTMLFormControlsCollection",
    "HTMLFontElement", "HTMLFieldSetElement", "HTMLEmbedElement", "HTMLElement", "HTMLDocument", "HTMLDivElement",
    "HTMLDirectoryElement", "HTMLDialogElement", "HTMLDetailsElement", "HTMLDataListElement", "HTMLDListElement",
    "HTMLContentElement", "HTMLCollection", "HTMLCanvasElement", "HTMLButtonElement", "HTMLBodyElement",
    "HTMLBaseElement", "HTMLBRElement", "Audio", "HTMLAudioElement", "HTMLAreaElement", "HTMLAnchorElement",
    "HTMLAllCollection", "FormData", "FontFaceSetLoadEvent", "FontFace", "FocusEvent", "FileReader", "FileList", "File",
    "EventTarget", "Event", "ErrorEvent", "Element", "DragEvent", "DocumentType", "DocumentFragment", "Document",
    "DataTransferItemList", "DataTransferItem", "DataTransfer", "DOMTokenList", "DOMStringMap", "DOMStringList",
    "DOMParser", "DOMImplementation", "DOMException", "CustomEvent", "CustomElementRegistry", "CompositionEvent",
    "Comment", "ClipboardEvent", "Clipboard", "CharacterData", "CSSViewportRule", "CSSSupportsRule", "CSSStyleSheet",
    "CSSStyleRule", "CSSStyleDeclaration", "CSSRuleList", "CSSRule", "CSSPageRule", "CSSNamespaceRule", "CSSMediaRule",
    "CSSKeyframesRule", "CSSKeyframeRule", "CSSImportRule", "CSSGroupingRule", "CSSFontFaceRule", "CSS",
    "CSSConditionRule", "CDATASection", "Blob", "BeforeUnloadEvent", "BarProp", "Attr", "ApplicationCacheErrorEvent",
    "ApplicationCache", "AnimationEvent", "WebKitCSSMatrix", "WebKitMutationObserver",
    "WebKitAnimationEvent", "WebKitTransitionEvent", "onerror", "onload", "stop", "open", "alert", "confirm", "prompt",
    "print", "requestAnimationFrame", "cancelAnimationFrame", "requestIdleCallback", "cancelIdleCallback",
    "captureEvents", "releaseEvents", "getComputedStyle", "matchMedia", "moveTo", "moveBy", "resizeTo", "resizeBy",
    "getSelection", "find", "getMatchedCSSRules", "webkitRequestAnimationFrame", "webkitCancelAnimationFrame", "btoa",
    "atob", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "createImageBitmap", "scroll", "scrollTo",
    "scrollBy", "fetch", "getComputedStyleMap", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL",
    "openDatabase", "SharedArrayBuffer", "Buffer", "setImmediate", "clearImmediate", "require", "BudgetState",
    "WebView", "measure", "profile", "dir", "dirxml", "profileEnd", "clear", "table", "keys", "values", "debug",
    "undebug", "monitor", "unmonitor", "inspect", "copy", "getEventListeners", "monitorEvents", "unmonitorEvents", "$",
    "$$", "$x",
  ]

  // During snapshot generation, this is null.
  // After snapshot load and setGlobals() is called, this is an object with global function names as keys and the real
  // global functions as values.
  let globalFunctionTrampoline = null

  // Create a placeholder function to install as a global in place of a function that may be available after snapshot
  // load, at runtime. Uses the current state of globalFunctionTrampoline to either call the real function or throw
  // an appropriate error for improper use.
  function makeGlobalPlaceholder(globalFunctionName) {
    return function() {
      if (globalFunctionTrampoline === null) {
        throw new Error(`Attempt to call ${globalFunctionName} during snapshot generation or before snapshotResult.setGlobals()`)
      } else if (globalFunctionTrampoline[globalFunctionName] === undefined) {
        throw new ReferenceError(`Global method ${globalFunctionName} was still not defined after the snapshot was loaded`)
      } else if (new.target === undefined) {
        // Not called as a constructor
        return globalFunctionTrampoline[globalFunctionName](...arguments)
      } else {
        // Called as a constructor
        return new globalFunctionTrampoline[globalFunctionName](...arguments)
      }
    }
  }

  // Install a placeholder function for each global function we expect to have access to at runtime. Placeholder
  // functions are set as properties on our "global" stand-in and also in this function's scope, so bare references
  // will also capture the placeholder function (`var a = setTimeout` and `var a = global.setTimeout`).
  for (const globalFunctionName of globalFunctionNames) {
    if (outerScope[globalFunctionName] !== undefined) {
      // This happens when the snapshot script is eval'd in tests.
      continue;
    }
    const placeholder = makeGlobalPlaceholder(globalFunctionName);
    Object.defineProperties(global, {
      [globalFunctionName]: {value: placeholder, enumerable: false},
    })
    outerScope[globalFunctionName] = placeholder;
  }

  let window = {}
  Object.defineProperties(window, {
    'document': {value: document, enumerable: false},
    'location': {value: {href: ''}, enumerable: false},
    'addEventListener': {value: function(){}, enumerable: false},
    'screen': {value: {}, enumerable: false},
  })
  function get_window () {
    return window
  }

  let console = {}
  function consoleNoop () {
    throw new Error('Cannot use `console` functions in the snapshot.')
  }
  Object.defineProperties(console, {
    'debug': {value: consoleNoop, enumerable: false},
    'error': {value: consoleNoop, enumerable: false},
    'info': {value: consoleNoop, enumerable: false},
    'log': {value: consoleNoop, enumerable: false},
    'warn': {value: consoleNoop, enumerable: false},
    'time': {value: consoleNoop, enumerable: false},
    'timeEnd': {value: consoleNoop, enumerable: false}
  })
  function get_console () {
    return console
  }

  let require = (moduleName) => {
    throw new Error(
      `Cannot require module "${moduleName}".\n` +
      "To use Node's require you need to call `snapshotResult.setGlobals` first!"
    )
  }

  function customRequire (modulePath) {
    let module = customRequire.cache[modulePath]
    if (!module) {
      module = {exports: {}}
      const dirname = modulePath.split('/').slice(0, -1).join('/')

      function define (callback) {
        callback(customRequire, module.exports, module)
      }

      if (customRequire.definitions.hasOwnProperty(modulePath)) {
        customRequire.cache[modulePath] = module
        customRequire.definitions[modulePath].apply(module.exports, [module.exports, module, modulePath, dirname, customRequire, define])
      } else {
        module.exports = require(modulePath)
        customRequire.cache[modulePath] = module
      }
    }
    return module.exports
  }
  customRequire.extensions = {}
  customRequire.cache = {}
  customRequire.definitions = {
    "./src/app.js": function (exports, module, __filename, __dirname, require, define) {
      function index() {
        const { app, BrowserWindow } = require("./node_modules/electron/index.js");
        const path = require("path");
        const time1 = new Date().getTime();
        require("./node_modules/v8-compile-cache/v8-compile-cache.js");

        // Handle creating/removing shortcuts on Windows when installing/uninstalling.
        if (require("./node_modules/electron-squirrel-startup/index.js")) {
          // eslint-disable-line global-require
          app.quit();
        }

        const createWindow = () => {
          // Create the browser window.
          const time2 = new Date().getTime();

          const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
          });
          mainWindow.on("ready-to-show", () => {
            // 向测试套件进程发送IPC消息
            get_console().log("time:", new Date().getTime() - time1);
            get_console().log("time:", new Date().getTime() - time2);
            get_console().log("time:", time2 - time1);
          });
          const time3 = new Date().getTime();
          // const child = new BrowserWindow({ parent: mainWindow })
          // child.loadURL('http://www.baidu.com')
          // child.show()
          // child.on('ready-to-show',()=>{
          //   console.log(new Date().getTime()-time3);
          //   console.log(time3-time2);
          // })
          mainWindow.show();
          // and load the index.html of the app.
          mainWindow.loadFile(path.join(__dirname, "index.html"));
          // mainWindow.loadURL('http://www.baidu.com')

          // const next = new BrowserWindow({
          //   width:200,
          //   height:500
          // })
          // next.show();
          // next.setParentWindow(child)
          // Open the DevTools.
          // mainWindow.webContents.openDevTools();
        };

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on("ready", createWindow);

        // Quit when all windows ars closed, except on macOS. There, it's common
        // for applications and their menu bar to stay active until the user quits
        // explicitly with Cmd + Q.
        app.on("window-all-closed", () => {
          if (get_process().platform !== "darwin") {
            app.quit();
          }
        });

        app.on("activate", () => {
          // On OS X it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
          }
        });

        // In this file you can include the rest of your app's specific main process
        // code. You can also put them in separate files and import them here.
      };

      module.exports ={ index }
    },
    "./node_modules/electron/index.js": function (exports, module, __filename, __dirname, require, define) {
      let fs;

      function get_fs() {
        return fs = fs || require('fs');
      }

      let path;

      function get_path() {
        return path = path || require('path');
      }

      let pathFile;

      function get_pathFile() {
        return pathFile = pathFile || get_path().join(__dirname, 'path.txt');
      }

      function getElectronPath () {
        let executablePath;
        if (get_fs().existsSync(get_pathFile())) {
          executablePath = get_fs().readFileSync(get_pathFile(), 'utf-8');
        }
        if (get_process().env.ELECTRON_OVERRIDE_DIST_PATH) {
          return get_path().join(get_process().env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || 'electron');
        }
        if (executablePath) {
          return get_path().join(__dirname, 'dist', executablePath);
        } else {
          throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again');
        }
      }

      module.exports = getElectronPath();

    },
    "./node_modules/v8-compile-cache/v8-compile-cache.js": function (exports, module, __filename, __dirname, require, define) {
      'use strict';

      let Module;

      function get_Module() {
        return Module = Module || require('module');
      }

      let crypto;

      function get_crypto() {
        return crypto = crypto || require('crypto');
      }

      let fs;

      function get_fs() {
        return fs = fs || require('fs');
      }

      let path;

      function get_path() {
        return path = path || require('path');
      }

      let vm;

      function get_vm() {
        return vm = vm || require('vm');
      }

      let os;

      function get_os() {
        return os = os || require('os');
      }

      const hasOwnProperty = Object.prototype.hasOwnProperty;

      //------------------------------------------------------------------------------
      // FileSystemBlobStore
      //------------------------------------------------------------------------------

      class FileSystemBlobStore {
        constructor(directory, prefix) {
          const name = prefix ? slashEscape(prefix + '.') : '';
          this._blobFilename = get_path().join(directory, name + 'BLOB');
          this._mapFilename = get_path().join(directory, name + 'MAP');
          this._lockFilename = get_path().join(directory, name + 'LOCK');
          this._directory = directory;
          this._load();
        }

        has(key, invalidationKey) {
          if (hasOwnProperty.call(this._memoryBlobs, key)) {
            return this._invalidationKeys[key] === invalidationKey;
          } else if (hasOwnProperty.call(this._storedMap, key)) {
            return this._storedMap[key][0] === invalidationKey;
          }
          return false;
        }

        get(key, invalidationKey) {
          if (hasOwnProperty.call(this._memoryBlobs, key)) {
            if (this._invalidationKeys[key] === invalidationKey) {
              return this._memoryBlobs[key];
            }
          } else if (hasOwnProperty.call(this._storedMap, key)) {
            const mapping = this._storedMap[key];
            if (mapping[0] === invalidationKey) {
              return this._storedBlob.slice(mapping[1], mapping[2]);
            }
          }
        }

        set(key, invalidationKey, buffer) {
          this._invalidationKeys[key] = invalidationKey;
          this._memoryBlobs[key] = buffer;
          this._dirty = true;
        }

        delete(key) {
          if (hasOwnProperty.call(this._memoryBlobs, key)) {
            this._dirty = true;
            delete this._memoryBlobs[key];
          }
          if (hasOwnProperty.call(this._invalidationKeys, key)) {
            this._dirty = true;
            delete this._invalidationKeys[key];
          }
          if (hasOwnProperty.call(this._storedMap, key)) {
            this._dirty = true;
            delete this._storedMap[key];
          }
        }

        isDirty() {
          return this._dirty;
        }

        save() {
          const dump = this._getDump();
          const blobToStore = Buffer.concat(dump[0]);
          const mapToStore = JSON.stringify(dump[1]);

          try {
            mkdirpSync(this._directory);
            get_fs().writeFileSync(this._lockFilename, 'LOCK', {flag: 'wx'});
          } catch (error) {
            // Swallow the exception if we fail to acquire the lock.
            return false;
          }

          try {
            get_fs().writeFileSync(this._blobFilename, blobToStore);
            get_fs().writeFileSync(this._mapFilename, mapToStore);
          } finally {
            get_fs().unlinkSync(this._lockFilename);
          }

          return true;
        }

        _load() {
          try {
            this._storedBlob = get_fs().readFileSync(this._blobFilename);
            this._storedMap = JSON.parse(get_fs().readFileSync(this._mapFilename));
          } catch (e) {
            this._storedBlob = Buffer.alloc(0);
            this._storedMap = {};
          }
          this._dirty = false;
          this._memoryBlobs = {};
          this._invalidationKeys = {};
        }

        _getDump() {
          const buffers = [];
          const newMap = {};
          let offset = 0;

          function push(key, invalidationKey, buffer) {
            buffers.push(buffer);
            newMap[key] = [invalidationKey, offset, offset + buffer.length];
            offset += buffer.length;
          }

          for (const key of Object.keys(this._memoryBlobs)) {
            const buffer = this._memoryBlobs[key];
            const invalidationKey = this._invalidationKeys[key];
            push(key, invalidationKey, buffer);
          }

          for (const key of Object.keys(this._storedMap)) {
            if (hasOwnProperty.call(newMap, key)) continue;
            const mapping = this._storedMap[key];
            const buffer = this._storedBlob.slice(mapping[1], mapping[2]);
            push(key, mapping[0], buffer);
          }

          return [buffers, newMap];
        }
      }

      //------------------------------------------------------------------------------
      // NativeCompileCache
      //------------------------------------------------------------------------------

      class NativeCompileCache {
        constructor() {
          this._cacheStore = null;
          this._previousModuleCompile = null;
        }

        setCacheStore(cacheStore) {
          this._cacheStore = cacheStore;
        }

        install() {
          const self = this;
          const hasRequireResolvePaths = typeof require.resolve.paths === 'function';
          this._previousModuleCompile = get_Module().prototype._compile;
          get_Module().prototype._compile = function(content, filename) {
            const mod = this;

            function require(id) {
              return mod.require(id);
            }

            // https://github.com/nodejs/node/blob/v10.15.3/lib/internal/modules/cjs/helpers.js#L28
            function resolve(request, options) {
              return get_Module()._resolveFilename(request, mod, false, options);
            }
            require.resolve = resolve;

            // https://github.com/nodejs/node/blob/v10.15.3/lib/internal/modules/cjs/helpers.js#L37
            // resolve.resolve.paths was added in v8.9.0
            if (hasRequireResolvePaths) {
              resolve.paths = function paths(request) {
                return get_Module()._resolveLookupPaths(request, mod, true);
              };
            }

            require.main = get_process().mainModule;

            // Enable support to add extra extension types
            require.extensions = get_Module()._extensions;
            require.cache = get_Module()._cache;

            const dirname = get_path().dirname(filename);

            const compiledWrapper = self._moduleCompile(filename, content);

            // We skip the debugger setup because by the time we run, node has already
            // done that itself.

            // `Buffer` is included for Electron.
            // See https://github.com/zertosh/v8-compile-cache/pull/10#issuecomment-518042543
            const args = [mod.exports, require, mod, filename, dirname, get_process(), get_global(), Buffer];
            return compiledWrapper.apply(mod.exports, args);
          };
        }

        uninstall() {
          get_Module().prototype._compile = this._previousModuleCompile;
        }

        _moduleCompile(filename, content) {
          // https://github.com/nodejs/node/blob/v7.5.0/lib/module.js#L511

          // Remove shebang
          var contLen = content.length;
          if (contLen >= 2) {
            if (content.charCodeAt(0) === 35/*#*/ &&
                content.charCodeAt(1) === 33/*!*/) {
              if (contLen === 2) {
                // Exact match
                content = '';
              } else {
                // Find end of shebang line and slice it off
                var i = 2;
                for (; i < contLen; ++i) {
                  var code = content.charCodeAt(i);
                  if (code === 10/*\n*/ || code === 13/*\r*/) break;
                }
                if (i === contLen) {
                  content = '';
                } else {
                  // Note that this actually includes the newline character(s) in the
                  // new output. This duplicates the behavior of the regular
                  // expression that was previously used to replace the shebang line
                  content = content.slice(i);
                }
              }
            }
          }

          // create wrapper function
          var wrapper = get_Module().wrap(content);

          var invalidationKey = get_crypto()
            .createHash('sha1')
            .update(content, 'utf8')
            .digest('hex');

          var buffer = this._cacheStore.get(filename, invalidationKey);

          var script = new (get_vm().Script)(wrapper, {
            filename: filename,
            lineOffset: 0,
            displayErrors: true,
            cachedData: buffer,
            produceCachedData: true,
          });

          if (script.cachedDataProduced) {
            this._cacheStore.set(filename, invalidationKey, script.cachedData);
          } else if (script.cachedDataRejected) {
            this._cacheStore.delete(filename);
          }

          var compiledWrapper = script.runInThisContext({
            filename: filename,
            lineOffset: 0,
            columnOffset: 0,
            displayErrors: true,
          });

          return compiledWrapper;
        }
      }

      //------------------------------------------------------------------------------
      // utilities
      //
      // https://github.com/substack/node-mkdirp/blob/f2003bb/index.js#L55-L98
      // https://github.com/zertosh/slash-escape/blob/e7ebb99/slash-escape.js
      //------------------------------------------------------------------------------

      function mkdirpSync(p_) {
        _mkdirpSync(get_path().resolve(p_), 0o777);
      }

      function _mkdirpSync(p, mode) {
        try {
          get_fs().mkdirSync(p, mode);
        } catch (err0) {
          if (err0.code === 'ENOENT') {
            _mkdirpSync(get_path().dirname(p));
            _mkdirpSync(p);
          } else {
            try {
              const stat = get_fs().statSync(p);
              if (!stat.isDirectory()) { throw err0; }
            } catch (err1) {
              throw err0;
            }
          }
        }
      }

      function slashEscape(str) {
        const ESCAPE_LOOKUP = {
          '\\': 'zB',
          ':': 'zC',
          '/': 'zS',
          '\x00': 'z0',
          'z': 'zZ',
        };
        const ESCAPE_REGEX = /[\\:/\x00z]/g; // eslint-disable-line no-control-regex
        return str.replace(ESCAPE_REGEX, match => ESCAPE_LOOKUP[match]);
      }

      function supportsCachedData() {
        const script = new (get_vm().Script)('""', {produceCachedData: true});
        // chakracore, as of v1.7.1.0, returns `false`.
        return script.cachedDataProduced === true;
      }

      function getCacheDir() {
        const v8_compile_cache_cache_dir = get_process().env.V8_COMPILE_CACHE_CACHE_DIR;
        if (v8_compile_cache_cache_dir) {
          return v8_compile_cache_cache_dir;
        }

        // Avoid cache ownership issues on POSIX systems.
        const dirname = typeof get_process().getuid === 'function'
          ? 'v8-compile-cache-' + get_process().getuid()
          : 'v8-compile-cache';
        const version = typeof get_process().versions.v8 === 'string'
          ? get_process().versions.v8
          : typeof get_process().versions.chakracore === 'string'
            ? 'chakracore-' + get_process().versions.chakracore
            : 'node-' + get_process().version;
        const cacheDir = get_path().join(get_os().tmpdir(), dirname, version);
        return cacheDir;
      }

      function getMainName() {
        // `require.main.filename` is undefined or null when:
        //    * node -e 'require("v8-compile-cache")'
        //    * node -r 'v8-compile-cache'
        //    * Or, requiring from the REPL.
        const mainName = require.main && typeof require.main.filename === 'string'
          ? require.main.filename
          : get_process().cwd();
        return mainName;
      }

      //------------------------------------------------------------------------------
      // main
      //------------------------------------------------------------------------------

      if (!get_process().env.DISABLE_V8_COMPILE_CACHE && supportsCachedData()) {
        const cacheDir = getCacheDir();
        const prefix = getMainName();
        const blobStore = new FileSystemBlobStore(cacheDir, prefix);

        const nativeCompileCache = new NativeCompileCache();
        nativeCompileCache.setCacheStore(blobStore);
        nativeCompileCache.install();

        get_process().once('exit', () => {
          if (blobStore.isDirty()) {
            blobStore.save();
          }
          nativeCompileCache.uninstall();
        });
      }

      module.exports.__TEST__ = {
        FileSystemBlobStore,
        NativeCompileCache,
        mkdirpSync,
        slashEscape,
        supportsCachedData,
        getCacheDir,
        getMainName,
      };

    },
    "./node_modules/electron-squirrel-startup/index.js": function (exports, module, __filename, __dirname, require, define) {
      var path;

      function get_path() {
        return path = path || require('path');
      }

      var spawn;

      function get_spawn() {
        return spawn = spawn || require('child_process').spawn;
      }

      var debug = require("./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js")('electron-squirrel-startup');
      var app = require("./node_modules/electron/index.js").app;

      var run = function(args, done) {
        var updateExe = get_path().resolve(get_path().dirname(get_process().execPath), '..', 'Update.exe');
        debug('Spawning `%s` with args `%s`', updateExe, args);
        get_spawn()(updateExe, args, {
          detached: true
        }).on('close', done);
      };

      var check = function() {
        if (get_process().platform === 'win32') {
          var cmd = get_process().argv[1];
          debug('processing squirrel command `%s`', cmd);
          var target = get_path().basename(get_process().execPath);

          if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
            run(['--createShortcut=' + target + ''], app.quit);
            return true;
          }
          if (cmd === '--squirrel-uninstall') {
            run(['--removeShortcut=' + target + ''], app.quit);
            return true;
          }
          if (cmd === '--squirrel-obsolete') {
            app.quit();
            return true;
          }
        }
        return false;
      };

      module.exports = check();

    },
    "./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js": function (exports, module, __filename, __dirname, require, define) {
      /**
       * Detect Electron renderer process, which is node, but we should
       * treat as a browser.
       */

      if (typeof get_process() !== 'undefined' && get_process().type === 'renderer') {
        module.exports = require("./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js");
      } else {
        module.exports = require("./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js");
      }

    },
    "./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js": function (exports, module, __filename, __dirname, require, define) {
      /**
       * This is the web browser implementation of `debug()`.
       *
       * Expose `debug()` as the module.
       */

      exports = module.exports = require("./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = 'undefined' != typeof chrome
                     && 'undefined' != typeof chrome.storage
                        ? chrome.storage.local
                        : localstorage();

      /**
       * Colors.
       */

      exports.colors = [
        'lightseagreen',
        'forestgreen',
        'goldenrod',
        'dodgerblue',
        'darkorchid',
        'crimson'
      ];

      /**
       * Currently only WebKit-based Web Inspectors, Firefox >= v31,
       * and the Firebug extension (any Firefox version) are known
       * to support "%c" CSS customizations.
       *
       * TODO: add a `localStorage` variable to explicitly enable/disable colors
       */

      function useColors() {
        // NB: In an Electron preload script, document will be defined but not fully
        // initialized. Since we know we're in Chrome, we'll just detect this case
        // explicitly
        if (typeof get_window() !== 'undefined' && get_window().process && get_window().process.type === 'renderer') {
          return true;
        }

        // is webkit? http://stackoverflow.com/a/16459606/376773
        // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
        return (typeof get_document() !== 'undefined' && get_document().documentElement && get_document().documentElement.style && get_document().documentElement.style.WebkitAppearance) ||
          // is firebug? http://stackoverflow.com/a/398120/376773
          (typeof get_window() !== 'undefined' && get_window().console && (get_window().console.firebug || (get_window().console.exception && get_window().console.table))) ||
          // is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
          // double check webkit in userAgent just in case we are in a worker
          (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
      }

      /**
       * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
       */

      exports.formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (err) {
          return '[UnexpectedJSONParseError]: ' + err.message;
        }
      };


      /**
       * Colorize log arguments if enabled.
       *
       * @api public
       */

      function formatArgs(args) {
        var useColors = this.useColors;

        args[0] = (useColors ? '%c' : '')
          + this.namespace
          + (useColors ? ' %c' : ' ')
          + args[0]
          + (useColors ? '%c ' : ' ')
          + '+' + exports.humanize(this.diff);

        if (!useColors) return;

        var c = 'color: ' + this.color;
        args.splice(1, 0, c, 'color: inherit')

        // the final "%c" is somewhat tricky, because there could be other
        // arguments passed either before or after the %c, so we need to
        // figure out the correct index to insert the CSS into
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function(match) {
          if ('%%' === match) return;
          index++;
          if ('%c' === match) {
            // we only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
          }
        });

        args.splice(lastC, 0, c);
      }

      /**
       * Invokes `console.log()` when available.
       * No-op when `console.log` is not a "function".
       *
       * @api public
       */

      function log() {
        // this hackery is required for IE8/9, where
        // the `console.log` function doesn't have 'apply'
        return 'object' === typeof get_console()
          && get_console().log
          && Function.prototype.apply.call(get_console().log, get_console(), arguments);
      }

      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */

      function save(namespaces) {
        try {
          if (null == namespaces) {
            exports.storage.removeItem('debug');
          } else {
            exports.storage.debug = namespaces;
          }
        } catch(e) {}
      }

      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */

      function load() {
        var r;
        try {
          r = exports.storage.debug;
        } catch(e) {}

        // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
        if (!r && typeof get_process() !== 'undefined' && 'env' in get_process()) {
          r = get_process().env.DEBUG;
        }

        return r;
      }

      /**
       * Enable namespaces listed in `localStorage.debug` initially.
       */

      exports.enable(load());

      /**
       * Localstorage attempts to return the localstorage.
       *
       * This is necessary because safari throws
       * when a user disables cookies/localstorage
       * and you attempt to access it.
       *
       * @return {LocalStorage}
       * @api private
       */

      function localstorage() {
        try {
          return get_window().localStorage;
        } catch (e) {}
      }

    },
    "./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js": function (exports, module, __filename, __dirname, require, define) {
      /**
       * Module dependencies.
       */

      var tty;

      function get_tty() {
        return tty = tty || require('tty');
      }

      var util;

      function get_util() {
        return util = util || require('util');
      }

      /**
       * This is the Node.js implementation of `debug()`.
       *
       * Expose `debug()` as the module.
       */

      exports = module.exports = require("./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
      exports.init = init;
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;

      /**
       * Colors.
       */

      exports.colors = [6, 2, 3, 4, 5, 1];

      /**
       * Build up the default `inspectOpts` object from the environment variables.
       *
       *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
       */

      exports.inspectOpts = Object.keys(get_process().env).filter(function (key) {
        return /^debug_/i.test(key);
      }).reduce(function (obj, key) {
        // camel-case
        var prop = key
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

        // coerce string value into JS value
        var val = get_process().env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
        else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
        else if (val === 'null') val = null;
        else val = Number(val);

        obj[prop] = val;
        return obj;
      }, {});

      /**
       * The file descriptor to write the `debug()` calls to.
       * Set the `DEBUG_FD` env variable to override with another value. i.e.:
       *
       *   $ DEBUG_FD=3 node script.js 3>debug.log
       */

      var fd = parseInt(get_process().env.DEBUG_FD, 10) || 2;

      if (1 !== fd && 2 !== fd) {
        get_util().deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
      }

      var stream = 1 === fd ? get_process().stdout :
                   2 === fd ? get_process().stderr :
                   createWritableStdioStream(fd);

      /**
       * Is stdout a TTY? Colored output is enabled when `true`.
       */

      function useColors() {
        return 'colors' in exports.inspectOpts
          ? Boolean(exports.inspectOpts.colors)
          : get_tty().isatty(fd);
      }

      /**
       * Map %o to `util.inspect()`, all on a single line.
       */

      exports.formatters.o = function(v) {
        this.inspectOpts.colors = this.useColors;
        return get_util().inspect(v, this.inspectOpts)
          .split('\n').map(function(str) {
            return str.trim()
          }).join(' ');
      };

      /**
       * Map %o to `util.inspect()`, allowing multiple lines if needed.
       */

      exports.formatters.O = function(v) {
        this.inspectOpts.colors = this.useColors;
        return get_util().inspect(v, this.inspectOpts);
      };

      /**
       * Adds ANSI color escape codes if enabled.
       *
       * @api public
       */

      function formatArgs(args) {
        var name = this.namespace;
        var useColors = this.useColors;

        if (useColors) {
          var c = this.color;
          var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

          args[0] = prefix + args[0].split('\n').join('\n' + prefix);
          args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
        } else {
          args[0] = new Date().toUTCString()
            + ' ' + name + ' ' + args[0];
        }
      }

      /**
       * Invokes `util.format()` with the specified arguments and writes to `stream`.
       */

      function log() {
        return stream.write(get_util().format.apply(get_util(), arguments) + '\n');
      }

      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */

      function save(namespaces) {
        if (null == namespaces) {
          // If you set a process.env field to null or undefined, it gets cast to the
          // string 'null' or 'undefined'. Just delete instead.
          delete get_process().env.DEBUG;
        } else {
          get_process().env.DEBUG = namespaces;
        }
      }

      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */

      function load() {
        return get_process().env.DEBUG;
      }

      /**
       * Copied from `node/src/node.js`.
       *
       * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
       * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
       */

      function createWritableStdioStream (fd) {
        var stream;
        var tty_wrap = get_process().binding('tty_wrap');

        // Note stream._type is used for test-module-load-list.js

        switch (tty_wrap.guessHandleType(fd)) {
          case 'TTY':
            stream = new (get_tty().WriteStream)(fd);
            stream._type = 'tty';

            // Hack to have stream not keep the event loop alive.
            // See https://github.com/joyent/node/issues/1726
            if (stream._handle && stream._handle.unref) {
              stream._handle.unref();
            }
            break;

          case 'FILE':
            var fs = require('fs');
            stream = new fs.SyncWriteStream(fd, { autoClose: false });
            stream._type = 'fs';
            break;

          case 'PIPE':
          case 'TCP':
            var net = require('net');
            stream = new net.Socket({
              fd: fd,
              readable: false,
              writable: true
            });

            // FIXME Should probably have an option in net.Socket to create a
            // stream from an existing fd which is writable only. But for now
            // we'll just add this hack and set the `readable` member to false.
            // Test: ./node test/fixtures/echo.js < /etc/passwd
            stream.readable = false;
            stream.read = null;
            stream._type = 'pipe';

            // FIXME Hack to have stream not keep the event loop alive.
            // See https://github.com/joyent/node/issues/1726
            if (stream._handle && stream._handle.unref) {
              stream._handle.unref();
            }
            break;

          default:
            // Probably an error on in uv_guess_handle()
            throw new Error('Implement me. Unknown stream file type!');
        }

        // For supporting legacy API we put the FD here.
        stream.fd = fd;

        stream._isStdio = true;

        return stream;
      }

      /**
       * Init logic for `debug` instances.
       *
       * Create a new `inspectOpts` object in case `useColors` is set
       * differently for a particular `debug` instance.
       */

      function init (debug) {
        debug.inspectOpts = {};

        var keys = Object.keys(exports.inspectOpts);
        for (var i = 0; i < keys.length; i++) {
          debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }

      /**
       * Enable namespaces listed in `process.env.DEBUG` initially.
       */

      exports.enable(load());

    },
    "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js": function (exports, module, __filename, __dirname, require, define) {

      /**
       * This is the common logic for both the Node.js and web browser
       * implementations of `debug()`.
       *
       * Expose `debug()` as the module.
       */

      exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
      exports.coerce = coerce;
      exports.disable = disable;
      exports.enable = enable;
      exports.enabled = enabled;
      exports.humanize = require("./node_modules/electron-squirrel-startup/node_modules/ms/index.js");

      /**
       * The currently active debug mode names, and names to skip.
       */

      exports.names = [];
      exports.skips = [];

      /**
       * Map of special "%n" handling functions, for the debug "format" argument.
       *
       * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
       */

      exports.formatters = {};

      /**
       * Previous log timestamp.
       */

      var prevTime;

      /**
       * Select a color.
       * @param {String} namespace
       * @return {Number}
       * @api private
       */

      function selectColor(namespace) {
        var hash = 0, i;

        for (i in namespace) {
          hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
        }

        return exports.colors[Math.abs(hash) % exports.colors.length];
      }

      /**
       * Create a debugger with the given `namespace`.
       *
       * @param {String} namespace
       * @return {Function}
       * @api public
       */

      function createDebug(namespace) {

        function debug() {
          // disabled?
          if (!debug.enabled) return;

          var self = debug;

          // set `diff` timestamp
          var curr = +new Date();
          var ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;

          // turn the `arguments` into a proper Array
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }

          args[0] = exports.coerce(args[0]);

          if ('string' !== typeof args[0]) {
            // anything else let's inspect with %O
            args.unshift('%O');
          }

          // apply any `formatters` transformations
          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
            // if we encounter an escaped % then don't increase the array index
            if (match === '%%') return match;
            index++;
            var formatter = exports.formatters[format];
            if ('function' === typeof formatter) {
              var val = args[index];
              match = formatter.call(self, val);

              // now we need to remove `args[index]` since it's inlined in the `format`
              args.splice(index, 1);
              index--;
            }
            return match;
          });

          // apply env-specific formatting (colors, etc.)
          exports.formatArgs.call(self, args);

          var logFn = debug.log || exports.log || get_console().log.bind(get_console());
          logFn.apply(self, args);
        }

        debug.namespace = namespace;
        debug.enabled = exports.enabled(namespace);
        debug.useColors = exports.useColors();
        debug.color = selectColor(namespace);

        // env-specific initialization logic for debug instances
        if ('function' === typeof exports.init) {
          exports.init(debug);
        }

        return debug;
      }

      /**
       * Enables a debug mode by namespaces. This can include modes
       * separated by a colon and wildcards.
       *
       * @param {String} namespaces
       * @api public
       */

      function enable(namespaces) {
        exports.save(namespaces);

        exports.names = [];
        exports.skips = [];

        var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        var len = split.length;

        for (var i = 0; i < len; i++) {
          if (!split[i]) continue; // ignore empty strings
          namespaces = split[i].replace(/\*/g, '.*?');
          if (namespaces[0] === '-') {
            exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
          } else {
            exports.names.push(new RegExp('^' + namespaces + '$'));
          }
        }
      }

      /**
       * Disable debug output.
       *
       * @api public
       */

      function disable() {
        exports.enable('');
      }

      /**
       * Returns true if the given mode name is enabled, false otherwise.
       *
       * @param {String} name
       * @return {Boolean}
       * @api public
       */

      function enabled(name) {
        var i, len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
          if (exports.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
          if (exports.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }

      /**
       * Coerce `val`.
       *
       * @param {Mixed} val
       * @return {Mixed}
       * @api private
       */

      function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
      }

    },
    "./node_modules/electron-squirrel-startup/node_modules/ms/index.js": function (exports, module, __filename, __dirname, require, define) {
      /**
       * Helpers.
       */

      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;

      /**
       * Parse or format the given `val`.
       *
       * Options:
       *
       *  - `long` verbose formatting [false]
       *
       * @param {String|Number} val
       * @param {Object} [options]
       * @throws {Error} throw an error if val is not a non-empty string or a number
       * @return {String|Number}
       * @api public
       */

      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === 'string' && val.length > 0) {
          return parse(val);
        } else if (type === 'number' && isNaN(val) === false) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          'val is not a non-empty string or a valid number. val=' +
            JSON.stringify(val)
        );
      };

      /**
       * Parse the given `str` and return milliseconds.
       *
       * @param {String} str
       * @return {Number}
       * @api private
       */

      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return n * y;
          case 'days':
          case 'day':
          case 'd':
            return n * d;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return n * h;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return n * m;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return n * s;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return n;
          default:
            return undefined;
        }
      }

      /**
       * Short format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */

      function fmtShort(ms) {
        if (ms >= d) {
          return Math.round(ms / d) + 'd';
        }
        if (ms >= h) {
          return Math.round(ms / h) + 'h';
        }
        if (ms >= m) {
          return Math.round(ms / m) + 'm';
        }
        if (ms >= s) {
          return Math.round(ms / s) + 's';
        }
        return ms + 'ms';
      }

      /**
       * Long format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */

      function fmtLong(ms) {
        return plural(ms, d, 'day') ||
          plural(ms, h, 'hour') ||
          plural(ms, m, 'minute') ||
          plural(ms, s, 'second') ||
          ms + ' ms';
      }

      /**
       * Pluralization helper.
       */

      function plural(ms, n, name) {
        if (ms < n) {
          return;
        }
        if (ms < n * 1.5) {
          return Math.floor(ms / n) + ' ' + name;
        }
        return Math.ceil(ms / n) + ' ' + name + 's';
      }

    },

  };
  customRequire.resolve = function (mod) {
    return require.resolve(mod)
  }

  customRequire("./src/app.js")
  return {
    customRequire,
    setGlobals: function (newGlobal, newProcess, newWindow, newDocument, newConsole, nodeRequire) {
      // Populate the global function trampoline with the real global functions defined on newGlobal.
      globalFunctionTrampoline = newGlobal;

      for (let key of Object.keys(global)) {
        newGlobal[key] = global[key]
      }
      global = newGlobal

      for (let key of Object.keys(process)) {
        newProcess[key] = process[key]
      }
      process = newProcess

      for (let key of Object.keys(window)) {
        newWindow[key] = window[key]
      }
      window = newWindow

      for (let key of Object.keys(document)) {
        newDocument[key] = document[key]
      }
      document = newDocument

      for (let key of Object.keys(console)) {
        newConsole[key] = console[key]
      }
      console = newConsole

      require = nodeRequire
    },
    translateSnapshotRow: function (row) {
      let low = 0
      let high = snapshotAuxiliaryData.snapshotSections.length - 1
      while (low <= high) {
        const mid = low + (high - low >> 1)
        const section = snapshotAuxiliaryData.snapshotSections[mid]
        if (row < section.startRow) {
          high = mid - 1
        } else if (row >= section.endRow) {
          low = mid + 1
        } else {
          return {
            relativePath: section.relativePath,
            row: row - section.startRow
          }
        }
      }

      return {relativePath: '<embedded>', row: row}
    }
  }
}

snapshotAuxiliaryData.snapshotSections = [{"relativePath":"./src/app.js","startRow":277,"endRow":353},{"relativePath":"./node_modules/electron/index.js","startRow":355,"endRow":390},{"relativePath":"./node_modules/v8-compile-cache/v8-compile-cache.js","startRow":392,"endRow":793},{"relativePath":"./node_modules/electron-squirrel-startup/index.js","startRow":795,"endRow":842},{"relativePath":"./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js","startRow":844,"endRow":855},{"relativePath":"./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js","startRow":857,"endRow":1043},{"relativePath":"./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js","startRow":1045,"endRow":1303},{"relativePath":"./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js","startRow":1305,"endRow":1508},{"relativePath":"./node_modules/electron-squirrel-startup/node_modules/ms/index.js","startRow":1510,"endRow":1663}]
var snapshotResult = generateSnapshot.call({})
// Delete the generateSnapshot function to prevent it from appearing in the
// global scope and causing slowdowns when the function is particularly big.
generateSnapshot = null
