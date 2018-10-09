/*
 * Fasih Carousel (tcsNative.js)
 * Version     : 1.0
 * Author      : Fathi “fsc” Anshory, David "dvlwj" Valentino
 * Description : It makes a image slider that cascades its child element, like accordion.
 * License     : MIT
*/


/** Carousel class */

export default class CFasihCarousel {


    /**
     * @method constructor
     * @param {String} elementId - DOM Element Container ID (i.e. table in the case)
     * @param {Objects} opts - Options
     * @param {Integer} opts.pauseDuration - The default waiting time before the slide slides.
     *   If DATA-PAUSE attribute is present in the slide element, then this option is deferred.
     */

    constructor(elementId, opts ={}) {
        this.rootElement = document.getElementById(elementId);

        if (!this.rootElement)
            throw new Error(`Element with id: ${elementId} not found`);


        this.rootElement.classList.toggle('nrm-slider');

        this.options = {
            pauseDuration: 2000,
            ...opts
        };

        this.index         = -1;
        this.elementsArray = Array.from(this.rootElement.querySelectorAll('td'));
        this.bRunning      = false; // Flag to figure out loop state. See this.stop method

        this.rootElement.addEventListener('mouseenter', async () => {
            await this.stop();
        });

        this.rootElement.addEventListener('mouseleave', async () => {
            await this.stop();
            this.start();
        });

        const self = this;
        for (const element of this.elementsArray)
            element.addEventListener('click', function() {
                self.goto(self.elementsArray.indexOf(this));
            });

        this.timeoutID = setTimeout(this.start.bind(this), this.options.pauseDuration);
    }

    /**
     * Animation by width of given element
     * Implementation of JQ animate for the case.
     *
     * @method animate
     * @param {Object} el - DOM Element as animation target
     * @param {Integer} interval - animation duration
     * @param {Object} opts - Options
     * @param {Integer} opts.width - Goal width
     * @return {Promise}
     */

    _animate(element, interval, opts = { width: 0 }) {
        return new Promise((resolve, reject) => {
            if (!element)
                return reject();
            const options = { ...opts };
            let width     = element.offsetWidth;
            const speed   = (options.width - width) / (interval / 10);

            const intervalID = setInterval(() => {
                width += speed;
                element.style.width = width + 'px';
            }, 10);

            setTimeout(() =>  {
                clearInterval(intervalID);
                resolve();
            }, interval);
        });
    }

    /**
     * Start animation loop
     *
     * @async
     * @method start
     * @param {Boolean} once - the flag meaning run start only once without self call at the end
     */

    async start(once = false) {
        this.bRunning = true;
        this.index++;
        if (this.index == this.elementsArray.length)
            this.index = 0;

        const idx = this.index;
        const shownElement = this.rootElement.querySelector('td.shown');

        if (shownElement) {
            await this._animate(shownElement, 480,
                { width: ((this.rootElement.offsetWidth * (20 / 100)) / (this.elementsArray.length - 1)) });

            shownElement.style['background-position-x'] = shownElement.getAttribute('data-folded-centre') ?
                shownElement.getAttribute('data-folded-centre') : '50%';
            shownElement.classList.remove('shown');
        }

        await this._animate(this.elementsArray[idx], 640, { width: (this.rootElement.offsetWidth * (80 / 100)) });
        this.elementsArray[idx].style['background-position-x'] = '50%';
        this.elementsArray[idx].classList.add('shown');

        const timeout = this.elementsArray[idx].getAttribute('data-pause') ?
            this.elementsArray[idx].getAttribute('data-pause') : this.options.pauseDuration;
        if (!once)
            this.timeoutID = setTimeout(this.start.bind(this), timeout);

        this.bRunning = false;
    }

    /**
     * Stop animation loop
     *
     * @async
     * @method start
     * @return {Promise}
     */

    stop() {
        const self = this;
        clearTimeout(this.timeoutID);
        return new Promise((resolve) => {
            setInterval(function() {
                if (!self.bRunning) {
                    clearInterval(this);
                    resolve();
                }
            }, 10);
        });
    }

    /**
     * Goto animation of element with given index
     *
     * @async
     * @method goto
     * @param {Integer} idx - Element index
     */

    async goto(idx = 0) {
        await this.stop();
        if (this.index == idx)
            return;
        this.index = idx - 1;
        this.start(true);
        clearTimeout(this.timeoutID);
    }
}