class Abugido {

  syllabes = [];
  rest = [];

  parse(vorto) {
    this.syllabes = [];
    if (!vorto) {
      return false;
    }
    
    this.rest = this.dividuPerVokaloj(vorto.toLowerCase());
    
    const abugido = this.start();
    
    return abugido;
  }

  start() {
    if (this.eow()) {
      return true;
    }

    const first = this.rest.shift();
    if (this.ĉuVokalo(first)) {
      return this.doV({ v: first });
    }

    return this.doK(first);
  }

  /** @returns aron de Vokaloj interligitaj per kelkaj konsonantoj: dektriajn -> [ "d", "e", "ktr", "i", "a", "jn" ]. */
  dividuPerVokaloj(vorto) {
    return vorto.split(/(?=[aoeui'y])|(?<=[aoeui'y])/g);
  }

  doV(syllable) {
    if (this.eow()) {
      this.addSyllable(syllable);
      return true;
    }

    const next = this.rest.shift(); // = this.rest[0] 
    if ('ŭ' === next) {
      syllable.m = 'ŭ';
      this.addSyllable(syllable);
      return this.start();
    }

    if (this.ĉuVokalo(next)) {
      this.addSyllable(syllable);
      return this.doV({ v: next });
    }

    // next = K or M
    return this.doVK(syllable, next)
  }

  doVK(syllable, consonant) {
    if (this.eow()) {
      // v k -> v, k'
      const ss = this.getVK_(syllable, consonant);
      ss.forEach(s => this.addSyllable(s));
      return true;
    }

    if (this.ĉuVokalo(this.rest[0])) {
      return this.doVKV(syllable, consonant)
    }

    throw new Error("malbona enigo: du konsonantaj ĉenoj " + k + " - " + next);
  }

  /**  */
  getVK_(syllable, consonant) {
    const ks = []
    switch (consonant.length) {
      case 1:
        // v m -> vm
        if (this.ĉuModifilo(consonant)) {
          syllable.m = consonant;
          ks.push(syllable);
        } else {
          // v k -> v k'
          ks.push(syllable);
          ks.push(this.virama(consonant))
        }
        break;

      case 2:
        if (consonant == "jn") {
          syllable.m = consonant;
          ks.push(syllable);
        } else if (this.ĉuModifilo(consonant[0])) {
          syllable.m = consonant[0];
          ks.push(syllable);
          ks.push(this.virama(consonant[1]))
        } else if (this.ĉuKonsonanto(consonant[0])) {
          ks.push(syllable);
          ks.push(this.virama(consonant[0], consonant[1]))
        }
        break;

      default:
        throw new Error('(getVK_) tri konsonantoj fine: ' + consonant);
    }

    return ks;
  }

  getK(consonant) {
    const syllabes = [];
    switch (consonant.length) {
      case 1:
        syllabes.push(this.virama(consonant));
        break;
      case 2:
        syllabes.push(this.virama(consonant[0], consonant[1]));
        break;
      case 3:
        if (consonant[2] === 'r') {
          syllabes.push(this.virama(consonant[0]));
          syllabes.push(this.virama(consonant[1], consonant[2]));
        } else {
          syllabes.push(this.virama(consonant[0], consonant[1]));
          syllabes.push(this.virama(consonant[2]));
        }
        break;
      default:
        throw new Error('(getK) kvar konsonantoj ' + consonant);
    }
    return syllabes;
  }

  /** v k [v...] -> */
  doVKV(syllable, consonant) {

    switch (consonant.length) {
      case 1:
        // v k v -> v kv
        this.addSyllable(syllable);
        return this.doK(consonant)

      case 2:
        return this.doVK2V(syllable, consonant);

      case 3:
        return this.doVK3V(syllable, consonant);

      case 4:
        return this.doVK4V(syllable, consonant);

      default:
        throw new Error('kvin konsonantoj ' + consonant);
    }
  }

  doVK2V(syllable, consonant) {
    // v m k v -> vm kv
    if (this.ĉuModifilo(consonant[0])) {
      syllable.m = consonant[0];
      this.addSyllable(syllable);
      return this.doK(consonant[1]);
    } else {
      // v k k v -> v kkv
      this.addSyllable(syllable);
      return this.doK(consonant);
    }
  }

  doVK3V(syllable, consonant) {
    // v m k k v -> vm kkv
    if (consonant.startsWith("jn")) {
      syllable.m = "jn";
      this.addSyllable(syllable);
      return this.doK(consonant.substring(2));
    } else if (this.ĉuModifilo(consonant[0])) {
      syllable.m = consonant[0];
      this.addSyllable(syllable);
      return this.doK(consonant.substring(1));
    } else {
      // v k k k v -> v kk' kv
      this.addSyllable(syllable);
      if (consonant[2] === 'r') {
        this.addSyllable(this.virama(consonant[0]));
        return this.doK(consonant[1] + consonant[2]);
      } else {
        this.addSyllable(this.virama(consonant[0], consonant[1]));
        return this.doK(consonant[2]);
      }
    }
  }

  doVK4V(syllable, consonant) {
    // v m k k v -> vm kkv
    if (consonant.startsWith("jn")) {
      syllable.m = "jn";
      this.addSyllable(syllable);
      return this.doK(consonant.substring(2));
    } else if (this.ĉuModifilo(consonant[0])) {
      syllable.m = consonant[0];
      this.addSyllable(syllable);
      return this.doK(consonant.substring(1));
    } else {
      // v k k k k v -> v kk' kkv
      this.addSyllable(syllable);
      this.addSyllable(this.virama(consonant[0], consonant[1]));
      return this.doK(consonant.substring(2));
    }
  }

  doK(consonant) {
    if (this.eow()) {
      return this.doK_(consonant);
    }

    const vocal = this.rest.shift(); // = this.rest[0] 
    if (!this.ĉuVokalo(vocal)) {
      throw new Error('malbona enigo, necesas K - V: ' + consonant + ' - ' + vocal);
    }

    const syllabes = this.getK(consonant);
    for (let i = 0; i < syllabes.length - 1; i++) {
      this.addSyllable(syllabes[i]);
    }
    const syllable = syllabes[syllabes.length - 1];
    syllable.v = vocal;
    return this.doV(syllable);
  }

  doK_(consonant) {
    switch (consonant.length) {
      case 1:
        this.addSyllable(this.virama(consonant));
        return true;
      case 2:
        this.addSyllable(this.virama(consonant[0], consonant[1]));
        return true;
      default:
        throw new Error('(doK_) tri konsonantoj ' + consonant);
    }
  }

  virama(k1, k2) {
    const syllable = { k1: k1, v: NulVokalo };
    if (!!k2) {
      syllable.k2 = k2;
    }
    return syllable;
  }

  addSyllable(syllable) {
    this.syllabes.push(syllable);
  }

  eow() {
    return this.rest.length === 0;
  }

  ĉuModifilo(litero) {
    return "jnrsŭl'".includes(litero) || litero == "jn";
  }

  ĉuVokalo(litero) {
    return "aoeui'y".includes(litero);
  }

  ĉuKonsonanto(litero) {
    return [...litero].every(l => "bcĉdfgĝhĥjĵklmnprsŝtvz".includes(l))
  }

  ĉuTriaNivelo(konsonanto) {
    return "rvjl".includes(konsonanto);
  }

}

const Tipo = {
  Vokalo: "vokalo", //"aoeui'y",
  Modifilo: "modifilo", // "jnrsŭl",
  Konsonanto: "konsonanto" // "bcĉdfgĝhĥjĵklmnprsŝtvz"
};

const NulVokalo = "'";

if (typeof exports !== 'undefined') {
  module.exports = { Abugido, Tipo };
}

