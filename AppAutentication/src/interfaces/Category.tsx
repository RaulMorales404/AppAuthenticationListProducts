export interface RespopnseCategoris {
    total:      number;
    categorias: Categoria[];
}

export interface Categoria {
    _id:     string;
    nombre:  string;
    usuario?: CreadoPor;
}

export interface CreadoPor {
    _id:    string;
    nombre: string;
}
