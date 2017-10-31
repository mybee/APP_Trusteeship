<style lang="less">
    @import '../../../styles/common.less';
    @import './app-qrcode.less';
</style>

<template>
    <div>

        <h1>APP 永久二维码</h1>
        <div id="notice" class="off"></div>
        <div id="cells"></div>
        <div id="loader"><span>loading</span></div>
        <div type="text/template" id="template">
            <p><a href="#"><img :src="src" :height="height" :width="width" /></a></p>
            <h2><a href="#">{{title}}</a></h2>
            <span class="like">Like!</span>
            <span class="mark">Mark!</span>
        </div>

            <div v-for="article in articles" class="text item">
                {{article.title}}
            </div>

    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue',
                title: 'am风',
                src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg',
                width: 200,
                height: 200,
                articles: []
            }
        },
        components:{

        },
        mounted() {

            "user strict";

            var isGithubDemo = false;
            var MIN_COLUMN_COUNT = 3; // minimal column count
            var COLUMN_WIDTH = 220;   // cell width: 190, padding: 14 * 2, border: 1 * 2
            var CELL_PADDING = 26;    // cell padding: 14 + 10, border: 1 * 2
            var GAP_HEIGHT = 15;      // vertical gap between cells
            var GAP_WIDTH = 15;       // horizontal gap between cells
            var THRESHOLD = 2000;     // determines whether a cell is too far away from viewport (px)

            var columnHeights;        // array of every column's height
            var columnCount;          // number of columns
            var noticeDelay;          // popup notice timer
            var resizeDelay;          // resize throttle timer
            var scrollDelay;          // scroll throttle timer
            var managing = false;     // flag for managing cells state
            var loading = false;      // flag for loading cells state

            var noticeContainer = document.getElementById('notice');
            var cellsContainer = document.getElementById('cells');
            var cellTemplate = document.getElementById('template').innerHTML;

            /**
             * Created by deer_mac on 2017/10/20.
             */
            /* https://github.com/myst729/front.js */
            function front(n,r,e){"use strict";var t=Array.isArray(r)?r:[r],f="",i=function(n,r){for(var e,t=r.split("."),f=n;t.length;){if(e=t.shift(),!("object"===typeof f&&e in f))return!1;f=f[e]}return f};return t.forEach(function(r){var e=n.replace(/@if\{\{([\w\s-_\.]+)\}\}([\s\S]+?)(@else([\s\S]+?))?@endif/g,function(n,e,t,f,o){return i(r,e)?t:f?o:""});f+=e.replace(/\{\{([\w\s-_\.]+)\}\}/g,function(n,e){return i(r,e)||n})}),e?void(e.innerHTML=f):f}"function"===typeof define&&define.amd&&define("front.js/front.min",[],function(){return{render:front}});

            // Cross-browser compatible event handler.
            var addEvent = function(element, type, handler) {
                if(element.addEventListener) {
                    addEvent = function(element, type, handler) {
                        element.addEventListener(type, handler, false);
                    };
                } else if(element.attachEvent) {
                    addEvent = function(element, type, handler) {
                        element.attachEvent('on' + type, handler);
                    };
                } else {
                    addEvent = function(element, type, handler) {
                        element['on' + type] = handler;
                    };
                }
                addEvent(element, type, handler);
            };

            // Get the minimal value within an array of numbers.
            var getMinVal = function(arr) {
                return Math.min.apply(Math, arr);
            };

            // Get the maximal value within an array of numbers.
            var getMaxVal = function(arr) {
                return Math.max.apply(Math, arr);
            };

            // Get index of the minimal value within an array of numbers.
            var getMinKey = function(arr) {
                var key = 0;
                var min = arr[0];
                for(var i = 1, len = arr.length; i < len; i++) {
                    if(arr[i] < min) {
                        key = i;
                        min = arr[i];
                    }
                }
                return key;
            };

            // Get index of the maximal value within an array of numbers.
            var getMaxKey = function(arr) {
                var key = 0;
                var max = arr[0];
                for(var i = 1, len = arr.length; i < len; i++) {
                    if(arr[i] > max) {
                        key = i;
                        max = arr[i];
                    }
                }
                return key;
            };

            // Pop notice tag after user liked or marked an item.
            var updateNotice = function(event) {
                clearTimeout(noticeDelay);
                var e = event || window.event;
                var target = e.target || e.srcElement;
                if(target.tagName == 'SPAN') {
                    var targetTitle = target.parentNode.tagLine;
                    noticeContainer.innerHTML = (target.className == 'like' ? 'Liked ' : 'Marked ') + '<strong>' + targetTitle + '</strong>';
                    noticeContainer.className = 'on';
                    noticeDelay = setTimeout(function() {
                        noticeContainer.className = 'off';
                    }, 2000);
                }
            };

            // Calculate column count from current page width.
            var getColumnCount = function() {
                return Math.max(MIN_COLUMN_COUNT, Math.floor((document.body.offsetWidth + GAP_WIDTH) / (COLUMN_WIDTH + GAP_WIDTH)));
            };

            // Reset array of column heights and container width.
            var resetHeights = function(count) {
                columnHeights = [];
                for(var i = 0; i < count; i++) {
                    columnHeights.push(0);
                }
                cellsContainer.style.width = (count * (COLUMN_WIDTH + GAP_WIDTH) - GAP_WIDTH) + 'px';
            };


            // Fetch JSON string via Ajax, parse to HTML and append to the container.

            this.$http.jsonp('http://localhost:9000/qrcode?n=10', {}, {
                headers: {

                },
                emulateJSON: true
            }).then(function(response) {
                // 这里是处理正确的回调
                if(loading) {
                    // Avoid sending too many requests to get new cells.
                    return;
                }

                var fragment = document.createDocumentFragment();
                var cells = [];
                var images;
                images=response.data;
                console.log(images);
                for(var j = 0, k = images.length; j < k; j++) {
                    var cell = document.createElement('div');
                    cell.className = 'cell pending';
                    cell.tagLine = images[j].title;
                    console.log("cell.tagLine" + cell.tagLine)
                    cells.push(cell);
                    front(cellTemplate, images[j], cell);
                    fragment.appendChild(cell);
                }
                cellsContainer.appendChild(fragment);
                loading = false;
                adjustCells(cells);
                this.articles = response.data.subjects
                // this.articles = response.data["subjects"] 也可以
                loading = true;
            }, function(response) {
                // 这里是处理错误的回调
                console.log(response)
            });

            /*
            // Fake mode, only for GitHub demo. Delete this function in your project.
            var appendCellsDemo = function(num) {
                if(loading) {
                    // Avoid sending too many requests to get new cells.
                    return;
                }
                var fragment = document.createDocumentFragment();
                var cells = [];
                var images = [0, 286, 143, 270, 143, 190, 285, 152, 275, 285, 285, 128, 281, 242, 339, 236, 157, 286, 259, 267, 137, 253, 127, 190, 190, 225, 269, 264, 272, 126, 265, 287, 269, 125, 285, 190, 314, 141, 119, 274, 274, 285, 126, 279, 143, 266, 279, 600, 276, 285, 182, 143, 287, 126, 190, 285, 143, 241, 166, 240, 190];
                for(var j = 0; j < num; j++) {
                    var key = Math.floor(Math.random() * 60) + 1;
                    var cell = document.createElement('div');
                    cell.className = 'cell pending';
                    cell.tagLine = 'demo picture ' + key;
                    cells.push(cell);
                    front(cellTemplate, { 'title': 'demo picture ' + key, 'src': key, 'height': images[key], 'width': 190 }, cell);
                    fragment.appendChild(cell);
                }
                // Faking network latency.
                setTimeout(function() {
                    loading = false;
                    cellsContainer.appendChild(fragment);
                    adjustCells(cells);
                }, 2000);
            };

            */
            // Position the newly appended cells and update array of column heights.
            var adjustCells = function(cells, reflow) {
                var columnIndex;
                var columnHeight;
                for(var j = 0, k = cells.length; j < k; j++) {
                    // Place the cell to column with the minimal height.
                    console.log(cells)
                    console.log(columnHeights)
                    columnIndex = getMinKey(columnHeights);
                    columnHeight = columnHeights[columnIndex];
                    cells[j].style.height = (cells[j].offsetHeight - CELL_PADDING) + 'px';
                    cells[j].style.left = columnIndex * (COLUMN_WIDTH + GAP_WIDTH) + 'px';
                    cells[j].style.top = columnHeight + 'px';
                    columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
                    if(!reflow) {
                        cells[j].className = 'cell ready';
                    }
                }
                cellsContainer.style.height = getMaxVal(columnHeights) + 'px';
                manageCells();
            };

            // Calculate new column data if it's necessary after resize.
            var reflowCells = function() {
                // Calculate new column count after resize.
                columnCount = getColumnCount();
                if(columnHeights.length != columnCount) {
                    // Reset array of column heights and container width.
                    resetHeights(columnCount);
                    adjustCells(cellsContainer.children, true);
                } else {
                    manageCells();
                }
            };

            // Toggle old cells' contents from the DOM depending on their offset from the viewport, save memory.
            // Load and append new cells if there's space in viewport for a cell.
            var manageCells = function() {
                // Lock managing state to avoid another async call. See {Function} delayedScroll.
                managing = true;

                var cells = cellsContainer.children;
                var viewportTop = (document.body.scrollTop || document.documentElement.scrollTop) - cellsContainer.offsetTop;
                var viewportBottom = (window.innerHeight || document.documentElement.clientHeight) + viewportTop;

                // Remove cells' contents if they are too far away from the viewport. Get them back if they are near.
                // TODO: remove the cells from DOM should be better :<
                for(var i = 0, l = cells.length; i < l; i++) {
                    if((cells[i].offsetTop - viewportBottom > THRESHOLD) || (viewportTop - cells[i].offsetTop - cells[i].offsetHeight > THRESHOLD)) {
                        if(cells[i].className === 'cell ready') {
                            cells[i].fragment = cells[i].innerHTML;
                            cells[i].innerHTML = '';
                            cells[i].q  = 'cell shadow';
                        }
                    } else {
                        if(cells[i].className === 'cell shadow') {
                            cells[i].innerHTML = cells[i].fragment;
                            cells[i].className = 'cell ready';
                        }
                    }
                }

                // If there's space in viewport for a cell, request new cells.
                if(viewportBottom > getMinVal(columnHeights)) {
                    // Remove the if/else statement in your project, just call the appendCells function.
                    if(isGithubDemo) {
                        appendCellsDemo(columnCount);
                    } else {
                        appendCells(columnCount);
                    }
                }

                // Unlock managing state.
                managing = false;
            };

            // Add 500ms throttle to window scroll.
            var delayedScroll = function() {
                clearTimeout(scrollDelay);
                if(!managing) {
                    // Avoid managing cells for unnecessity.
                    scrollDelay = setTimeout(manageCells, 500);
                }
            };

            // Add 500ms throttle to window resize.
            var delayedResize = function() {
                clearTimeout(resizeDelay);
                resizeDelay = setTimeout(reflowCells, 500);
            };

            // Initialize the layout.
            var init = function() {
                // Add other event listeners.
                addEvent(cellsContainer, 'click', updateNotice);
                addEvent(window, 'resize', delayedResize);
                addEvent(window, 'scroll', delayedScroll);

                // Initialize array of column heights and container width.
                columnCount = getColumnCount();
                resetHeights(columnCount);

                // Load cells for the first time.
                manageCells();
            };

            // Ready to go!
            addEvent(window, 'load', init);
        },
        method: {

        }

    }
</script>
