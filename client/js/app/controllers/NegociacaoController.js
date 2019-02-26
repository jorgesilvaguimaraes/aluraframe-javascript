class NegociacaoController {

    constructor()
    {
        let $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');        
        this._inputValor      = $('#valor');
                
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        );
                
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        );

        ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                    negociacoes.forEach(negociacao => 
                        this._listaNegociacoes.adiciona(negociacao))) 
            .catch(error => {
                console.log(error);
                this._mensagem.texto = error;
            })                              
    }

    adiciona(event) {

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conn => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(conn)
                    .adiciona(negociacao)
                    .then(()=>{
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesse';            
                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro)       
    }

    importaNegociacoes()
    {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacaoes importadas com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro)
  
    }


    apaga()
    {
        ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.apagaTodos())
            .then(msg => {
                this._mensagem.texto = msg;
                this._listaNegociacoes.esvazia();
            })
            .catch(error => {
                console.log(error);
                this._mensagem.texto = error;
            })


        this._listaNegociacoes.esvazia();        
        this._mensagem.texto = 'Negociações apagadas com sucesso';                  
    }

    _criaNegociacao()
    {
        return new Negociacao ( 
            DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseInt(this._inputValor.value));
    }


    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        
        this._inputData.focus();
    }
    
}