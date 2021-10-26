export class Medicament {
    private libelle:string;
    private p_achat_unit:number;
    private qte_reel:number;
    private p_unit:number;
    private ecart:number;
    private categorie:string;

    constructor(libelle: string, p_achat_unit:number,
        qte_reel:number, p_unit:number,
        ecart:number, categorie:string) {
        this.libelle = libelle;
        this.p_achat_unit = p_achat_unit;
        this.qte_reel = qte_reel;
        this.p_unit = p_unit;
        this.ecart = ecart;
        this.categorie = categorie;
    }

}