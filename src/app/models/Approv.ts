export class Approv{
    private code:string;
    private qte_comd:number;
    private qte_stock:number;
    private date_approv:string;
    private date_exp:number;
    private p_achat_unit:number;
    private p_total_achat:number;
    private stock_securite:number;
    private medicament:string;
    private user:string;

    constructor(code: string, qte_comd:number,
        qte_stock:number,
        date_approv:string, date_exp:number,
        p_achat_unit:number, p_total_achat:number
        ,stock_securite:number,
        medicament: string,
        user: string ) {
        this.code = code;
        this.qte_comd = qte_comd;
        this.qte_stock = qte_stock;
        this.date_approv = date_approv;
        this.date_exp = date_exp;
        this.p_achat_unit = p_achat_unit;
        this.p_total_achat = p_total_achat;
        this.stock_securite = stock_securite;
        this.medicament = medicament;
        this.user = user;
    }

    getCode():string { return this.code; }
    setCode(data:any):void {
        this.code = data.code;
    }
}