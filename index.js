/**
 * @file mofron-effect-hovshadow/index.js
 * @brief effect module template for developper
 * @license MIT
 */
const Hover   = require("mofron-event-hover"); 
const Shadow  = require("mofron-effect-shadow");
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) 
     *                key-value: effect config
     * @short
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("hovshadow");
            //this.shortForm(""); // please set short form parameter
            //this.transition();  // regist css key for animation
            
	    this.eid(-100);
            this.confmng().add("value", { type: "size", init: "0.03rem" });
            
            /* init config */
	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    value (prm) {
        try {
            return this.confmng("value", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined !== prm) {
                prm.event(new Hover(new ConfArg(this.contents,this)));
		let val = comutl.sizesum(this.value(),this.value());
		prm.effect([
                    new Shadow({ eid:3, value: val,    blur: this.value(), speed:100 }),
		    new Shadow({ eid:4, value: "0rem", blur: "0rem", speed:100 }),
		]);
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * 
     * @type private
     */
    contents (p1,p2,p3) {
        try {
            /* effect contents */
	    let eid = (true === p2) ? 3:4;
	    p3.component().execEffect(eid);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
