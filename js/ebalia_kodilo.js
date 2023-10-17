class EbaliaKodilo {

    /** 
    * @returns ĉenon de baliaj signoj
    */
    alBaliaTekston(text) {
        const abgd = new Abugido();
        const vortoj = text.split(/(?=[ \t\n\r^,\.:!\?])|(?<=[ \t\n\r\^,\.:!\?])/g);
        const res = [];
        vortoj.forEach(v => {
            const p = punct2ba[v];
            if (!!p) {
                res.push(p);
            } else if (abgd.parse(v)) {
                const bali = this.alBaliaVorton(abgd.syllabes);
                res.push(bali);
            } else {
                res.push("<" + v + " ERROR>")
            }
        })

        return res.join("");
    }

    /** 
     * silaboj estas aro de objektoj en formo: {k1, k2, v, m}.
     * @returns ĉenon de baliaj signoj
     */
    alBaliaVorton(silaboj) {
        const res = silaboj.map(s => this.alBaliaSilabon(s));
        return res.join("");
    }

    alBaliaSilabon(silabo) {

        if (silabo.v === '\'' && !silabo.k1 && !silabo.m) {
            return '\'';
        }

        let s;
        if (silabo.k1) {
            s = eo2ba[silabo.k1]
        } else {
            s = eo2ba['a'];
        }

        if (silabo.k2) {
            s += eo2ba['/'] + eo2ba[silabo.k2]
        }

        switch (silabo.v) {
            case 'a':
                break;
            case 'o':
            case 'e':
            case 'i':
            case 'u':
            case '\'':
            case 'y':
                s += eo2ba[silabo.v];
                break;
            default:
                throw new Error('unknown vocal: ' + v);
        }

        if (silabo.m) {
            if (silabo.m === 'jn') {
                s += eo2ba['J'] + eo2ba['N'];
            } else {
                s += eo2ba[silabo.m.toLocaleUpperCase()]
            }
        }

        return s;
    }
}

const punct2ba = {
    "^": "\u{1b7c}", //  ᭼ nomo (majusklo)
    ",": "\u{1b5e}", // ᭞ komo
    ".": "\u{1b5f}", // ᭟ punkto
    ":": "\u{1b5d}", // ᭝ dupunkto
    ' ': ' ',
    '\t': '\t',
    '\n': '\n',
    '\r': '\r',
    '!': '!',
    '?': '?'
};

const eo2ba = {
    // vokaloj
    a: "\u{1b20}", // ᬠ 
    u: "\u{1b38}", //  ᬸ
    o: "\u{1b39}", //  ᬹ
    e: "\u{1b3e}", //  ᬾ
    i: "\u{1b36}", //  ᬶ
    y: "\u{1b37}", //  ᬷ ы
    w: "\u{1b14}", // ᬔ ŭ, ў

    // finaĵoj
    Ŭ: "\u{1b42}", //  ᭂ
    ŭ: "\u{1b42}",
    J: "\u{1b02}", //  ᬂ
    R: "\u{1b03}", //  ᬃ
    N: "\u{1b04}", //  ᬄ
    S: "\u{1b35}", //  ᬵ
    L: "\u{1b3a}", //  ᬺ

    // konsonantoj
    b: "\u{1b29}", // ᬩ
    c: "\u{1b19}", // ᬙ
    ĉ: "\u{1b18}", // ᬘ
    d: "\u{1b24}", // ᬤ
    f: "\u{1b17}", // ᬗ
    g: "\u{1b15}", // ᬕ
    ĝ: "\u{1b1a}", // ᬚ
    h: "\u{1b33}", // ᬳ
    ĥ: "\u{1b16}", // ᬖ 
    j: "\u{1b2c}", // ᬬ
    ĵ: "\u{1b1f}", // ᬥ
    k: "\u{1b13}", // ᬓ
    l: "\u{1b2e}", // ᬮ
    m: "\u{1b2b}", // ᬫ
    n: "\u{1b26}", // ᬦ
    p: "\u{1b27}", // ᬧ
    r: "\u{1b2d}", // ᬭ
    s: "\u{1b32}", // ᬲ
    ŝ: "\u{1b31}", // ᬱ
    t: "\u{1b22}", // ᬢ
    v: "\u{1b2f}", // ᬯ
    z: "\u{1b1e}", // ᬞ

    // modifiloj
    "/": "\u{1b44}", // ᭄ ligaturilo
    "+": "\u{1b44}", // ᭄ ligaturilo
    "'": "\u{1b34}", //  ᬴ senvokalilo
}