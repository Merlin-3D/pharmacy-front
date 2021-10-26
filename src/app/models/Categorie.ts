export class Categorie {
    private categorie:string;

    constructor(titre: string) {
        this.categorie = titre;
    }

    getTitre():string { return this.categorie; }
}