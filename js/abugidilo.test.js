const { Abugido } = require('./abugidilo');

const abgd = new Abugido();

// beforeAll(() => {})
// beforeEach(() => {})

describe(`dividu per vokaloj`, () => {
    test(`empty`, () => {
        const terms = abgd.dividuPerVokaloj("");
        expect(terms).toHaveLength(1);
        expect(terms[0]).toEqual("");
    })

    test(`all combinations: "dektriajn"`, () => {
        const terms = abgd.dividuPerVokaloj("dektriajn");
        expect(terms).toEqual(["d", "e", "ktr", "i", "a", "jn"]);
    })

    test(`all combinations: "dektriajn"`, () => {
        const terms = abgd.dividuPerVokaloj("dektriajn");
        expect(terms).toEqual(["d", "e", "ktr", "i", "a", "jn"]);
    })
})

describe(`parse`, () => {
    test(`empty`, () => {
        const res = abgd.parse("");
        expect(res).toBe(false);
        expect(abgd.syllabes).toEqual([]);
    })

    test(`V`, () => {
        const res = abgd.parse("a");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a' }]);
    })

    test(`VV`, () => {
        const res = abgd.parse("IE");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'i' }, { v: 'e' }]);
    })

    test(`VK`, () => {
        const res = abgd.parse("ok");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'o' }, { k1: 'k', v: '\'' }]);
    })

    test(`Vm`, () => {
        const res = abgd.parse("en");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'e', m: 'n' }]);
    })

    test(`Vmm`, () => {
        const res = abgd.parse("ajn");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a', m: 'jn' }]);
    })

    test(`VmK`, () => {
        const res = abgd.parse("ost");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'o', m: 's' }, { k1: 't', v: '\'' }]);
    })

    test(`VKK`, () => {
        const res = abgd.parse("ekz");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'e' }, { k1: 'k', k2: 'z', v: '\'' }]);
    })

    test(`K_`, () => {
        const res = abgd.parse("l");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'l', v: '\'' }]);
    })

    test(`KK_`, () => {
        const res = abgd.parse("nb");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'n', k2: 'b', v: '\'' }]);
    })

    test(`KV`, () => {
        const res = abgd.parse("ni");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'n', v: 'i' }]);
    })

    test(`KKV`, () => {
        const res = abgd.parse("tre");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 't', k2: 'r', v: 'e' }]);
    })

    test(`KKKV`, () => {
        expect(abgd.parse("ksto")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'k', k2: 's', v: '\'' }, { k1: 't', v: 'o' }]);
    })

    test(`KKKR`, () => {
        expect(abgd.parse("stra")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 's', v: '\'' }, { k1: 't', k2: 'r', v: 'a' }]);
    })

    test(`VKV`, () => {
        const res = abgd.parse("ami");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a' }, { k1: 'm', v: 'i' }]);
    })

    test(`KVKV`, () => {
        const res = abgd.parse("koro");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'k', v: 'o' }, { k1: 'r', v: 'o' }]);
    })

    test(`KVKKV`, () => {
        const res = abgd.parse("kudri");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'k', v: 'u' }, { k1: 'd', k2: 'r', v: 'i' }]);
    })

    test(`KVmKV`, () => {
        const res = abgd.parse("kurba");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'k', v: 'u', m: 'r' }, { k1: 'b', v: 'a' }]);
    })

    test(`KKVKV`, () => {
        const res = abgd.parse("preni");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'p', k2: 'r', v: 'e' }, { k1: 'n', v: 'i' }]);
    })

    test(`KVKVm`, () => {
        const res = abgd.parse("faros");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'f', v: 'a' }, { k1: 'r', v: 'o', m: 's' }]);
    })

    test(`KVmK`, () => {
        const res = abgd.parse("cent");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'c', v: 'e', m: 'n' }, { k1: 't', v: '\'' }]);
    })

    test(`KVKK`, () => {
        const res = abgd.parse("sobr");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 's', v: 'o' }, { k1: 'b', k2: 'r', v: '\'' }]);
    })

    test(`VKKKVm`, () => {
        const res = abgd.parse("ekster");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'e' }, { k1: 'k', k2: 's', v: '\'' }, { k1: 't', v: 'e', m: 'r' }]);
    })

    test(`VmKKV`, () => {
        const res = abgd.parse("astro");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a', m: 's' }, { k1: 't', k2: 'r', v: 'o' }]);
    })

    test(`KVmmKV`, () => {
        const res = abgd.parse("ŝajnno");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'ŝ', v: 'a', m: 'jn' }, { k1: 'n', v: 'o' }]);
    })

    test(`VKKKV`, () => {
        const res = abgd.parse("eksci");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'e' }, { k1: 'k', k2: 's', v: '\'' }, { k1: 'c', v: 'i' }]);
    })

    test(`VmKKRV`, () => {
        const res = abgd.parse("instru");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'i', m: 'n' }, { k1: 's', v: '\'' }, { k1: 't', k2: 'r', v: 'u' }]);
        // expect(abgd.syllabes).toEqual([{ v: 'i', m: 'n' }, { k1: 's', k2: 't', v: '\'' }, { k1: 'r', v: 'u' }]);
    })

    test(`VmmKKV`, () => {
        const res = abgd.parse("ejnŝte");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'e', m: 'jn' }, { k1: 'ŝ', k2: 't', v: 'e' }]);
    })

    test(`VKKKKV`, () => {
        const res = abgd.parse("dekstra");
        expect(res).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'd', v: 'e' }, { k1: 'k', k2: 's', v: '\'' }, { k1: 't', k2: 'r', v: 'a' }]);
    })

    test(`dektriajn`, () => {
        expect(abgd.parse("dektriajn")).toBe(true);
        expect(abgd.syllabes).toEqual([
            // { k1: 'd', v: 'e' }, { k1: 'k', k2: 't', v: '\'' }, { k1: 'r', v: 'i' }, { v: 'a', m: 'jn' }]);
            { k1: 'd', v: 'e' }, { k1: 'k', v: '\'' }, { k1: 't', k2: 'r', v: 'i' }, { v: 'a', m: 'jn' }]);
    })

    test(`laŭ`, () => {
        expect(abgd.parse("laŭ")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'l', v: 'a', m: 'ŭ' }]);
    })

    test(`aŭ`, () => {
        expect(abgd.parse("aŭ")).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a', m: 'ŭ' }]);
    })

    test(`antaŭ`, () => {
        expect(abgd.parse("antaŭ")).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a', m: 'n' }, { k1: 't', v: 'a', m: 'ŭ' }]);
    })
    test(`antaŭan`, () => {
        expect(abgd.parse("antaŭan")).toBe(true);
        expect(abgd.syllabes).toEqual([{ v: 'a', m: 'n' }, { k1: 't', v: 'a', m: 'ŭ' }, { v: 'a', m: 'n' }]);
    })

    test(`laŭdi`, () => {
        expect(abgd.parse("laŭdi")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'l', v: 'a', m: 'ŭ' }, { k1: 'd', v: 'i' }]);
    })

    test(`zeŭso`, () => {
        expect(abgd.parse("zeŭso")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'z', v: 'e', m: 'ŭ' }, { k1: 's', v: 'o' }]);
    })

    test(`ĉar`, () => {
        expect(abgd.parse("ĉar")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'ĉ', v: 'a', m: 'r' }]);
    }) 
    
    test(`ĉaro`, () => {
        expect(abgd.parse("ĉaro")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'ĉ', v: 'a' }, {k1: 'r', v: 'o'}]);
    }) 

    test(`ĉar'`, () => {
        expect(abgd.parse("ĉar'")).toBe(true);
        expect(abgd.syllabes).toEqual([{ k1: 'ĉ', v: 'a' }, {k1: 'r', v: '\''}]);
    }) 
})

describe(`tipoj: vokalo, konsonanto, modifilo`, () => {

    test(`vokalo`, () => {
        expect(abgd.ĉuVokalo("'")).toEqual(true);
    })

    test(`modifilo`, () => {
        expect(abgd.ĉuModifilo("jn")).toEqual(true);
        expect(abgd.ĉuModifilo("nj")).toEqual(false);
        expect(abgd.ĉuModifilo("n")).toEqual(true);
        expect(abgd.ĉuModifilo("j")).toEqual(true);
        expect(abgd.ĉuModifilo("s")).toEqual(true);
        expect(abgd.ĉuModifilo("ŭ")).toEqual(true);
        expect(abgd.ĉuModifilo("b")).toEqual(false);
    })

    test(`konsonanto`, () => {
        expect(abgd.ĉuKonsonanto('l')).toBe(true)
    })

    test(`konsonanto`, () => {
        expect(abgd.ĉuKonsonanto('jnr')).toBe(true)
    })
});

