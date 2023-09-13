/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _pages_App_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/App/App */ "./src/pages/App/App.js");
/* harmony import */ var _pages_App_App__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pages_App_App__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");




const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('app'));
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((_pages_App_App__WEBPACK_IMPORTED_MODULE_2___default()), null))));

/***/ }),

/***/ "./src/pages/App/App.js":
/*!******************************!*\
  !*** ./src/pages/App/App.js ***!
  \******************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/src/pages/App/App.js: Identifier 'AuthModal' has already been declared. (18:7)\n\n  16 | import NavBar from '../../components/navbar/navbar';\n  17 | import { getUser, signUp } from '../../utilities/users-service';\n> 18 | import AuthModal from '../../components/AuthModal/AuthModal'\n     |        ^\n  19 |\n  20 |\n  21 | export default function App() {\n    at instantiate (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:63:32)\n    at constructor (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:358:12)\n    at JSXParserMixin.raise (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:3255:19)\n    at ScopeHandler.checkRedeclarationInScope (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:1528:19)\n    at ScopeHandler.declareName (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:1499:12)\n    at JSXParserMixin.declareNameFromIdentifier (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:7511:16)\n    at JSXParserMixin.checkIdentifier (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:7507:12)\n    at JSXParserMixin.checkLVal (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:7446:12)\n    at JSXParserMixin.finishImportSpecifier (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14144:10)\n    at JSXParserMixin.parseImportSpecifierLocal (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14141:31)\n    at JSXParserMixin.maybeParseDefaultImportSpecifier (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14265:12)\n    at JSXParserMixin.parseImportSpecifiersAndAfter (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14118:29)\n    at JSXParserMixin.parseImport (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14114:17)\n    at JSXParserMixin.parseStatementContent (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:12706:27)\n    at JSXParserMixin.parseStatementLike (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:12584:17)\n    at JSXParserMixin.parseModuleItem (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:12561:17)\n    at JSXParserMixin.parseBlockOrModuleBlockBody (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:13185:36)\n    at JSXParserMixin.parseBlockBody (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:13178:10)\n    at JSXParserMixin.parseProgram (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:12460:10)\n    at JSXParserMixin.parseTopLevel (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:12450:25)\n    at JSXParserMixin.parse (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14345:10)\n    at parse (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/parser/lib/index.js:14386:38)\n    at parser (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/core/lib/parser/index.js:41:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/core/lib/transformation/normalize-file.js:64:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/core/lib/transformation/index.js:21:50)\n    at run.next (<anonymous>)\n    at transform (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/@babel/core/lib/transform.js:22:41)\n    at transform.next (<anonymous>)\n    at step (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/gensync/index.js:261:32)\n    at /Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/michaelterry/portfolio-projects/projects/unit-4-project/Etsy_Capstone/node_modules/gensync/index.js:223:11)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"App": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbig_poppa_code_react_starter_kit"] = self["webpackChunkbig_poppa_code_react_starter_kit"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_react-dom_client_js-node_modules_react-router-dom_dist_index_js"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=App.js.map