class NegociacaoDao {

    constructor(connection)
    {
        this._connection = connection; 
        this._store = 'negociacoes';
    }

    adiciona(negociacao)
    {
        return new Promise((resolver, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)            
                .add(negociacao);

            request.onsuccess =  e => {
                resolver();
            };   

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            }
        })
    }


    listaTodos()
    {
        return new Promise((resolver, reject)=>{

            let cursor = this._connection
               .transaction([this._store],'readwrite')
               .objectStore(this._store)
               .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;

                if(atual)
                {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }else{
                    resolver(negociacoes);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível recuperar as negociações');
            }

            

        });
    }

    apagaTodos()
    {
        return new Promise((resolver, reject)=>{
            let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .clear();


            request.onsuccess =  e => {
                resolver('Negociações apagadas com sucesso');
            };   

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações');
            }

        })
    }

}