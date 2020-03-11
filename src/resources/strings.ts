export let Strings = {
  AppName: 'Tour Finder',
  Components: {
    Residence: {
      AvailablePlaces: 'Vagas disponíveis: '
    },
    Tour: {
      Available: 'Vagas disponíveis: '
    },
    ResidencesForm: {
      City: 'Cidade',
      CheckinDate: 'Data de entrada',
      CheckoutDate: 'Data de saída',
      Submit: 'Buscar quartos!',
      DateFormat: 'Formato: (DD/MM/AAAA)',
      PurchasedResidences: 'Hospedagens compradas: ',
      Placeholder: {
        City: 'Informe a cidade de destino',
        CheckinDate: 'Informe a data de entrada',
        CheckoutDate: 'Informe a data de saída',
      },
    },
    TourForm: {
      City: 'Cidade',
      Date: 'Data',
      Quantity: 'Quantidade',
      Submit: 'Buscar passeios!',
      DateFormat: 'Formato: (DD/MM/AAAA)',
      Placeholder: {
        City: 'Informe a cidade de destino',
        Date: 'Informe a data do passeio',
        Type: 'Tipo de Passeio',
        Quantity: 'Quantidade'
      },
      Types:{
        Adventure: 'Aventura',
        Culture: 'Cultural',
        Nature: 'Natureza',
      },

    },
    ResidenceDetail: {
      AvailablePlacesLbl: 'Vagas disponíveis: ',
      BookNowYourRoom: 'Reserve agora o seu quarto: ',
      BuyRoom: 'Comprar',
      Thanks: 'Obrigado!',
      AddToTour: 'Deseja adicionar essa hospedagem ao roteiro?',
      AddToTourBtn: 'Adicionar ao roteiro.',
      OpenTravelTour: 'Abrir Travel Tour.',
    },
    Dialog: {
      Confirmation: {
        Title: 'Confirmação',
        MessagePrefix: 'Confirmar compra de ',
        Cancel: 'Cancelar',
        Confirm: 'Confirmar',
      },
      Status: {
        Title: 'Confirmação',
        MessageSuccess: 'Compra efetuada com sucesso!',
        MessageFailPrefix: 'Falha na compra: ',
        Confirm: 'OK',
      },
    },
  },
  Pages: {
    NotFound: 'Esta página não existe :-(',
  },
  Error: { 
    ResidencesForm: {
      InvalidDateFormat: 'Formato de data incorreto',
      NonExistingDate: 'Data não existente',
      EmptyCity: 'Digite o nome da cidade',
      CheckingAfterCheckout: 'A data de entrada deve ser anterior à data de saída',
      NoResFound: 'Nenhum quarto encontrado! :-(',
    },
    TourForm: {
      InvalidDateFormat: 'Formato de data incorreto',
      NonExistingDate: 'Data não existente',
      EmptyCity: 'Digite o nome da cidade',
      CheckingAfterCheckout: 'A data de entrada deve ser anterior à data de saída',
      NoResFound: 'Nenhum quarto encontrado! :-(',
    },
    ResidenceDetail: {
      NoResFound: 'Nenhum quarto encontrado! :-(',
    },
  },
};
