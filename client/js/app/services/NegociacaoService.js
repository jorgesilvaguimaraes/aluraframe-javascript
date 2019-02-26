class NegociacaoService
{
    constructor()
    {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana()
    {
        return new Promise( (resolve, reject) => {

            this._http.get('/negociacoes/semana')
                .then(negociacao => {
                    resolve(negociacao
                                .map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));            
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana')       
                })
        });
 
    }


    obterNegociacoesDaSemanaAnterior()
    {
        return new Promise( (resolve, reject) => {

            this._http.get('/negociacoes/anterior')
                .then(negociacao => {
                    resolve(negociacao
                                .map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));            
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana anterior')       
                })
        });
 

        
    }

    obterNegociacoesDaSemanaRetrasada()
    {
        return new Promise( (resolve, reject) => {

            this._http.get('/negociacoes/retrasada')
                .then(negociacao => {
                    resolve(negociacao
                                .map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));            
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Não foi possível obter as negociações da semana retrasada')       
                })
        });
 

        
    }

    obterNegociacoes()
    {
      return  Promise.all([
            this.obterNegociacoesDaSemana(), 
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()]
         ).then( periodos => {
            console.log(periodos)
            let negociacoes = periodos.reduce((dados, periodo)=> dados.concat(periodo), []);
            return negociacoes;

        })
        .catch(erro =>{throw new Error(erro)});
    }

}