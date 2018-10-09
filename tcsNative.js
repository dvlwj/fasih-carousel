/*
 * Fasih Carousel (tcsNative.js)
 * Version     : 1.0
 * Author      : Fathi “fsc” Anshory, David "dvlwj" Valentino
 * Description : It makes a image slider that cascades its child element, like accordion.
 * License     : MIT
*/


/**
 * Main Carousel function
 *
 * @function theCascadingSlider
 * @param {String} id - DOM Element Container ID (i.e. table in the case)
 * @param {Objects} opts - Options
 * @param {Integer} opts.pauseDuration - The default waiting time before the slide slides.
 *      If DATA-PAUSE attribute is present in the slide element, then this option is deferred.
 */

export default function theCascadingSlider(id, opts = {}) {
    const elRoot = document.getElementById(id);
    if (!elRoot)
        throw new Error(`Element not found by id: ${id}`);

    elRoot.classList.toggle('nrm-slider');

    const options = {
        pauseDuration: 2000,
        ...opts
    };

    elRoot.nrmSlider = {
        length:  elRoot.querySelectorAll('td').length,
        index:   0,
        timeout: null,
        goTo: (goTo) => {
            goTo = goTo || elRoot.querySelector('td:first-child');

            const allNotShown = Array.from(elRoot.querySelectorAll('td:not(.shown)'));
            for (const o of allNotShown)
                o.removeEventListener('click', onClick);

            const elArr = Array.from(elRoot.querySelectorAll('td'));
            elRoot.nrmSlider.index = elArr.indexOf(goTo);

            const el1 = elRoot.querySelector('td.shown');

            animate(el1, 480,
                { width: ((elRoot.offsetWidth * (20 / 100)) / (elRoot.nrmSlider.length - 1)) },
                () => {
                    el1.style['background-position-x'] = el1.getAttribute('data-folded-centre') ? el1.getAttribute('data-folded-centre') : '50%';
                    el1.classList.remove('shown');
                }
            );

            animate(goTo, 640,
                { width: (elRoot.offsetWidth * (80 / 100)) },
                () => {
                    goTo.style['background-position-x'] = '50%';
                    goTo.classList.add('shown');
                }
            );

            elRoot.nrmSlider.timeout = setTimeout(elRoot.nrmSlider.goTo,
                goTo.getAttribute('data-pause') ?
                    goTo.getAttribute('data-pause') : options.pauseDuration,
                elRoot.querySelectorAll('td')[elArr.indexOf(goTo) + 1] ?
                    elRoot.querySelectorAll('td')[elArr.indexOf(goTo) + 1] : elRoot.querySelectorAll('td')[0]);
        }
    };

    /**
     * Animation by width of given element
     * Implementation of JQ animate for the case.
     *
     * @function animate
     * @param {Object} el - DOM Element as animation target
     * @param {Integer} interval - animation duration
     * @param {Object} opts - Options
     * @param {Integer} opts.width - Goal width
     * @param {Function} cb - Callback fired by animation complete
     */

    function animate(el, interval, opts = { width: 0 }, cb) {
        if (!el) return;

        const options = { ...opts };
        let width     = el.offsetWidth;
        const speed   = (options.width - width) / (interval / 10);

        const id = setInterval(() => {
            width += speed;
            el.style.width = width + 'px';
        }, 10);

        setTimeout(() =>  {
            clearInterval(id);
            cb();
        }, interval);
    }

    /** Click Handler for a TD nodes */

    function onClick() {
        elRoot.nrmSlider.goTo(this);
        clearTimeout(elRoot.nrmSlider.timeout);
    }

    elRoot.addEventListener('mouseenter', function() {
        clearTimeout(elRoot.nrmSlider.timeout);
        const allNotShown = Array.from(elRoot.querySelectorAll('td:not(.shown)'));
        for (const o of allNotShown)
            o.addEventListener('click', onClick);
    });

    elRoot.addEventListener('mouseleave', function() {
        const target = this.querySelector('td.shown');
        const elArr = Array.from(elRoot.querySelectorAll('td'));
        const index = elArr.indexOf(target);
        if (target)
            elRoot.nrmSlider.timeout = setTimeout(elRoot.nrmSlider.goTo, target.getAttribute('data-pause') ? target.getAttribute('data-pause') : options.pauseDuration, elRoot.querySelectorAll('td')[index+1] > 0 ? elRoot.querySelectorAll('td')[index+1] : elRoot.querySelector('td:first-child'));
        const allNotShown = Array.from(elRoot.querySelectorAll('td:not(.shown)'));
        for (const o of allNotShown)
            o.removeEventListener('click', onClick);
    });

    elRoot.nrmSlider.timeout = setTimeout(elRoot.nrmSlider.goTo, options.pauseDuration);
}