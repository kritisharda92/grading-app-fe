

module.exports = {
    server: {
      prod: {
        protocol: 'http',
        host: '169.55.109.90',
        service: 'beer4T',
        port: '80',
        gaTrackingId: 'UA-118051090-2',
      },
      dev: {
        protocol: 'http',
        host: '10.30.7.91',
        service: 'beer4T',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
      qa: {
        protocol: 'http',
        host: '169.55.109.90',
        service: 'beer4TQA',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
      qaext: {
        protocol: 'http',
        host: '169.55.69.40',
        service: 'beer4TQA',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
    },
    env: 'dev',
    constants: {
      API_RETRY: 30,
      AUTOMATIC_RETRY_AMOUNT: 5,
      BEER_OPTION: 'beer',
      WINE_OPTION: 'wine',
      FOOD_OPTION: 'food',
      LANDING_OPTION: 'landing',
      CATEGORY_CELL: 'category',
      PRODUCT_CELL: 'product',
      DIM_RATIO: 0.42,
      SUBCATEGORY_WIDTH: 750,
    }
  };
  